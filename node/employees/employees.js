const axios = require('axios');
const url = 'http://files.cod3r.com.br/curso-js/funcionarios.json';

const getGender = obj => obj.genero == 'F'; 
const getFromChina = obj => obj.pais == 'China'

const chineses = e => e.pais == 'China';
const woman = e => e.genero == 'F';
const lowerSalary = (previoesEmployee, currentEmployee) => {
    return previoesEmployee < currentEmployee ? previoesEmployee : currentEmployee
}

axios.get(url).then( response => {
    const employees = response.data;
    
    //My resolution
    const femalesFromChina = employees.filter(getGender).filter(getFromChina)
    const result = femalesFromChina.reduce((previousValue,currentValue) => {
        if (previousValue.salario > currentValue.salario) {
            return currentValue
        }
        return previousValue        
    })
    console.log(`The woman from China with the lower salary is ${result.nome} ${result.sobrenome}`);

    //Suggested resolution
    const employee = employees
        .filter(chineses)
        .filter(woman)
        .reduce(lowerSalary)
    console.log(employee);
});