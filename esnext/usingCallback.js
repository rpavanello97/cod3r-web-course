//Without promises
const http = require('http');

const getStudents = (letter, callback) => {
    const url = `http://files.cod3r.com.br/curso-js/turma${letter}.json`
    http.get(url,res => {
        let result = ''

        res.on('data', data => {
            result += data
        })

        res.on('end', () => {
           callback(JSON.parse(result))
        })
    })
}

let names = [];
getStudents('A', students => {
    names = names.concat(students.map(s => `A: ${s.nome}`))
    getStudents('B', students => {
        names = names.concat(students.map(s => `B: ${s.nome}`))
        getStudents('C', students => {
            names = names.concat(students.map(s => `C: ${s.nome}`))
            console.log(names);
        })
    })
})
