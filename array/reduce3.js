//Reduce has the ideia to agregate the values from a array. 

//Implementing our own reduce
Array.prototype.reduceTwo = function (callback, initialValue) {
    const innitialIndex = initialValue ? 0 : 1;
    let accumulator = initialValue || this[0];
    for (let i = innitialIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
}

const sum = (total, value) => total + value;
const nums = [1, 2, 3, 4, 5, 6];
console.log(nums.reduceTwo(sum,21));