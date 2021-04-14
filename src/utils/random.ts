export function getRandomInt(min: number, max: number) {
    return Math.floor(getRandom(min, max));
}

// This random number geberator, generate numbers beetween (min, max)
export function getRandom(min:number, max: number): number {
    let x = (Math.random() * (max - min + 1) + min)
    // without this it's generate number in interval (min, max+1)
    x = x > max ? max: x
    return x
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

export function randomIndexes(maxIndex: number, count: number) {
    let randomIndices = []
    for(let i = 0; i < count; i++) 
        randomIndices.push(getRandomInt(0, maxIndex))
    return randomIndices
}
