import Chromosome from '../genetic/chromosome/Chromosome';

export function saveToFile(chromosomes: Chromosome[], values: number[], time: number) {
    let text = ""
    text+="epoch,x,y,z,time\n"
    for(let i = 1; i<=chromosomes.length; i++) {
        let xy = chromosomes[i-1].getAllels()
        text+="" + i + "," + xy[0] + "," + xy[1] + "," + values[i-1] + "," + time + "\n"
    }
    var file = new Blob([text], {type: "csv"});
    var a = document.createElement("a"),
                url = URL.createObjectURL(file);
    a.href = url;
    a.download = "results.csv";
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}
