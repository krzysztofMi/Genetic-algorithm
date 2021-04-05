import TournamentSelection from "../genetic/selection/TournamentSelection"
import Selection from "../genetic/selection/Selection"
import ExtremeType from "../enum/ExtremeType"
import RouletteWheel from "../genetic/selection/RouletteWheel"
import BestScoreSelection from "../genetic/selection/BestScoreSelection"

test("Tournament selection test odd indivduals number", () => {
    let selection: Selection = new TournamentSelection(3, ExtremeType.MAX)
    let evaluatedIndividuals: number[] = [23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    console.log(bests)
    expect(bests.has(8)).toBe(true)

    selection.setExtremeType(ExtremeType.MIN)
    bests = selection.selectBest(evaluatedIndividuals)
    console.log(bests)
    expect(bests.has(4)).toBe(true)
})

test("Tournament selection test even individuals number", () => {
    let selection: Selection = new TournamentSelection(3, ExtremeType.MAX)
    let evaluatedIndividuals: number[] = [23, 17.5, 13, 37, 11.125, 26.125, 10, 149.5, 65.5, 195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    console.log(bests)
    expect(bests.has(9)).toBe(true)

    selection.setExtremeType(ExtremeType.MIN)
    bests = selection.selectBest(evaluatedIndividuals)

    expect(bests.has(6)).toBe(true)
})


//SOMETIMES this test might randomly faild, because those depends on probability, but in most cases they should pass
test("Roulette wheel selection test MAX", ()=> {
    let selection: Selection = new RouletteWheel(ExtremeType.MAX) 
    let evaluatedIndividuals: number[] = [23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    expect(bests[0].includes(195.125)).toBe(true)
})

test("Roulette wheel selection test MAX negative numbers", ()=> {
    let selection: Selection = new RouletteWheel(ExtremeType.MAX) 
    let evaluatedIndividuals: number[] = [-23, -17.5, -13, -37, -11.125, -26.125, -149.5, -65.5, 195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    expect(bests[0].includes(195.125)).toBe(true)
})

test("Roulette wheel selection test MAX all negative numbers", ()=> {
    let selection: Selection = new RouletteWheel(ExtremeType.MAX) 
    let evaluatedIndividuals: number[] = [-23, -17.5, -13, -37, -11.125, -26.125, -149.5, -65.5, -195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    expect(bests[0].includes(-11.125)).toBe(true)
})

test("Roulette wheel selection test MIN", ()=> {
    let selection: Selection = new RouletteWheel(ExtremeType.MIN) 
    let evaluatedIndividuals: number[] = [23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    expect(bests[0].includes(11.125)).toBe(true)
})

test("Roulette wheel selection test MIN negative numbers", ()=> {
    let selection: Selection = new RouletteWheel(ExtremeType.MIN) 
    let evaluatedIndividuals: number[] = [23, 17.5, -13, 37, 11.125, 26.125, 149.5, 65.5, 195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    expect(bests[0].includes(-13)).toBe(true)
})

test("Roulette wheel selection test MIN all negative numbers", ()=> {
    let selection: Selection = new RouletteWheel(ExtremeType.MIN) 
    let evaluatedIndividuals: number[] = [-23, -17.5, -13, -37, -11.125, -26.125, -149.5, -65.5, -195.125]
    let bests = selection.selectBest(evaluatedIndividuals)
    expect(bests[0].includes(-195.125)).toBe(true)
})

test("Best score selection test MAX", ()=> {
    let selection: Selection = new BestScoreSelection(30, ExtremeType.MAX) 
    let evaluatedIndividuals: number[] = [23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125]
    let evaluatedIndividualsCopy: number[] = evaluatedIndividuals.slice()
    let bests = selection.selectBest(evaluatedIndividuals)
    expect(bests.length).toEqual(Math.round(evaluatedIndividuals.length * 0.3))
    expect(bests[0]).toEqual(195.125)
    expect(bests[1]).toEqual(149.5)
    expect(evaluatedIndividuals).toEqual(evaluatedIndividualsCopy)
})

test("Best score selection test MIN", ()=> {
    let selection: Selection = new BestScoreSelection(30, ExtremeType.MIN) 
    let bests = selection.selectBest([23, 17.5, 13, 37, 11.125, 26.125, 149.5, 65.5, 195.125])
    expect(bests[0]).toEqual(11.125)
})
