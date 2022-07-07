//"For of" it is a for to show the values inside the block.
for (let letter of "Cod3r") {
    console.log(letter);
}

const ecmaSubject = ['Map','Set','Promisse'];
/** Example of (for in) it shows the index inside the block. */
for (let i in ecmaSubject) {
    console.log(i);
}

/** Example of 'for of'. It shows the value inside the block*/
for (let subject of ecmaSubject) {
    console.log(subject);
}

/** Example with a map */
const mapSubjects = new Map([
    ['Map', {aborded: true}],
    ['Set', {aborded: true}],
    ['Promise', {aborded: false}],
]);

for(let subject of mapSubjects) {
    console.log(subject);
}

for(let keys of mapSubjects.keys()) {
    console.log(keys);
}

for(let values of mapSubjects.values()) {
    console.log(values);
}

for (let [key, value] of mapSubjects.entries()) {
    console.log(key, value);
}

/** Example with "Set"  */
const s = new Set(['a', 'b', 'c']);
for (let letter of s) {
    console.log(letter);
}