
import ExtremeType from "../enum/ExtremeType"
import BestScoreSelection from "../genetic/selection/BestScoreSelection"
import TournamentSelection from "../genetic/selection/TournamentSelection"
import RouletteWheel from "../genetic/selection/RouletteWheel"
import * as c from "../genetic/Crossover"
import TwoPointFlip from "../genetic/mutation/TwoPointFlip"
import OnePointFlip from "../genetic/mutation/OnePointFlip"
import BoundaryFlipBit from "../genetic/mutation/BoundaryFlipBit"
import { bukinFunction } from "../utils/functions"
import makeChart from "../script/chart";
import Interval from "../genetic/Interval";
import { saveToFile } from "../script/file";
import EvolutionaryAlgorithm from "../genetic/EvolutionaryAlgorithm"
import ChromosomeType from "../enum/ChromosomeType"
import UnifromMutation from "../genetic/mutation/UniformMutation"
const Crossover = c.Crossover

let form = document.getElementById("genetic")
if (form == undefined) {
    console.log("Form is undefined")
} else {
    form.addEventListener("submit", function (event) {
        event.preventDefault()
        const formData = new FormData(document.querySelector('form'))
        let settings = {};
        formData.forEach((val, key) => {
            settings[key] = val
        })

        let dispatchTable = {
            "onePointFlip": OnePointFlip,
            "twoPointFlip": TwoPointFlip,
            "boundaryFlipBit": BoundaryFlipBit,
            "uniformMutation": UnifromMutation,
            "onePointCrossover": c.crossover1,
            "twoPointCrossover": c.crossover2,
            "threePointCrossover": c.crossover3,
            "homogenousCrossover": c.crossoverHomogenous,
            "arithmeticCrossover": Crossover.real.arithmetic,
            "heuristicCrossover": Crossover.real.heuristic,
            "bestScoreSelection": BestScoreSelection,
            "tournamentSelection": TournamentSelection,
            "rouletteSelection": RouletteWheel,
            "minimize": ExtremeType.MIN,
            "maximize": ExtremeType.MAX,
            "fun1": (it) => it[0] * it[1],
            "fun2": (it) => it[0] + 5 * it[1],
            "fun3": (it) => it[0] + 5 * it[1],
            "fun4": (it) => it[0] + 5 * it[1],
            "bukin": bukinFunction,
            "float": ChromosomeType.Real,
            "binary": ChromosomeType.Binary,
        }

        settings['variableCount'] = 2
        settings['function'] = dispatchTable[settings['function']]
        settings['mutationMethod'] = dispatchTable[settings['mutationMethod']]
        settings['crossoverMethod'] = dispatchTable[settings['crossoverMethod']]
        settings['selectionMethod'] = dispatchTable[settings['selectionMethod']]
        settings['minimize'] = dispatchTable[settings['minimize']]
        settings['chromosomeEncoding'] = dispatchTable[settings['chromosomeEncoding']]
        // xD 
        settings['a'] = Number(settings['a'])
        settings['b'] = Number(settings['b'])
        settings['dx'] = Number(settings['dx'])
        settings['populationSize'] = Number(settings['populationSize'])
        settings['variableCount'] = Number(settings['variableCount'])
        settings['epochCount'] = Number(settings['epochCount'])
        settings['selectionMethodArg'] = Number(settings['selectionMethodArg'])
        settings['eliteStrategyCount'] = Number(settings['eliteStrategyCount'])
        settings['crossoverProbability'] = Number(settings['crossoverProbability'])
        settings['mutationProbability'] = Number(settings['mutationProbability'])
        settings['inversionProbability'] = Number(settings['inversionProbability'])

        let genetic = new EvolutionaryAlgorithm(settings)
        let result = genetic.solve()
        form.remove()
        let answer = document.getElementById('answer')
        let interval = new Interval(settings['a'], settings['b'], settings['dx'])
        answer.innerHTML = ''
        answer.innerHTML = "<p> x, y = " + result.getAllels() + " \
         z = " + result.evaluate(settings['function'], interval) + " \
         algorithm time: " + genetic.getElapsedTime() + "ms</p>"

        makeChart(Number(settings['epochCount']), genetic.getBests(), "bestChart", "best value")
        makeChart(Number(settings['epochCount']), genetic.getMeans(), "meanChart", "mean")
        makeChart(Number(settings['epochCount']), genetic.getStds(), "stdChart", "standard deviation")
        saveToFile(genetic.getBestsChromosome(), genetic.getBests(), genetic.getElapsedTime())
    })
}
