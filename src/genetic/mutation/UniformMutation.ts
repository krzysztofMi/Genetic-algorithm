import { getRandom, getRandomInt, randomIndexes } from "../../utils/random";
import Chromosome from "../chromosome/Chromosome";
import Interval from "../Interval";
import Mutation from "./Mutation";

export default class UnifromMutation extends Mutation{

    private interval: Interval

    constructor(probability: number, boundary: Interval) {
        super(probability)
        this.interval = boundary
    }

    mutate(chromosome: Chromosome) {
        if(!this.isMutate()) {
            return
        }
        let index = getRandomInt(0, 1)
        chromosome.getAllels()[index] = getRandom(this.interval.getA(), this.interval.getB())
    }
    
}
