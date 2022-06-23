const school = [
    {
        name: 'Group 1',
        student: [
            {
                name: 'Gustavo',
                grade: 8.1,
            },
            {
                name: 'Ana',
                grade: 9.3,
            },
        ]
    },
    {
        name: 'Group 2',
        student: [
            {
                name: 'Rebeca',
                grade: 8.9,
            },
            {
                name: 'Roberto',
                grade: 7.3,
            },
        ]
    },
];

const getGradeStudent = student => student.grade;
const getGradeFromGroup = group => group.student.map(getGradeStudent);

//It return the grades inside another array.
const gradeOne = school.map(getGradeFromGroup);
console.log('gradeOne, all grades from students: ', gradeOne);

//FlatMap will put all value in a single array.
Array.prototype.flatMap = function (callback) {
    return Array.prototype.concat.apply([], this.map(callback));
}

const gradeTwo = school.flatMap(getGradeFromGroup);
console.log('gradeTwo, all grades in a single array: ', gradeTwo);

//It is possible to get the same result than flat map with the code below.
console.log([].concat([8.1, 9.3], [8.9, 7.3]));