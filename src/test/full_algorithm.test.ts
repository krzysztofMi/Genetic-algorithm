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
import BitFlipMutation from "../genetic/mutation/BitFilpMutation"

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
    let settings = {
        "rangeBegin": 1,
        "rangeEnd": 5,
        "rangeStep": 1,
        "populationCount": 10,
        "geneCount": 2,
        "epochCount": 10,
        "function": (it)=>it[0]*it[1],
        "selectionMethod": BestScoreSelection,
        "selectionMethodArg": 40, // BestScorePercentage, Tournament thing
        "crossoverMethod": c.crossover1,
        "mutationMethod": TwoPointFlip,
        "eliteStrategyCount": 2,
        "crossoverProbability": 0.9,
        "mutationProbability": 0.4,
        "inversionProbability": 0.5,
        "minimize": ExtremeType.MIN,
    }

    let selection = new settings['selectionMethod'](settings['selectionMethodArgs'], settings['minimize']) 
    let interval = new Interval(settings['rangeBegin'], settings['rangeEnd'], settings['rangeStep'])
    let population = new Population(settings['populationCount'], settings['geneCount'], interval, settings['minimize'])
    let mutation = new TwoPointFlip(settings['inversionProbability'])
    for(let epoch = 0; epoch < settings['epochCount']; epoch++) {
        population.decodePopulation()
        population.evaluateAndSetBest(settings['function'])

        // TODO: Tournament selection - zeby dzialalo parzyste albo nie parzyste i powiedziec krzysiowi
        
        let bests = selection.selectBest(population.evaluatedIndividuals)
        
        let indicesOfBest = findIndicesOf(bests, population.evaluatedIndividuals)
        let bestBinaryChromosomes: BinaryChromosome[] = gatherValuesFrom(indicesOfBest, population.individuals)

        console.log("Best evaluations: ", bests)
        console.log("All evaluated individuals: ", population.evaluatedIndividuals)
        console.log("Indices of best individuals: ", indicesOfBest)
        console.log("Binary of best:", bestBinaryChromosomes)

        let offspring = []
        let pairs = Math.floor(bestBinaryChromosomes.length / 2)
        for(let i = 0; i < pairs; i++) {
            let luck = Math.random()
            expect(luck <= 1.0 && luck >= 0).toBeTruthy()

            let pair = i * 2
            let guy = bestBinaryChromosomes[pair].getAllels()
            let girl = bestBinaryChromosomes[pair+1].getAllels()
            
            // Sometimes copy the individuals fully from parents
            // Mostly crossover the parents to create modified children
            let children
            if(luck > settings['crossoverProbability']) {
                children = [guy.slice(), girl.slice()]
            } else {
                children = settings['crossoverMethod'](guy, girl)
            }

            offspring.push(new BinaryChromosome(settings['geneCount'], children[0]))
            offspring.push(new BinaryChromosome(settings['geneCount'], children[1]))
        }

        console.log("Offspring: ", offspring)
        
        
        // Two point flip sometimes (25% of the time in this case) inverts two bits in a binary sequence
        for(let i = 0;i < offspring.length; i++) {
            let luckFactor = Math.random()
            if(settings['mutationProbability'] > luckFactor) {
                mutation.mutate(offspring[i])
            }
        }

        console.log("Offspring after mutation: ", offspring)
        let newPopulation = offspring.concat(bestBinaryChromosomes)
        console.log("New population: ", newPopulation)

        population.individuals = newPopulation 
        population.decodedIndividuals = []
        population.evaluatedIndividuals = []
        population.bestIndividual = undefined
    }

    
    population.decodePopulation()
    population.evaluateAndSetBest(settings['function'])
    console.log(population)


    // population.
    
    // console.log(bests)
    // console.log(population.evaluatedIndividuals)
    // console.log()
    // console.log(population.individuals)
})