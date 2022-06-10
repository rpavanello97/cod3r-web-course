/** forEach -> Pass through the array like a `for`. It does not return a new array. */
const approved = ['Agatha', 'Aldo', 'Daniel', 'Raquel'];

approved.forEach(function(obj, indice) {
    console.log(`${indice + 1}) ${obj}`);
})

approved.forEach(name => console.log(name));

/** It is possible to pass a function as parameter */
const displayApproved = approve => console.log(approve);
approved.forEach(displayApproved);