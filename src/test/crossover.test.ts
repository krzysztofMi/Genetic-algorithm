import { getRandomInt } from "../utils/random"

function crossover1(a: number[], b: number[], crossoverIndex: number) {
    let geneLength = Math.min(a.length, b.length)
    for(let i = crossoverIndex; i < geneLength; i++) {
        let temp = a[i]
        a[i] = b[i]
        b[i] = temp
    }
}

function crossover2(a: number[], b: number[], minIndex: number, maxIndex: number) {
    for(let i = minIndex; i < maxIndex; i++) {
        let temp = a[i]
        a[i] = b[i]
        b[i] = temp
    }
}

function onePointCrossover(binaryA: number[], binaryB: number[]) {
    let minIndex = Math.min(binaryA.length, binaryB.length)
    let randomIndex = getRandomInt(0, minIndex - 1)
    crossover1(binaryA, binaryB, randomIndex)
}

function twoPointCrossover(binaryA: number[], binaryB: number[]) {
    let minIndex = Math.min(binaryA.length, binaryB.length)
    let randomIndices = [getRandomInt(0, minIndex - 1), getRandomInt(0, minIndex - 1)]
    let min: number = Math.min(randomIndices[0], randomIndices[1])
    let max: number = Math.max(randomIndices[0], randomIndices[1])
    crossover2(binaryA, binaryB, min, max)
}

test("Test single point crossover", ()=> {
    let A = [1,1,0,1,1,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    crossover1(A, B, 3)
    expect(A).toEqual([1,1,0,1,1,1,1,1])
    expect(B).toEqual([0,1,0,1,1,0,0,1])
})

test("Test two point crossover", ()=> {
    let A = [1,1,0,1,0,0,0,1]
    let B = [0,1,0,1,1,1,1,1]
    crossover2(A, B, 3, 5)
    expect(A).toEqual([1,1,0,1,1,0,0,1])
    expect(B).toEqual([0,1,0,1,0,1,1,1])
})