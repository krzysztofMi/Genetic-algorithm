import Population from "./Population"
import Interval from "./Interval"
import ExtremeType from "../enum/ExtremeType"
import Mutation from "./mutation/Mutation"
import Selection from "./selection/Selection"
import BinaryChromosome from "./chromosome/BinaryChromosome"
import Chromosome from "./chromosome/Chromosome"
import BestScoreSelection from "./selection/BestScoreSelection"

export default class GeneticAlgorithm {
    
    private interval: Interval
    private population: Population
    private selection: Selection
    private eliteStrategySelection: Selection
    private mutation: Mutation
    private crossover: Function

    private function: Function
    private epochCount: number
    private eliteStrategyCount: number
    private crossoverProbability: number
    private mutationProbability: number
    private variableCount: number

    constructor(
        settings: Object
    ) {
        this.interval = new Interval(settings['a'], settings['b'], settings['dx'])
        this.population = new Population(
            settings['populationSize'],
            settings['variableCount'], 
            this.interval, 
            settings['minimize'])

        this.selection = new settings['selectionMethod'](settings['minimize'], settings['selectionMethodArg'])
        this.mutation = new settings['mutationMethod'](settings['inversionProbability'])
        this.crossover = settings['crossoverMethod']
        
        this.variableCount = settings['variableCount']
        this.function = settings['function']
        this.epochCount = settings['epochCount']
        this.eliteStrategyCount = settings['eliteStrategyCount']
        this.crossoverProbability = settings['crossoverProbability']
        this.mutationProbability = settings['mutationProbability']

        let fraction =  settings['eliteStrategyCount'] / settings['populationSize']
        console.assert(fraction >= 0 && fraction <= 1)
        this.eliteStrategySelection = new BestScoreSelection(settings['minimize'], fraction)
    }

    solve(): Chromosome {
        for(let epoch = 0; epoch < this.epochCount; epoch++) {
            this.population.decodePopulation()
            this.population.evaluateAndSetBest(this.function)

            // make copies
            let currentEval = this.population.evaluatedIndividuals.slice()
            let currentIdiv = this.population.individuals.slice()

            // select the elites, they straight up get copied to new generation
            let elite = this.eliteStrategySelection.selectBest(currentEval)
            let eliteIndiv = gatherValues(elite[1], currentIdiv)

            // get rid of elites from the pool
            removeValues(elite[1], currentIdiv)
            removeValues(elite[1], currentEval)

            // Do selection
            let selected = this.selection.selectBest(currentEval)
            selected = gatherValues(selected[1], currentIdiv)
            
            // Crossover
            let offspring = []
            let pairs = Math.floor(selected.length / 2)
            for(let i = 0; i < pairs; i++) {
                let pair = i * 2
                let guy = selected[pair].getAllels()
                let girl = selected[pair+1].getAllels()
                
                // Sometimes copy the individuals fully from parents
                // Mostly crossover the parents to create modified children
                let children
                if(this.crossoverProbability > Math.random()) {
                    children = this.crossover(guy, girl)
                } else {
                    children = [guy.slice(), girl.slice()]
                }

                offspring.push(new BinaryChromosome(this.variableCount, children[0]))
                offspring.push(new BinaryChromosome(this.variableCount, children[1]))
            }

            // Mutation
            for(let i = 0;i < offspring.length; i++) {
                if(this.mutationProbability > Math.random()) {
                    this.mutation.mutate(offspring[i])
                }
            }

            // New population 
            let newPopulation = offspring.concat(selected, eliteIndiv)
            this.population.individuals = newPopulation 
            this.population.decodedIndividuals = []
            this.population.evaluatedIndividuals = []
            this.population.bestIndividual = undefined
        }

        this.population.decodePopulation()
        this.population.evaluateAndSetBest(this.function)
        return this.population.bestIndividual
    }
}

function gatherValues(indicesSublist: number[], list) {
    let result = []
    for(let i = 0; i < indicesSublist.length; i++) {
        let index = indicesSublist[i]
        let val = list[index]
        result.push(val)
    }

    return result
}

function removeValues(indicesSublist, list) {
    let result = []
    for(let i = 0; i < indicesSublist.length; i++) {
        let index = indicesSublist[i]
        list.splice(index, 1)
    }

    return result
}