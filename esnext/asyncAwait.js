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

/** ES8 Resourse 8 */
/** Simplify promises use */
let getStudentsAsync = async () => {
    const ta = await getStudents('A');
    const tb = await getStudents('B');
    const tc = await getStudents('C');
    return [].concat(ta, tb, tc)
}

getStudentsAsync()
    .then(result => result.map(r => r.nome))
    .then(result => console.log(result))