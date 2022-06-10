var numero = 1
{
    var numero = 2
    console.log('dentro =', numero)
}
console.log('fora =', numero)

//as duas saídas saídas ficaram com mesmo valor pois para variáveis declaradas como 'var' não tem diferença de escopo nos blocos
//verificar arquivo usandoLet1.js 