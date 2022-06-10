//Usando arrow function, o 'this' não muda nesse exemplo abaixo
function Pessoa() {
    this.idade = 0

    setInterval(() => {
        this.idade++
        console.log(this.idade)
    }, 1000)
}

new Pessoa
