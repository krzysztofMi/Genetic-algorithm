import Interval from "../Interval";

export default interface Chromosome {
    getGeneNumbers(): number
    getAllels(): number[]
    setAllels(allels: number[])
    
    decode(interval: Interval): number[]
    evaluate(fun: Function, interval?: Interval): number
}
