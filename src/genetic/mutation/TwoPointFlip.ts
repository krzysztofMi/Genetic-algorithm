import { getRandomInt } from "../../utils/random";
import Chromosome from "../chromosome/Chromosome";
import BitFlipMutation from "./BitFilpMutation";

export default class TwoPointFlip extends BitFlipMutation {
    
    mutate(chromosome: Chromosome) {
        if(!this.isMutate()) {
            return
        }
        let allels: number[] = chromosome.getAllels()
        let firstIndex = getRandomInt(0, allels.length-1)
        if(allels.length < 2) {
            allels[firstIndex] = this.flipBit(allels[firstIndex])
            return
        }
        let secondIndex: number
        do{
            secondIndex = getRandomInt(0, allels.length-1)
        }while(secondIndex == firstIndex)   
        allels[firstIndex] = this.flipBit(allels[firstIndex])
        allels[secondIndex] = this.flipBit(allels[secondIndex])  
        chromosome.setAllels(allels)
    }
}
