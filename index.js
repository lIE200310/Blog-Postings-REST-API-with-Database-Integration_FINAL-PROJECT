const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const postsRouter = require('./routes/posts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middlewares
app.use(helmet());
app.use(cors());

// Rate Limiting: 100 requests per 2 minutes
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.json());

// Routes
app.use('/posts', postsRouter);

// Fallback route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
