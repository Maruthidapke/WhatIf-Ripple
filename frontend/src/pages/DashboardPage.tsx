import React, { useState } from 'react';
import {
  Compass,
  GitBranch,
  Layers,
  Sliders,
  Scale,
  Link2,
  FileText,
  ArrowLeft,
  Bookmark,
  Share2,
} from 'lucide-react';
import { SimulationResult } from '../types/simulation';
import { DecisionOverview } from '../components/dashboard/DecisionOverview';
import { ScenarioCards } from '../components/dashboard/ScenarioCards';
import { RippleTreeGraph } from '../components/dashboard/RippleTreeGraph';
import { VariableTuningPanel } from '../components/dashboard/VariableTuningPanel';
import { PathComparisonView } from '../components/dashboard/PathComparisonView';
import { RippleCausalChains } from '../components/dashboard/RippleCausalChains';
import { DecisionSummarySection } from '../components/dashboard/DecisionSummarySection';

interface DashboardPageProps {
  simulation: SimulationResult;
  onNewSimulation: () => void;
  onVariablesChanged: (modifiedVariables: Record<string, number>) => void;
  onRegenerateWithGemini: (userNotes?: string) => Promise<void>;
  isRegenerating: boolean;
  onRefreshSavedCount: () => void;
  isLive: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  simulation,
  onNewSimulation,
  onVariablesChanged,
  onRegenerateWithGemini,
  isRegenerating,
  onRefreshSavedCount,
  isLive,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'tree' | 'scenarios' | 'tuning' | 'compare' | 'summary'>('all');

  const navItems = [
    { id: 'all', label: 'Complete Ripple View', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'scenarios', label: 'Scenario Triad', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'tree', label: 'Decision Tree', icon: <GitBranch className="w-3.5 h-3.5" /> },
    { id: 'tuning', label: 'Sensitivity Tuning', icon: <Sliders className="w-3.5 h-3.5" /> },
    { id: 'compare', label: 'Tradeoff Matrix', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'summary', label: 'Summary Debrief', icon: <FileText className="w-3.5 h-3.5" /> },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 animate-in fade-in duration-300">
      {/* Top Bar with Back and Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80 no-print">
        <button
          onClick={onNewSimulation}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Decision Dilemma</span>
        </button>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto max-w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Decision Overview (Always visible) */}
      <DecisionOverview simulation={simulation} />

      {/* 2. Scenario Cards */}
      {(activeTab === 'all' || activeTab === 'scenarios') && (
        <ScenarioCards scenarios={simulation.scenarios} />
      )}

      {/* 3. Interactive Ripple Paths (Decision Tree) */}
      {(activeTab === 'all' || activeTab === 'tree') && (
        <RippleTreeGraph
          rippleNodes={simulation.ripplePaths}
          decisionTitle={simulation.decisionTitle}
        />
      )}

      {/* 4. Variable Sensitivity Sliders & Deterministic Tuning */}
      {(activeTab === 'all' || activeTab === 'tuning') && (
        <VariableTuningPanel
          factors={simulation.influencingFactors}
          currentProjections={simulation.deterministicCalculations}
          onVariablesChanged={onVariablesChanged}
          onRegenerateWithGemini={onRegenerateWithGemini}
          isRegenerating={isRegenerating}
          isLive={isLive}
        />
      )}

      {/* 5. Side-by-Side Tradeoffs Comparison */}
      {(activeTab === 'all' || activeTab === 'compare') && (
        <PathComparisonView comparison={simulation.sideBySideComparison} />
      )}

      {/* 6. Ripple Causal Chains */}
      {(activeTab === 'all' || activeTab === 'scenarios') && (
        <RippleCausalChains causalChains={simulation.causalChains} />
      )}

      {/* 7. Strategic Summary & Debrief */}
      {(activeTab === 'all' || activeTab === 'summary') && (
        <DecisionSummarySection
          simulation={simulation}
          onNewSimulation={onNewSimulation}
          onRefreshSavedCount={onRefreshSavedCount}
        />
      )}
    </div>
  );
};
