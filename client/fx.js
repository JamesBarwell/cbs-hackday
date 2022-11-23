//https://github.com/fawazahmed0/currency-api

const https = require('https');
const validCurrencies = require('./fx-valid-currencies.json');

const host = "cdn.jsdelivr.net";
const pathPrefix = "/gh/fawazahmed0/currency-api@1";

const cache = {}

function validateDate(date) {
  if (date.match(/\d{4}-\d{2}-\d{2}/) === null) {
    throw new Error('Did not recognise date string: ' + date);
  }
}

function validateSymbol(symbol) {
  if (!validCurrencies[symbol]) {
    throw new Error('Did not recognise currency symbol: ' + symbol);
  }
}

function makeJsonGetRequest(path) {
  if (cache[path]) {
    return cache[path];
  }

  const options = {
    hostname: host,
    port: 443,
    path: path,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', d => {
        data += d;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          cache[path] = json;
          resolve(json);
        } catch (err) {
          reject('Error parsing JSON: ' + err.toString());
        }
      });
    });

    req.on('error', (err) => {
      return reject('Error requesting API data: ' + err.toString());
    });

    req.end();
  });
}

async function getRates(symbol, date) {
  validateSymbol(symbol);
  validateDate(date);
  const path = `${pathPrefix}/${date}/currencies/${symbol}.json`;
  return makeJsonGetRequest(path);
}

async function getRatesForDateRange(symbol, startDateString, endDateString) {
  validateSymbol(symbol);
  validateDate(startDateString);
  validateDate(endDateString);

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const oneDay = 1000 * 60 * 60 * 24;

  const diff = endDate.getTime() - startDate.getTime();
  const diffDays = Math.round(diff / oneDay) + 1; // +1 for inclusive

  const countDate = new Date(startDate);

  const data = [];

  for (let i = 0; i < diffDays; i++) {
    const currentDateFormatted = countDate.toISOString().split('T')[0];
    const result = await getRates(symbol, currentDateFormatted);
    data.push(result);

    countDate.setDate(countDate.getDate() + 1)
  }

  return data;
}

async function getRelativeRate(baseSymbol, compareSymbol, date) {
  validateSymbol(baseSymbol);
  validateSymbol(compareSymbol);
  validateDate(date);

  const data = await getRates(baseSymbol, date);
  return data[baseSymbol][compareSymbol];
}

async function getRelativeRateForDateRange(
  baseSymbol,
  compareSymbol,
  startDateString,
  endDateString
) {
  validateSymbol(baseSymbol);
  validateSymbol(compareSymbol);
  validateDate(startDateString);
  validateDate(endDateString);

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const oneDay = 1000 * 60 * 60 * 24;

  const diff = endDate.getTime() - startDate.getTime();
  const diffDays = Math.round(diff / oneDay) + 1; // +1 for inclusive

  const countDate = new Date(startDate);

  const data = [];

  for (let i = 0; i < diffDays; i++) {
    const currentDateFormatted = countDate.toISOString().split('T')[0];
    const result = await getRelativeRate(baseSymbol, compareSymbol, currentDateFormatted);
    data.push({
      date: currentDateFormatted,
      result: result,
    });

    countDate.setDate(countDate.getDate() + 1)
  }

  return data;
}

module.exports = {
  getRates,
  getRatesForDateRange,
  getRelativeRate,
  getRelativeRateForDateRange,
};
