import Chromosome from "./Chromosome"
import { getRandomBitVector } from "../utils/bits"
import Interval from "./Interval"

export default class Population {

    individuals: Chromosome[] = []
    decodedIndividuals: Chromosome[] = []
    //It's not chromosome because it's only has one value
    evaluatedIndividuals: number[] = []
    bestIndividual: Chromosome
    interval: Interval

    constructor(
        individualNumber: number,
        geneNumber: number, 
        interval: Interval
        ) {
            this.interval = interval
            this.genearetePopulation(individualNumber, geneNumber, interval.getBits())
            this.decodePopulation()
            //Pass function as constr argument and make it field
            this.evaluatePopulation((it)=>{return it[0]*it[1]})
            this.setBestIndividual()
    }

    private genearetePopulation(individualNumber: number, geneNumber: number, bitsNumber: number) {
        for(let i = 0; i<individualNumber; i++) {
            let bits: number[] = getRandomBitVector(geneNumber, bitsNumber);
            this.individuals.push(new Chromosome(geneNumber, bits))
        }
    }

    public getPopulationSize() {return this.individuals.length }
    public getIndividuals() { return this.individuals }
    public getDecodedIndividuals() { return this.decodedIndividuals }
    public getEvaluatedIndividuals() { return this.evaluatedIndividuals }

    public decodePopulation() {
        this.decodedIndividuals = this.individuals.map((it)=>{
           return new Chromosome(
               it.getGeneNumbers(),
            it.decode(this.interval.getA(), this.interval.getStep()))
        })
    }

    //not tested
    public evaluatePopulation(fun: Function) {
        this.evaluatedIndividuals = this.decodedIndividuals
            .map(it=>
                fun(it.getAllels()
                    .map(val=>val))
        )
    }

    //not tested not implemented
    private setBestIndividual() {
       
    }
}
