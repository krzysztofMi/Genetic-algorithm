import ProbabilityError from "../error/ProbabilityError"
import BinaryChromosome from "../genetic/chromosome/BinaryChromosome"
import Chromosome from "../genetic/chromosome/Chromosome"
import BitFlipMutation from "../genetic/mutation/BitFilpMutation"
import BoundaryFlip from "../genetic/mutation/BoundaryFlipBit"
import Mutation from "../genetic/mutation/Mutation"
import TwoPointFlip from "../genetic/mutation/TwoPointFlip"
import OnePointFlip from "../genetic/mutation/OnePointFlip"
import Inversion from "../genetic/mutation/Inversion"
import RealChromosome from "../genetic/chromosome/RealChromosome"
import UnifromMutation from "../genetic/mutation/UniformMutation"
import Interval from "../genetic/Interval"

test("Check if probability value is checked", ()=> {
    let fcn = function(){new BoundaryFlip(10)};
    expect(fcn).toThrow(ProbabilityError)
    fcn = function(){new BoundaryFlip(-0.001)};
    expect(fcn).toThrow(ProbabilityError)
    fcn = function(){new BoundaryFlip(1.001)};
    expect(fcn).toThrow(ProbabilityError)
    let mutation: BitFlipMutation = new BoundaryFlip(0)
    expect(mutation.getProbability()).toEqual(0)
    mutation = new BoundaryFlip(0.25)
    expect(mutation.getProbability()).toEqual(0.25)
    fcn = function(){mutation.setProbability(-10)}
    expect(fcn).toThrow(ProbabilityError)
    mutation.setProbability(0.5)
    expect(mutation.getProbability()).toEqual(0.5)
})

test("Boundary mutation test", () => {
    let mut: Mutation = new BoundaryFlip(1);
    let chromosome: Chromosome = new BinaryChromosome(2, [0, 0, 0, 0, 0, 0])
    testChromosomeAllelsSum(chromosome, 0)

    mut.mutate(chromosome)
    testChromosomeAllelsSum(chromosome, 1)

    let allels = chromosome.getAllels()
    let sum = allels[0] + allels[allels.length-1]
    expect(sum).toEqual(1)

    for(let i = 1; i<allels.length-1; i++) {
        expect(allels[i]).toEqual(0)
    }

    chromosome = new BinaryChromosome(2, [1, 1, 1, 1, 1, 1])
    testChromosomeAllelsSum(chromosome, 6)

    mut.mutate(chromosome)
    testChromosomeAllelsSum(chromosome, 5)

    allels = chromosome.getAllels()
    sum = allels[0] + allels[allels.length-1]
    expect(sum).toEqual(1)

    for(let i = 1; i<allels.length-1; i++) {
        expect(allels[i]).toEqual(1)
    }
})

test("One point mutation test", () => {
    let mut: Mutation = new OnePointFlip(1);
    let chromosome: Chromosome = new BinaryChromosome(2, [0, 0, 0, 0, 0, 0])
    testChromosomeAllelsSum(chromosome, 0)
    mut.mutate(chromosome)
    testChromosomeAllelsSum(chromosome, 1)

    chromosome = new BinaryChromosome(2, [1, 1, 1, 1, 1, 1])
    testChromosomeAllelsSum(chromosome, 6)

    mut.mutate(chromosome)
    testChromosomeAllelsSum(chromosome, 5)
})

test("Two point mutation test", () => {
    let mut: Mutation = new TwoPointFlip(1);
    let chromosome: Chromosome = new BinaryChromosome(2, [0, 0, 0, 0, 0, 0])
    testChromosomeAllelsSum(chromosome, 0)
    mut.mutate(chromosome)
    testChromosomeAllelsSum(chromosome, 2)

    chromosome = new BinaryChromosome(2, [1, 1, 1, 1, 1, 1])
    testChromosomeAllelsSum(chromosome, 6)

    mut.mutate(chromosome)
    testChromosomeAllelsSum(chromosome, 4)
})

test("Low probability test", ()=> {
    let mut: Mutation = new TwoPointFlip(0);
    let chromosome: Chromosome = new BinaryChromosome(2, [0, 0, 0, 0, 0, 0])
    testChromosomeAllelsSum(chromosome, 0)
    mut.mutate(chromosome)
    testChromosomeAllelsSum(chromosome, 0)

    mut = new OnePointFlip(0);
    chromosome = new BinaryChromosome(2, [1, 0, 0, 1, 0, 1])
    testChromosomeAllelsSum(chromosome, 3)
    mut.mutate(chromosome)
    testChromosomeAllelsSum(chromosome, 3)

    mut = new BoundaryFlip(0);
    chromosome = new BinaryChromosome(2, [1, 0, 0, 0, 0, 1])
    testChromosomeAllelsSum(chromosome, 2)
    mut.mutate(chromosome)
    testChromosomeAllelsSum(chromosome, 2)
})

test("inversion operator test", () => {
    //Tested manually
    // let mut: Mutation = new Inversion(1);
    // let chromosome = new BinaryChromosome(2, [1, 1, 0, 0, 1, 0, 1, 0, 0, 1])
    // mut.mutate(chromosome)
    // console.log(chromosome.getAllels())
})

test("uniform mutatuion test", () => {
    let interval = new Interval(-15, 15, 0.01)
    let um: Mutation = new UnifromMutation(1, interval)
    let xd: Chromosome = new RealChromosome(2, [10, 12])
    const all1 =  Object.assign([], xd.getAllels())
    um.mutate(xd)
    let all2 = xd.getAllels()
    expect((all1[0] - all2[0]) + (all1[1] - all2[1])).not.toEqual(0)
})

function getArraySum(array: number[]) {
    return array.reduce((sum, number) => sum + number, 0)
}

function testChromosomeAllelsSum(chromosome: Chromosome, expectSum: number) {
    let sum = getArraySum(chromosome.getAllels())
    expect(sum).toEqual(expectSum)
}
