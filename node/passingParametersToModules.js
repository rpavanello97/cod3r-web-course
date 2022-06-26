//Exporting a function with parameter.
module.exports = function(...names) {
    return names.map(n => {
        return `Have a good week ${n}`;
    })
}