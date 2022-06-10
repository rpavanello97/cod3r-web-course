//coleção dinâmica de pares chave/valor
const produto = new Object
produto.nome = 'Cadeira' //notação ponto
produto['marca do produto'] = 'Generica'
produto.preco = 220

console.log(produto)
delete produto.preco
delete produto['marca do produto']
console.log(produto)

const carro = {
    modelo: 'A4',
    valor: 89000,
    proprietario: { //objeto dentro do objeto
        nome: 'Raul',
        idade: 56,
        endereco: { //objeto dentro do objeto dentro do objeto
            logradouro: 'Rua ABC',
            numero: 123
        }
    },
    condutores: [{ //objeto em lista dentro do objeto
        nome: 'Junior',
        idade: 19
    }, {
        nome: 'Ana',
        idade: 42
    }],
    calcularValorSeguro: function(){
        //..
    }
}

carro.proprietario.endereco.numero = 1000
carro['proprietario']['endereco']['logradouro'] = 'Av Gigante'
console.log(carro)
//delete carro.condutores
console.log(carro.condutores)