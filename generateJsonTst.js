let obj = [
    {
        numPublicacao: "12312",
        dtaInclusao: new Date(),
        dtaPublicacaoDOE: null,
        numDOE: "1354",
        situacao: "Pendente",
        descBotao: "Confirmar",
        codPublicacaoDOE: 1,
        numControlePublicacao: "",
        numPublicacao: "001/2022",
        situacao: "Pendente",
        indSituacao: 0,
    },
    {
        numPublicacao: "12312",
        dtaInclusao: new Date(),
        dtaPublicacaoDOE: null,
        numDOE: "1354",
        situacao: "Pendente",
        descBotao: "Visualizar",
        codPublicacaoDOE: 2,
        numControlePublicacao: "",
        numPublicacao: "001/2022",
        situacao: "Confirmada",
        indSituacao: 1,
    }
];

let acordaosPendentesObj = [
    { DRR: '01', numNADP: '22.0003080-1', numAutoInfracao: '', numAcordao: '', nomeAutuado: 'DAVID CIECIELSKI', cpfCnpj: '76.543.072/0001-80', numInscricaoEstadual: '10101407-02' },
    { DRR: '01', numNADP: '22.0003071-3', numAutoInfracao: '', numAcordao: '', nomeAutuado: 'RAFAEL BERTOLIM PAVANELLO', cpfCnpj: '76.543.072/0001-80', numInscricaoEstadual: '10101407-02' },
    { DRR: '17', numNADP: '22.0003072-5', numAutoInfracao: '', numAcordao: '', nomeAutuado: 'DAVID CIECIELSKI DASDAFG', cpfCnpj: '76.543.072/0001-80', numInscricaoEstadual: '10101407-02' },
    { DRR: '06', numNADP: '22.0003073-7', numAutoInfracao: '', numAcordao: '', nomeAutuado: 'DJALMA MENDES', cpfCnpj: '76.543.072/0001-80', numInscricaoEstadual: '10101407-02' },
]

const json = JSON.stringify(obj);
console.log(json);

