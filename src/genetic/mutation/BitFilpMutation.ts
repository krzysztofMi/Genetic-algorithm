import Chromosome from "../chromosome/Chromosome";
import Mutation from "./Mutation";
import ProbabilityError from "../../error/ProbabilityError"

export default abstract class BitFlipMutation extends Mutation {
    
    //Not thread safe implementation in child classes
    abstract mutate(chromosome: Chromosome)

    protected flipBit(bit: number): number {
        return bit == 0 ? 1 : 0;
    }
}
