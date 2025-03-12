const express = require('express')
const routes = require('./routes')
const cors = require("cors");

const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())
app.use(routes)

module.exports = app