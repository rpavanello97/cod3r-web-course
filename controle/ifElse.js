const imprimirResultado = function(nota) {
    if (nota > 7 ) {
        console.log('Aprovado')
    } else {
        console.log('Reprovado')
    }
}

imprimirResultado(8)
imprimirResultado(6)
imprimirResultado(1)
imprimirResultado(10)
imprimirResultado('Epaaa!!!') //Cuidado com tipagem