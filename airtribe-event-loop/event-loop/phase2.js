console.log("hello");

for(let i=0;i<100;i++) {
  console.log("inside for loop");
}

process.nextTick(function() {
  console.log("Inside the next tick is the highest prioirty and would be executed first");
});

console.log("end");