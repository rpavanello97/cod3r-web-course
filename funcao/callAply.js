//Demostrando modos de chamar function pelo "Call" e "Apply"

//criando a função
function getPreco(imposto = 0, moeda = "R$") {
    return `${moeda} ${this.preco * (1 - this.desc) * (1 + imposto)}`
}

//criando um objeto
const produto = {
    nome: "Notebook",
    preco: 4589,
    desc: 0.15,
    getPreco //invocando funcao criada anteriormente
}

//Se for chaamar a função no escopo global, é necessário popular as duas variáveis abaixo
global.preco = 20 
global.desc = 0.1
console.log(getPreco())
console.log(produto.getPreco()) //Chamando a função a partir do objeto produto, neste caso não é necessário atribuir valores as variáveis, pois ambas já tem

//Chamando função pelo metodo call e apply
const carro = { preco: 49990, desc: 0.20} //Não tem a função getpreco no objeto
console.log(getPreco.call(carro))
console.log(getPreco.apply(carro))

//colocando parâmetros na chamada call aplly
console.log(getPreco.call(carro, 0.17, "$")) //1º parâmetro é o escopo que pegará as variáveis, e restante dos parâmetros seguidos de "vírgula"
console.log(getPreco.apply(global, [0.17, "$"])) //1º parâmetro é o escopo que pegará as variáveis, e restante dos parâmetros deverá estar de dentro de um array