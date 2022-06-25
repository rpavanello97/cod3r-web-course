//this and exports are another ways to put value in module.exports
console.log(module.exports === this);
console.log(module.exports === exports);

this.a = 1;
exports.b = 2;
module.exports.c = 3;

exports = null;
console.log(module.exports);

exports = {
    name: 'Test'
}
console.log(module.exports);

module.exports = {
    public: true
}