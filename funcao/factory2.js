//criar produto com nome, preço e desconto com valor fixo
function criarProduto(paramNome, paramPreco) {
    return  {
        Nome: paramNome,
        Preço: paramPreco,
        Desconto: '10%'
    }
}

console.log(criarProduto('Parafuso', '10'))

//Solução dada pelo curso
function criarProduto1(nome, preco) {
    return {
        nome,
        preco,
        desconto: 0.1
    }
}

console.log(criarProduto1('Notebook', 2199.20))
console.log(criarProduto1('iPhone', 5199.00))