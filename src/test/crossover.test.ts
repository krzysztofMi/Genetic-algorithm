import { getRandomInt } from "../utils/random"

function crossover1(a: number[], b: number[], crossoverIndex: number) {
    let geneLength = a.length
    if(a.length != b.length) {
        geneLength = Math.min(a.length, b.length)
        console.log("Genes are not of equal length")
    } 

    for(let i = crossoverIndex; i < geneLength; i++) {
        let temp = a[i]
        a[i] = b[i]
        b[i] = temp
    }
}

function crossover2(a: number[], b: number[], 
                    crossoverIndexMin: number, 
                    crossoverIndexMax: number) {
    for(let i = crossoverIndexMin; i < crossoverIndexMax; i++) {
        let temp = a[i]
        a[i] = b[i]
        b[i] = temp
    }
}

function onePointCrossover(binaryA: number[], binaryB: number[]) {
    let randomIndex = getRandomInt(0, binaryA.length - 1)
    crossover1(binaryA, binaryB, randomIndex)
}

function twoPointCrossover(binaryA: number[], binaryB: number[]) {
    let randomIndices = [getRandomInt(0, binaryA.length - 1), getRandomInt(0, binaryA.length - 1)]
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