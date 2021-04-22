import ChromosomeType from "../enum/ChromosomeType";
import ExtremeType from "../enum/ExtremeType";
import Chromosome from "./chromosome/Chromosome";
import Interval from "./Interval";

export default abstract class Population {

    protected individuals: Chromosome[] = []
    evaluatedIndividuals: number[] = []
    bestIndividual: Chromosome
    bestValue: number
    interval: Interval
    extremeType: ExtremeType

    constructor(interval: Interval,
        extremeType: ExtremeType) {
        this.interval = interval
        this.extremeType = extremeType
    }

    public getEvaluatedIndividuals() { return this.evaluatedIndividuals }
    public getBestIndividual() { return this.bestIndividual }
    public getBestValue() { return this.bestValue }
    public getLenght(): number { return this.individuals.length }

    public setIndividuals(individuals: Chromosome[]) { this.individuals = individuals }
    public getIndividuals(): Chromosome[] { return this.individuals; }

    public evaluateAndSetBest(fun: Function) {
        this.evaluatePopulation(fun)
        this.setBestIndividual()
    }

    protected evaluatePopulation(fun: Function) {
        this.evaluatedIndividuals = this.individuals
            .map(it => it.evaluate(fun))
    }

    protected setBestIndividual() {
        let indexOfBest = this.extremeType === ExtremeType.MAX
            ? this.getMaximumIndex() : this.getMinimumIndex()
        this.bestIndividual = this.individuals[indexOfBest]
        this.bestValue = this.evaluatedIndividuals[indexOfBest]
    }

    protected getMaximumIndex(): number {
        return this.evaluatedIndividuals
            .reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    }

    protected getMinimumIndex() {
        return this.evaluatedIndividuals
            .reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);
    }

    abstract generatePopulation(individualNumber: number, geneNumber: number)
}
