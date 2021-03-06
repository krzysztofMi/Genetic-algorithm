import { epilog } from "yargs";
import {calculateBetterStep, calculateBitNumber} from "../utils/bits"

test('Should return bits number needed to represent an interval with step dx', () => {
    expect(calculateBitNumber(0, 5, 1)).toBe(3)
    expect(calculateBitNumber(-200, 200, 0.00001)).toBe(26)
})

test('Should return better step', () => {
    let bits = calculateBitNumber(1, 5, 1)
    expect(calculateBetterStep(1, 5, bits)).toBe(0.5)
    bits = calculateBitNumber(-200, 200, 0.00001)
    expect(calculateBetterStep(-200, 200, bits)).toBe(0.0000059604644775390625)
})
