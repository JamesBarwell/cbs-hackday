
const https = require('https');
const cache = {};
const host = 'auulhxjwti.execute-api.us-east-1.amazonaws.com'
function makeJsonPostRequest(path, body) {
    if (cache[path]) {
      return cache[path];
    }
  
    const options = {
      hostname: host,
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
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
  
      req.write(JSON.stringify(body));
      req.end();
    });
  }

  module.exports = {
    send: async (body) => {
        return await makeJsonPostRequest('/send', body);
    }
  }