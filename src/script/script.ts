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
        let settings = {};
        formData.forEach((val, key) => {
            settings[key] = val
        })

        let dispatchTable = {
            "onePointFlip": OnePointFlip,
            "twoPointFlip": TwoPointFlip,
            "boundaryFlipBit": BoundaryFlipBit,
            "onePointCrossover": c.crossover1,
            "twoPointCrossover": c.crossover2,
            "threePointCrossover": c.crossover3,
            "homogenousCrossover": c.crossoverHomogenous,
            "bestScoreSelection": BestScoreSelection,
            "tournamentSelection": TournamentSelection,
            "rouletteSelection": RouletteWheel,
            "minimize": ExtremeType.MIN,
            "maximize": ExtremeType.MAX,
            "fun1": (it) => it[0] * it[1],
            "fun2": (it) => it[0] + 5 * it[1],
            "fun3": (it) => it[0] + 5 * it[1],
            "fun4": (it) => it[0] + 5 * it[1],
        }

        settings['variableCount'] = 2
        settings['function'] = dispatchTable[settings['function']]
        settings['mutationMethod'] = dispatchTable[settings['mutationMethod']]
        settings['crossoverMethod'] = dispatchTable[settings['crossoverMethod']]
        settings['selectionMethod'] = dispatchTable[settings['selectionMethod']]
        settings['minimize'] = dispatchTable[settings['minimize']]
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

        let settings_test = {}
        settings_test['a'] = 1
        settings_test['b']= 5
        settings_test['dx']= 1
        settings_test['populationSize']= 100
        settings_test['variableCount']= 2
        settings_test['epochCount']= 10
        settings_test['function']= (it)=>it[0]*it[1]
        settings_test['selectionMethod']= BestScoreSelection
        settings_test['selectionMethodArg']= 0.4
        settings_test['crossoverMethod']= c.crossover1
        settings_test['mutationMethod']= TwoPointFlip
        settings_test['eliteStrategyCount']= 2
        settings_test['crossoverProbability']= 0.9
        settings_test['mutationProbability']= 0.4
        settings_test['inversionProbability']= 0.5
        settings_test['minimize']= ExtremeType.MIN
        console.assert(settings == settings_test, settings_test)
        console.log(settings)

        let genetic = new GeneticAlgorithm(settings)
        let result = genetic.solve()

        form.remove()
        let paragraph = document.createElement('p');
        let node = document.createTextNode(JSON.stringify(result));
        paragraph.appendChild(node);
        document.body.appendChild(paragraph);
    })
}




