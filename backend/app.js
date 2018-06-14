const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Spending = require('./models/spending');

const app = express();

mongoose.connect("mongodb+srv://sato:E5sfCjX8bnyXsMeH@cluster0-jku9s.mongodb.net/node-angular?retryWrites=true")
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
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/spendings", (req, res, next) => {
  const spending = new Spending({
    value: req.body.value,
    description: req.body.description,
    payer: req.body.payer,
    date: req.body.date
  });
  spending.save().then(createdSpending => {
    res.status(201).json({
      message: 'Spendings added successfully',
      spendingId: createdSpending._id
    });
  });
});

app.get('/api/spendings', (req, res, next) => {
  Spending.find().then(documents => {
    res.json({
      message: 'Spendings fetched successfully!',
      spendings: documents
    });
  });
});

app.delete("/api/spendings/:id", (req, res, next) => {
  Spending.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: 'Spending deleted!'});
  });
});

module.exports = app;
