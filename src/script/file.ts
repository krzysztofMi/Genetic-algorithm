import Chromosome from '../genetic/chromosome/Chromosome';

export function saveToFile(chromosomes: Chromosome[], values: number[]) {
    let text = ""
    for(let i = 1; i<=chromosomes.length; i++) {
        let xy = chromosomes[i-1].getAllels()
        text+="epoch = " + i + " x = " + xy[0] + " y = " + xy[1] + " z = " + values[i-1] + "\n"
    }
    var file = new Blob([text], {type: "txt"});
    var a = document.createElement("a"),
                url = URL.createObjectURL(file);
    a.href = url;
    a.download = "wyniki.txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}