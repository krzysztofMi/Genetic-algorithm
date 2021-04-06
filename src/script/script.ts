import GeneticAlgorithm from "../genetic/GeneticAlgorithm";
import ExtremeType from "../enum/ExtremeType"
import BestScoreSelection from "../genetic/selection/BestScoreSelection"
import * as c from "../genetic/Crossover"
import TwoPointFlip from "../genetic/mutation/TwoPointFlip"

let form = document.getElementById("genetic")
if(form == undefined) {
    console.log("Form is undefined")
} else {
    form.addEventListener("submit", function(event){
        event.preventDefault()
        console.log("Form submit!")
    })
}


let genetic = new GeneticAlgorithm(
    /*a*/ 1,
    /*b*/ 5,
    /*dx*/ 1,
    /*populationSize*/ 100,
    /*variableCount*/ 2,
    /*epochCount*/ 10,
    /*function*/ (it)=>it[0]*it[1],
    /*selectionMethod*/ BestScoreSelection,
    /*selectionMethodArg*/ 0.4, // BestScore Fraction, Tournament selection parameter
    /*crossoverMethod*/ c.crossover1,
    /*mutationMethod*/ TwoPointFlip,
    /*eliteStrategyCount*/ 2,
    /*crossoverProbability*/ 0.9,
    /*mutationProbability*/ 0.4,
    /*inversionProbability*/ 0.5,
    /*minimize*/ ExtremeType.MIN,
)

