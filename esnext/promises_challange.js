const fs = require('fs');
const path = require('path');

function displayContent(filePath) {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(filePath, (_, content) => {
                resolve(content.toString())
            })
        } catch (e) {
            reject(e)
        }
    })
}

const filePath = path.join(__dirname, 'dados.txt')

displayContent(filePath)
    .then(content => content.split('\r\n'))
    .then(content => content.join(','))
    .then(content => `The content from file is: ${content}`)
    .then(console.log)