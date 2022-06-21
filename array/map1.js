//Pass through the original array and transform the data into a new array. 
//The new array has the same length as the original. 
//It's necessary to put a return in the callback function to return correctly.

const nums = [1, 2, 3, 4, 5]

//For with a purpose
let result = nums.map(function(e) {
    return e * 2
});
console.log(result, nums);

//It is possible to asign a function to map.
const sum10 = e => e + 10;
const triple = e => e * 3;
const toCurrency = e => `R$ ${parseFloat(e).toFixed(2).replace('.',',')}`;
result = nums.map(sum10).map(triple).map(toCurrency);
console.log(result);
