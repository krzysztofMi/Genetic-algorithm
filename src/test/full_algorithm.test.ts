import Interval from "../genetic/Interval"
import Population from "../genetic/Population"
import PopulationType from "../genetic/Population"
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
import EvolutionaryAlgorithm from "../genetic/EvolutionaryAlgorithm"
import ChromosomeType from "../enum/ChromosomeType"
import UnifromMutation from "../genetic/mutation/UniformMutation"


// test("Full algorithm, binary population", () => {
//     let settings = {}
//     settings['a'] = 1
//     settings['b'] = 5
//     settings['dx'] = 1
//     settings['populationSize'] = 100
//     settings['variableCount'] = 2
//     settings['epochCount'] = 10
//     settings['function'] = (it) => it[0] * it[1]
//     settings['selectionMethod'] = BestScoreSelection
//     settings['selectionMethodArg'] = 0.4
//     settings['crossoverMethod'] = c.crossover1
//     settings['mutationMethod'] = TwoPointFlip
//     settings['eliteStrategyCount'] = 2
//     settings['crossoverProbability'] = 0.9
//     settings['mutationProbability'] = 0.4
//     settings['inversionProbability'] = 0.5
//     settings['minimize'] = ExtremeType.MIN
//     let genetic = new EvolutionaryAlgorithm(settings)
//     let result = genetic.solve()
//     expect(result.getAllels()).toEqual([1, 1])


//     settings['minimize'] = ExtremeType.MAX
//     genetic = new EvolutionaryAlgorithm(settings)
//     result = genetic.solve()
//     console.log(result)
// })

test("Full algorithm, real population", () => {
    let settings = {}
    settings['a'] = 1
    settings['b'] = 5
    settings['dx'] = 1
    settings['populationSize'] = 100
    settings['variableCount'] = 2
    settings['epochCount'] = 10
    settings['function'] = (it) => it[0] * it[1]
    settings['selectionMethod'] = BestScoreSelection
    settings['selectionMethodArg'] = 0.4
    settings['crossoverMethod'] = c.Crossover.real.arithmetic
    settings['mutationMethod'] = UnifromMutation
    settings['eliteStrategyCount'] = 2
    settings['crossoverProbability'] = 0.9
    settings['mutationProbability'] = 0.4
    settings['inversionProbability'] = 0.5
    settings['minimize'] = ExtremeType.MIN
    settings['chromosomeEncoding'] = ChromosomeType.Real
    let genetic = new EvolutionaryAlgorithm(settings)
    let result = genetic.solve()
    console.log(result)
    // expect(result.getAllels()).toEqual([1, 1])


    settings['minimize'] = ExtremeType.MAX
    genetic = new EvolutionaryAlgorithm(settings)
    result = genetic.solve()
    console.log(result)
})
