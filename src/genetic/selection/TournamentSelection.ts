import ExtremeType from "../../enum/ExtremeType"
import { getRandomIndexs } from "../../utils/random"
import Selection from "./Selection"

export default class TournamentSelection implements Selection {
    
    private k: number
    private extreme: ExtremeType

    constructor(extremeType: ExtremeType, k: number) {
        this.k  = k
        this.extreme = extremeType
    }

    setK(k: number) {this.k = k}
    getK(k: number) {this.k = k} 

    setExtremeType(extremeType: ExtremeType) { this.extreme = extremeType } 

    selectBest(evaluatedIndividuals: number[]): [number[], number[]] {
        const n = Math.ceil(evaluatedIndividuals.length/this.k)
        const reminder =  evaluatedIndividuals.length%this.k
        const randomIndexs = getRandomIndexs(evaluatedIndividuals.length)
        let indices = []
        let values = []
        for(let i = 0; i<n; i++) {
            let bestIndex = randomIndexs[i*this.k]
            let best = evaluatedIndividuals[bestIndex]
            for(let j = 1; j<this.k; j++) {
                if(i == n-1 && j >= reminder) {
                    break;
                }
                let index = randomIndexs[i*n+j]
                const next = evaluatedIndividuals[index]
                switch(this.extreme) {
                    case ExtremeType.MIN:
                        if(next < best) { 
                            best = next 
                            bestIndex = index
                        }
                        break
                    case ExtremeType.MAX:
                        if(next > best) { 
                            best = next 
                            bestIndex = index
                        }
                        break
                }
            }
            indices.push(bestIndex)
            values.push(best)
        }
        return [values, indices]
    }

}