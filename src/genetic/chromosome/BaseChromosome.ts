import Chromosome from "./Chromosome";
import Interval from "../Interval"

export default abstract class BaseChromosome implements Chromosome {

    protected geneNumber: number
    protected allels: number[]

    public constructor(geneNumber: number, allels: number[]) {
        this.geneNumber = geneNumber
        this.allels = allels
    }

    public getAllels() { return this.allels }
    public getGeneNumbers() { return this.geneNumber }

    abstract decode(interval: Interval): number[]
    abstract evaluate(fun: Function, interval?: Interval): number
}