import TournamentSelection from "../genetic/selection/TournamentSelection"
import Selection from "../genetic/selection/Selection"
import ExtremeType from "../enum/ExtremeType"
import RouletteWhell from "../genetic/selection/RouletteWheel"

test("Tournament selection test", () => {
    let selection: Selection = new TournamentSelection(3, ExtremeType.MAX)
    let evaluatedIndividuals: number[] = [23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    
    expect(bests.has(8)).toBe(true)

    selection.setExtremeType(ExtremeType.MIN)
    bests = selection.selectBest(evaluatedIndividuals)

    expect(bests.has(4)).toBe(true)
})

test("Roulette wheel selection test", ()=> {
    let selection: Selection = new RouletteWhell(ExtremeType.MAX) 
    let evaluatedIndividuals: number[] = [23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    expect(bests[0].includes(195.125)).toBe(true)
    selection.setExtremeType(ExtremeType.MIN)
    bests = selection.selectBest(evaluatedIndividuals)
  
    expect(bests[0].includes(11.125)).toBe(true)
})
