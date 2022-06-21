//Pass through the original array and transform the data into a new array. 
//The new array has the same length as the original. 
//It's necessary to put a return in the callback function to return correctly.

const car = [
    '{"name" : "Borracha","price": 3.45}',
    '{"name" : "Caderno","price": 13.90}',
    '{"name" : "Lapis","price": 41.22}',
    '{"name" : "Caneta","price": 7.50}',
]

//Return a array only with the prices.
function returnPrices(arr) {
    arrayPrices = arr.map(json => {
        obj = JSON.parse(json);
        return obj.price;
    });
    
    console.log(arrayPrices);
}
returnPrices(car);

//Another resolution
const toObject = json => JSON.parse(json);
const getPrice = obj => obj.price;
const result = car.map(toObject).map(getPrice);
console.log(result);