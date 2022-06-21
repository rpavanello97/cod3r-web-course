//Pass through the original array and transform the data into a new array. The filter will return only what is true to the condition.
//The new array has NOT the same length as the original normally.
//It's necessary to put a return in the callback function to return correctly.

//Implementing our own filter.
Array.prototype.filterTwo = function (callback) {
    const newArray = new Array;
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            newArray.push(this[i]);
        }
    }
    return newArray
}

const productArray = [
    { name: 'Laptop', price: 2499, fragile: true },
    { name: 'iPad Pro', price: 4199, fragile: true },
    { name: 'Cup of Glass', price: 12.49, fragile: true },
    { name: 'Cup of Plastic', price: 9.99, fragile: false },
];

//Example using filter.
const isExpesive = p => p.price >= 500;
const isFragile = p => p.fragile;
const result = productArray.filter(isExpesive).filter(isFragile);
const resultTwo = productArray.filterTwo(isExpesive).filterTwo(isFragile);
console.log(result);
console.log(resultTwo);