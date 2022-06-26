//It is necessary to import global module only once.
require('./global');

console.log(MyApp.salutation());

//The object is freezed, so this change will not happen.
MyApp.name = 'Eita!'
console.log(MyApp.name);