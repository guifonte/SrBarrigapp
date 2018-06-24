const express = require('express');

const Group = require('../models/group');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post("",
  checkAuth,
  (req, res, next) => {
  const group = new Group({
    name: req.body.name,
    adminId: req.body.adminId,
    members: req.body.members,
    isOpen: req.body.isOpen
  });
  group.save().then( () => {
    res.status(201).json({
      message: 'Group added successfully'
    });
  }).catch(err => {
    res.status(400).json({
      message: "Group could not be added!",
      error: err
    });
  });
});

module.exports = router;
