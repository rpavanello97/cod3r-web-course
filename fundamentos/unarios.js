let num1 = 1
let num2 =2 

num1++ //Executa depois do que ++num1
console.log(num1)

--num1 //Executa antes do que num1++
console.log(num1)

console.log(++num1 === num2--) 
//resultado vai dar true, pois foi executado primeiro ++num1 depois foi feita a comparação,
// nesse momento os números eram iguais, posteriormente foi executado o num2--

console.log(num1 === num2) //agora eles são diferentes