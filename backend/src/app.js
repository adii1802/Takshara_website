import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.routes.js';

const app = express();

// Configure proxy trust for Render reverse proxy (1 hop)
// This resolves ERR_ERL_UNEXPECTED_X_FORWARDED_FOR without blindly trusting arbitrary client headers
const trustProxySetting = process.env.TRUST_PROXY
  ? (process.env.TRUST_PROXY === 'true'
      ? true
      : isNaN(process.env.TRUST_PROXY)
        ? process.env.TRUST_PROXY
        : Number(process.env.TRUST_PROXY))
  : 1;
app.set('trust proxy', trustProxySetting);

// Configure CORS for local development and production deployments
const configureCors = () => {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000',
    'https://cairnlooptechnologies.com',
    'https://www.cairnlooptechnologies.com',
  ];

  if (process.env.FRONTEND_URL) {
    const configuredOrigins = process.env.FRONTEND_URL
      .split(',')
      .map((url) => url.trim().replace(/\/$/, ''))
      .filter(Boolean);

    allowedOrigins.push(...configuredOrigins);
  }

  return cors({
    origin: (origin, callback) => {
      // Allow server-to-server or curl requests with no origin
      if (!origin) return callback(null, true);

      const cleanOrigin = origin.replace(/\/$/, '');
      if (
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith('.vercel.app') ||
        cleanOrigin.endsWith('cairnlooptechnologies.com') ||
        process.env.FRONTEND_URL === '*'
      ) {
        return callback(null, true);
      }

      console.warn(`[CORS Blocked]: Origin ${origin} is not authorized`);
      return callback(new Error(`CORS blocked: Origin ${origin} is not authorized`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });
};

app.use(configureCors());

// Request-size limit: 10kb to prevent oversized payload attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Health check endpoints
app.get('/', (req, res) => {
  res.json({
    service: 'Cairnloop Technologies Contact API',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Contact API routes
app.use('/api/contact', contactRoutes);

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found`,
  });
});

// Centralized error handler to ensure sensitive stack traces are never sent to the browser
app.use((err, req, res, next) => {
  console.error('[Application Error]:', err.message);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload in request body.',
    });
  }

  if (err.message && err.message.startsWith('CORS blocked')) {
    return res.status(403).json({
      success: false,
      message: 'Access denied: CORS origin not allowed.',
    });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Payload too large. Submitted data exceeds the 10KB size limit.',
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: 'Internal server error occurred.',
  });
});

export default app;
