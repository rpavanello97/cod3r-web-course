// Escreva uma função que receba um valor booleano ou numérico. Se o parâmetro fornecido for booleano, o
// retorno da função deverá ser o inverso. Por exemplo, se a entrada for false, retornará true. Se o parâmetro for
// numérico, o retorno será o número inverso. Por exemplo, se for fornecido 1, o retorno será 1. Se o parâmetro
// de entrada não for de nenhum dos tipo acima, retorne "booleano ou número esperados, mas o parâmetro é do
// tipo ...".

function invertValueBooleanOrNumber(value) {
    let type = typeof value 
    
    if (type == 'boolean') return !value
    else if (type == 'number') return -value
    else return `Boolean or number expected, received ${typeof value}`
}

console.log(invertValueBooleanOrNumber(true));
console.log(invertValueBooleanOrNumber('6'));
console.log(invertValueBooleanOrNumber(-2000));
console.log(invertValueBooleanOrNumber('Coding'));