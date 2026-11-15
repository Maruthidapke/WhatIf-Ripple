import { SimulationResult } from '../types/simulation';

const STORAGE_KEY = 'whatif_saved_simulations_v1';

export function getSavedSimulations(): SimulationResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse saved simulations from localStorage:', e);
    return [];
  }
}

export function saveSimulationLocally(sim: SimulationResult): void {
  const existing = getSavedSimulations();
  const filtered = existing.filter((s) => s.id !== sim.id);
  const updated = [sim, ...filtered];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteSavedSimulation(id: string): void {
  const existing = getSavedSimulations();
  const updated = existing.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function exportSimulationsAsJSON(): void {
  const sims = getSavedSimulations();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sims, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `whatif_simulations_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
