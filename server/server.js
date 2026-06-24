import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';

// Import Routes
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import projectRoutes from './routes/projects.js';
import certificationRoutes from './routes/certifications.js';
import skillRoutes from './routes/skills.js';
import analyticsRoutes from './routes/analytics.js';
import { sendTelegramAlert } from './services/telegramService.js';

dotenv.config();

// Initialize system error ledger
global.systemErrorLedger = [];

const logToErrorLedger = (message, stack, path, method) => {
  const errorEntry = {
    timestamp: new Date().toISOString(),
    message: message || 'Unknown error',
    stack: stack || 'No stack trace available',
    path: path || 'SYSTEM',
    method: method || 'SYSTEM'
  };
  global.systemErrorLedger.unshift(errorEntry);
  if (global.systemErrorLedger.length > 20) {
    global.systemErrorLedger = global.systemErrorLedger.slice(0, 20);
  }
  
  // Forward to mobile via Telegram Bot
  sendTelegramAlert(errorEntry).catch(err => {
    console.error('[TELEGRAM FORWARD FAILED]', err.message);
  });
};

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Support base64 image uploads up to 10mb

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ajith_portfolio')
  .then(() => console.log('[DATABASE] MongoDB connection established successfully.'))
  .catch((err) => {
    console.error('[DATABASE] Error connecting to MongoDB:', err.message);
    console.log('[DATABASE] Please ensure MongoDB is running locally or verify the MONGO_URI in server/.env.');
    logToErrorLedger(
      `Database connection error: ${err.message}`,
      err.stack,
      'DATABASE_INIT',
      'DB_ERR'
    );
  });

// Monitor Mongoose runtime connection errors
mongoose.connection.on('error', (err) => {
  console.error('[DATABASE RUNTIME ERROR]', err.message);
  logToErrorLedger(
    `Database runtime error: ${err.message}`,
    err.stack,
    'DATABASE_CONN',
    'DB_ERR'
  );
});

// API Routes Registration
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health Check Endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ONLINE',
    database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Temporary Telegram Test Endpoint
app.get('/api/test-telegram', (req, res) => {
  logToErrorLedger(
    'Test Alert: Telegram Telemetry System Check Successful!',
    'Mock error stack trace at test-telegram endpoint. All alert nodes operational.',
    '/api/test-telegram',
    'GET'
  );
  res.json({ message: 'Telegram test alert triggered!' });
});


// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.stack);
  logToErrorLedger(
    err.message || 'An unexpected error occurred on the server.',
    err.stack,
    req.originalUrl || req.path || 'SYSTEM',
    req.method || 'SYSTEM'
  );
  res.status(500).json({
    error: 'SERVER_EXCEPTION',
    message: err.message || 'An unexpected error occurred on the console.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[SERVER] Express routing gateway online. Listening on port ${PORT}`);
});
