const nome = 'Rebeca'
const concatenacao = 'Olá' + nome + '!'
//modo abaixo é uma maneira mais inteligente de fazer concatenação, é conhecido com templates
const template =`
    Olá ${nome}!`
console.log(concatenacao, template)

//expressões 
console.log(`1 + 1 = ${1+1}`)

//usando funções ()
const up = texto => texto.toUpperCase()
console.log(`Ei ... ${up('cuidado!!!')} carro a frente`)