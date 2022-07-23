function generateNumberBetween(min, max) {
    if (min > max) [max, min] = [min, max]
    return new Promise(resolve => {
        const factor = max - min + 1
        const aleatory = parseInt(Math.random() * factor) + min
        resolve(aleatory)
    })
}

generateNumberBetween(1, 60)
    .then(num => num * 10)
    .then(numMultipleBy10 => `The number generated was ${numMultipleBy10}`)
    .then(console.log)
