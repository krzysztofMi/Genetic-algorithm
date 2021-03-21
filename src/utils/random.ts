export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomIndexs(n: number) {
    var indexs = []
    for(let i = 0; i<n; i++) {
        indexs.push(i)
    }
    let randomIndexs = []
    let i = indexs.length

    while (i--) {
        let j = Math.floor(Math.random() * (i+1));
        randomIndexs.push(indexs[j]);
        indexs.splice(j,1);
    }

    return randomIndexs
}