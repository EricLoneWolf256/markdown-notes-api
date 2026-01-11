const express = require('express');
const cors = require('cors');  // ADD THIS
const notesRoutes = require('./routes/notes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());  // ADD THIS - This fixes the connection issue!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/notes', notesRoutes);

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