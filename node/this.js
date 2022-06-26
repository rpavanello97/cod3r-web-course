console.log('this === global: ',this === global);
console.log('this === module: ',this === module);

console.log('this === module.exports: ',this === module.exports);
console.log('this === exports: ',this === exports);

function logThis() {
    console.log('\nthis === exports inside a function', this === exports);
    console.log('this === module.exports inside a function', this === module.exports);
    
    console.log('this === global inside a function', this === global);
}
logThis();