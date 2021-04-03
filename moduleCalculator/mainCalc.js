// module.export;

const Calculator = require('./calc');
const mainCalc = new Calculator();
console.log(mainCalc.add(2, 5));

//exports
const calculator2 = require('./calc2');
console.log(calculator2.add(2, 5));
