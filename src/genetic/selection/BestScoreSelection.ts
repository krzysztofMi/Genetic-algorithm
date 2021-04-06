import ExtremeType from "../../enum/ExtremeType";
import Selection from "./Selection"

function findIndicesOf(sublist: number[], list: number[]): number[] {
    let result = []
    for(let i = 0; i < sublist.length; i++) {
        let fromIndex = 0
        for(;;) {
            let val = list.indexOf(sublist[i], fromIndex)
            if(val != -1) {
                let indexOf = result.indexOf(val)
                if(indexOf == -1) {
                    result.push(val)
                    break
                } else {
                    fromIndex = val + 1
                }
            } else {
                result.push("not found")
                break
            }
        }
    }

    return result
}

export default class BestScoreSelection implements Selection {
    private extreme: ExtremeType
    private out_fraction: number
    setExtremeType(extreme: ExtremeType) { this.extreme = extreme }
    constructor(extreme: ExtremeType, out_fraction: number) { 
        this.extreme = extreme
        this.out_fraction = out_fraction
    }

    selectBest(evaluatedIndividuals: number[]): [number[], number[]] {
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

        let indices = findIndicesOf(copy, evaluatedIndividuals)

        return [result, indices]
    }

}
