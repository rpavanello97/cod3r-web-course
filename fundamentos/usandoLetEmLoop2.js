const funcs = []

for (let i=0; i < 10; i++){
    funcs.push(function() {
        console.log(i)
    })

}
//vai retornar o valor exato na qual foi gravado no 'for'
funcs[2]()
funcs[8]()