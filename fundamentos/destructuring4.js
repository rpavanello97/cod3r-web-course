//desestruturando com Array
function rand([min = 0, max = 1000]) {
    if (min > max ) [min, max ] = [max, min]
    const valor = Math.random() * (max - min) + min 
    return Math.floor(valor)
}

console.log(rand([40, 50])) //Passando 40 e 50 como parâmetros
console.log(rand([992])) //Passando somente valor min
console.log(rand([, 10])) //passando somente valor max
console.log(rand([])) //não passando nenuhum valor e assumindo valor padrão
//console.log(rand()) //Erro, não está na estrutura do destructuring