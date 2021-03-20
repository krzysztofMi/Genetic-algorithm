import Chromosome from "../chromosome/Chromosome";

export default interface Mutation{
    mutate(chromosome: Chromosome);
}
