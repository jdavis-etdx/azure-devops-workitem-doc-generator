const fs = require('fs');
const express = require('express');
const https = require('https');


const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const app = express();
const server = https.createServer({key, cert}, app);

app.use("", express.static('dist'))

server.listen(3000, () => { console.log('listening on 3000') });