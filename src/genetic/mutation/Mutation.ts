import ProbabilityError from "../../error/ProbabilityError";
import Chromosome from "../chromosome/Chromosome";

export default abstract class Mutation{

    private probability: number

    constructor(probability: number) {
        this.checkProbability(probability)
        this.probability = probability
    }

    public setProbability(probability: number) {
        this.checkProbability(probability)
        this.probability = probability
    }
    public getProbability(): number {return this.probability}

    protected isMutate(): boolean {
        let p = Math.random()
        return this.probability > p
    }

    abstract mutate(chromosome: Chromosome);

    private checkProbability(probability: number) {
        if(probability < 0 || probability > 1) {
            throw new ProbabilityError(ProbabilityError.BAD_VALUE)
        }
    }
}
