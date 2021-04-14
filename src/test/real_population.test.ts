import ExtremeType from "../enum/ExtremeType"
import Interval from "../genetic/Interval"
import RealPopulation from "../genetic/RealPopulation"

const interval = new Interval(-15, 15, 1)

test("Should generate population with size 10", () => {
    let population = new RealPopulation(10, 2, interval, ExtremeType.MIN)
    expect(population.getLenght()).toBe(10)
})

test("Genome should have 2 allels", () => {
    let population = new RealPopulation(10, 2, interval, ExtremeType.MIN)
    expect(population.getIndividuals()[0].getGeneNumbers()).toBe(2)
})

test("Allels should be between -15 and 15", () => {
    let population = new RealPopulation(100, 2, interval, ExtremeType.MIN)
    for(let indiv of population.getIndividuals()) {
        let x = indiv.getAllels()[0]
        let y = indiv.getAllels()[1]
        console.log(x, y)
        testLessGreaterThan(x, interval.getB())
        testLessGreaterThan(y, interval.getB())
    }
})

function testLessGreaterThan(x: number, less: number, greater: number = -less) {
    expect(x).toBeLessThanOrEqual(less)
    expect(x).toBeGreaterThanOrEqual(greater)
}
