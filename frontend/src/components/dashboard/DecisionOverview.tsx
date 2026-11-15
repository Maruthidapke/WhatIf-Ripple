import React from 'react';
import { Target, Clock, ShieldAlert, Sliders, Calendar, Sparkles } from 'lucide-react';
import { SimulationResult } from '../../types/simulation';

interface DecisionOverviewProps {
  simulation: SimulationResult;
}

export const DecisionOverview: React.FC<DecisionOverviewProps> = ({ simulation }) => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border-slate-700/80 space-y-6">
      {/* Top Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 tracking-wider">
            {simulation.category}
          </span>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {new Date(simulation.meta.generatedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-medium border ${
              simulation.meta.source === 'gemini-live'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-950/60 text-amber-400 border-amber-500/30'
            }`}
          >
            {simulation.meta.source === 'gemini-live' ? '● Gemini Live Analysis' : '● Demo Engine Preset'}
          </span>
          {simulation.meta.latencyMs && (
            <span className="text-[11px] text-slate-500 font-mono">
              {simulation.meta.latencyMs}ms
            </span>
          )}
        </div>
      </div>

      {/* Main Title & Executive Summary */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {simulation.decisionTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
          <span className="text-cyan-400 font-semibold mr-1">Strategic Dilemma:</span>
          {simulation.executiveSummary}
        </p>
      </div>

      {/* Grid of Key Decision Anchors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Main Objective */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Core Objective</span>
          </div>
          <p className="text-xs font-medium text-slate-200">
            {simulation.mainObjective}
          </p>
        </div>

        {/* Time Horizon */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Time Horizon</span>
          </div>
          <p className="text-xs font-medium text-slate-200">
            {simulation.timeHorizon}
          </p>
        </div>

        {/* Constraints */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Constraints & Bounds</span>
          </div>
          <p className="text-xs font-medium text-slate-200">
            {simulation.constraints || 'No explicit constraints specified'}
          </p>
        </div>
      </div>

      {/* Influencing Factors List */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Extracted Influencing Factors ({simulation.influencingFactors.length})
          </span>
          <span className="text-[11px] text-slate-500">
            Tunable via Sensitivity Sliders below
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {simulation.influencingFactors.map((factor) => (
            <div
              key={factor.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
            >
              <span className="font-medium text-slate-200">{factor.name}:</span>
              <span className="font-mono text-cyan-400 font-bold">
                {factor.currentValue ?? factor.defaultValue}
                {factor.unit}
              </span>
              <span
                className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                  factor.importance === 'High'
                    ? 'bg-rose-500/20 text-rose-300'
                    : factor.importance === 'Medium'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-slate-700/40 text-slate-300'
                }`}
              >
                {factor.importance}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
