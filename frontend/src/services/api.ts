import {
  DecisionInput,
  DeterministicProjections,
  HealthStatus,
  InfluencingFactor,
  SimulationResult,
} from '../types/simulation';

const API_BASE = '/api';

export async function getHealthStatus(): Promise<HealthStatus> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline or health unreachable:', err);
    return {
      status: 'offline',
      service: 'WhatIf? Engine (Offline fallback)',
      gemini: {
        isConfigured: false,
        model: 'gemini-3.8-flash',
        keyMask: 'None',
        mode: 'demo-mode',
      },
    };
  }
}

export async function createSimulation(input: DecisionInput): Promise<SimulationResult> {
  const customKey = localStorage.getItem('whatif_gemini_custom_key') || undefined;
  const payload = { ...input, customApiKey: customKey };

  const res = await fetch(`${API_BASE}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || 'Failed to generate simulation');
  }

  return await res.json();
}

export async function regenerateWithVariables(
  originalSimulation: SimulationResult,
  updatedVariables: Record<string, number>,
  userNotes?: string
): Promise<SimulationResult> {
  const customKey = localStorage.getItem('whatif_gemini_custom_key') || undefined;

  const res = await fetch(`${API_BASE}/regenerate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      originalSimulation,
      updatedVariables,
      userNotes,
      customApiKey: customKey,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to regenerate scenario');
  }

  return await res.json();
}

export async function recalculateDeterministic(
  factors: InfluencingFactor[],
  modifiedVariables: Record<string, number>
): Promise<DeterministicProjections> {
  const res = await fetch(`${API_BASE}/recalculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ factors, modifiedVariables }),
  });

  if (!res.ok) {
    throw new Error('Deterministic recalculation failed');
  }

  return await res.json();
}

export async function loadSamplePreset(preset: string): Promise<SimulationResult> {
  const res = await fetch(`${API_BASE}/sample/${preset}`);
  if (!res.ok) {
    throw new Error(`Failed to load preset: ${preset}`);
  }
  return await res.json();
}

export async function verifyAndSaveApiKey(apiKey: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/config/api-key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.details || data.error || 'Failed to activate key');
  }

  localStorage.setItem('whatif_gemini_custom_key', apiKey.trim());
  return data;
}
