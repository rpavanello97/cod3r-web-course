function tratarErroELancar(erro) {
    //throw new Error('Erro ao executar')
    //throw 10
    //throw true
    //throw 'Erro ao executar chamada'
    throw {
        nome: erro.name,
        msg: erro.message,
        date: new Date
    }
}

function imprimirNomeGritando(obj) {
    try {
        console.log(obj.name.toUpperCase() + "!!!")
    } catch (e) {
        tratarErroELancar(e)
    } finally {
        console.log('Final da execução')
    }
}

const obj = {nome: 'Roberto'} //Parar gerar o erro
//const obj = {name: 'Roberto'} //Chamar function corretamente
imprimirNomeGritando(obj)