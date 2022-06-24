/** Crie uma função que recebe um número (de 1 a 12 e retorne o mês correspondente como uma string. Por
exemplo, se a entrada for 2, a função deverá retornar "fevereiro", pois este é o 2° mês. */

const getMonthString = n => {
    switch (n) {
        case 1:
            return 'January'
        case 2:
            return 'Febuary'
        case 3:
            return 'March'
        case 4:
            return 'April'
        case 5:
            return 'May'
        case 6:
            return 'June'
        case 7:
            return 'July'
        case 8:
            return 'August'
        case 9:
            return 'September'
        case 10:
            return 'October'
        case 11:
            return 'Noveber'
        case 12:
            return 'December'
    }
}

function getMonthStringTwo(numero) {
    const maping = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
        'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    return maping[--numero];
}

console.log(getMonthString(1));
console.log(getMonthStringTwo(4));