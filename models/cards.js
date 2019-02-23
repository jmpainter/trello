const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

module.exports = cardSchema;
