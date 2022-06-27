const fs = require('fs')
const path = __dirname + '/file.json'

//sync
const content = fs.readFileSync(path, 'utf-8');
console.log(content);

//async
fs.readFile(path, 'utf-8', (error, content) => {
    if (!!error) {
        throw 'error to read file'
    } else {
        const config = JSON.parse(content);
        console.log(`${config.db.host}:${config.db.port}`);
    }
});

//Import json file simpler
const json = require('./file.json');
console.log('Importing JSON directly: ',json.db);

//Importing a folder
fs.readdir(__dirname, (error, files) => {
    console.log('Files from folder...', files);
})

console.log('__dirname: ', __dirname);