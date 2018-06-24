const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: { type: String, required: true},
  adminId: {type: String, required: true},
  isOpen: {type: Boolean, required: true},
  members: {type: [{id: String, firstName: String, lastName: String}]}
});

module.exports = mongoose.model('Group', groupSchema);
