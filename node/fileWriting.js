const fs = require('fs');

const product = {
    name: 'iPhone 13',
    price: 6999,
    category: 'Smartphones'
}

fs.writeFile(__dirname+'/fileWritingGenerated.json', JSON.stringify(product), err => {
    console.log(err || 'File generated success');
} )