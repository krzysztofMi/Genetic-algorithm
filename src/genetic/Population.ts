import Chromosome from "./chromosome/Chromosome"
import { getRandomBitVector } from "../utils/bits"
import Interval from "./Interval"
import ExtremeType from "../enum/ExtremeType"
import BinaryChromosome from "./chromosome/BinaryChromosome"
import RealChromosome from "./chromosome/RealChromosome"


export default class Population {

    individuals:  BinaryChromosome[] = []
    decodedIndividuals: RealChromosome[] = []
    //It's not chromosome because it's only has one value
    evaluatedIndividuals: number[] = []
    bestIndividual: Chromosome
    interval: Interval
    extremeType: ExtremeType

    constructor(
        individualNumber: number,
        geneNumber: number, 
        interval: Interval,
        extremeType: ExtremeType
        ) {
            this.interval = interval
            this.extremeType = extremeType
            this.generatePopulation(individualNumber, geneNumber, interval.getBits())
    }

    public generatePopulation(individualNumber: number, geneNumber: number, bitsNumber: number) {
        for(let i = 0; i<individualNumber; i++) {
            let bits: number[] = getRandomBitVector(geneNumber, bitsNumber);
            this.individuals.push(new BinaryChromosome(geneNumber, bits))
        }
    }

    public getPopulationSize() {return this.individuals.length }
    public getIndividuals() { return this.individuals }
    public getDecodedIndividuals() { return this.decodedIndividuals }
    public getEvaluatedIndividuals() { return this.evaluatedIndividuals }
    public getBestIndividual() { return this.bestIndividual }

    public decodePopulation() {
        this.decodedIndividuals = this.individuals.map((it)=>{
           return new RealChromosome(
               it.getGeneNumbers(),
            it.decode(this.interval))
        })
    }

    public evaluateAndSetBest(fun: Function) {
        this.evaluatePopulation(fun)
        this.setBestIndividual()
    }

    public evaluatePopulation(fun: Function) {
        this.evaluatedIndividuals = this.decodedIndividuals
            .map( it=> it.evaluate(fun) )
    }

    private setBestIndividual() {
        let indexOfBest = this.extremeType === ExtremeType.MAX 
                ? this.getMaximumIndex() : this.getMinimumIndex()
        this.bestIndividual = this.decodedIndividuals[indexOfBest] 
    }

    private getMaximumIndex(): number {
        return this.evaluatedIndividuals
                .reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    }

    private getMinimumIndex() {
        return this.evaluatedIndividuals
                .reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);    
    }
}
