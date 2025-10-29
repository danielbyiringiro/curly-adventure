const app = require('./app');

const PORT = process.env.PORT || 5003;

const allowedOrigins = [
  'http://localhost:3000',
  'https://ecommerce-lab-teal.vercel.app',
];

app.use(cors({
  origin: (origin, cb) => {
    // Allow same-origin (no Origin header) and allow listed origins
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
