const valores = [7.7, 8.9, 6.3, 9.2]
console.log(valores[0], valores[3])
console.log(valores[4])

valores[4] = 10
console.log(valores[4])

console.log(valores)
console.log(valores.length) //verificar tamanho do array
valores.push({id: 3}, false, null, 'teste') //adicionar mais valores no array (pode ser adicionado qualquer tipo de variável)
console.log(valores)

console.log(valores.pop()) //excluir ultimo valor do array
delete valores [0] //excluir valor do array posição específica
console.log(valores)

console.log(typeof valores) //verificar tipo do array, retorna com o 'object'