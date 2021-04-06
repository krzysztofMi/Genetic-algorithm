import Population from "./Population"
import Interval from "./Interval"
import ExtremeType from "../enum/ExtremeType"
import Mutation from "./mutation/Mutation"
import Selection from "./selection/Selection"
import BinaryChromosome from "./chromosome/BinaryChromosome"
import Chromosome from "./chromosome/Chromosome"
import BestScoreSelection from "./selection/BestScoreSelection"

// 1 
// geneticAlgorithm = new GeneticAlgorithm(...)
// geneticAlgorithm.solve()
// 2
// Genetic.solveFunction({...})
// 3
// settings = new Genetic.settings(...)
// Genetic.solve(settings)
//

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
        a: number,
        b: number,
        dx: number,
        populationSize: number,
        variableCount: number,
        epochCount: number,
        functionToSolve: Function,
        selectionMethod,
        selectionMethodArg: number,
        crossoverMethod: Function,
        mutationMethod,
        eliteStrategyCount: number,
        crossoverProbability: number,
        mutationProbability: number,
        inversionProbability: number,
        minimize: ExtremeType,
    ) {
        this.interval = new Interval(a, b, dx)
        this.population = new Population(
            populationSize,
            variableCount, 
            this.interval, 
            ExtremeType.MIN)

        this.selection = new selectionMethod(minimize, selectionMethodArg)
        this.mutation = new mutationMethod(inversionProbability)
        this.crossover = crossoverMethod
        
        this.variableCount = variableCount
        this.function = functionToSolve
        this.epochCount = epochCount
        this.eliteStrategyCount = eliteStrategyCount
        this.crossoverProbability = crossoverProbability
        this.mutationProbability = mutationProbability

        let fraction =  eliteStrategyCount / populationSize
        console.assert(fraction >= 0 && fraction <= 1)
        this.eliteStrategySelection = new BestScoreSelection(minimize, fraction)
    }

    solve(): Chromosome {
        for(let epoch = 0; epoch < this.epochCount; epoch++) {
            this.population.decodePopulation()
            this.population.evaluateAndSetBest(this.function)

            let elite = this.eliteStrategySelection.selectBest(this.population.evaluatedIndividuals)
            elite = elite[0]
            elite = getIndividuals(this.population, elite)            
            
            // TODO: Tournament selection - zeby dzialalo parzyste albo nie parzyste i powiedziec krzysiowi
            let selected = this.selection.selectBest(this.population.evaluatedIndividuals)
            selected = selected[0]
            selected = getIndividuals(this.population, selected)

            let offspring = []
            let pairs = Math.floor(selected.length / 2)
            for(let i = 0; i < pairs; i++) {
                let luck = Math.random()
                expect(luck <= 1.0 && luck >= 0).toBeTruthy()

                let pair = i * 2
                let guy = selected[pair].getAllels()
                let girl = selected[pair+1].getAllels()
                
                // Sometimes copy the individuals fully from parents
                // Mostly crossover the parents to create modified children
                let children
                if(luck > this.crossoverProbability) {
                    children = [guy.slice(), girl.slice()]
                } else {
                    children = this.crossover(guy, girl)
                }

                offspring.push(new BinaryChromosome(this.variableCount, children[0]))
                offspring.push(new BinaryChromosome(this.variableCount, children[1]))
            }

            for(let i = 0;i < offspring.length; i++) {
                if(this.mutationProbability < Math.random()) {
                    this.mutation.mutate(offspring[i])
                }
            }

            let newPopulation = offspring.concat(selected, elite)
            // console.log("New population: ", newPopulation)

            this.population.individuals = newPopulation 
            this.population.decodedIndividuals = []
            this.population.evaluatedIndividuals = []
            this.population.bestIndividual = undefined
        }

        
        this.population.decodePopulation()
        this.population.evaluateAndSetBest(this.function)
        console.log(this.population.bestIndividual)
        return this.population.bestIndividual
    }
}

function findIndicesOf(sublist: number[], list: number[]): number[] {
    let result = []
    for(let i = 0; i < sublist.length; i++) {
        let fromIndex = 0
        for(;;) {
            let val = list.indexOf(sublist[i], fromIndex)
            if(val != -1) {
                let indexOf = result.indexOf(val)
                if(indexOf == -1) {
                    result.push(val)
                    break
                } else {
                    fromIndex = val + 1
                }
            } else {
                result.push("not found")
                break
            }
        }
    }

    return result
}

function gatherValuesFrom(indicesSublist: number[], list) {
    let result = []
    for(let i = 0; i < indicesSublist.length; i++) {
        let index = indicesSublist[i]
        let val = list[index]
        result.push(val)
    }

    return result
}

function getIndividuals(population, scores): BinaryChromosome[] {
    let indices = findIndicesOf(scores, population.evaluatedIndividuals)
    let result = gatherValuesFrom(indices, population.individuals)
    return result
}