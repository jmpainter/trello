const express = require('express');
const router = express.Router();
const jsonParser = express.json();
const { Board } = require('../models/boards');

router.get('/', (req, res) => {
  Board.findOne().then(board => res.json(board));
});

router.post('/:boardId/list', jsonParser, (req, res) => {
  const requiredFields = ['title'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      let err = `Missing ${field} in req.body`;
      console.error(err);
      return res.status(400).json({ message: err });
    }
  });
  Board.findById(req.params.boardId)
    .then(board => {
      if (!board) {
        res.status(400).json({ message: 'Board was not found' });
      }
      board.lists.push({ title: req.body.title, cards: [] });
      return board.save();
    })
    .then(board => res.status(201).json(board))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.post('/:boardId/list/:listIndex/card', jsonParser, (req, res) => {
  const requiredFields = ['text'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      const err = `Missing ${field} in req.body`;
      console.error(err);
      res.status(400).json({ message: err });
    }
  });
  return Board.findById(req.params.boardId)
    .then(board => {
      if (!board) {
        return Promise.reject({
          code: 400,
          reason: 'ValidationError',
          message: 'Board could not be found'
        });
      }
      const listIndex = parseInt(req.params.listIndex, 10);
      if (listIndex > board.lists.length - 1) {
        return Promise.reject({
          code: 400,
          reason: 'ValidationError',
          message: 'List could not be found'
        });
      }
      debugger;
      console.log(listIndex);
      const list = board.lists[listIndex];
      list.cards.push({ text: req.body.text });
      return board.save();
    })
    .then(board => {
      res.status(201).json(board);
    })
    .catch(err => {
      console.error(err);
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.delete('/:boardId/list/:listIndex', (req, res) => {
  Board.findById(req.params.boardId)
    .then(board => {
      if (!board) {
        return Promise.reject({
          code: 400,
          reason: 'ValidationError',
          message: 'Board could not be found'
        });
      }
      const listIndex = parseInt(req.params.listIndex, 10);
      if (listIndex > board.lists.length - 1) {
        return Promise.reject({
          code: 400,
          reason: 'ValidationError',
          message: 'List could not be found'
        });
      }
      board.lists.splice(listIndex, 1);
      return board.save();
    })
    .then(board => res.status(200).json(board))
    .catch(err => {
      console.error(err);
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.delete('/:boardId/list/:listIndex/card/:cardIndex', (req, res) => {
  Board.findById(req.params.boardId)
    .then(board => {
      if (!board) {
        return Promise.reject({
          code: 400,
          reason: 'ValidationError',
          message: 'Board could not be found'
        });
      }
      debugger;
      const listIndex = parseInt(req.params.listIndex, 10);
      const cardIndex = parseInt(req.params.cardIndex, 10);
      if (listIndex > board.lists.length - 1) {
        return Promise.reject({
          code: 400,
          reason: 'ValidationError',
          message: 'List could not be found'
        });
      }
      const cards = board.lists[listIndex].cards;
      if (cardIndex > cards.length) {
        return Promise.reject({
          code: 400,
          reason: 'ValidationError',
          message: 'Card could not be found'
        });
      }
      cards.splice(cardIndex, 1);
      return board.save();
    })
    .then(board => res.status(200).json(board))
    .catch(err => {
      console.error(err);
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;
