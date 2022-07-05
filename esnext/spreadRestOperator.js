/**
 * Operator ... rest(juntar)/spread(espalhar)
 * To use 'rest' as function parameter
 */

//To use spread as object 
const func = { name: 'Rafael', salary: 20000.00 }
const clone = { active: true, ...func }
console.log(clone);

//To use spread as array
const groupA = [ 'John', 'Peter', 'Gloria']
const finalGroup = ['Mary', ...groupA, 'Rafael']
console.log(finalGroup);