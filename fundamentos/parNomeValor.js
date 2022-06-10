// par nome/valor
const saudacao = 'Opa' //contexto léxico 1

function exec() {
    const saudacao = 'Falaaaa' //contexto léxico 1
    return saudacao
}

// Objetos são grupos aninhados de pares nome/valor
const cliente = {
    nome: 'Rafael',
    idade: 22,
    peso: 83,
    endereco: {
        logradouro: 'Av Iguaçu',
        numero: 2666
    }
}

console.log(saudacao)
console.log(exec())
console.log(cliente)