const express = require('express');

const Spending = require('../models/spending');

const router = express.Router();

router.post("", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
  const spending = new Spending({
    _id: req.body.id,
    value: req.body.value,
    description: req.body.description,
    payer: req.body.payer,
    date: req.body.date
  })
  Spending.updateOne({_id: req.params.id }, spending).then(result => {
    res.status(200).json({ message: "Update successful!" });
  })
})

router.get('', (req, res, next) => {
  Spending.find().then(documents => {
    res.json({
      message: 'Spendings fetched successfully!',
      spendings: documents
    });
  });
});

router.get('/:id', (req, res, next) => {
  Spending.findById(req.params.id).then(spending => {
    if(spending) {
      res.status(200).json(spending);
    } else {
      res.status(404).json({message: 'Spending not found!'});
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Spending.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: 'Spending deleted!'});
  });
});

module.exports = router;
