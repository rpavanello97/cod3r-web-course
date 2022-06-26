const counterOne = require('./instance-single');
const counterTwo = require('./instance-single');

const counterThree = require('./instance-multiples')();
const counterFour = require('./instance-multiples')();

counterOne.inc();
counterOne.inc();
//It will increment counterOne and counterTwo, because it return the same object.
console.log(counterOne.value,counterTwo.value);

counterThree.inc();
counterThree.inc();
//It will increment counterThree, because it return the other object's instance.
console.log(counterThree.value,counterFour .value);
