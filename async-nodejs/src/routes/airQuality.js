const airQuality = require('express').Router();
const bodyParser = require('body-parser');
const URLSearchparams = require('url-search-params');
const { airQualityCallback, airQualityPromise } = require('../controllers/airQualityController');

airQuality.use(bodyParser.urlencoded({ extended: false }));
airQuality.use(bodyParser.json());

let url = 'https://api.openaq.org/v2/latest';

// understanding callbacks
airQuality.get('/:cityName/callback', (req, res) => {
  let cityName = req.params.cityName;
  const searchParams = new URLSearchparams({city: cityName});
  airQualityCallback(`${url}?${searchParams}`, function (err, resp) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(resp);
    }
  });
});

// understanding promises
airQuality.get('/:cityName/promise', (req, res) => {
  let cityName = req.params.cityName;
  const searchParams = new URLSearchparams({city: cityName});
  airQualityPromise(`${url}?${searchParams}`).then(resp => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(resp);
  }).catch(err => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: err });
  });
});

// understanding async await
airQuality.get('/:cityName/asyncAwait', async (req, res) => {
  let cityName = req.params.cityName;
  const searchParams = new URLSearchparams({city: cityName});
  try {
    let resp = await airQualityPromise(`${url}?${searchParams}`);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(resp);
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: err });
  }
});

// understanding callback hell
airQuality.get('/callbackHell', (req, res) => {
  let payload = { page: 1 };
  const searchParams = new URLSearchparams(payload);
  let totalResults = [];
  airQualityCallback(`${url}?${searchParams}`, function (err, resp) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      payload.page = payload.page + 1;
      const searchParams2 = new URLSearchparams(payload);
      airQualityCallback(`${url}?${searchParams2}`, function (err, resp2) {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          payload.page = payload.page + 1;
          const searchParams3 = new URLSearchparams(payload);
          airQualityCallback(`${url}?${searchParams3}`, function (err, resp3) {
            if (err) {
              res.status(500).json({ error: err });
            } else {
              totalResults.push(resp);
              totalResults.push(resp2);
              totalResults.push(resp3);
              res.status(200).json(totalResults);
            }
          });
        }
      });
    }
  })
});

// understanding async await
airQuality.get('/asyncAwait', async (req, res) => {
  let totalResults = [];
  try {
    let payload = { page: 1 };
    const searchParams = new URLSearchparams(payload);
    let resp1 = await airQualityPromise(`${url}?${searchParams}`);
    payload.page = payload.page + 1;
    const searchParams2 = new URLSearchparams(payload);
    let resp2 = await airQualityPromise(`${url}?${searchParams2}`);
    payload.page = payload.page + 1;
    const searchParams3 = new URLSearchparams(payload);
    let resp3 = await airQualityPromise(`${url}?${searchParams3}`);
    totalResults.push(resp1);
    totalResults.push(resp2);
    totalResults.push(resp3);
    res.status(200).json(totalResults);
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: err });
  }
});


// multiple promises
airQuality.get('/multiplePromises', async (req, res) => {
  let payload = { page: 1 };
  const searchParams = new URLSearchparams(payload);
  let payload2 = { page: 2 };
  const searchParams2 = new URLSearchparams(payload2);
  let payload3 = { page: 3 };
  const searchParams3 = new URLSearchparams(payload3);
  let promise1 = airQualityPromise(`${url}?${searchParams}`);
  let promise2 = airQualityPromise(`${url}?${searchParams2}`);
  let promise3 = airQualityPromise(`${url}?${searchParams3}`)
  Promise.all([promise1, promise2, promise3]).then((values) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(values);
  }).catch(err => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: err });
  });
});

module.exports = airQuality;