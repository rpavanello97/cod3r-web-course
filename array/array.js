/** All codes below are the same thing */
console.log(typeof Array, typeof new Array, typeof []);

let approved = new Array('Bia','Carlos','Ana');
console.log(approved);

/** Literal mode to declare */
approved = ['Bia','Carlos','Ana'];
console.log(approved[0]);
console.log(approved[1]);
console.log(approved[2]);
console.log(approved[3]);

/** Include in a specific position */
approved[3] = 'Paulo';

/** Include in the last position */
approved.push('Abia');
console.log(approved.length);

/** It is possible to push a new item in any position, like the example, position nine */
approved[9] = 'Rafael';
console.log(approved.length);
console.log(approved[8] === undefined);

console.log(approved);
/** Order by alphabetical order, it changes the original array  */
approved.sort();
console.log(approved);

/** Delete */
delete approved[1];
console.log(approved[1]);
console.log(approved[2]);

/** Deleting with splice. 
 * The firts argument is the indice.
 * The second is the position where action starts.
 * The third  add news items */
 approved = ['Bia', 'Carlos', 'Ana'];
approved.slice(1, 1, 'Element1', 'Element2');
console.log(approved);