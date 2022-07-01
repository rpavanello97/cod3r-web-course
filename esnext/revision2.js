//arrow function
const sum = (a, b) => a + b
console.log(sum(10, 5))

//Arrow function (this)
const lexico1 = () => console.log(this === exports)
const lexico2 = lexico1.bind({})
lexico1();
lexico2();

//Default parameter
function log(name = 'Rafael') {
    console.log(name)
}
log();
log('Rafael Bertolim Pavanello');

function getTotal(...numbers) {
    total = 0;
    numbers.forEach(n => total += n)
    return total
}
console.log(getTotal(1,2,3,4,5))