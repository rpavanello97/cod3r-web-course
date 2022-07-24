let prom = new Promise((resolve, reject) => {
    setTimeout(() => {
        let num = Math.random();
        if (num < .5) {
            resolve('Yay!');
        } else {
            reject(' Ohhh noooo!');
        }
    }, 3000)

});

const handleSuccess = (resolvedValue) => {
    console.log(resolvedValue);
};

const handleFailure = (rejectionReason) => {
    console.log(rejectionReason);
};

prom
    .then(v => v + ' NEW NEW')
    .then(handleSuccess, handleFailure);    