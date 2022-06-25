const moduleA = require('./ModuleA');
const moduleB = require('./ModuleB');

//Data from module A
console.log(moduleA.ola);
console.log(moduleA.welcome);
console.log(moduleA.seeYouSoon);
console.log(moduleA);

//Data from module B
console.log(moduleB.goodMorning);
console.log(moduleB.goodNight());
console.log(moduleB);