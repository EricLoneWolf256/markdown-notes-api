const express = require('express');
const router = express.Router();

let notes = [];
let nextId = 1;

// Get all notes
router.get('/', (req, res) => {
    res.json({SUCCESS: true, data: notes });
});
// post create a new note
router.post('/', (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ SUCCESS: false, message: 'Title and content are required.' });
    }
    const newNote = {
        id: nextId++,
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    notes.push(newNote);
    res.status(201).json({ SUCCESS: true, data: newNote });
});
// Get a specific note by ID
router.get('/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    const note = notes.find(n => n.id === noteId);
    if (!note) {
        return res.status(404).json({ SUCCESS: false, message: 'Note not found.' });
    }
    res.json({ SUCCESS: true, data: note });
});

const { marked } = require('marked');

// GET - Render note as HTML
router.get('/:id/render', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  
  if (!note) {
    return res.status(404).json({ 
      success: false, 
      error: 'Note not found' 
    });
  }
  
  // Convert markdown to HTML
  const html = marked(note.content);
  
  res.json({ 
    success: true, 
    data: {
      id: note.id,
      title: note.title,
      html: html,
      originalContent: note.content
    }
  });
});
module.exports = router;