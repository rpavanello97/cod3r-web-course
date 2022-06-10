const soma = function (x , y) {
    return x + y
}

const imprimirResultado = function (a, b, operacao = soma) {
    console.log(operacao(a, b))
}

imprimirResultado(3, 4) //chamando funcao 'imprimirResultado', o calculo está sendo feito na function 'soma'
imprimirResultado(3, 4, soma) // mesma chamada, porém deixando explicito qual a operacao
imprimirResultado(3, 4, function (x, y) {
    return x - y 
}) //colocando outra function anonima como parametro de 'operacao'

imprimirResultado(3, 4, (x, y) => x * y) //colocando uma arrow function como paramêtro de 'operacao'

//Colocando uma function anonima dentro de um objeto criado como variável
const pessoa = {
    falar: function () {
        console.log('Opaaaa!')
    }
}

pessoa.falar()

