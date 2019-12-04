const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  putput: process.stdout
});

rl.on('line', (answer) => {
  console.log(answer.split('').reverse().join(''));
});
