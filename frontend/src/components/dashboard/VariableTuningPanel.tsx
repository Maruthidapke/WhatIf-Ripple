import React, { useState, useEffect } from 'react';
import {
  Sliders,
  RotateCcw,
  Sparkles,
  Calculator,
  AlertCircle,
  TrendingDown,
  Clock,
  ShieldCheck,
  Loader2,
  DollarSign,
  Activity,
  ArrowRight,
} from 'lucide-react';
import {
  DeterministicProjections,
  InfluencingFactor,
} from '../../types/simulation';

interface VariableTuningPanelProps {
  factors: InfluencingFactor[];
  currentProjections: DeterministicProjections;
  onVariablesChanged: (modifiedVariables: Record<string, number>) => void;
  onRegenerateWithGemini: (userNotes?: string) => Promise<void>;
  isRegenerating: boolean;
  isLive: boolean;
}

export const VariableTuningPanel: React.FC<VariableTuningPanelProps> = ({
  factors,
  currentProjections,
  onVariablesChanged,
  onRegenerateWithGemini,
  isRegenerating,
  isLive,
}) => {
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});
  const [userNotes, setUserNotes] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const initial: Record<string, number> = {};
    factors.forEach((f) => {
      initial[f.id] = f.currentValue ?? f.defaultValue;
    });
    setSliderValues(initial);
  }, [factors]);

  const handleSliderChange = (id: string, value: number) => {
    const updated = { ...sliderValues, [id]: value };
    setSliderValues(updated);
    setHasChanges(true);
    onVariablesChanged(updated);
  };

  const handleReset = () => {
    const resetVals: Record<string, number> = {};
    factors.forEach((f) => {
      resetVals[f.id] = f.defaultValue;
    });
    setSliderValues(resetVals);
    setHasChanges(false);
    setUserNotes('');
    onVariablesChanged(resetVals);
  };

  const handleRegenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    await onRegenerateWithGemini(userNotes);
    setHasChanges(false);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border-slate-700/80 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Variable Sensitivity & What-If Tuning
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Adjust critical variables to see immediate mathematical recalculations, then re-simulate with Gemini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Variables</span>
            </button>
          )}
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
            Real-Time Deterministic Math
          </span>
        </div>
      </div>

      {/* Real-Time Recalculated Projections Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
            <Calculator className="w-4 h-4" />
            <span>Recalculated Projections (Instant Deterministic Formula)</span>
          </div>
          <span className="text-[10px] text-slate-400">
            {hasChanges ? '⚡ Recalculated from sliders' : 'Baseline values'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          {/* Runway */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">Financial Runway:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-cyan-400 font-mono">
                {currentProjections.runwayMonths}
              </span>
              <span className="text-xs text-slate-400">months</span>
            </div>
            <p className="text-[10px] text-slate-500">Capital / Net Monthly Burn</p>
          </div>

          {/* Weekly Commitment */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">Weekly Hours Burden:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-purple-400 font-mono">
                {currentProjections.weeklyHoursBudgeted}
              </span>
              <span className="text-xs text-slate-400">hrs/wk</span>
            </div>
            <p className="text-[10px] text-slate-500">Work + Self-Study total</p>
          </div>

          {/* Stress Index */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">Workload & Cash Stress:</span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-xl font-bold font-mono ${
                  currentProjections.stressRiskScore > 70
                    ? 'text-rose-400'
                    : currentProjections.stressRiskScore > 45
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {currentProjections.stressRiskScore}
              </span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <p className="text-[10px] text-slate-500">Calculated fatigue risk</p>
          </div>

          {/* Resilience Rating */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400">Resilience Rating:</span>
            <p className="text-xs font-bold text-slate-200 mt-1 line-clamp-2">
              {currentProjections.resilienceRating}
            </p>
          </div>
        </div>

        {/* Highlight modified assumptions */}
        {currentProjections.assumptionsModified && currentProjections.assumptionsModified.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 text-xs text-cyan-300/90 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-400">Modified Assumptions:</span>
            {currentProjections.assumptionsModified.map((mod, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[11px] font-mono">
                {mod}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Sliders Grid */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
          Adjust Factors & Constraints
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {factors.map((factor) => {
            const currentValue = sliderValues[factor.id] ?? factor.defaultValue;
            const isChanged = currentValue !== factor.defaultValue;

            return (
              <div
                key={factor.id}
                className={`p-4 rounded-2xl glass-panel space-y-3 transition-all ${
                  isChanged ? 'border-cyan-500/50 bg-slate-900/90' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">{factor.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{factor.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-bold font-mono text-cyan-400">
                      {currentValue}
                      {factor.unit}
                    </span>
                    {isChanged && (
                      <span className="block text-[10px] text-slate-500 font-mono">
                        (orig: {factor.defaultValue}{factor.unit})
                      </span>
                    )}
                  </div>
                </div>

                {/* Range Slider */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min={factor.min}
                    max={factor.max}
                    step={factor.step}
                    value={currentValue}
                    onChange={(e) => handleSliderChange(factor.id, Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>
                      {factor.min}
                      {factor.unit}
                    </span>
                    <span>
                      {factor.max}
                      {factor.unit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gemini AI Regeneration Section */}
      <form
        onSubmit={handleRegenerate}
        className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-900 to-cyan-950/30 border border-purple-500/30 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h4 className="text-sm font-bold text-white">
            Regenerate Scenarios with Google Gemini AI
          </h4>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Adaptive AI Loop
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Sliding controls updates math instantly. Click below to ask Gemini to re-synthesize qualitative scenario narratives,
          rebalance likelihoods, and adapt causal chains based on your custom variable adjustments.
        </p>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Add context notes for Gemini (optional):
          </label>
          <input
            type="text"
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="e.g., Assume I have a roommate to split rent, or received a partial scholarship..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-[11px] text-slate-400">
            {isLive ? '✓ Real Gemini API invocation' : 'Demo engine adaptive re-simulation'}
          </p>

          <button
            type="submit"
            disabled={isRegenerating}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            {isRegenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gemini is Re-Evaluating Scenarios...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Regenerate Scenarios with Gemini</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
