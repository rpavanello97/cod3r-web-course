//ES8: Object.values/Object.entries
const obj = { a: 1, b: 2, c: 3 }
console.log(Object.values(obj));
console.log(Object.entries(obj));

//Improviments on literal notation
const name = 'Rafael';
const person = {
    name,
    ola() {
        return 'Hello everybody'
    }
}
console.log(person.name, person.ola());

//Class
class Animal {
    walk() {
        return 'Walking'
    }
}
class Dog extends Animal {
    bark() {
        return 'Au au au'
    }
}
console.log(new Dog().bark(), new Dog().walk());