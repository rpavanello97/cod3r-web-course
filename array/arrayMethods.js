const pilots = ['Vettel', 'Alonso', 'Raikkonen', 'Massa'];

/** Removing the last one */
pilots.pop();
console.log(pilots);

/** Add in the last position */
pilots.push('Verstappen');
console.log(pilots);

/** Remove the firts item */
pilots.shift();
console.log(pilots);

/** Add in the first position */
pilots.unshift('Hamilton');
console.log(pilots);

/** With splice it is possible to add and remove elements */
/** Add. First argument indicates the index where the change starts. */
pilots.splice(2, 0, 'Bottas', 'Massa');
console.log(pilots);

/** Remove. */
pilots.splice(3, 1);
console.log(pilots);

/** Slice return a new array. The argument indicates the indice.s */
const somePilots = pilots.slice(2);
console.log(somePilots);

/** Getting elements from indice 1 until 3, as below */
const somePilotsTwo = pilots.slice(1, 4)
console.log(somePilotsTwo);