import { getRandomInt, randomIndexes } from "../utils/random"

export function crossoverHomogenous(A: number[], B: number[]) {
    for(let i = 0; i < Math.min(A.length, B.length) - 1; i++) {
        if(i % 2) {
            let temp = A[i]
            A[i] = B[i]
            B[i] = temp
        }        
    }
}

export function crossover(a: number[], b: number[], crossoverIndex: number): void {
    let geneLength = Math.min(a.length, b.length)
    for(let i = crossoverIndex; i < geneLength; i++) {
        let temp = a[i]
        a[i] = b[i]
        b[i] = temp
    }
}

export function crossoverN(a: number[], b: number[], points: number[]) {
    for(let i = 0; i < points.length; i++) {
        crossover(a,b,points[i])
    }
}

export function crossover1(binaryA: number[], binaryB: number[]): number {
    let randomIndex = getRandomInt(0, Math.min(binaryA.length, binaryB.length) - 1)
    crossover(binaryA, binaryB, randomIndex)
    return randomIndex
}

export function crossover2(binaryA: number[], binaryB: number[]): number[] {
    let indices = randomIndexes(Math.min(binaryA.length, binaryB.length) - 1, 2)
    crossoverN(binaryA, binaryB, indices)
    return indices
}

export function crossover3(binaryA: number[], binaryB: number[]): number[] {
    let indices = randomIndexes(Math.min(binaryA.length, binaryB.length) - 1, binaryA.length)
    crossoverN(binaryA,binaryB,indices)
    return indices
}