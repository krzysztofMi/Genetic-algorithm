import ExtremeType from "../../enum/ExtremeType";
import Selection from "./Selection"

export default class BestScoreSelection implements Selection {
    private extreme: ExtremeType
    private out_fraction: number
    setExtremeType(extreme: ExtremeType) { this.extreme = extreme }
    constructor(extreme: ExtremeType, out_fraction: number) { 
        this.extreme = extreme
        this.out_fraction = out_fraction
    }

    selectBest(evaluatedIndividuals: number[]): number[] {
        let copy = evaluatedIndividuals.slice()
        if(this.extreme == ExtremeType.MAX) {
            copy.sort((a,b) => b - a)
        } else {
            copy.sort((a,b) => a - b)
        }

        let result = []
        let output_count = Math.round(copy.length * this.out_fraction)
        for(let i = 0; i < output_count; i++) {
            result.push(copy[i])
        }

        return result
    }

}
