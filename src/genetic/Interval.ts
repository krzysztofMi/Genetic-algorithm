import {calculateBitNumber, calculateBetterStep} from "../utils/bits"

export default class Interval {
    private a: number
    private b: number
    private dx: number
    private bitNumber: number

    constructor(a: number, b: number, dx: number) {
        this.a = a
        this.b = b
        this.dx = dx
        this.prepareInterval()
    }

    public getBits(): number { return this.bitNumber }
    public getA(): number { return this.a }
    public getB(): number { return this.b }
    public getStep(): number { return this.dx }

    public setA(a: number) { 
        this.a = a;
        this.prepareInterval()
    } 

    public setB(b: number) {
        this.b = b
        this.prepareInterval()
    }

    public setStep(dx: number) {
        this.dx = dx
        this.prepareInterval()
    }

    private prepareInterval() {
        this.setBitsNumber()
        this.setBetterStep()
    }

    private setBitsNumber() {
        this.bitNumber = calculateBitNumber(this.a, this.b, this.dx)
    }

    private setBetterStep() {
        this.dx = calculateBetterStep(this.a, this.b, this.bitNumber)
    }
}
