export default class Chromosome {

    private geneNumber: number
    private allels: number[]

    constructor(geneNumber: number, bits: number[]) {
        this.geneNumber = geneNumber
        this.allels = bits
    }

    public getGeneNumbers() { return this.geneNumber }
    public getAllels() { return this.allels }
    
    public decode(a: number, dx: number): number[] {
        let decoded_allels: number[] = []
        let allelSize = (this.allels.length / this.geneNumber)
        for(let i = 0; i<this.geneNumber; i++) {
            let bits = ""
            for(let j = 0; j<allelSize; j++) {
                bits = bits.concat(this.allels[i*allelSize+j].toString())
            }
            decoded_allels.push(a + parseInt(bits, 2) * dx)
        }
        return decoded_allels
    }
}
