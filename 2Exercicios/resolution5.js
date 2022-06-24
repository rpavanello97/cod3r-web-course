/**Crie uma função que receba dois números e retorne se o primeiro é maior ou igual ao segundo.*/

const greatherOrEqual = (n1, n2) => {
    if (typeof n1 != typeof n2) {
        return false;
    }

    return n1 >= n2 ? true : false;
};

console.log(greatherOrEqual(0, 0));
console.log(greatherOrEqual(0, "0"));
console.log(greatherOrEqual(5, 1));