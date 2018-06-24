const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: { type: String, required: true},
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isOpen: {type: Boolean, required: true},
  members: {type: [{userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          firstName: String,
          lastName: String,
          email: String }]}
});

module.exports = mongoose.model('Group', groupSchema);
