const mongoose = require('mongoose');

const spendingSchema = mongoose.Schema({
  value: { type: Number, require: true },
  description: { type: String, required: true },
  date: {type: Date, required: true},
  payerFirstName: {type: String, required: true},
  payerLastName: {type: String, required: true},
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true }
});

module.exports = mongoose.model('Spending', spendingSchema);
