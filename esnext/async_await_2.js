function generateNumberBetween(min, max, forbiddenNumbers) {
    if (min > max) [max, min] = [min, max]
    return new Promise((resolve, reject) => {
        const factor = max - min + 1
        const aleatory = parseInt(Math.random() * factor) + min
        if (forbiddenNumbers.includes(aleatory)) {
            reject('Number already used')
        } else {
            resolve(aleatory)
        }
    })
}

async function generateMegaSena(numberAmount, tries = 1) {
    try {
        const numbers = []
        for (let _ of Array(numberAmount).fill()) {
            numbers.push(await generateNumberBetween(1, 60, numbers))
        }
        return numbers
    } catch (e) {
        if (tries > 10) {
            throw 'It was wrong, sorry'
        } else {
            return generateMegaSena(numberAmount, tries + 1)
        }
    }
}

generateMegaSena(50)
    .then(console.log)
    .catch(console.log)