//Exemplo 1
let dobro = function(a) {
    return 2 * a 
}

dobro = (a) => {
    return 2 * a
}

dobro = a => 2 * a //'return' é automático nesse exemplo
console.log(dobro(Math.PI))


//Exemplo 2
let ola = function () {
    return 'Ola!!!'
}

ola = () => 'Ola!!!'
ola = _ => 'Ola!!!' //Possui um param
console.log(ola())
