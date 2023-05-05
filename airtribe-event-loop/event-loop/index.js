const fs = require('fs');
const {airQualityCallback, airQualityPromise} = require('./airQualityHelper');
let url = 'https://api.openaq.org/v2/latest';

console.log("hello");

for(let i=0;i<100;i++) {
  console.log("inside for loop");
}

const timeoutScheduled = Date.now();
setTimeout(function() {
  const delay = Date.now() - timeoutScheduled;
  console.log(`Inside the set timeout function with 0 ms delay, and i was executed in ${delay}`);
}, 0);

setTimeout(function() {
  console.log("Inside the set timeout function with 1000 ms delay");
}, 1000);

process.nextTick(function() {
  console.log("Inside the next tick is the highest prioirty and would be executed first");
  const nows = Date.now();
  while(Date.now() - nows < 10000) {
    //doing nothing
  }
})


fs.readFile('./input.txt', (err, data) => {
  console.log('data is being read ' ,data);
});

setImmediate(function() {
  console.log("Inside the set immediate, this should also be executed after process.nextTick");
})

console.log("end");