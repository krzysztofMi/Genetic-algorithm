import GeneticAlgorithm from "../genetic/GeneticAlgorithm";
import ExtremeType from "../enum/ExtremeType"
import BestScoreSelection from "../genetic/selection/BestScoreSelection"
import TournamentSelection from "../genetic/selection/TournamentSelection"
import RouletteWheel from "../genetic/selection/RouletteWheel"
import * as c from "../genetic/Crossover"
import TwoPointFlip from "../genetic/mutation/TwoPointFlip"
import OnePointFlip from "../genetic/mutation/OnePointFlip"
import BoundaryFlipBit from "../genetic/mutation/BoundaryFlipBit"

let form = document.getElementById("genetic")
if(form == undefined) {
    console.log("Form is undefined")
} else {
    form.addEventListener("submit", function(event){
        event.preventDefault()
        const formData = new FormData(document.querySelector('form'))
        let settings = {}
        formData.forEach((val, key) => {
            settings[key] = val
        })

        let dispatchTable = {
            "onePointFlip": OnePointFlip,
            "twoPointFlip": TwoPointFlip,
            "boundaryFlipBit": BoundaryFlipBit,
            "onePoint": c.crossover1,
            "twoPoint": c.crossover2,
            "threePoint": c.crossover3,
            "homogenous": c.crossoverHomogenous,
            "bestScore": BestScoreSelection,
            "tournament": TournamentSelection,
            "roulette": RouletteWheel,
            "minimize": ExtremeType.MIN,
            "maximize": ExtremeType.MAX,
        }

        settings['mutationMethod'] = dispatchTable[settings['mutationMethod']]
        settings['crossoverMethod'] = dispatchTable[settings['crossoverMethod']]
        settings['selectionMethod'] = dispatchTable[settings['selectionMethod']]
        settings['minimize'] = dispatchTable[settings['minimize']]


        console.log(settings)

        let genetic = new GeneticAlgorithm(
            /*a*/ settings['a'],
            /*b*/ settings['b'],
            /*dx*/ settings['dx'],
            /*populationSize*/ settings['populationSize'],
            /*variableCount*/ settings['variableCount'],
            /*epochCount*/ settings['epochCount'],
            /*function*/ settings['function'],
            /*selectionMethod*/ settings['selectionMethod'],
            /*selectionMethodArg*/ settings['selectionMethodArg'], // BestScore Fraction, Tournament selection parameter
            /*crossoverMethod*/ settings['crossoverMethod'],
            /*mutationMethod*/ settings['mutationMethod'],
            /*eliteStrategyCount*/ settings['eliteStrategyCount'],
            /*crossoverProbability*/ settings['crossoverProbability'],
            /*mutationProbability*/ settings['mutationProbability'],
            /*inversionProbability*/ settings['inversionProbability'],
            /*minimize*/ settings['minimize'],
        )

        console.log(genetic)
    })
}




