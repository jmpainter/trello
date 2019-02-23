const mongoose = require('mongoose');
const listSchema = require('./lists');

const boardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  lists: [listSchema]
});

const Board = mongoose.model('board', boardSchema);

module.exports = { Board };
