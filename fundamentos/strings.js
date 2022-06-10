const escola = "Cod3r"

console.log(escola.charAt(4)) //Letra da posição 4
console.log(escola.charAt(5))
console.log(escola.charCodeAt(3)) //Pegar o valor na tabela ASCI
console.log(escola.indexOf('d')) //Pegar a posição de determinado caracter

console.log(escola.substring(1)) //Imprimir a posição específicada na função 
console.log(escola.substring(0, 3))

console.log('Escola '.concat(escola).concat("!")) //Concatenando
console.log('Escola '+escola+"!")
console.log(escola.replace(3, 'e')) //Alterando numero 3 da variável escola
console.log(escola.replace(/\d/, 'e')) //Regex
console.log(escola.replace(/\w/g, 'e')) //Regex

console.log('Ana,Maria,Pedro')
console.log('Ana,Maria,Pedro'.split(',')) //Gerar um array com split, usando a vírgula como separador
console.log('Ana,Maria,Pedro'.split(/,/)) //Usando Regex
