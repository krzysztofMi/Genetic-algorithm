// import Interval from "../genetic/Interval"
// import Population from "../genetic/Population"
// import ExtremeType from "../enum/ExtremeType"
// import TournamentSelection from "../genetic/selection/TournamentSelection"
// import Selection from "../genetic/selection/Selection"
// import RouletteWheel from "../genetic/selection/RouletteWheel"
// import BestScoreSelection from "../genetic/selection/BestScoreSelection"
// import BinaryChromosome from "../genetic/chromosome/BinaryChromosome"
// import RealChromosome from "../genetic/chromosome/RealChromosome"
// import * as c from "../genetic/Crossover"

function seek_min(idx: number[], numbers: number[]) {
    let min = {"val": numbers[idx[0]], "idx": 0}
    for(let i = 0; i < idx.length; i++) {
        let val = numbers[idx[i]]
        if(min['val'] > val) {
            min['val'] = val
            min['idx'] = i
        }
    }
    return min
}

test("Sort", () => {
    let list = [5,2,9,1,5,9,4,5,2]
    let result = [0,1,2,3]
    let min = seek_min(result, list)
    expect(min).toEqual({"val": 1, "idx": 3})

    result = []
    for(let i = 0; i < list.length; i++) {
        result.push(i)
        if(result.length > 4) {
            min = seek_min(result, list)

            let temp = result[min['idx']]
            result[min['idx']] = result[result.length - 1]
            result[result.length - 1] = temp
            result.pop()
        }
    }

    console.log(result)
})

// test("Full algorithm", () => {
//     let interval = new Interval(1, 5, 1)
// // Initialize population
// //  
// /*Loop{
//     Evaluation 
//     if(Evaluation == done) break;
//     Selection
//     Crossover
//     Mutation
// }*/

//     // population of size 10
//     // 2 genes per chromosome
//     // interval encodes the range of possible values and the step from one value to next
//     // ExtremeType communicates whether... well I'm not sure
//     let population = new Population(10, 2, interval, ExtremeType.MIN)
//     population.decodePopulation()
//     population.evaluateAndSetBest((it)=>it[0]*it[1])
//     // console.log(population.evaluatedIndividuals)
//     // console.log(population.individuals)
//     // console.log(population.decodedIndividuals)
// // return new RealChromosome(
// //                it.getGeneNumbers(),
// //             it.decode(this.interval))
//     // console.log(population.individuals[2])
//     // console.log(population.individuals[2].decode(interval))
//     let selection: BestScoreSelection = new BestScoreSelection(40, ExtremeType.MIN) 
//     let bests = selection.selectBest(population.evaluatedIndividuals)
//     console.log(bests)


//     // population.
    
//     // console.log(bests)
//     // console.log(population.evaluatedIndividuals)
//     // console.log()
//     // console.log(population.individuals)
// })