import { getRandomInt, randomIndexes } from "../utils/random"
import * as c from "../genetic/Crossover"

test("Test N point crossover", ()=> {
    let A = [1,1,0,1,1,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    // 11011011
    // 01011101

    // 11011101
    // 01011011

    // 11011011
    // 01011101
    c.crossoverN(A, B, [6,5,4])
    expect(A).toEqual([1,1,0,1,1,0,1,1])
    expect(B).toEqual([0,1,0,1,1,1,0,1])

    let indices = randomIndexes(Math.min(A.length, B.length) - 1, 3)
    expect(indices.length == 3).toBeTruthy()
    for(let i = 0; i < indices.length; i++) 
        expect(indices[i] > 0 && indices[i] < A.length - 1)
})

test("Test single point crossover", ()=> {
    let A = [1,1,0,1,1,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    c.crossover(A, B, 3)
    expect(A).toEqual([1,1,0,1,1,1,1,1])
    expect(B).toEqual([0,1,0,1,1,0,0,1])
})

test("Test random crossover", ()=> {
    let A = [1,1,0,1,1,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    let index = c.crossover1(A, B)
    expect(index >= 0 && index < A.length).toBeTruthy()
    
    let index_2 = c.crossover2(A, B)
    for(let i = 0; i < 2; i++)
        expect(index_2[i] >= 0 && index_2[i] < A.length).toBeTruthy()
})

test("Test two point crossover", ()=> {
    let A = [1,1,0,1,0,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    c.crossoverN(A, B, [3, 5])
    expect(A).toEqual([1,1,0,1,1,0,0,1])
    expect(B).toEqual([0,1,0,1,0,1,1,1])
})