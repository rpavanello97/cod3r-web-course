function awaitFor(seconds = 2000) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(), seconds)
    })
}

// awaitFor(2000)
//     .then(() => console.log('Executing promise 1'))
//     .then(() => awaitFor(2000))
//     .then(() => console.log('Executing promise 2'))
//     .then(() => awaitFor(2000))
//     .then(() => console.log('Executing promise 3'))

function returnValue() {
    return new Promise(resolve => {
        setTimeout(() => resolve(10), 5000)
    })
}

function returnValueFast() {
    return 20
}

async function execute() {
    const valueFast = await returnValueFast();
    
    const value = await returnValue();

    await awaitFor(1500);
    console.log(`Async/Await ${value}...`);

    await awaitFor(1500);
    console.log(`Async/Await ${value + 1}...`);

    await awaitFor(1500);
    console.log(`Async/Await ${value + 2}...`);

    return 13
}

execute().then(console.log)
