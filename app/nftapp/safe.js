const PORT = 8004;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.json('yo');
});

app.get('/collections', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://www.postman.com/collections/d74162566f1f86f338b3',
    headers: {
      'X-API-Key': process.env.API_KEY,
    },
  };

  axios
    .request(options)
    .then(response => {
      const filteredData = response.data.item
        .filter(item => item.name === 'Collections')[0]
        .item.filter(e => e.name === 'Get Collections')[0].response[0].body;
      const parsedData = JSON.parse(filteredData);
      return parsedData;
    })
    .catch(error => {
      console.log(error.response);
    });
});

app.listen(PORT, () => console.log(`Safe is online with in port ${PORT}`));
