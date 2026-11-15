import { GoogleGenAI } from '@google/genai';
import { config, getEffectiveApiKey, hasValidApiKey } from '../config.js';
import {
  DecisionInput,
  InfluencingFactor,
  RegenerateRequest,
  SimulationResult,
} from '../types.js';
import { calculateDeterministicProjections } from './recalculation.service.js';
import { getSampleSimulation } from './sampleData.service.js';

export class GeminiService {
  private getClient(customKey?: string): GoogleGenAI | null {
    const key = getEffectiveApiKey(customKey);
    if (!key || key.length < 5 || key.includes('your_api_key_here')) {
      return null;
    }
    return new GoogleGenAI({ apiKey: key });
  }

  public async generateSimulation(
    input: DecisionInput
  ): Promise<SimulationResult> {
    const startTime = Date.now();
    const client = this.getClient(input.customApiKey);

    if (!client) {
      console.log('No valid Gemini API key found. Using rich preset sample data.');
      const sample = getSampleSimulation(input);
      sample.meta.latencyMs = Date.now() - startTime;
      return sample;
    }

    const prompt = this.buildSimulationPrompt(input);
    const candidateModels = Array.from(
      new Set([config.geminiModel || 'gemini-3.8-flash', 'gemini-3.8-flash', 'gemini-4-hydrogen'])
    );

    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        console.log(`Calling Gemini API using model: ${modelName}...`);
        const response = await client.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const rawText = response.text || '';
        const parsed = this.cleanAndParseJSON(rawText);

        if (parsed) {
          return this.normalizeSimulationResult(parsed, input, modelName, Date.now() - startTime);
        }
      } catch (err: any) {
        console.warn(`Failed with model ${modelName}:`, err?.message || err);
        lastError = err;
      }
    }

    console.error('All Gemini model attempts failed. Falling back to Demo Mode data with notification.', lastError?.message);
    const fallback = getSampleSimulation(input);
    fallback.meta.source = 'demo-mode';
    fallback.meta.modelUsed = `Fallback (API error: ${lastError?.message || 'Rate limit/Quota'})`;
    fallback.meta.latencyMs = Date.now() - startTime;
    return fallback;
  }

  public async regenerateWithVariables(
    req: RegenerateRequest
  ): Promise<SimulationResult> {
    const startTime = Date.now();
    const client = this.getClient(req.customApiKey);
    const original = req.originalSimulation;

    // First, update the factors with the new modified variables
    const updatedFactors = original.influencingFactors.map((factor) => {
      if (req.updatedVariables[factor.id] !== undefined) {
        return {
          ...factor,
          currentValue: req.updatedVariables[factor.id],
        };
      }
      return factor;
    });

    // Always calculate deterministic projections instantly
    const deterministic = calculateDeterministicProjections(
      updatedFactors,
      req.updatedVariables
    );

    if (!client) {
      // Return updated simulation with newly calculated deterministic math
      return {
        ...original,
        influencingFactors: updatedFactors,
        deterministicCalculations: deterministic,
        meta: {
          ...original.meta,
          generatedAt: new Date().toISOString(),
          latencyMs: Date.now() - startTime,
        },
      };
    }

    const prompt = this.buildRegenerationPrompt(
      original,
      req.updatedVariables,
      updatedFactors,
      deterministic,
      req.userNotes
    );

    try {
      const response = await client.models.generateContent({
        model: config.geminiModel,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.65,
        },
      });

      const rawText = response.text || '';
      const parsed = this.cleanAndParseJSON(rawText);

      if (parsed && parsed.scenarios) {
        return {
          ...original,
          influencingFactors: updatedFactors,
          scenarios: parsed.scenarios || original.scenarios,
          causalChains: parsed.causalChains || original.causalChains,
          keyConsiderations: parsed.keyConsiderations || original.keyConsiderations,
          deterministicCalculations: deterministic,
          executiveSummary: parsed.executiveSummary || original.executiveSummary,
          meta: {
            generatedAt: new Date().toISOString(),
            source: 'gemini-live',
            modelUsed: `${config.geminiModel} (Regenerated)`,
            latencyMs: Date.now() - startTime,
          },
        };
      }
    } catch (err: any) {
      console.warn('Regeneration Gemini call failed, returning deterministic update:', err?.message);
    }

    return {
      ...original,
      influencingFactors: updatedFactors,
      deterministicCalculations: deterministic,
      meta: {
        ...original.meta,
        generatedAt: new Date().toISOString(),
        latencyMs: Date.now() - startTime,
      },
    };
  }

  private buildSimulationPrompt(input: DecisionInput): string {
    return `
You are WhatIf? / Ripple AI — an expert decision scientist, behavioral economist, and second-order systems thinker.
A user is facing an important life or career decision. Your goal is to explore its consequences and unfold the "Ripple Effect" — how one decision cascades into unexpected outcomes.

USER DECISION DETAILS:
- Title: "${input.title}"
- Description: "${input.description}"
- Category: "${input.category}"
- Options considered: ${JSON.stringify(input.options)}
- Main Objective/Goal: "${input.mainGoal}"
- Time Horizon: "${input.timeHorizon}"
- Important Constraints: "${input.constraints}"

Generate a thorough, nuanced, and realistic simulation formatted strictly as a single JSON object.

REQUIRED JSON STRUCTURE:
{
  "executiveSummary": "2-3 sentences providing strategic insight on the dilemma, tradeoffs, and core tension.",
  "influencingFactors": [
    {
      "id": "unique_camel_or_snake_id",
      "name": "Human readable name (e.g., Weekly Learning Hours, Monthly Expenses, Available Savings)",
      "category": "Time | Finance | Skill | Lifestyle | Mindset",
      "importance": "High" | "Medium" | "Low",
      "description": "Why this factor shifts the outcome",
      "defaultValue": 20,
      "currentValue": 20,
      "unit": " hrs/wk" | " ₹" | " %" | " /10",
      "min": 0,
      "max": 100,
      "step": 5
    }
    // Provide 5-6 key variables that users can tune via sliders! Always include budget/capital, time invested, and monthly cost if applicable.
  ],
  "scenarios": [
    {
      "type": "optimistic",
      "title": "Positive outcome title",
      "description": "Realistic positive trajectory assuming high agency, favorable conditions, and solid discipline.",
      "likelihood": "30%",
      "benefits": ["benefit 1", "benefit 2", "benefit 3"],
      "risks": ["risk to monitor 1", "risk 2"],
      "assumptions": ["assumption 1", "assumption 2"],
      "uncertainty": "Medium",
      "metrics": {
        "financialScore": 85,
        "careerGrowthScore": 90,
        "stressIndex": 55,
        "adaptabilityScore": 80
      }
    },
    {
      "type": "expected",
      "title": "Most probable baseline outcome",
      "description": "Realistic balanced trajectory factoring standard friction, typical execution challenges, and steady progress.",
      "likelihood": "55%",
      "benefits": ["benefit 1", "benefit 2"],
      "risks": ["risk 1", "risk 2"],
      "assumptions": ["assumption 1", "assumption 2"],
      "uncertainty": "Low",
      "metrics": {
        "financialScore": 70,
        "careerGrowthScore": 75,
        "stressIndex": 45,
        "adaptabilityScore": 70
      }
    },
    {
      "type": "difficult",
      "title": "Challenging / friction-heavy outcome",
      "description": "Outcome where assumptions fail, external friction rises, or execution stalls.",
      "likelihood": "15%",
      "benefits": ["salvageable lessons or fallback strengths"],
      "risks": ["major risk 1", "major risk 2"],
      "assumptions": ["assumption that proved false 1"],
      "uncertainty": "High",
      "metrics": {
        "financialScore": 40,
        "careerGrowthScore": 45,
        "stressIndex": 80,
        "adaptabilityScore": 55
      }
    }
  ],
  "ripplePaths": [
    // Branching decision tree nodes for visual graph rendering:
    // Root node (type: 'root') ->
    // Option nodes for Option A and Option B (type: 'option', parentId pointing to root) ->
    // 1st order consequence nodes for each option (type: 'first_order', parentId pointing to option) ->
    // 2nd order ripple nodes (type: 'second_order', parentId pointing to 1st order) ->
    // 3rd order long-term impact nodes (type: 'third_order', parentId pointing to 2nd order)
    {
      "id": "node_id",
      "parentId": "parent_node_id", // omit for root
      "label": "Short punchy node title",
      "type": "root" | "option" | "first_order" | "second_order" | "third_order",
      "optionBranch": "Root" | "Option A" | "Option B",
      "timeFrame": "Day 0" | "Month 1-3" | "Month 6-12" | "Year 1-2",
      "probability": "High" | "Medium" | "Low",
      "impact": "Positive" | "Neutral" | "Negative" | "Mixed",
      "description": "Detailed explanation of what occurs at this stage.",
      "keyTakeaway": "Actionable takeaway",
      "metrics": { "effort": 7, "risk": 4, "reward": 8 }
    }
  ],
  "sideBySideComparison": {
    "optionA": {
      "name": "${input.options[0] || 'Option A'}",
      "summary": "Summary of choosing option A",
      "pros": ["pro 1", "pro 2", "pro 3"],
      "cons": ["con 1", "con 2"],
      "requiredResources": {
        "time": "e.g. 25 hrs/week",
        "financial": "e.g. ₹15,000 / month",
        "mentalBandwidth": "e.g. Moderate focus needed"
      },
      "longTermOutlook": "Expected status in 2-3 years",
      "scores": { "roi": 80, "risk": 40, "flexibility": 70, "speed": 85 }
    },
    "optionB": {
      "name": "${input.options[1] || 'Option B'}",
      "summary": "Summary of choosing option B",
      "pros": ["pro 1", "pro 2", "pro 3"],
      "cons": ["con 1", "con 2"],
      "requiredResources": {
        "time": "e.g. 35 hrs/week",
        "financial": "e.g. Minimal cash outflow",
        "mentalBandwidth": "e.g. High self-discipline"
      },
      "longTermOutlook": "Expected status in 2-3 years",
      "scores": { "roi": 85, "risk": 55, "flexibility": 85, "speed": 65 }
    }
  },
  "causalChains": [
    {
      "id": "chain_1",
      "factorTrigger": "e.g., Increasing learning hours from 10 to 25 hrs/wk",
      "summary": "How this specific change creates a multi-step ripple",
      "sequence": [
        { "step": 1, "title": "Step 1 title", "explanation": "Direct first effect", "sentiment": "positive" },
        { "step": 2, "title": "Step 2 title", "explanation": "Second consequence", "sentiment": "positive" },
        { "step": 3, "title": "Step 3 title", "explanation": "Third downstream effect", "sentiment": "positive" }
      ],
      "caveat": "Explicitly state: This is a probabilistic relationship, not a guaranteed outcome."
    }
  ],
  "keyConsiderations": {
    "criticalRisks": ["risk 1", "risk 2", "risk 3"],
    "keyOpportunities": ["opportunity 1", "opportunity 2"],
    "majorUncertainties": ["uncertainty 1", "uncertainty 2"],
    "questionsToAskSelf": ["question 1?", "question 2?", "question 3?"]
  }
}

IMPORTANT GUIDELINES:
1. Do NOT tell the user which decision they MUST make. Present balanced, objective tradeoffs.
2. Ensure realistic metrics between 0 and 100.
3. Every ripple node must have valid parentId references linking back to root.
4. Output raw JSON only with no conversational preamble.
`;
  }

  private buildRegenerationPrompt(
    original: SimulationResult,
    modifiedVariables: Record<string, number>,
    updatedFactors: InfluencingFactor[],
    deterministic: any,
    userNotes?: string
  ): string {
    return `
You are WhatIf? / Ripple AI. The user has modified key variables on their decision simulation.
Analyze how these specific changes alter the scenarios, probabilities, risks, and causal chains.

ORIGINAL DECISION: "${original.decisionTitle}"
GOAL: "${original.mainObjective}"

MODIFIED VARIABLES:
${JSON.stringify(modifiedVariables, null, 2)}

DETERMINISTIC RUNWAY & STRESS METRICS RECALCULATED:
- Runway Months: ${deterministic.runwayMonths}
- Estimated Total Cost: ₹${deterministic.estimatedTotalCost}
- Weekly Hours Budgeted: ${deterministic.weeklyHoursBudgeted} hrs/wk
- Workload Stress Score: ${deterministic.stressRiskScore}/100
- Resilience Rating: ${deterministic.resilienceRating}
- Modified: ${deterministic.assumptionsModified.join('; ')}

USER NOTES: "${userNotes || 'None'}"

Generate the revised scenarios, updated causal chains, and updated key considerations that reflect these new inputs.
Return strict JSON matching this structure:
{
  "executiveSummary": "Updated 2-3 sentence strategic summary taking into account the modified variables.",
  "scenarios": [
    // 3 updated scenario objects (optimistic, expected, difficult) reflecting the new variable values!
  ],
  "causalChains": [
    // 1-2 updated causal chains highlighting the ripple effect of the changed variables!
  ],
  "keyConsiderations": {
    "criticalRisks": ["..."],
    "keyOpportunities": ["..."],
    "majorUncertainties": ["..."],
    "questionsToAskSelf": ["..."]
  }
}
`;
  }

  private cleanAndParseJSON(text: string): any {
    if (!text || typeof text !== 'string') return null;
    let cleaned = text.trim();

    // Strip markdown code fences if present
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    try {
      return JSON.parse(cleaned);
    } catch (e) {
      // Attempt substring between first { and last }
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        try {
          return JSON.parse(cleaned.substring(firstBrace, lastBrace + 1));
        } catch (e2) {
          console.error('Failed to parse JSON even after substring extraction:', e2);
        }
      }
      return null;
    }
  }

  private normalizeSimulationResult(
    parsed: any,
    input: DecisionInput,
    modelName: string,
    latencyMs: number
  ): SimulationResult {
    const factors: InfluencingFactor[] = Array.isArray(parsed.influencingFactors)
      ? parsed.influencingFactors.map((f: any, idx: number) => ({
          id: f.id || `factor_${idx}`,
          name: f.name || `Factor ${idx + 1}`,
          category: f.category || 'General',
          importance: f.importance || 'Medium',
          description: f.description || '',
          defaultValue: Number(f.defaultValue ?? 20),
          currentValue: Number(f.currentValue ?? f.defaultValue ?? 20),
          unit: f.unit || '',
          min: Number(f.min ?? 0),
          max: Number(f.max ?? 100),
          step: Number(f.step ?? 1),
        }))
      : [];

    const deterministic = calculateDeterministicProjections(factors);

    return {
      id: 'sim-' + Date.now(),
      decisionTitle: input.title,
      category: input.category,
      mainObjective: input.mainGoal,
      timeHorizon: input.timeHorizon,
      constraints: input.constraints,
      executiveSummary:
        parsed.executiveSummary ||
        'Comprehensive multi-scenario evaluation of the proposed options and downstream ripples.',
      influencingFactors: factors,
      scenarios: Array.isArray(parsed.scenarios) ? parsed.scenarios : [],
      ripplePaths: Array.isArray(parsed.ripplePaths) ? parsed.ripplePaths : [],
      sideBySideComparison: parsed.sideBySideComparison || {
        optionA: {
          name: input.options[0] || 'Option A',
          summary: 'Option A overview',
          pros: [],
          cons: [],
          requiredResources: { time: '', financial: '', mentalBandwidth: '' },
          longTermOutlook: '',
          scores: { roi: 70, risk: 50, flexibility: 60, speed: 70 },
        },
        optionB: {
          name: input.options[1] || 'Option B',
          summary: 'Option B overview',
          pros: [],
          cons: [],
          requiredResources: { time: '', financial: '', mentalBandwidth: '' },
          longTermOutlook: '',
          scores: { roi: 70, risk: 50, flexibility: 60, speed: 70 },
        },
      },
      causalChains: Array.isArray(parsed.causalChains) ? parsed.causalChains : [],
      keyConsiderations: parsed.keyConsiderations || {
        criticalRisks: [],
        keyOpportunities: [],
        majorUncertainties: [],
        questionsToAskSelf: [],
      },
      deterministicCalculations: deterministic,
      meta: {
        generatedAt: new Date().toISOString(),
        source: 'gemini-live',
        modelUsed: modelName,
        latencyMs,
      },
    };
  }
}

export const geminiService = new GeminiService();
