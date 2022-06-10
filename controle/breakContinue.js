const num = [1,2,3,4,5,6,7,8,9,10 ]

//sai do for
for (x in num) {
    if ( x == 5){
        break
    }
    console.log(`${x} = ${num[x]}`)
}

//continua no for
for (y in num) {
    if ( y == 5){
        continue
    }
    console.log(`${y} = ${num[y]}`)
}

//Rotular (não é muito usado)
forExterno: for (a in num) {
    for (b in num) {
        if (a == 2 && b == 3) break forExterno
        console.log(`Par = ${a}, ${b}`)
    }
}