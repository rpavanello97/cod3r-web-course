///////////////////////////////////////////////////////// EXERCICIO 1 ////////////////////////////////////////////
//Crie uma função que dado dois valores (passados como parâmetros) mostre no console a soma, subtração,
//multiplicação e divisão desses valores.
/*
function operacaoes(num1, num2) {
    soma = num1 + num2
    sub = num1 - num2
    mult = num1 * num2
    divi = (num1/num2)

    console.log(`O resultado das operações de ${num1} e ${num2} é: \nSoma:${soma} \nSubtração:${sub} \nMultiplicação:${mult} \nDivisão:${divi}`)
}
Operacaoes(10,2)


///////////////////////////////////////////////////////// EXERCICIO 2 ////////////////////////////////////////////
//Os triângulos podem ser classificados em 3 tipos quanto ao tamanho de seus lados:
//Equilátero: Os três lados são iguais. Isósceles: Dois lados iguais. Escaleno: Todos os lados são diferentes.
//Crie uma função que recebe os comprimentos dos três lados de um triângulo e retorne sua classificação quanto
//ao tamanho de seus lados. (Neste exemplo deve-se abstrair as condições matemáticas de existência de um
//triângulo).

function classificarTriangulos(lado1, lado2, lado3) {
    debugger;
    if (lado1 == lado2 && lado1 == lado3){
        console.log("Esse triângulo é Equilátero")
    } else if (lado1 == lado2 || lado2 == lado3 || lado1 == lado3) {
        console.log("Esse triângulo é Isósceles")
    } else {
        console.log("Esse triângulo é Escaleno")
    }
}
classificarTriangulos(7,8,7)
classificarTriangulos(7,7,7)
classificarTriangulos(7,8,9)


///////////////////////////////////////////////////////// EXERCICIO 3 ////////////////////////////////////////////
//Crie uma função que recebe dois parâmetros, base e expoente, e retorne a base elevada ao expoente.

function calcularExponencial(base, expo) {
    var resultadoExpoente = Math.pow(base, expo)
    console.log(resultadoExpoente)
    //metodo novo
    resultadoExpoente = base ** expo
}
calcularExponencial(3,2)

///////////////////////////////////////////////////////// EXERCICIO 4 ////////////////////////////////////////////
//Crie uma função que irá receber dois valores, o dividendo e o divisor. A função deverá imprimir o resultado
//e o resto da divisão destes dois valores.

function restoDivisao(dividendo, divisor) {
    restoDivisao = dividendo % divisor
    console.log(`O resultado do resto da divisão é: ${restoDivisao}`)
    //Modo antigo: console.log("Resultado: " + Math.floor(dividendo/divisor));
}
restoDivisao(11,2)*/

///////////////////////////////////////////////////////// EXERCICIO 5 ////////////////////////////////////////////
//Lidar com números em JavaScript pode dar muita dor de cabeça. Você já viu o que acontece quando faz o
//seguinte comando no console: console.log(0.1 + 0.2); O resultado será: 0.30000000000000004. Outra coisa
//importante de observar, é o fato que o ponto é utilizado no lugar da vírgula e vice versa. Com isso, vamos fazer
//um exercício simples para mostrar dinheiro sempre da forma correta. Desenvolva uma função JavaScript para
//que ela receba um valor como 0.30000000000000004 e retorne R$0,30 (observe a vírgula e o ponto).