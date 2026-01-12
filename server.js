const express = require('express');
const cors = require('cors');
const notesRoutes = require('./routes/notes');
const uploadRoutes = require('./routes/upload');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - ORDER MATTERS!
app.use('/api/notes/upload', uploadRoutes);  // Upload route FIRST
app.use('/api/notes', notesRoutes);          // General notes route SECOND

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Markdown Notes API is running!',
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Try: http://localhost:${PORT}/api/notes`);
});