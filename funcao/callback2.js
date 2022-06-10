notas = [7.7, 6.5, 5.2, 8.9, 3.6, 7.1, 9.0]

//Sem callback
const notasBaixas = []
for (let i in notas) {
    if (notas[i] < 7) {
        notasBaixas.push(notas[i])
    }
}
console.log(notasBaixas)



//Com callback
const notasBaixas1 = notas.filter(function(notas) {
    return notas < 7
})
console.log(notasBaixas1)


//Com callback e arrow
const notasMenoresQue7 = notas => notas < 7 //Após o '=>' o 'return' é implicito
const notasBaixas2 = notas.filter(notasMenoresQue7) 
console.log(notasBaixas2)