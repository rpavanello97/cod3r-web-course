{ 
    { 
        { 
            { 
                var sera = "Será???" 
            } 
        } 
    } 
}
console.log(sera) //var visível em todos os escopos 


function teste(){
    var local = 1234
    console.log(local)
}
teste() //variável 'local' visível somente no escopo da função
