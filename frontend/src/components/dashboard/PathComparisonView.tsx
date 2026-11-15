import React from 'react';
import {
  Scale,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Brain,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { SideBySideComparison } from '../../types/simulation';

interface PathComparisonViewProps {
  comparison: SideBySideComparison;
}

export const PathComparisonView: React.FC<PathComparisonViewProps> = ({ comparison }) => {
  const { optionA, optionB } = comparison;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-cyan-400" />
            <span>Side-by-Side Path Tradeoff Comparison</span>
          </h2>
          <p className="text-xs text-slate-400">
            Compare resources, friction, pros, cons, and long-term ceilings across your main alternatives.
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option A */}
        <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 shadow-xl shadow-cyan-500/5 space-y-6">
          <div className="space-y-2 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                Option A
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ROI Index: <span className="text-cyan-400 font-bold">{optionA.scores.roi}/100</span>
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{optionA.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{optionA.summary}</p>
          </div>

          {/* Metric Bars */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
              Comparative Dimension Scores
            </span>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Return on Investment (ROI):</span>
                  <span className="font-mono text-cyan-400 font-bold">{optionA.scores.roi}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${optionA.scores.roi}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Incurred Risk & Fragility:</span>
                  <span className="font-mono text-amber-400 font-bold">{optionA.scores.risk}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${optionA.scores.risk}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Execution Flexibility:</span>
                  <span className="font-mono text-purple-400 font-bold">{optionA.scores.flexibility}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${optionA.scores.flexibility}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Required Resources */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Required Resources
            </span>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-slate-300">
                  <span className="text-slate-400">Time:</span> {optionA.requiredResources.time}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300">
                  <span className="text-slate-400">Finance:</span> {optionA.requiredResources.financial}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <Brain className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-slate-300">
                  <span className="text-slate-400">Mental:</span> {optionA.requiredResources.mentalBandwidth}
                </span>
              </div>
            </div>
          </div>

          {/* Pros */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Strategic Advantages
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {optionA.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              Disadvantages & Friction
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {optionA.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Long Term Outlook */}
          <div className="pt-3 border-t border-slate-800 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              2-3 Year Trajectory Outlook
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800">
              {optionA.longTermOutlook}
            </p>
          </div>
        </div>

        {/* Option B */}
        <div className="p-6 rounded-3xl glass-panel border border-purple-500/30 shadow-xl shadow-purple-500/5 space-y-6">
          <div className="space-y-2 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg bg-purple-950 text-purple-400 border border-purple-800 font-mono">
                Option B
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ROI Index: <span className="text-purple-400 font-bold">{optionB.scores.roi}/100</span>
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{optionB.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{optionB.summary}</p>
          </div>

          {/* Metric Bars */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
              Comparative Dimension Scores
            </span>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Return on Investment (ROI):</span>
                  <span className="font-mono text-purple-400 font-bold">{optionB.scores.roi}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${optionB.scores.roi}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Incurred Risk & Fragility:</span>
                  <span className="font-mono text-amber-400 font-bold">{optionB.scores.risk}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${optionB.scores.risk}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Execution Flexibility:</span>
                  <span className="font-mono text-cyan-400 font-bold">{optionB.scores.flexibility}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${optionB.scores.flexibility}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Required Resources */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Required Resources
            </span>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-slate-300">
                  <span className="text-slate-400">Time:</span> {optionB.requiredResources.time}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300">
                  <span className="text-slate-400">Finance:</span> {optionB.requiredResources.financial}
                </span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <Brain className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-slate-300">
                  <span className="text-slate-400">Mental:</span> {optionB.requiredResources.mentalBandwidth}
                </span>
              </div>
            </div>
          </div>

          {/* Pros */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Strategic Advantages
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {optionB.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              Disadvantages & Friction
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {optionB.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Long Term Outlook */}
          <div className="pt-3 border-t border-slate-800 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              2-3 Year Trajectory Outlook
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800">
              {optionB.longTermOutlook}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
