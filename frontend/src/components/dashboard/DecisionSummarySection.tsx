import React, { useState } from 'react';
import {
  FileText,
  Bookmark,
  Printer,
  PlusCircle,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  CheckCircle,
  Check,
  AlertTriangle,
  Lightbulb,
  Compass,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SimulationResult } from '../../types/simulation';
import { saveSimulationLocally } from '../../services/localHistory';

interface DecisionSummarySectionProps {
  simulation: SimulationResult;
  onNewSimulation: () => void;
  onRefreshSavedCount: () => void;
}

export const DecisionSummarySection: React.FC<DecisionSummarySectionProps> = ({
  simulation,
  onNewSimulation,
  onRefreshSavedCount,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const { keyConsiderations, executiveSummary, influencingFactors } = simulation;

  const handleSave = () => {
    saveSimulationLocally(simulation);
    setIsSaved(true);
    onRefreshSavedCount();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {}
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl glass-panel-glow border-slate-700/80 space-y-8 print:p-0 print:border-none print:shadow-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Strategic Synthesis & Debrief</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Decision Intelligence Summary
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Synthesized findings, critical considerations, and questions before you commit.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 no-print">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Saved Locally!</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                <span>Save Simulation</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-purple-400" />
            <span>Export / Print PDF</span>
          </button>

          <button
            onClick={onNewSimulation}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Simulation</span>
          </button>
        </div>
      </div>

      {/* Main Strategic Findings */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Core Strategic Finding</span>
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed font-medium">
          {executiveSummary}
        </p>
      </div>

      {/* 2 Column Considerations Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risks */}
        <div className="p-5 rounded-2xl glass-panel border border-rose-500/30 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Critical Fragilities & Risks</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {keyConsiderations.criticalRisks.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4" />
            <span>Highest-Upside Opportunities</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {keyConsiderations.keyOpportunities.map((opp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">{opp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Major Uncertainties & Questions Before Deciding */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Uncertainties */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Major Uncontrollable Uncertainties</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {keyConsiderations.majorUncertainties.map((unc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0 mt-0.5">?</span>
                <span className="leading-relaxed">{unc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical Self-Reflection Questions */}
        <div className="p-5 rounded-2xl glass-panel border border-purple-500/30 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Questions to Ask Yourself Before Choosing</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {keyConsiderations.questionsToAskSelf.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-400 font-bold shrink-0 mt-0.5">→</span>
                <span className="leading-relaxed italic font-medium">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Neutral Non-Prescriptive Principle */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Decision Neutrality Commitment:</strong> WhatIf? never prescribes a path. It maps the landscape so you can choose with clarity.
          </span>
        </span>
        <span className="font-mono text-cyan-400 hidden sm:inline">Engine: Ripple v1.0</span>
      </div>
    </div>
  );
};
