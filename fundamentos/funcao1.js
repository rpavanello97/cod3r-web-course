//funcao sem retorno
function imprimirSoma(a,b){
    console.log(a + b)
}

imprimirSoma(2, 3)
imprimirSoma(2) // a segunda variável fica como 'undefined'
imprimirSoma(2, 3, 4, 5, 2, 0) //pega os dois primeiros

//funcao com retorno
function soma(a, b = 1){ //variavel B vale 0 se nao tiver nenhum valor
    return a + b
}

console.log(soma(3, 3))
console.log(soma(3))