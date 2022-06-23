//Reduce has the ideia to agregate the values from a array. 

const students = [
    { name: 'John', grade: 7.3, colleger: false },
    { name: 'Marie', grade: 9.2, colleger: true },
    { name: 'Pedro', grade: 9.8, colleger: false },
    { name: 'Anne', grade: 8.7, colleger: true },
]

console.log(students);
const results = students.map(e => e.grade).reduce(function (acumulator, atual) {
    console.log(acumulator, atual)
    return acumulator + atual
}, 0) //This zero is the initial value to 'acumulator'.

console.log(results);
