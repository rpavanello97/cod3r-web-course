function awaitFor(seconds = 2000) {
    console.log('seconds: ', seconds)
    return new Promise(function (resolve) {
        setTimeout(() => resolve(), seconds)
    })
}

// // /** Why this */
awaitFor(2000)
    .then(() => console.log('Executing promise 1'))
    .then(() => awaitFor(2000))
    .then(() => console.log('Executing promise 2'))
    .then(() => awaitFor(2000))
    .then(() => console.log('Executing promise 3'))

awaitFor(2000)
    .then(() => console.log('Executing promise 1'))
    .then(awaitFor)
    .then(() => console.log('Executing promise 2'))
    .then(awaitFor)
    .then(() => console.log('Executing promise 3'))

/** Is different than this? */
awaitFor(2000)
    .then(() => console.log('Executing promise 1'))
    .then(awaitFor(2000))
    .then(() => console.log('Executing promise 2'))
    .then(awaitFor(2000))
    .then(() => console.log('Executing promise 3'))