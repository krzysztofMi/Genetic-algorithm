import BinaryChromosome from "../genetic/chromosome/BinaryChromosome"
import RealChromosome from "../genetic/chromosome/RealChromosome"
import Interval from "../genetic/Interval"

const interval = new Interval(2, 9, 1)

test("Should have X genes", ()=> {
    let chromo = new BinaryChromosome(2, [0,1,0,1,0,1,0,1])
    expect(chromo.getGeneNumbers()).toBe(2)
    chromo = new BinaryChromosome(100, [1,0,1,1])
    expect(chromo.getGeneNumbers()).toBe(100)
})

test("Should decode chromosome", ()=> {
    let chromo = new BinaryChromosome(2, [0,0,1,1,1,1])
    expect(chromo.decode(interval)).toStrictEqual([2.875, 8.125]);
    chromo = new BinaryChromosome(4, [0,0,1,0,1,1,1,0]);
    interval.setA(-100)
    interval.setStep(5)
    expect(chromo.decode(interval)).toStrictEqual([-100, -93.1875, -89.78125, -93.1875]);
})

test("Chromosome should be evaluate properly", ()=> {
    let chromo = new RealChromosome(4, [2, 4, 5, 6])
    let fun = (it: number[]) => {
        let y = 0
        it.forEach(element => {
            y += 2*element;
        });
        return y
    }
    let y = chromo.evaluate(fun)
    expect(y).toEqual(34)
})
