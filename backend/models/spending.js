const mongoose = require('mongoose');

const spendingSchema = mongoose.Schema({
  value: { type: Number, require: true },
  description: { type: String, required: true },
  date: {type: Date, required: true},
  payerFirstName: {type: String, required: true},
  payerLastName: {type: String, required: true},
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  shareList: {type: [{userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
              firstName: String,
              lastName: String,
              email: String }]}
});

module.exports = mongoose.model('Spending', spendingSchema);
