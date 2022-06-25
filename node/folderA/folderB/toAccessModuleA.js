//To work correctly in Linux, it's necessary to respect the camelCase
const moduleA = require('../../ModuleA');
console.log(moduleA.ola);

//It created a folder inside node_module called 'saudation'. It will search the file index.js to import
const saudation = require('saudation'); 
console.log(saudation.hello);

//There are options of import modules directly from NodeJS.
const http = require('http');
http.createServer((req,res) => {
    res.write('Server running on port 8000');
    res.end();
}).listen(8000);
