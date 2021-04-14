import Chromosome from "./chromosome/Chromosome"
import { getRandomBitVector } from "../utils/bits"
import Interval from "./Interval"
import ExtremeType from "../enum/ExtremeType"
import BinaryChromosome from "./chromosome/BinaryChromosome"
import RealChromosome from "./chromosome/RealChromosome"
import Population from "./Population"


export default class BianaryPopulation extends Population {

    encodedIndividuals:  BinaryChromosome[] = []
    
    constructor(
        individualNumber: number,
        geneNumber: number, 
        interval: Interval,
        extremeType: ExtremeType
        ) {
            super(interval, extremeType)
            this.generatePopulation(individualNumber, geneNumber)
    }

    public setIndividuals(individuals: Chromosome[]) {
        this.encodedIndividuals = individuals as BinaryChromosome[]
        this.individuals = []
    }

    public getIndividuals(): Chromosome[] { return this.encodedIndividuals; }
    public getDecodedIndividuals(): Chromosome[] { return this.individuals; }

    public getLenght(): number { return this.encodedIndividuals.length }

    public evaluateAndSetBest(fun: Function) {
        this.decodePopulation()
        this.evaluatePopulation(fun)
        this.setBestIndividual()
    }

    public generatePopulation(individualNumber: number, geneNumber: number) {
        for(let i = 0; i<individualNumber; i++) {
            let bits: number[] = getRandomBitVector(geneNumber, this.interval.getBits());
            this.encodedIndividuals.push(new BinaryChromosome(geneNumber, bits))
        }
    }

    private decodePopulation() {
        this.individuals = this.encodedIndividuals.map((it)=>{
           return new RealChromosome(
               it.getGeneNumbers(),
            it.decode(this.interval))
        })
    }
}
