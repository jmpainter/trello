const mongoose = require('mongoose');
const cardSchema = require('./cards');

const listSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cards: [cardSchema]
});
