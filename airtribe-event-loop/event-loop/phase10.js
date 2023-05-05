console.log('stack [1]');
setTimeout(() => console.log('macro [2]'), 0);
setTimeout(() => console.log('macro [3]'), 0);

const p = Promise.resolve();
for(let i=0;i<3;i++) {
  p.then(() => {
    setTimeout(() => {
      console.log('macro [4]');
      setTimeout(() => console.log('macro [5]'), 0);
      p.then(() => console.log('micro [6]'));
    }, 0);
    console.log('micro [7]');
  });
}

console.log('stack [8]');