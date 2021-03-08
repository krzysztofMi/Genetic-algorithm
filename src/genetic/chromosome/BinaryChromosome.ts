import Chromosome from "./Chromosome"
import Interval from "../Interval"
import BaseChromosome from "./BaseChromosome"

export default class BinaryChromosome extends BaseChromosome {

    public decode(interval: Interval): number[] {
        let decoded_allels: number[] = []
        let allelSize = (this.allels.length / this.geneNumber)
        for(let i = 0; i<this.geneNumber; i++) {
            let bits = ""
            for(let j = 0; j<allelSize; j++) {
                bits = bits.concat(this.allels[i*allelSize+j].toString())
            }
            decoded_allels.push(interval.getA() + parseInt(bits, 2) * interval.getStep())
        }
        return decoded_allels
    }
    
    public evaluate(fun: Function, interval?: Interval): number {
            if(interval === null) {
                    ///Throw error
            }
            return fun(this.decode(interval))
    }
}
