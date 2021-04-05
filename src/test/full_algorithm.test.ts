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
import GeneticAlgorithm from "../genetic/GeneticAlgorithm"


test("Full algorithm", () => {
    let genetic = new GeneticAlgorithm(
        /*a*/ 1,
        /*b*/ 5,
        /*dx*/ 1,
        /*populationSize*/ 100,
        /*variableCount*/ 2,
        /*epochCount*/ 10,
        /*function*/ (it)=>it[0]*it[1],
        /*selectionMethod*/ BestScoreSelection,
        /*selectionMethodArg*/ 0.4, // BestScorePercentage, Tournament thing
        /*crossoverMethod*/ c.crossover1,
        /*mutationMethod*/ TwoPointFlip,
        /*eliteStrategyCount*/ 2,
        /*crossoverProbability*/ 0.9,
        /*mutationProbability*/ 0.4,
        /*inversionProbability*/ 0.5,
        /*minimize*/ ExtremeType.MIN,
    )

    let result = genetic.solve()
    expect(result.getAllels()).toEqual([1,1])
})