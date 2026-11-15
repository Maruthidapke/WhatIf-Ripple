import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SavedSimulationsDrawer } from './components/SavedSimulationsDrawer';
import { LandingPage } from './pages/LandingPage';
import { CreateDecisionPage } from './pages/CreateDecisionPage';
import { DashboardPage } from './pages/DashboardPage';
import {
  DecisionInput,
  HealthStatus,
  SimulationResult,
} from './types/simulation';
import {
  createSimulation,
  getHealthStatus,
  loadSamplePreset,
  recalculateDeterministic,
  regenerateWithVariables,
} from './services/api';
import { getSavedSimulations } from './services/localHistory';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'create' | 'dashboard'>('landing');
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [currentSimulation, setCurrentSimulation] = useState<SimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [savedSimulations, setSavedSimulations] = useState<SimulationResult[]>([]);

  const refreshHealthAndSaved = async () => {
    const h = await getHealthStatus();
    setHealth(h);
    const saved = getSavedSimulations();
    setSavedSimulations(saved);
  };

  useEffect(() => {
    refreshHealthAndSaved();
  }, []);

  const handleStartSimulation = () => {
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitDecision = async (input: DecisionInput) => {
    setIsLoading(true);
    try {
      const result = await createSimulation(input);
      setCurrentSimulation(result);
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert(`Simulation failed: ${err?.message || 'Check your backend connection'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = async (presetKey: string) => {
    setIsLoading(true);
    try {
      const result = await loadSamplePreset(presetKey);
      setCurrentSimulation(result);
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert(`Failed to load preset: ${err?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVariablesChanged = async (modifiedVariables: Record<string, number>) => {
    if (!currentSimulation) return;
    try {
      const updatedProjections = await recalculateDeterministic(
        currentSimulation.influencingFactors,
        modifiedVariables
      );
      setCurrentSimulation((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          deterministicCalculations: updatedProjections,
        };
      });
    } catch (e) {
      console.warn('Recalculation error:', e);
    }
  };

  const handleRegenerateWithGemini = async (userNotes?: string) => {
    if (!currentSimulation) return;
    setIsRegenerating(true);
    try {
      const currentValues: Record<string, number> = {};
      currentSimulation.influencingFactors.forEach((f) => {
        currentValues[f.id] = f.currentValue ?? f.defaultValue;
      });

      const updated = await regenerateWithVariables(
        currentSimulation,
        currentValues,
        userNotes
      );
      setCurrentSimulation(updated);
    } catch (err: any) {
      alert(`Regeneration failed: ${err?.message}`);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSelectSavedSimulation = (sim: SimulationResult) => {
    setCurrentSimulation(sim);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/20 selection:text-cyan-200">
      <Navbar
        health={health}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenHistoryDrawer={() => setIsHistoryDrawerOpen(true)}
        onNewSimulation={handleStartSimulation}
        onGoHome={handleGoHome}
        savedCount={savedSimulations.length}
        currentView={currentView}
      />

      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartSimulation={handleStartSimulation}
            onSelectPreset={handleSelectPreset}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            isLive={Boolean(health?.gemini.isConfigured)}
          />
        )}

        {currentView === 'create' && (
          <CreateDecisionPage
            onSubmit={handleSubmitDecision}
            isLoading={isLoading}
            onSelectPreset={handleSelectPreset}
            isLive={Boolean(health?.gemini.isConfigured)}
          />
        )}

        {currentView === 'dashboard' && currentSimulation && (
          <DashboardPage
            simulation={currentSimulation}
            onNewSimulation={handleStartSimulation}
            onVariablesChanged={handleVariablesChanged}
            onRegenerateWithGemini={handleRegenerateWithGemini}
            isRegenerating={isRegenerating}
            onRefreshSavedCount={() => {
              setSavedSimulations(getSavedSimulations());
            }}
            isLive={Boolean(health?.gemini.isConfigured)}
          />
        )}
      </main>

      <Footer />

      {/* Modals & Slide-outs */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeyUpdated={refreshHealthAndSaved}
        currentMode={health?.gemini.mode || 'demo-mode'}
      />

      <SavedSimulationsDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        savedSimulations={savedSimulations}
        onSelectSimulation={handleSelectSavedSimulation}
        onRefreshList={() => setSavedSimulations(getSavedSimulations())}
      />
    </div>
  );
}

export default App;
