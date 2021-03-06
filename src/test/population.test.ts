import Interval from "../genetic/Interval"
import Population from "../genetic/Population"

const interval = new Interval(0, 5, 1)
  
test("Should generate population with size 10", () => {
    let population = new Population(10, 2, interval)
    testPopulationSize(population, 10)
})
    
test("Chromosome in population should have 10 genoms", ()=>{
    let population = new Population(1, 10, interval)
    testPopulationSize(population, 1)
    testChromosomeGenomeNumber(population, 10)
})
    
test("Chromosomes should have genom lenght 6", () => {
    //IMO, the best option to test it is to make mock 
    //object with return 3 in getBits method
    //now it's work that for a = 0 b = 5 and step = 1 interval returns 3 bits
    let population = new Population(2, 2, interval)
    testPopulationSize(population, 2)
    testChromosomeGenomeNumber(population, 2)
    population.getIndividuals().forEach(it=>{
        expect(it.getAllels().length).toBe(6)
    })
})
   
function testPopulationSize(population: Population, size: number) {
    expect(population.getPopulationSize()).toBe(size)
}
    
function testChromosomeGenomeNumber(population: Population, genomeNumber: number) {
    population.getIndividuals().forEach(it=>{
        expect(it.getGeneNumbers()).toBe(genomeNumber)
    })      
}
  