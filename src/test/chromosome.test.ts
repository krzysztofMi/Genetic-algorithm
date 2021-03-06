import Chromosome from "../genetic/Chromosome"

test("Should have X genes", ()=> {
    let chromo = new Chromosome(2, [0,1,0,1,0,1,0,1])
    expect(chromo.getGeneNumbers()).toBe(2)
    chromo = new Chromosome(100, [1,0,1,1])
    expect(chromo.getGeneNumbers()).toBe(100)
})

test("Should decode chromosome", ()=> {
    let chromo = new Chromosome(2, [0,0,1,1,1,1])
    expect(chromo.decode(2, 1)).toStrictEqual([3, 9]);
    chromo = new Chromosome(4, [0,0,1,0,1,1,1,0]);
    expect(chromo.decode(-100, 5)).toStrictEqual([-100, -90, -85, -90]);
})
