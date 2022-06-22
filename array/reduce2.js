const students = [
    { name: 'John', grade: 7.3, colleger: false },
    { name: 'Marie', grade: 9.2, colleger: true },
    { name: 'Pedro', grade: 9.8, colleger: false },
    { name: 'Anne', grade: 8.7, colleger: true },
]

//Are All students collegers?
const result = students.map(s => s.colleger).reduce((acc, cur) => acc && cur);
console.log(result);

//Are some student colleger?
const resultTwo = students.map(s => s.colleger).reduce((acc, cur) => acc || cur);
console.log(resultTwo);

//Another resolution to the same problem
const checkAllCollegers = (result, student) => result && student;
console.log(students.map(s => s.colleger).reduce(checkAllCollegers));
const checkSomeColleger = (res, stud) => res || stud;
console.log(students.map(s => s.colleger).reduce(checkSomeColleger));
