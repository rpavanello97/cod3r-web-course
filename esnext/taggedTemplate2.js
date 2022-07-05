function currency(parts, ...values) {
    const result = [];
    values.forEach((value, index) => {
        value = isNaN(value) ? value : `R$${value.toFixed(2)}`
        result.push(parts[index], value)
    })
    return result.join('') 
}

const price = 29.9;
const priceThreeTimes = 11;
console.log(currency `1x de ${price} ou 3x de ${priceThreeTimes}`);