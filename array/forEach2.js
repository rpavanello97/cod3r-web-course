/** Implementing my our forEach */
Array.prototype.forEachTwo = function(callback) {
    for (var i=0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}

const approved = ['Agatha', 'Aldo', 'Daniel', 'Raquel'];

approved.forEachTwo(function(obj, indice) {
    console.log(`${indice + 1}) ${obj}`);
})