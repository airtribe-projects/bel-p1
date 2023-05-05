const fs = require('fs');

console.log('start');

process.nextTick(() => {
  console.log('First next tick callback executed');
});

Promise.resolve('resolved').then((result) => {
  console.log(`First promise was ${result}`);
});

fs.readFile("./input.txt", (error) => {
  setTimeout(() => {
    console.log('Timeout callback executed');
  });

  setImmediate(() => {
    console.log('Immediate callback executed');
  });

  if(!error) {
    console.log('File read!');
  }

  Promise.resolve('resolved').then((result) => {
    console.log(`Second promise was ${result}`);
  });

  process.nextTick(() => {
    console.log('Second next tick callback executed');
  });

});

Promise.resolve('resolved').then((result) => {
  console.log(`Third promise was ${result}`);
});

process.nextTick(() => {
  console.log('Third next tick callback executed');
});

setTimeout(() => {
  console.log('Timeout callback executed outside');
});

setImmediate(() => {
  console.log('Immediate callback executed outside');
});

console.log('end');

