const anonymous = process.argv.indexOf('--a') !== -1
// console.log(process.argv);
// console.log(anonymous);

if(anonymous) {
    process.stdout.write('Speak you anonymous!');
    process.exit();
} else {
    process.stdout.write('What is your name: ');
    process.stdin.on('data', data => {
        const name = data.toString().trim();

        process.stdout.write(`Fala ${name}!!\n`);
        process.exit();
    })
}