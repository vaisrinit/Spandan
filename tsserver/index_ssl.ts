import express from "express";
import * as http from 'http'
import * as https from 'https'

import cors from "cors";
import * as fs from 'fs';
const api = require("./api/api");

const app = express();

var key = fs.readFileSync('/home/ec2-user/nodejs-crt-sk/ui-key.pem');
var cert = fs.readFileSync('/home/ec2-user/nodejs-crt-sk/ssl_certificate.cer');
var ca = fs.readFileSync('/home/ec2-user/nodejs-crt-sk/IntermediateCA.cer');
var options = {
    key: key,
    cert: cert,
    ca: ca
}



app.use(express.json({ limit: '1mb' }))
app.use(cors({
    origin: ['http://localhost:4200']
}))
app.use("/api", api);


var httpsPort = 9443;
http.createServer(app).listen(httpsPort, () => console.log("E-KYC API Node Server listening on port " + httpsPort + "!"));
// https.createServer(options,app).listen(httpsPort, () => console.log("Spandan API Node Server listening on port " + httpsPort + "!"));