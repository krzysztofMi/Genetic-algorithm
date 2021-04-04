import { getRandomInt, randomIndexes } from "../utils/random"
import * as c from "../genetic/Crossover"

test("Test homogenous crossover", ()=> {
    let A = [1,1,0,1,1,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    let child = c.crossoverHomogenous(A,B)
    expect(child[0]).toEqual([1,1,0,1,1,1,0,1])
    expect(child[1]).toEqual([0,1,0,1,1,0,1,1])
})

test("Test N point crossover", ()=> {
    let A = [1,1,0,1,1,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    // ======== 1 cross
    // 11011011
    // 01011101
    // ======== 2 
    // 11011101
    // 01011011
    // ======== 3
    // 11011011
    // 01011101
    let children = c.crossoverN(A, B, [6,5,4])
    expect(children[0]).toEqual([1,1,0,1,1,0,1,1])
    expect(children[1]).toEqual([0,1,0,1,1,1,0,1])

    let indices = randomIndexes(Math.min(children[0].length, B.length) - 1, 3)
    expect(indices.length == 3).toBeTruthy()
    for(let i = 0; i < indices.length; i++) 
        expect(indices[i] > 0 && indices[i] < children[0].length - 1)
})

test("Test single point crossover", ()=> {
    let A = [1,1,0,1,1,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    c.crossover(A, B, 3)
    expect(A).toEqual([1,1,0,1,1,1,1,1])
    expect(B).toEqual([0,1,0,1,1,0,0,1])
})

test("Side swapping crossover", () => {
    c.swapCrossoverSide()
    let A = [1,1,0,1,1,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    c.crossover(A, B, 3)
    expect(A).toEqual([0,1,0,1,1,0,0,1])
    expect(B).toEqual([1,1,0,1,1,1,1,1])
})

test("Test two point crossover", ()=> {
    let A = [1,1,0,1,0,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    let child = c.crossoverN(A, B, [3, 5])
    expect(child[0]).toEqual([1,1,0,1,1,0,0,1])
    expect(child[1]).toEqual([0,1,0,1,0,1,1,1])
})