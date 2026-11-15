import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { config, getEffectiveApiKey, hasValidApiKey, setRuntimeApiKey } from '../config.js';

export const healthRouter = Router();

// GET /api/health
healthRouter.get('/health', (req: Request, res: Response) => {
  const isKeyConfigured = hasValidApiKey();
  const effectiveKey = getEffectiveApiKey();
  const maskedKey = effectiveKey
    ? `${effectiveKey.slice(0, 4)}...${effectiveKey.slice(-4)}`
    : 'None';

  res.json({
    status: 'ok',
    service: 'WhatIf? – Consequence Engine powered by Ripple',
    timestamp: new Date().toISOString(),
    gemini: {
      isConfigured: isKeyConfigured,
      model: config.geminiModel,
      keyMask: maskedKey,
      mode: isKeyConfigured ? 'live-gemini' : 'demo-mode',
    },
  });
});

function cleanErrorMessage(err: any): string {
  if (!err) return 'Unknown error occurred while testing Gemini API.';
  const raw = err?.message || String(err);
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.error?.message) {
      return parsed.error.message;
    }
  } catch (_) {
    // not JSON
  }
  return raw;
}

// POST /api/config/api-key
healthRouter.post('/config/api-key', async (req: Request, res: Response): Promise<void> => {
  const { apiKey } = req.body;

  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length < 5) {
    res.status(400).json({
      success: false,
      error: 'Valid API key string is required',
      details: 'Please provide a non-empty Gemini API key.'
    });
    return;
  }

  const cleanKey = apiKey.trim();

  // Test the key with Gemini 3.8 Flash API
  try {
    const ai = new GoogleGenAI({ apiKey: cleanKey });
    const response = await ai.models.generateContent({
      model: config.geminiModel, // Defaults to gemini-3.8-flash
      contents: 'Respond with the word "READY" in JSON format: {"status": "READY"}',
      config: {
        responseMimeType: 'application/json',
      },
    });

    // Key works and was verified with real Gemini 3.8 Flash! Activate runtime key
    setRuntimeApiKey(cleanKey);

    res.json({
      success: true,
      message: `Gemini API key successfully verified and live on ${config.geminiModel}!`,
      model: config.geminiModel,
      testResponse: response.text,
    });
  } catch (err: any) {
    const readableMessage = cleanErrorMessage(err);
    console.error('API key verification failed:', readableMessage);
    res.status(400).json({
      success: false,
      error: 'Failed to authenticate with Gemini API',
      details: readableMessage,
    });
  }
});
