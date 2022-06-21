//Pass through the original array and transform the data into a new array. 
//The new array has the same length as the original. 
//It's necessary to put a return in the callback function to return correctly.

Array.prototype.map2 = function(callback) {
    let newArr = new Array;
    for (var i=0; i < this.length; i++) {
        newArr.push(callback(this[i], i, this));
    }
    return newArr;
}

const car = [
    '{"name" : "Borracha","price": 3.45}',
    '{"name" : "Caderno","price": 13.90}',
    '{"name" : "Lapis","price": 41.22}',
    '{"name" : "Caneta","price": 7.50}',
]

//Return a array only with the prices.
const toObject = json => JSON.parse(json);
const getPrice = obj => obj.price;
const result = car.map(toObject).map(getPrice);
const result2 = car.map2(toObject).map2(getPrice);
console.log(result);
console.log(result2);