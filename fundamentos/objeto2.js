console.log(typeof Object) //retorno como uma 'função'
console.log(typeof new Object) //retorna como um 'objeto'

const Cliente = function() {}
console.log(typeof Cliente) //retorno como uma 'função'
console.log(typeof new Cliente) //retorna como um 'objeto'

class Produto {} //ES 2015 (ES6)
console.log(typeof Produto) //A classe retorna como 'função'
console.log(typeof new Produto()) //A classse retorna como 'object'