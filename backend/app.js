const express = require('express');
const bodyParser = require("body-parser");

const app = express();

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
  const spending = req.body;
  console.log(spending);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/spendings', (req, res, next) => {
  const spendings = [
    { id: 'asdasda123sa',
      value: 150,
      description: "First server-side spending",
      date: new Date,
      payer: "Sato",
    },
    { id: 'sadhi13i3h12',
      value: 180,
      description: "Second server-side spending",
      date: new Date,
      payer: "Guilherme",
    }
  ];
  res.json({
    message: 'Spendings fetched successfully!',
    spendings: spendings
  });
});

module.exports = app;
