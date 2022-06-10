//Arguments é um array com todas as variáveis que foram passadas como parâmetro para function

function soma() {
    let soma = 0
    for (i in arguments) {
        soma += arguments[i]
    }
    return soma
}

console.log(soma())
console.log(soma(3))
console.log(soma(1.1, 2.2, 3.3))

console.log(soma(1.1, 2.2, 3.3, "teste"))
console.log(soma('a' , 'b', 'c'))

