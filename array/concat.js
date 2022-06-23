//It is used to join/concat several arrays. 
const daughters = ['Bia', 'Cida', 'Josefina'];
const sons = ['Jose', 'Gabriel', 'Clement'];
const allKids = daughters.concat(sons);
console.log('All Kids', allKids);
console.log('Test each array separated', daughters, sons, allKids);

//Another example of concat
console.log([].concat([1, 2], [3, 4], 5, [[6, 7]]));
