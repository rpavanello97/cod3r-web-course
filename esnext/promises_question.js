function awaitFor(seconds = 2000) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(), seconds)
    })
}

// /** Why this */
awaitFor(2000)
    .then(() => console.log('Executing promise 1'))
    .then(() => awaitFor(2000))
    .then(() => console.log('Executing promise 2'))

// awaitFor(2000)
//     .then(() => console.log('Executing promise 1'))
//     .then(awaitFor)
//     .then(() => console.log('Executing promise 2'))

// /** Is different than this? */
// awaitFor(2000)
//     .then(() => console.log('Executing promise 1'))
//     .then(awaitFor(2000))
//     .then(() => console.log('Executing promise 2'))