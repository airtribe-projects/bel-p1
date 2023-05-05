//Example of one microtask (block code inside the microtask and others will be stalled) and one macrotask - timers

console.log("hello");

for(let i=0;i<100;i++) {
  console.log("inside for loop");
}

// microtask queue - highest priority
process.nextTick(function() {
  console.log("Inside the next tick is the highest prioirty and would be executed first");
  let nows = Date.now();
  while(Date.now() - nows < 1000) {

  }
});

//macrotask queue - timer
const timeoutScheduled = Date.now();
setTimeout(function() {
  const delay = Date.now() - timeoutScheduled;
  console.log(`Inside the set timeout function with 0 ms delay, and i was executed in ${delay}`);
}, 0);

console.log("end");