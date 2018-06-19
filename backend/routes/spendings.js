const express = require('express');

const Spending = require('../models/spending');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post("",
  checkAuth,
  (req, res, next) => {
  const spending = new Spending({
    value: req.body.value,
    description: req.body.description,
    payer: req.body.payer,
    date: req.body.date,
    creator: req.userData.userId
  });
  spending.save().then(createdSpending => {
    res.status(201).json({
      message: 'Spendings added successfully',
      spendingId: createdSpending._id
    });
  });
});

router.put("/:id",
  checkAuth,
  (req, res, next) => {
  const spending = new Spending({
    _id: req.body.id,
    value: req.body.value,
    description: req.body.description,
    payer: req.body.payer,
    date: req.body.date,
    creator: req.userData.userId
  })
  Spending.updateOne({_id: req.params.id, creator: req.userData.userId }, spending).then(result => {
    if (result.nModified > 0){
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
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

router.delete("/:id",
  checkAuth,
  (req, res, next) => {
  Spending.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0){
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

module.exports = router;
