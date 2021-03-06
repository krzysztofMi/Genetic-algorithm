
import {randomInt} from "./random"

export function calculateBitNumber(a: number, b: number, dx: number): number {
    let n = Math.abs(a - b)/dx + 1;
    return Math.ceil(Math.log2(n));
}

export function calculateBetterStep(a: number, b: number, bitNumber:number): number {
    return Math.abs(a - b)/(Math.pow(2, bitNumber))
}

export function getRandomBitVector(geneNumber: number, bitsNumber: number) {
    let bits: number[] = []
    for(let j = 0; j<geneNumber*bitsNumber; j++) {
        bits.push(randomInt(0, 1))
    }
    return bits;
}
