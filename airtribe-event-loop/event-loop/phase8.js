const {airQualityCallback, airQualityPromise} = require('./airQualityHelper');
let url = 'https://api.openaq.org/v2/latest';
let fs = require('fs');

console.log("hello");

for(let i=0;i<100;i++) {
  console.log("inside for loop");
}

process.nextTick(function() {
  console.log("Inside the next tick is the highest prioirty and would be executed first");
  let nows = Date.now();
  while(Date.now() - nows < 10) {
  }
});

fs.readFile('./input.txt', function(data) {
  for(let i = 0; i<10; i++) {
    process.nextTick(function() {
      console.log("Next tick inside the reading the input file callback");
    });
    console.log(`Data is being read ${data}`);
    setTimeout(function() {
      console.log("Set timeout inside the reading the input file callback");
    }, 10);
  }
});


airQualityCallback(url, (err, data) => {
  console.log(`callback is being called and data is ${data}`);
});

async function getData() {
  let data = await airQualityPromise(url);
  console.log(`Ha we are getting the data via async await ${data}`);
}

Promise.resolve().then(() => {
  console.log("Promise is being resolved, lets see where it comes");
});

airQualityPromise(url).then((data) => {
  console.log(`Promise is being resolved, and data is ${data}`);
}).catch(err => {
  console.log(err);
});


for(let i=0;i<1000;i++) {
  Promise.resolve().then((data) => {
    console.log("Promise is being resolved, lets see where it comes");
  }).catch(err => {
    console.log(err);
  });
}

setImmediate(() => {
  console.log('immediate');
});

const timeoutScheduled = Date.now();
setTimeout(function() {
  const delay = Date.now() - timeoutScheduled;
  console.log(`Inside the set timeout function with 0 ms delay, and i was executed in ${delay}`);
}, 0);

getData();
console.log("end");