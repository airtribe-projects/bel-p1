
//two microtasks and one macrotask
console.log("hello");
for(let i=0;i<100;i++) {
  console.log("inside for loop");
}
//process.nextTick will have the highest priority
process.nextTick(function() {
  console.log("Inside the next tick is the highest prioirty and would be executed first");
});
//promises have the second highest priority
Promise.resolve().then(() => {
  console.log("Promise is being resolved, lets see where it comes");
})
//this is a macrotask
setImmediate(() => {
  console.log('immediate');
});
//this is a macrotask too
const timeoutScheduled = Date.now();
setTimeout(function() {
  const delay = Date.now() - timeoutScheduled;
  console.log(`Inside the set timeout function with 0 ms delay, and i was executed in ${delay}`);
}, 0);

console.log("end");