function awaitFor(miliseconds = 2000) {
    console.log(miliseconds)
    return new Promise(function (resolve) {
        setTimeout(() => resolve(), miliseconds)
    })
}

// /** Why this */
// awaitFor(1500)
//     .then(() => console.log('Executing promise 1'))
//     .then(() => awaitFor(1500))
//     .then(() => console.log('Executing promise 2'))

// awaitFor(1500)
//     .then(() => {
//         console.log('Executing promise 1')
//         return 1500
//     })
//     .then(awaitFor)
//     .then(() => console.log('Executing promise 2'))

// /** Is different than this? */
awaitFor(1500)
    .then(() => console.log('Executing promise 1'))
    .then(awaitFor(1500))
    .then(() => console.log('Executing promise 2'))