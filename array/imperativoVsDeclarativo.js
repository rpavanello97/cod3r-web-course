const students = [
    { name: 'John', grade: 7.3, colleger: false },
    { name: 'Marie', grade: 9.2, colleger: true },
    { name: 'Pedro', grade: 9.8, colleger: false },
    { name: 'Anne', grade: 8.7, colleger: true },
];

//Imperativo
let totalOne = 0;
for (let i=0; i < students.length; i++) {
    totalOne += students[i].grade; 
}
console.log(totalOne);

//Declarativo
const getGrade = students => students.grade;
const sum = (total, currently) => total + currently;
const totalTwo = students.map(getGrade).reduce(sum);
console.log(totalTwo);