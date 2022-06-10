let comparaComThis = function(param) {
    console.log(this === param)
}
comparaComThis(global)

let obj = {}
comparaComThis = comparaComThis.bind(obj)
comparaComThis(global) 
comparaComThis(obj)

let comparaComThisArrow = (param) => console.log(this === param)
comparaComThisArrow(global) //Com function arrow o this não é o global
comparaComThisArrow(module.exports) //module.exports é o this na function arrow

comparaComThisArrow = comparaComThisArrow.bind(obj) //Tentando mudar o this da arrow function
comparaComThisArrow(obj) //o this não muda para 'obj'
comparaComThisArrow(module.exports)