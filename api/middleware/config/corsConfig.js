const cors = require('cors');

const corsOptions = process.env.NODE_ENV === 'production'
  ? {
      origin: process.env.CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }
  : {}; // dev = permite tudo

module.exports = cors(corsOptions)
