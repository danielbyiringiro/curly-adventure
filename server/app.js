// server/app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const brandRoutes = require('./routes/brand');
const productRoutes = require('./routes/product');
const uploadRoutes = require('./routes/upload');

const app = express();

// CORS: allow local dev + your Vercel domain (same-origin on prod means CORS won’t trigger)
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL,            // e.g. http://localhost:3000 (dev)
  'https://ecommerce-lab-teal.vercel.app' // your deployed site
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // allow no-origin (curl/postman) and any in the whitelist
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
