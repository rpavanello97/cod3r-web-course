//Defining the functions
const stepOne = (context, next) => {
    context.nameOne = 'Step One Passed',
    context.arr[context.arr.length] = '1'
    next();
}

const stepTwo = (context, next) => {
    context.nameTwo = 'Step Two Passed',
    context.arr[context.arr.length] = '2'
    next();
}

const stepThree = context => {
    context.nameThree = 'Step Three Passed';
    context.arr[context.arr.length] = '3'
}

//The main function that is going to call the other funcions.
const executeAll = (context, ...middlewares) => {
    const executeSteps = index => {
        middlewares && index < middlewares.length &&
            middlewares[index](context, () => executeSteps(index + 1));
    }
    executeSteps(0);
}

//Executing
const context = {
    arr: []
};
executeAll(context, stepOne, stepTwo, stepThree);
console.log('context: ', context);
