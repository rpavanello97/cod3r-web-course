let isAtivo = false
console.log(isAtivo)

isAtivo = true
console.log(isAtivo)

//testar se é verdadeiro ou falso
isAtivo = 1
console.log(!!isAtivo) //nesse caso 1 representa true

console.log('os verdadeiros...')
console.log(!!3)
console.log(!!-1)
console.log(!!' ')
console.log(!!'texto')
console.log(!![])
console.log(!!{})
console.log(!!Infinity)
console.log(!!(isAtivo = true))

console.log('os falsos...')
console.log(!!0)
console.log(!!'')
console.log(!!null)
console.log(!!NaN)
console.log(!!undefined)
console.log(!!(isAtivo = false))

console.log('pra finalizar...')
console.log(!!('' || null || 0 || ' ')) //como tem pelo menos um verdadeiro, ele vai retornar true
console.log('' || null || 0 || 'abc') //sem a verificalção com !! ele retorna o unico valor verdadeiro

//preencher valor padrão
let nome = 'Rafael'
console.log(nome || 'Desconhecido')