import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import { config, hasValidApiKey, markKeyVerified } from './config.js';
import { simulationRouter } from './routes/simulation.routes.js';
import { healthRouter } from './routes/health.routes.js';

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-gemini-api-key'],
}));

app.use(express.json({ limit: '10mb' }));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// Mount Routes
app.use('/api', healthRouter);
app.use('/api', simulationRouter);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    name: 'WhatIf? – Consequence Engine API',
    tagline: "Don't just make a decision. Explore its ripple effect.",
    geminiLive: hasValidApiKey(),
    model: config.geminiModel,
    endpoints: {
      health: '/api/health',
      simulate: 'POST /api/simulate',
      regenerate: 'POST /api/regenerate',
      recalculate: 'POST /api/recalculate',
      samples: '/api/sample/:preset (internship | business | education | relocation)',
    },
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled server exception:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err?.message || 'Unexpected failure',
  });
});

const PORT = config.port;

app.listen(PORT, async () => {
  console.log(`====================================================`);
  console.log(` WhatIf? (Ripple Consequence Engine) Backend Started `);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Target Gemini Model: ${config.geminiModel}`);

  // Test environment key on boot if provided
  if (config.geminiApiKey && config.geminiApiKey.length > 5 && !config.geminiApiKey.includes('your_api_key_here')) {
    try {
      const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
      await ai.models.generateContent({
        model: config.geminiModel,
        contents: 'Test connection',
      });
      markKeyVerified(true);
      console.log(` Gemini API Status: LIVE (Connected to ${config.geminiModel})`);
    } catch (e: any) {
      markKeyVerified(false);
      console.warn(` Gemini API Status: DEMO MODE (Startup verification failed with ${config.geminiModel}: ${e?.message || e})`);
    }
  } else {
    markKeyVerified(false);
    console.log(` Gemini API Status: DEMO MODE (No API key in .env; use in-UI modal to connect)`);
  }
  console.log(`====================================================`);
});
