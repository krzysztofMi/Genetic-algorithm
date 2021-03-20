import { getRandomInt } from "../../utils/random";
import Chromosome from "../chromosome/Chromosome";
import BitFlipMutation from "./BitFilpMutation";

export default class UniformFlip extends BitFlipMutation {
    
    mutate(chromosome: Chromosome) {
        if(!this.isMutate()) {
            return
        }
        let allels: number[] = chromosome.getAllels()
        let mutateIndex = getRandomInt(0, allels.length-1)
        allels[mutateIndex] = this.flipBit(allels[mutateIndex])
        chromosome.setAllels(allels)
    }
}
