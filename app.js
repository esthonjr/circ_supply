require('dotenv').config();

const express = require('express');
const cors = require('cors');

const axios = require('axios');

const app = express();
app.use(cors());

const port = process.env['PORT'] || 3000;
 
app.get('/', function (req, res) {
    // Contract Address- Market cap valuation
    const cont1 = '0xf94b5c5651c888d928439ab6514b93944eee6f48';
    // Company reserves not distributed 
    const cont2 = "0x3cbCaD74225dd6a062008D3ed85Ee0339a7E2B2e";
    // Company reserves not distributed 
    const cont3 = "0x6D2FCeb4FEa5d959d3e3865727110122aFC15eA5"; 
    // Team unlocked token not distributed
    const cont4 = "0x13e3098BbeEE479B64760af8Ef9A968d36361783";

    axios.all([
        axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'stats',
                action: 'tokensupply',
                contractaddress: cont1,
                apikey: process.env['ETHERSCAN_API_TOKEN']

            }
        }),
        axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'account',
                action: 'tokenbalance',
                contractaddress: cont1,
                address: cont2,
                tag: 'latest',
                apikey: process.env['ETHERSCAN_API_TOKEN']
            }
        }),
        axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'account',
                action: 'tokenbalance',
                contractaddress: cont1,
                address: cont3,
                tag: 'latest',
                apikey: process.env['ETHERSCAN_API_TOKEN']
            }
        }),
        axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'account',
                action: 'tokenbalance',
                contractaddress: cont1,
                address: cont4,
                tag: 'latest',
                apikey: process.env['ETHERSCAN_API_TOKEN']
            }
        })
    ])
    .then(axios.spread((data1, data2, data3, data4) => {
        let result1 = data1.data.result;
        let result2 = data2.data.result;
        let result3 = data3.data.result;
        let result4 = data4.data.result;

        // pattern of 18 decimal places for the token
        result1 = result1.slice(0,result1.length - 18) + "." + result1.slice(result1.length - 18, result1.length);
        result2 = result2.slice(0,result2.length - 18) + "." + result2.slice(result2.length - 18, result2.length);
        result3 = result3.slice(0,result3.length - 18) + "." + result3.slice(result3.length - 18, result3.length);
        result4 = result4.slice(0,result4.length - 18) + "." + result4.slice(result4.length - 18, result4.length);

        const circSupply = Number(result1) - (Number(result2) + Number(result3) + Number(result4));
        res.send(circSupply.toLocaleString('fullwide', {useGrouping:false}));
    }))
    .catch(function (error) {
        // handle error
        console.log(error);
        res.send(401);
    });
    //res.send('Hello');
});
 
app.listen(port);