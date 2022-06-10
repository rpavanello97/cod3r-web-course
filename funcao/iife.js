// IIFE => Immediately Invoked Function Expression
// É o conceito de definir uma função, na qual as variáveis e expressões dela não ficam disponível 
//no contexto global do browser. ex:window

(function(){
    console.log("Será executada na hora da inicialização")
    console.log("Foge do escopo mais abrangente!")
})()