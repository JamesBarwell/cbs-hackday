//https://mortgage-customers.t5.digital/
const https = require('https');
const cache = {};
const host = 'mortgage-customers.t5.digital'
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

  module.exports = {
    get: async () => {
        return await makeJsonGetRequest('/');
    }
  }