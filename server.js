const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Markdown Notes API is running!',
    version: '1.0.0',
    endpoints: {
      health: 'GET /',
      notes: 'GET /api/notes',
      createNote: 'POST /api/notes',
      getNote: 'GET /api/notes/:id',
      updateNote: 'PUT /api/notes/:id',
      deleteNote: 'DELETE /api/notes/:id',
      renderNote: 'GET /api/notes/:id/render',
      grammarCheck: 'POST /api/notes/:id/grammar',
      uploadFile: 'POST /api/notes/upload'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Press Ctrl+C to stop`);
});
