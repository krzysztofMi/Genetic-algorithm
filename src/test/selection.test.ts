import TournamentSelection from "../genetic/selection/TournamentSelection"
import Selection from "../genetic/selection/Selection"
import ExtremeType from "../enum/ExtremeType"
import RouletteWheel from "../genetic/selection/RouletteWheel"
import BestScoreSelection from "../genetic/selection/BestScoreSelection"

test("Tournament selection test", () => {
    let selection: Selection = new TournamentSelection(ExtremeType.MAX, 3)
    let evaluatedIndividuals: number[] = [23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    
    expect(bests.has(8)).toBe(true)

    selection.setExtremeType(ExtremeType.MIN)
    bests = selection.selectBest(evaluatedIndividuals)

    expect(bests.has(4)).toBe(true)
})

test("Roulette wheel selection test", ()=> {
    let selection: Selection = new RouletteWheel(ExtremeType.MAX) 
    let evaluatedIndividuals: number[] = [23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    expect(bests[0].includes(195.125)).toBe(true)
    selection.setExtremeType(ExtremeType.MIN)
    bests = selection.selectBest(evaluatedIndividuals)
    expect(bests[0].includes(11.125)).toBe(true)
})

test("Best score selection test MAX", ()=> {
    let selection: Selection = new BestScoreSelection(ExtremeType.MAX, 0.3) 
    let evaluatedIndividuals: number[] = [23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125]
    let evaluatedIndividualsCopy: number[] = evaluatedIndividuals.slice()
    let bests = selection.selectBest(evaluatedIndividuals)
    expect(bests.length).toEqual(Math.round(evaluatedIndividuals.length * 0.3))
    expect(bests[0]).toEqual(195.125)
    expect(bests[1]).toEqual(149.5)
    expect(evaluatedIndividuals).toEqual(evaluatedIndividualsCopy)
})

test("Best score selection test MIN", ()=> {
    let selection: Selection = new BestScoreSelection(ExtremeType.MIN, 0.3) 
    let bests = selection.selectBest([23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125])
    expect(bests[0]).toEqual(11.125)
})