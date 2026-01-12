const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // Use UUID to avoid name collisions
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// File filter - only accept markdown files
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.md', '.markdown', '.txt'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .md, .markdown, and .txt files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST - Upload markdown file
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ 
      success: false, 
      error: 'No file uploaded' 
    });
  }

  // Read the file content
  const filePath = path.join(__dirname, '../uploads/', req.file.filename);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract title from filename (without extension)
  const title = path.basename(req.file.originalname, path.extname(req.file.originalname));
  
  // Create note object
  const newNote = {
    id: Date.now(),
    title: title,
    content: content,
    uploadedFile: req.file.filename,
    originalFileName: req.file.originalname,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  res.status(201).json({ 
    success: true, 
    message: 'File uploaded successfully',
    data: newNote
  });
});

module.exports = router;