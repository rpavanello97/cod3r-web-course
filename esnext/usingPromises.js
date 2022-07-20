//Without promises
const http = require('http');

const getStudents = (letter, callback) => {
    const url = `http://files.cod3r.com.br/curso-js/turma${letter}.json`
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let result = ''

            res.on('data', data => {
                result += data
            })

            res.on('end', () => {
                try {
                    resolve(JSON.parse(result))
                } catch (e) {
                    reject(e)
                }
            })
        })
    })
}

let names = [];
getStudents('A').then(students => {
    names = names.concat(students.map(s => `A: ${s.nome}`))
    getStudents('B').then(students => {
        names = names.concat(students.map(s => `B: ${s.nome}`))
        getStudents('C').then(students => {
            names = names.concat(students.map(s => `C: ${s.nome}`))
            //console.log(names);
        })
    })
})


/** Using promisses in a smarter way */
Promise.all([getStudents('A'), getStudents('B'), getStudents('B')])
    .then(result => [].concat(...result))
    .then(students => students.map(s => s.nome))
    .then(result => console.log(result))

getStudents('D').catch(error => console.log(error))
