import { getRandomInt } from "../../utils/random";
import Chromosome from "../chromosome/Chromosome";
import Mutation from "./Mutation";


export default class Inversion extends Mutation {
    
    mutate(chromosome: Chromosome) {
        if(!this.isMutate()) {
            return
        }
        let allels: number[] = chromosome.getAllels();
        let a: number = getRandomInt(0, allels.length-1)
        let b: number = 0
        do {
            b = getRandomInt(0, allels.length-1)
        } while(b == a)
        if(a < b) {
            chromosome.setAllels(this.inversion(a, b, allels))
        }else {
            chromosome.setAllels(this.inversion(b, a, allels))
        }
    }

    private inversion(a, b, allels): number[] {
        let allels1 = Object.assign([], allels)
        let iter = 0
        for(let i = a; i<=b; i++) {
            allels[i] = allels1[b-iter]
            iter += 1
        }
        return allels
    }
}
