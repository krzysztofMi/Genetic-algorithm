import Interval from "../genetic/Interval"
import Population from "../genetic/Population"
import ExtremeType from "../enum/ExtremeType"
import TournamentSelection from "../genetic/selection/TournamentSelection"
import Selection from "../genetic/selection/Selection"
import RouletteWheel from "../genetic/selection/RouletteWheel"
import BestScoreSelection from "../genetic/selection/BestScoreSelection"
import BinaryChromosome from "../genetic/chromosome/BinaryChromosome"
import RealChromosome from "../genetic/chromosome/RealChromosome"
import * as c from "../genetic/Crossover"
import TwoPointFlip from "../genetic/mutation/TwoPointFlip"

// function seek_min(idx: number[], numbers: number[]) {
//     let min = {"val": numbers[idx[0]], "idx": 0}
//     for(let i = 0; i < idx.length; i++) {
//         let val = numbers[idx[i]]
//         if(min['val'] > val) {
//             min['val'] = val
//             min['idx'] = i
//         }
//     }
//     return min
// }

// test("Sort", () => {
//     let list = [5,2,9,1,5,9,4,5,2]
//     let result = [0,1,2,3]
//     let min = seek_min(result, list)
//     expect(min).toEqual({"val": 1, "idx": 3})

//     result = []
//     for(let i = 0; i < list.length; i++) {
//         result.push(i)
//         if(result.length > 4) {
//             min = seek_min(result, list)

//             let temp = result[min['idx']]
//             result[min['idx']] = result[result.length - 1]
//             result[result.length - 1] = temp
//             result.pop()
//         }
//     }

//     console.log(result)
// })

function findIndicesOf(sublist: number[], list: number[]): number[] {
    let result = []
    for(let i = 0; i < sublist.length; i++) {
        let fromIndex = 0
        for(;;) {
            let val = list.indexOf(sublist[i], fromIndex)
            if(val != -1) {
                let indexOf = result.indexOf(val)
                if(indexOf == -1) {
                    result.push(val)
                    break
                } else {
                    fromIndex = val + 1
                }
            } else {
                result.push("not found")
                break
            }
        }
    }

    return result
}

function gatherValuesFrom(indicesSublist: number[], list) {
    let result = []
    for(let i = 0; i < indicesSublist.length; i++) {
        let index = indicesSublist[i]
        let val = list[index]
        result.push(val)
    }

    return result
}



test("Full algorithm", () => {
    let interval = new Interval(1, 5, 1)
// 
//  
/*
Initialize population()
Loop{
    Evaluation()
    if(Evaluation() == done) break;
    Selection()
    Crossover()
    Mutation()
}*/

    // population of size 10
    // 2 genes per chromosome
    // interval encodes the range of possible values and the step from one value to next
    // ExtremeType communicates whether... well I'm not sure
    let population = new Population(10, 2, interval, ExtremeType.MIN)


    population.decodePopulation()
    population.evaluateAndSetBest((it)=>it[0]*it[1])
    // console.log(population.evaluatedIndividuals)
    // console.log(population.individuals)
    // console.log(population.decodedIndividuals)
    // return new RealChromosome(
    //                it.getGeneNumbers(),
    //             it.decode(this.interval))
    // console.log(population.individuals[2])
    // console.log(population.individuals[2].decode(interval))

    // TODO: Tournament selection - zeby dzialalo parzyste albo nie parzyste i powiedziec krzysiowi
    let selection: BestScoreSelection = new BestScoreSelection(40, ExtremeType.MIN) 
    let bests = selection.selectBest(population.evaluatedIndividuals)
    
    let indicesOfBest = findIndicesOf(bests, population.evaluatedIndividuals)
    let bestBinaryChromosomes: BinaryChromosome[] = gatherValuesFrom(indicesOfBest, population.individuals)
    let bestRealChromosomes: RealChromosome[] = gatherValuesFrom(indicesOfBest, population.decodedIndividuals)

    console.log("Best evaluations: ", bests)
    console.log("All evaluated individuals: ", population.evaluatedIndividuals)
    console.log("Indices of best individuals: ", indicesOfBest)
    console.log("Binary of best:", bestBinaryChromosomes)
    // console.log(bestRealChromosomes)

    // TODO:  2 Chromosomy krzyżujemy !!!! nie geny xD
    // let chromosomes = []
    // for(let i = 0; i < bestBinaryChromosomes.length; i++) {
    //     let allels = bestBinaryChromosomes[i].getAllels()
    //     let binaryA = [allels[0], allels[1], allels[2]]
    //     let binaryB = [allels[3], allels[4], allels[5]]
    //     c.crossover2(binaryA, binaryB)
    //     chromosomes.push([binaryA, binaryB])
    // }
    // console.log("Binary after crossover:", chromosomes)
    
    
    // let newChromosomes = []
    
    // for(let i = 0; i < chromosomes.length; i++) {
    //     let currentChromosome = chromosomes[i]
    //     let combine = []
    //     for(let j = 0; j < currentChromosome.length; j++) {
    //         combine = combine.concat(currentChromosome[j])
    //     }

    //     let instance = new BinaryChromosome(currentChromosome.length, combine)
    //     newChromosomes.push(instance)
    // }

    // Two point flip sometimes (25% of the time in this case) inverts two bits in a binary sequence
    // console.log("Crossover chromosomes: ", newChromosomes)
    // let mutation = new TwoPointFlip(0.25)
    // for(let i = 0;i < newChromosomes.length; i++) {
    //     mutation.mutate(newChromosomes[i])
    // }

    // console.log("Chromosomes after mutation: ", newChromosomes)
    


    // population.
    
    // console.log(bests)
    // console.log(population.evaluatedIndividuals)
    // console.log()
    // console.log(population.individuals)
})