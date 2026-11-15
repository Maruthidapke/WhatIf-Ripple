import { Router, Request, Response } from 'express';
import { geminiService } from '../services/gemini.service.js';
import { calculateDeterministicProjections } from '../services/recalculation.service.js';
import { getSampleSimulation } from '../services/sampleData.service.js';
import { DecisionInputSchema, RegenerateRequest } from '../types.js';

export const simulationRouter = Router();

// POST /api/simulate
simulationRouter.post('/simulate', async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = DecisionInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: parseResult.error.issues,
      });
      return;
    }

    const input = parseResult.data;
    const result = await geminiService.generateSimulation(input);
    res.json(result);
  } catch (error: any) {
    console.error('Error during simulation generation:', error);
    res.status(500).json({
      error: 'Failed to generate simulation',
      message: error?.message || 'Unknown server error',
    });
  }
});

// POST /api/regenerate
simulationRouter.post('/regenerate', async (req: Request, res: Response): Promise<void> => {
  try {
    const regenerateReq: RegenerateRequest = req.body;
    if (!regenerateReq || !regenerateReq.originalSimulation) {
      res.status(400).json({ error: 'originalSimulation is required for regeneration' });
      return;
    }

    const updated = await geminiService.regenerateWithVariables(regenerateReq);
    res.json(updated);
  } catch (error: any) {
    console.error('Error during scenario regeneration:', error);
    res.status(500).json({
      error: 'Failed to regenerate scenario',
      message: error?.message || 'Unknown error',
    });
  }
});

// POST /api/recalculate (Deterministic math without Gemini API cost)
simulationRouter.post('/recalculate', (req: Request, res: Response): void => {
  try {
    const { factors, modifiedVariables } = req.body;
    if (!Array.isArray(factors)) {
      res.status(400).json({ error: 'factors array is required' });
      return;
    }

    const calculations = calculateDeterministicProjections(factors, modifiedVariables || {});
    res.json(calculations);
  } catch (error: any) {
    console.error('Error during recalculation:', error);
    res.status(500).json({
      error: 'Failed to recalculate variables',
      message: error?.message,
    });
  }
});

// GET /api/sample/:preset
simulationRouter.get('/sample/:preset', (req: Request, res: Response): void => {
  const preset = req.params.preset;
  let title = 'Internship vs Self-Study Skill Sprint';
  let category: any = 'Career';

  if (preset === 'business') {
    title = 'Start Micro-Business with ₹20,000 Capital';
    category = 'Business';
  } else if (preset === 'education') {
    title = 'Choose Job vs Pursue Higher Education';
    category = 'Education';
  } else if (preset === 'relocation') {
    title = 'Move to Tech Hub City for Better Opportunities';
    category = 'Lifestyle';
  }

  const result = getSampleSimulation({
    title,
    description: `Pre-configured simulation for ${title}`,
    category,
    options: ['Option A', 'Option B'],
    mainGoal: 'Explore branching consequences',
    timeHorizon: '1 Year',
    constraints: 'Standard constraints',
  });

  res.json(result);
});
