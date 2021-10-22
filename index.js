const fs = require('fs');
const express = require('express');
const https = require('https');


const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const app = express();
const server = https.createServer({key, cert}, app);


app.use(express.static('dist'))
app.use(express.static('public'))
//app.use('/src', express.static('src'))
//app.use('/lib', express.static('node_modules/vss-web-extension-sdk/lib'))
//app.use('/lib', express.static('node_modules/azure-devops-extension-sdk'))
//app.use('azure-devops-extension-sdk', express.static('node_modules/azure-devops-extension-sdk'))
//app.use('azure-devops-extension-api', express.static('node_modules/azure-devops-extension-api'))

server.listen(3000, () => { console.log('listening on 3000') });