console.log(Math.ceil(6.1)) //arredondar para cima

const obt1 = {}
obt1.nome = 'Bola'
//obt1['nome'] = 'Bola2'
console.log(obt1.nome)

function Obj(nome) {
    this.nome = nome
    this.exec = function(){
        console.log('Exec...')
    }
}

const obj2 = new Obj('Cadeira')
const obj3 = new Obj('Mesa')
console.log(obj2.nome)
console.log(obj3.nome)
obj3.exec()