/** Using callback mode */
setTimeout(function () {
    console.log('Executing callback...')

    setTimeout(function () {
        console.log('Executing callback...')

        setTimeout(function () {
            console.log('Executing callback...')
        }, 2000)
    }, 2000)
}, 2000);

/** Using promise mode */
function awaitFor(seconds = 2000) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log('Executing promise')
            resolve()            
        }, seconds)
    })
}

awaitFor(3000)
    .then(() => awaitFor(3000))
    .then(() => awaitFor(3000))