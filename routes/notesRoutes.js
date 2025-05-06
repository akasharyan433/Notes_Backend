const express = require('express');
const { 
  getNotes, 
  getNote, 
  createNote, 
  updateNote, 
  deleteNote 
} = require('../controllers/notesController');
const { protect } = require('../middlewares/auth');
const { noteValidator } = require('../middlewares/validators');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getNotes)
  .post(noteValidator, createNote);

router.route('/:id')
  .get(getNote)
  .put(noteValidator, updateNote)
  .delete(deleteNote);

module.exports = router;