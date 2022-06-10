const fabricantes = ['Audi', 'Mercedes', 'BMW', 'Jaguar']

function imprimir(nome, indice) {
    console.log(`${indice}. ${nome}`)
}

fabricantes.forEach(imprimir) //Para cada indice do array ele chama a função 'imprimir'
fabricantes.forEach(fabricante => console.log(fabricante)) //chamando o nome dos fabricantes por função arrow