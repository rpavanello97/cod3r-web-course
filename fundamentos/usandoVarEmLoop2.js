const funcs = []

for (var i=0; i < 10; i++){
    funcs.push(function() {
        console.log(i)
    })

}
//qualquer valor após o 'for' vai retornar com 10
funcs[2]()
funcs[8]()