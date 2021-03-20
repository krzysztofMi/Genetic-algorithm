import Chromosome from "../chromosome/Chromosome";
import Mutation from "./Mutation";
import ProbabilityError from "../../error/ProbabilityError"

export default abstract class BitFlipMutation implements Mutation {
    
    private probability: number

    constructor(probability: number) {
        this.checkProbability(probability)
        this.probability = probability
    }

    //Not thread safe implementation in child classes
    abstract mutate(chromosome: Chromosome)

    public setProbability(probability: number) {
        this.checkProbability(probability)
        this.probability = probability
    }
    public getProbability(): number {return this.probability}

    protected isMutate(): boolean {
        let p = Math.random()
        return this.probability > p
    }

    protected flipBit(bit: number): number {
        return bit == 0 ? 1 : 0;
    }

    private checkProbability(probability: number) {
        if(probability < 0 || probability > 1) {
            throw new ProbabilityError(ProbabilityError.BAD_VALUE)
        }
    }
}
