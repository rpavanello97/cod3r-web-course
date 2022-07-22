const firstElement = arrayOrString => arrayOrString[0];
const lowerCase = str => str.toLowerCase();

let p = new Promise(function (resolve) {
    resolve(['Ana','Bia','Carlos','Daniel'])
});

p
    .then(firstElement)
    .then(firstElement)
    .then(lowerCase)
    .then(console.log)
