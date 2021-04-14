import ExtremeType from "../enum/ExtremeType";
import { getRandom, getRandomInt } from "../utils/random";
import RealChromosome from "./chromosome/RealChromosome";
import Interval from "./Interval";
import Population from "./Population";

export default class RealPopulation extends Population {
    
    constructor(
        individualNumber: number,
        geneNumber: number, 
        interval: Interval,
        extremeType: ExtremeType
        ) {
            super(interval, extremeType)
            this.generatePopulation(individualNumber, geneNumber)
    }
    
    generatePopulation(individualNumber: number, geneNumber: number) {
        for(let i = 0; i<individualNumber; i++) {
            let x = getRandom(this.interval.getA(), this.interval.getB())
            let y = getRandom(this.interval.getA(), this.interval.getB())
            this.individuals.push(new RealChromosome(geneNumber, [x,y]))      
        }
    }
}