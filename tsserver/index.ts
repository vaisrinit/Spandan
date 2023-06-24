import express from "express";
import cors from "cors"

const api = require("./api/api");
var httpPort = 3000;

const app = express();
app.use(express.json({limit:'1mb'}))
app.use(cors({
    origin:['http://localhost:4200']
}))
app.use("/api",api);

app.listen(httpPort,()=>console.log("Spandan API Node Server listening on port "+httpPort+"!"));