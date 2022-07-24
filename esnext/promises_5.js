function itWorkOrNot(value, errorChance) {
    return new Promise((resolve, reject) => {
        try {
            console.lo('ads')
            if (Math.random() < errorChance) {
                reject('Error occured')
            } else {
                resolve(value)
            }
        } catch (e) {
            reject(e)
        }
    })
}

itWorkOrNot('Testing', 0.5)
    .then(v => `Value: ${v}`)
    .then(
        v => console.log(v),
        err => console.log(`Especif error: ${err}`)
    )
    .then(() => console.log('Almost done!'))
    .catch(err => console.log(`General Error: ${err}`))
    .then(() => console.log('Done!'))
