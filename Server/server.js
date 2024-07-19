const express = require("express");
const app = express();
const cors = require("cors");
const port = 3006;
const dbService = require("./database");

app.use(cors());
app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));