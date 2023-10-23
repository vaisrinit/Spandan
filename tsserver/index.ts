import express from "express";
import cors from "cors";
import * as http from 'http';
import  mountRoutes from './api'

var httpPort = 3001;

const app = express();

app.use(express.json({limit:'1mb'}))
app.use(cors({
    origin:['http://localhost:4200']
}))
mountRoutes(app);

// console.dir(app.locals)
// console.dir(app.mountpath)


http.createServer(app).listen(httpPort,()=>console.log("Spandan API Node Server listening on port "+httpPort+"!"));