let valor //não inicializada, nenhum valor nunca foi atribuido a ela
console.log(valor)

valor = null //ausência de valor. limpar referência da variável
console.log(valor)
//console.log(valor.toString()) //erro!

const produto = {}
console.log(produto.preco) //'preco' não está definido
console.log(produto)

produto.preco = 3.50
console.log(produto.preco)

produto.preco = undefined //evite atribuir undefined
console.log(!!produto.preco)
console.log(produto.preco)
// delete produto.preco //modo certo de excluir

produto.preco = null //sem preço
console.log(!!produto.preco)
console.log(produto)