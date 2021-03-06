import Population from "./Population"
import RealPopulation from "./RealPopulation"
import Interval from "./Interval"
import ExtremeType from "../enum/ExtremeType"
import Mutation from "./mutation/Mutation"
import Selection from "./selection/Selection"
import BinaryChromosome from "./chromosome/BinaryChromosome"
import Chromosome from "./chromosome/Chromosome"
import BestScoreSelection from "./selection/BestScoreSelection"
import RealChromosome from "./chromosome/RealChromosome"
import RouletteWheel from "./selection/RouletteWheel"
import ChromosomeType from "../enum/ChromosomeType"
import BinaryPopulation from "./BinaryPopulation"
import { getRandomInt } from "../utils/random"

// I changed name bacause when a genetic algorithm works on real population, not binary then 
// it is an evoulutionary algorithm. A genetic algorithm works on binary population.
// The algorithm works on binary and real population, It depends on settings.
export default class EvolutionaryAlgorithm {

    private chromosomeType: ChromosomeType
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

    //Chart variables
    private bests: number[] = []
    private means: number[] = []
    private stds: number[] = []

    //Timer
    private elapsedTime: number = 0

    //For save to file
    private bestChromosomes: Chromosome[] = []

    constructor(
        settings: Object
    ) {
        this.interval = new Interval(settings['a'], settings['b'], settings['dx'])
        this.chromosomeType = settings['chromosomeEncoding']
        if (this.chromosomeType == ChromosomeType.Binary) {
            this.population = new BinaryPopulation(
                settings['populationSize'],
                settings['variableCount'],
                this.interval,
                settings['minimize'])
        } else {
            this.population = new RealPopulation(
                settings['populationSize'],
                settings['variableCount'],
                this.interval,
                settings['minimize'])

        }

        this.selection = new settings['selectionMethod'](settings['minimize'], settings['selectionMethodArg'])
        this.mutation = new settings['mutationMethod'](settings['inversionProbability'], this.population.interval)
        this.crossover = settings['crossoverMethod']

        this.variableCount = settings['variableCount']
        this.function = settings['function']
        this.epochCount = settings['epochCount']
        this.eliteStrategyCount = settings['eliteStrategyCount']
        this.crossoverProbability = settings['crossoverProbability']
        this.mutation.setProbability(settings['mutationProbability'])

        let fraction = settings['eliteStrategyCount'] / settings['populationSize']
        console.assert(fraction >= 0 && fraction <= 1)
        this.eliteStrategySelection = new BestScoreSelection(settings['minimize'], fraction)
    }

    solve(): Chromosome {
        this.bests = []
        this.means = []
        this.stds = []
        this.bestChromosomes = []
        const start = new Date().getTime();
        for (let epoch = 0; epoch < this.epochCount; epoch++) {
            this.population.evaluateAndSetBest(this.function)
            // set chart variables
            this.bests.push(this.population.getBestValue())
            let sum = this.population.getEvaluatedIndividuals().reduce((a, b) => a + b, 0)
            let len = this.population.getLenght()
            let mean = sum / len
            this.means.push(mean)
            this.bestChromosomes.push(this.population.getBestIndividual())
            sum = 0
            for (let i of this.population.getEvaluatedIndividuals()) {
                sum += Math.pow(i - mean, 2);
            }
            let std = Math.sqrt(sum / len)
            this.stds.push(std)

            // make copies
            let currentEval = this.population.evaluatedIndividuals.slice()
            let currentIdiv = this.population.getIndividuals().slice()

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
            while(offspring.length < this.population.getLenght() - eliteIndiv.length){
                let pair1 = getRandomInt(0, selected.length-1)
                let pair2 = getRandomInt(0, selected.length-1)
                let guy = selected[pair1].getAllels()
                let girl = selected[pair2].getAllels()

                // Sometimes copy the individuals fully from parents
                // Mostly crossover the parents to create modified children
                let children
                let isMutate = false
                if (this.crossoverProbability > Math.random()) {
                    isMutate = true
                    children = this.crossover(guy, girl)
                } else {
                    children = [guy.slice(), girl.slice()]
                }
                if (this.chromosomeType == ChromosomeType.Binary) {
                    offspring.push(new BinaryChromosome(this.variableCount, children[0]))
                    offspring.push(new BinaryChromosome(this.variableCount, children[1]))
                } else {
                    if(this.crossover.name == 'heuristic' && isMutate){
                        offspring.push(new RealChromosome(this.variableCount, children))
                    }else {
                        offspring.push(new RealChromosome(this.variableCount, children[0]))
                        offspring.push(new RealChromosome(this.variableCount, children[1]))
                    }
                }
            }
            
            // Mutation
            for (let i = 0; i < offspring.length; i++) {
                this.mutation.mutate(offspring[i])
            }
            // New population 
            let newPopulation = []
            newPopulation = offspring.concat(eliteIndiv)
            this.population.setIndividuals(newPopulation)
            this.population.evaluatedIndividuals = []
            this.population.bestIndividual = undefined
        }
        this.elapsedTime = new Date().getTime() - start;
        this.population.evaluateAndSetBest(this.function)
        return this.population.bestIndividual
    }

    getBests(): number[] { return this.bests }
    getMeans(): number[] { return this.means }
    getStds(): number[] { return this.stds }
    getElapsedTime(): number { return this.elapsedTime }
    getBestsChromosome(): Chromosome[] { return this.bestChromosomes }
}

function gatherValues(indicesSublist: number[], list) {
    let result = []
    for (let i = 0; i < indicesSublist.length; i++) {
        let index = indicesSublist[i]
        let val = list[index]
        result.push(val)
    }

    return result
}

function removeValues(indicesSublist, list) {
    let result = []
    for (let i = 0; i < indicesSublist.length; i++) {
        let index = indicesSublist[i]
        list.splice(index, 1)
    }

    return result
}
