const express = require('express');
const Group = require('../models/group');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/:id', (req, res, next) => {
  Group.findById(req.params.id).then(group => {
    if(group) {
      res.status(200).json(group);
    } else {
      res.status(404).json({message: 'Group not found!'});
    }
  });
});

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

router.delete("/:id",
  checkAuth,
  (req, res, next) => {
  Group.deleteOne({ _id: req.params.id, adminId: req.userData.userId }).then(result => {
    if (result.n > 0){
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

module.exports = router;
