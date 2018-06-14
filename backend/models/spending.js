const mongoose = require('mongoose');

const spendingSchema = mongoose.Schema({
  value: { type: Number, require: true },
  description: { type: String, required: true },
  date: {type: Date, required: true},
  payer: {type: String, required: true}
});

module.exports = mongoose.model('Spending', spendingSchema);
