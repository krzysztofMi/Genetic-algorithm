import { getRandomInt, randomIndexes } from "../utils/random"

let swapSide = false

export const Crossover = {
    real: {
        arithmetic: function (a: number[], b: number[], k: number = undefined): [[number,number], [number,number]]{
            if(k == undefined) k = Math.random()
        
            let x1 = k * a[0] + (1-k) * b[0]
            let y1 = k * a[1] + (1-k) * b[1]
        
            let x2 = (1 - k) * a[0] + k * b[0]
            let y2 = (1 - k) * a[1] + k * b[1]
        
            return [[x1,y1], [x2,y2]]
        },

        heuristic: function(a: number[], b: number[], k: number = undefined): number[]{
            if(k == undefined) k = Math.random()
            let x1 = k * (b[0] - a[0]) + a[0]
            let y1 = k * (b[1] - a[1]) + a[1]
            return [x1,y1]
        }
    },
    binary: {
        homogenous: crossoverHomogenous,
        onePoint: crossover1,
        twoPoint: crossover2,
        threePoint: crossover3,
        NPoint: crossoverN,
        swapSides: swapCrossoverSide
    }
}

export function swapCrossoverSide() {
    swapSide = !swapSide
}

export function crossoverHomogenous(a: number[], b: number[]): [number[], number[]] {
    let A = a.slice(); let B = b.slice(); // shallow copy
    for(let i = 0; i < Math.min(A.length, B.length) - 1; i++) {
        if(i % 2) {
            let temp = A[i]
            A[i] = B[i]
            B[i] = temp
        }        
    }
    return [A, B]
}

// Crossovers values a, b in place
export function crossover(a: number[], b: number[], crossoverIndex: number): void {
    let geneLength = Math.min(a.length, b.length)
    let min
    let max
    
    if(swapSide) {
        min = 0
        max = crossoverIndex
    } else {
        min = crossoverIndex
        max = geneLength
    }

    for(let i = min; i < max; i++) {
        let temp = a[i]
        a[i] = b[i]
        b[i] = temp
    }
}

export function crossoverN(a: number[], b: number[], points: number[]): [number[], number[]] {
    let A = a.slice(); let B = b.slice(); // shallow copy
    for(let i = 0; i < points.length; i++) {
        crossover(A,B,points[i])
    }
    return [A,B]
}

export function crossover1(binaryA: number[], binaryB: number[]): [number[], number[]] {
    let A = binaryA.slice(); let B = binaryB.slice(); // shallow copy
    let randomIndex = getRandomInt(0, Math.min(A.length, B.length) - 1)
    crossover(A, B, randomIndex)
    return [A, B]
}

export function crossover2(binaryA: number[], binaryB: number[]): [number[], number[]] {
    let A = binaryA.slice(); let B = binaryB.slice(); // shallow copy
    let indices = randomIndexes(Math.min(A.length, B.length) - 1, 2)
    crossoverN(A, B, indices)
    return [A, B]
}

export function crossover3(binaryA: number[], binaryB: number[]): [number[], number[]] {
    let A = binaryA.slice(); let B = binaryB.slice(); // shallow copy
    let indices = randomIndexes(Math.min(A.length, B.length) - 1, A.length)
    crossoverN(A,B,indices)
    return [A, B]
}