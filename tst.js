let obj = [
    {
        numPublicacao: "12312",
        dtaInclusao: "12/01/12",
        dtaPublicacaoDOE: "12/01/13",
        numDOE: "1354",
        situacao: "Pendente",
        descBotao: "Confirmar"
    },
    {
        numPublicacao: "12312",
        dtaInclusao: "12/01/12",
        dtaPublicacaoDOE: "12/01/13",
        numDOE: "1354",
        situacao: "Pendente",
        descBotao: "Visualizar"
    }
];

const json = JSON.stringify(obj);
console.log(json);