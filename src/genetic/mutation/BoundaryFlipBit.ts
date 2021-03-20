import { getRandomInt } from "../../utils/random";
import Chromosome from "../chromosome/Chromosome";
import BitFlipMutation from "./BitFilpMutation";


export default class BoundaryFlip extends BitFlipMutation {
    
    mutate(chromosome: Chromosome) {
        if(!this.isMutate()) {
            return
        }
        let allels: number[] = chromosome.getAllels()
        let position = getRandomInt(0, 1)
        if(position == 0) {
            allels[0] = this.flipBit(allels[0])
        } else {
            allels[allels.length-1] = this.flipBit(allels[allels.length - 1])
        }
        chromosome.setAllels(allels)
    }
}
