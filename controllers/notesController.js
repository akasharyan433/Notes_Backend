const { validationResult } = require('express-validator');
const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAllByUser(req.user.id);
    
    res.json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id, req.user.id);
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.createNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const { title, content, pinned } = req.body;
    
    const noteId = await Note.create({
      user_id: req.user.id,
      title,
      content: content || '',
      pinned: pinned || false
    });
    
    const newNote = await Note.findById(noteId, req.user.id);
    
    res.status(201).json({
      success: true,
      data: newNote
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.updateNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    let note = await Note.findById(req.params.id, req.user.id);
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    const { title, content, pinned } = req.body;
    
    const updated = await Note.update(req.params.id, req.user.id, {
      title,
      content: content || '',
      pinned: pinned !== undefined ? pinned : note.pinned
    });
    
    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'Note not updated'
      });
    }
    
    const updatedNote = await Note.findById(req.params.id, req.user.id);
    
    res.json({
      success: true,
      data: updatedNote
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id, req.user.id);
    
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }
    
    const deleted = await Note.delete(req.params.id, req.user.id);
    
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: 'Note not deleted'
      });
    }
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};