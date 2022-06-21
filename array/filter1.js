//Pass through the original array and transform the data into a new array. The filter will return only what is true to the condition.
//The new array has NOT the same length as the original normally.
//It's necessary to put a return in the callback function to return correctly.

const productArray = [
    { name: 'Laptop', price: 2499, fragile: true },
    { name: 'iPad Pro', price: 4199, fragile: true },
    { name: 'Cup of Glass', price: 12.49, fragile: true },
    { name: 'Cup of Plastic', price: 9.99, fragile: false },
];

//All objects are returned.
console.log(productArray.filter(p => {
    return true
}));
//None objects are returned.
console.log(productArray.filter(p => {
    return false
}));

//Example using filter.
const isExpesive = p => p.price >= 500;
const isFragile = p => p.fragile;
const result = productArray.filter(isExpesive).filter(isFragile);
console.log(result);