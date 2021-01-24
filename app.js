const express = require('express');
const cors = require('cors');

const axios = require('axios');

const app = express();
app.use(cors());

const port = process.env['PORT'] || 3000;
 
app.get('/', function (req, res) {
    axios.get('https://api.coingecko.com/api/v3/coins/yield-app?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false%27')
    .then(function (response) {
        // handle success
        res.send((response.data.market_data.circulating_supply).toString());
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        res.send(401);
  })
    //res.send('Hello');
});
 
app.listen(port);