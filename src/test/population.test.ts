import Interval from "../genetic/Interval"
import Population from "../genetic/Population"
import ExtremeType from "../enum/ExtremeType"

const interval = new Interval(1, 5, 1)
  
test("Should generate population with size 10", () => {
    let population = new Population(10, 2, interval, ExtremeType.MIN)
    testPopulationSize(population, 10)
})
    
test("Chromosomes in population should have 10 genoms", ()=>{
    let population = new Population(1, 10, interval, ExtremeType.MIN)
    testPopulationSize(population, 1)
    testChromosomeGenomeNumber(population, 10)
})
    
test("Chromosomes should have genom lenght 6", () => {
    //IMO, the best option to test it is to make mock 
    //object with return 3 in getBits method
    //now it's work that for a = 1 b = 5 and step = 1 interval returns 3 bits 
    let population = new Population(2, 2, interval, ExtremeType.MIN)
    testPopulationSize(population, 2)
    testChromosomeGenomeNumber(population, 2)
    population.getIndividuals().forEach(it=>{
        expect(it.getAllels().length).toBe(6)
    })
})

test("Population should be evaluated properly", () => {
    let population = new Population(10, 2, interval, ExtremeType.MIN)
    population.decodePopulation()
    population.evaluateAndSetBest((it)=>it[0]*it[1])
    let testArray = population.getDecodedIndividuals().map(it =>{
        return it.getAllels()[0] * it.getAllels()[1]
    })
    expect(population.getEvaluatedIndividuals()).toStrictEqual(testArray)
    population.evaluateAndSetBest((it)=>it[0]+it[1])
    testArray = population.getDecodedIndividuals().map(it =>{
        return it.getAllels()[0] + it.getAllels()[1]
    })
    population.evaluateAndSetBest((it)=>10*it[0]+25*Math.log(it[1]))
    testArray = population.getDecodedIndividuals().map(it =>{
        return 10*it.getAllels()[0] + 25 * Math.log(it.getAllels()[1])
    })

})

test("Best min individual should be choosen from population", ()=>{
    getBest(ExtremeType.MIN, (it)=>it[0]*it[1])
   
})

test("Best max individual should be choosen from population", ()=>{
    getBest(ExtremeType.MAX, (it)=>it[0]*it[1])
})

function getBest(extremeType: ExtremeType, fn: Function) {
    let population = new Population(10, 2, interval, extremeType)
    population.decodePopulation()
    population.evaluateAndSetBest(fn)
    switch(extremeType) {
        case ExtremeType.MIN:
            expect(population.getBestIndividual().evaluate(fn)).toEqual(Math.min(...population.getEvaluatedIndividuals()))
            break
        case ExtremeType.MAX:
            expect(population.getBestIndividual().evaluate(fn)).toEqual(Math.max(...population.getEvaluatedIndividuals()))
            break
    }
}

function testPopulationSize(population: Population, size: number) {
    expect(population.getPopulationSize()).toBe(size)
}
    
function testChromosomeGenomeNumber(population: Population, genomeNumber: number) {
    population.getIndividuals().forEach(it=>{
        expect(it.getGeneNumbers()).toBe(genomeNumber)
    })      
}
  