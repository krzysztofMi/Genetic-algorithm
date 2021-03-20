import BaseChromosome from "./BaseChromosome";
import Interval from "../Interval"

export default class RealChromosome extends BaseChromosome {
    
    public decode(interval: Interval): number[] {
        //might be implemented logic to return binary representation of allel.
        return []
    }
    
    public evaluate(fun: Function, interval?: Interval): number {
        return fun(this.allels)
    }
}
