function soBoaNoticia(nota) {
    if (nota >=7) {
        console.log('Aprovado com ' + nota)
    }
}
soBoaNoticia(9)
soBoaNoticia(6.9)

function seForVerdadeEuFalo(valor) {
    if (valor) {
        console.log('É verdade... ' + valor)
    }
}
//todos retonar como falso
seForVerdadeEuFalo() //undefined
seForVerdadeEuFalo(null)
seForVerdadeEuFalo(undefined)
seForVerdadeEuFalo(NaN)
seForVerdadeEuFalo('')
seForVerdadeEuFalo(0)

//todos retornam verdadeiro
seForVerdadeEuFalo(-1)
seForVerdadeEuFalo(' ')
seForVerdadeEuFalo('?')
seForVerdadeEuFalo([])
seForVerdadeEuFalo([1, 2, 4])
seForVerdadeEuFalo({})