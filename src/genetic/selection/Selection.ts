import ExtremeType from "../../enum/ExtremeType";


export default interface Selection {
    selectBest(evaluatedIndividuals: number[])
    setExtremeType(extreme: ExtremeType)
}