//Factory simples
//Função factory é utilizada como construtoras de objetos

function criarPessoa() {
    return {
        nome: 'Rafael',
        idade: '22',
        altura: '1.80'
    }
}

console.log(criarPessoa())