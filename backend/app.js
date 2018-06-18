const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const spendingsRoutes = require('./routes/spendings');
const userRoutes = require('./routes/user');
const app = express();

mongoose.connect("mongodb+srv://sato:E5sfCjX8bnyXsMeH@cluster0-jku9s.mongodb.net/node-angular")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/spendings", spendingsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
