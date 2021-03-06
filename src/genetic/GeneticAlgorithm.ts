import Population from "./Population"
import Interval from "./Interval"


export default class GeneticAlgorithm {
    
    private interval: Interval
    private population: Population

    constructor(
        a: number,
        b: number,
        dx: number,
        populationSize: number,
        variableNumber: number,
    ) {
        this.interval = new Interval(a, b, dx)
        this.population = new Population(populationSize, variableNumber, this.interval)
    }
}
