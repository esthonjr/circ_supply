const express = require('express');
const greader = require("g-sheets-api");

const readerOptions = {
    sheetId: "1XV4tkoXIjKXzNJlWxDGp7vSeKKC40JpIfeeEodkXps8",
    returnAllResults: true,
    // filter: {
    //   "key to filter on": "value to match",
    // },
  };

const app = express();

const port = process.env['PORT'] || 3000;
 
app.get('/', function (req, res) {
    greader(readerOptions, (results) => {
        const data = results.filter(item => item["Wallet Description"] == 'Full market avaialble');
        const amount = (data[0]["Amount"]).replace(/,/g,'');
        res.send(amount);
    });
    //res.send('Hello');
});
 
app.listen(port);