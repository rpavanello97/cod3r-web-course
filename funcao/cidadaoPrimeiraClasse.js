// Função em JS é Firt-Class Object (Citizens)
//Higher-order function

//criar de forma literal
function fun1() { }

//Armazenar em uma variável 
const fun2 = function ( ) { }

//Armazenar em array
const array = [function (a, b) { return a + b}, fun1, fun2]
console.log(array[0](2, 3))

//Armazenar em um atributo de objeto
const obj = {}
obj.falar = function () { return 'Opaaa!'}
console.log(obj.falar())

//Passar função como parametro
function run(fun) {
    fun()
}
run(function () {console.log('Executando...')})

//Uma função pode retornar/conter outra função
function soma(a, b){
    return function(c){
        console.log(a + b + c )
    }
}
soma(4, 5)(10) //first call
const parcResult = soma(4,5) //second call
parcResult(10)