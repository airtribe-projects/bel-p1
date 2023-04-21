// Understanding basic callback
var myCallback = function(data) {
  console.log('got data: '+ data);
};

var usingItNow = function(callback) {
  callback('get it?');
};

usingItNow(myCallback);

// Understanding promise
var promiseWrappedMyCallback = function(data) {
  return new Promise((resolve, reject) => {
    resolve("got data: " + data);
  });
}

promiseWrappedMyCallback('get it?').then(response => {
  console.log(response);
}).catch(err => {
  console.log(err);
});

// Understanding async await
var asyncAwaitFunction = async function() {
  try {
    let result = await promiseWrappedMyCallback('get it?');
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

asyncAwaitFunction();
