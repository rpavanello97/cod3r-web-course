/**
 * Tagged templates - It process the template inside a function
 */
function tag(parts, ...values) {
    console.log(parts);
    console.log(values);
    return 'Another string'
}

const student = 'Rafa';
const situation = 'Approved'
console.log(tag `${student} are ${situation}`)