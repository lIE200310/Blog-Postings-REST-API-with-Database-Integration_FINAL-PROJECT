const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all posts
router.get('/', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET single post
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(results[0]);
  });
});

// POST create a new post
router.post('/', (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  db.query('INSERT INTO posts (title, content, author) VALUES (?, ?, ?)', [title, content, author], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, title, content, author });
  });
});

// PUT update a post
router.put('/:id', (req, res) => {
  const { title, content, author } = req.body;
  db.query('UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?', [title, content, author, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Post updated' });
  });
});

// DELETE a post
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Post deleted' });
  });
});

module.exports = router;
