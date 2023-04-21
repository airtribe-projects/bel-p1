const { default: axios } = require("axios");


// axios -> used to make thrid party calls

// two mechanisms of making async calls -> callback and promises

// axios -> promises

// url .then .catch

function airQualityCallback(url, callback) {
  axios.get(url).then(resp => {
    callback(null, resp.data);
  }).catch(err => {
    callback(err, null);
  });
}

function airQualityPromise(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(resp => {
      return resolve(resp.data);
    }).catch(err => {
      return reject(err);
    });
  });
}

module.exports = {
  airQualityCallback,
  airQualityPromise
}