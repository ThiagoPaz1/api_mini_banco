const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  cpf: { type: String, required: true },
  password: { type: String, required: true, minlength: 6, maxlength: 200 },
  balance: { type: Number, default: 0},
});

module.exports = mongoose.model('Client', clientSchema);