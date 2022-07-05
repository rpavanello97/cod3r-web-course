//It doesn`t accept repetition and doesn`t have a index.
const clubs = new Set();
clubs.add('Vasco');
clubs.add('São Paulo').add('Corinthians').add('Palmeiras');
clubs.add('Flamengo');
clubs.add('Vasco');

console.log(clubs);
console.log(clubs.size);
console.log(clubs.has('Vasco'));
console.log(clubs.has('vasco'));
clubs.delete('Flamengo');
console.log(clubs.has('Flamengo'));

const names = ['Raquel', 'Lucas', 'Julia', 'Lucas']
const namesSet = new Set(names);
console.log(namesSet);