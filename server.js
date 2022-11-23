const path = require('path');
const express = require('express')
const mustacheExpress = require('mustache-express');
const axios = require('axios');

const app = express()

const port = 3000

app.use('/static', express.static(path.join(__dirname, '/static')))
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());


app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home page',
    name: 'test',
  });
})

app.get('/chart-data', async(req, res) => {
  const data = [
    {
      month: 0,
      amount: 0,
    },
    {
      month: 1,
      amount: 1,
    },
    {
      month: 2,
      amount: 3,
    },
    {
      month: 3,
      amount: 5,
    },
    {
      month: 4,
      amount: 9,
    },
    {
      month: 5,
      amount: 14,
    },
  ]

  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
