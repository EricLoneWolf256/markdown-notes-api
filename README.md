# Markdown Notes API

A RESTful API for managing markdown notes with file upload, grammar checking, and HTML rendering capabilities.

## Features
- Create, read, update, delete notes
- Upload markdown files
- Grammar checking
- Render markdown to HTML

## Setup
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Access API at `http://localhost:3000`

## API Endpoints
- `GET /` - Health check
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `GET /api/notes/:id/render` - Get HTML version of note
- `POST /api/notes/:id/grammar` - Check grammar
- `POST /api/notes/upload` - Upload markdown file
