import React from 'react';
import {
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Scenario } from '../../types/simulation';

interface ScenarioCardsProps {
  scenarios: Scenario[];
}

export const ScenarioCards: React.FC<ScenarioCardsProps> = ({ scenarios }) => {
  const getScenarioTheme = (type: Scenario['type']) => {
    switch (type) {
      case 'optimistic':
        return {
          titleColor: 'text-emerald-400',
          badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
          borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
          glow: 'shadow-emerald-500/10',
          icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
          label: 'Optimistic Scenario',
        };
      case 'expected':
        return {
          titleColor: 'text-cyan-400',
          badgeBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30',
          borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
          glow: 'shadow-cyan-500/10',
          icon: <Activity className="w-5 h-5 text-cyan-400" />,
          label: 'Expected Baseline',
        };
      case 'difficult':
        return {
          titleColor: 'text-rose-400',
          badgeBg: 'bg-rose-950/80 text-rose-300 border-rose-500/30',
          borderColor: 'border-rose-500/30 hover:border-rose-500/60',
          glow: 'shadow-rose-500/10',
          icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
          label: 'Difficult Scenario',
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Scenario Triad Comparison</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              3 Distinct Futures
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Compare outcomes across different external conditions and execution discipline.
          </p>
        </div>

        {/* Disclaimer Tag */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Probabilistic simulations • Not guaranteed predictions</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((scenario) => {
          const theme = getScenarioTheme(scenario.type);

          return (
            <div
              key={scenario.type}
              className={`p-6 rounded-3xl glass-panel border ${theme.borderColor} shadow-xl ${theme.glow} flex flex-col justify-between space-y-5 transition-all hover:translate-y-[-2px]`}
            >
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${theme.badgeBg}`}
                  >
                    {theme.label}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    Likelihood: <span className="text-white">{scenario.likelihood}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {theme.icon}
                  <h3 className={`text-lg font-bold ${theme.titleColor}`}>
                    {scenario.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[50px]">
                  {scenario.description}
                </p>
              </div>

              {/* Metrics distribution preview */}
              {scenario.metrics && (
                <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Projected Index Metrics</span>
                    <span className="text-cyan-400 font-mono">0-100 scale</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px]">Financial:</span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-cyan-400 rounded-full"
                            style={{ width: `${scenario.metrics.financialScore}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-slate-200">{scenario.metrics.financialScore}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">Growth:</span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-purple-400 rounded-full"
                            style={{ width: `${scenario.metrics.careerGrowthScore}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-slate-200">{scenario.metrics.careerGrowthScore}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">Stress:</span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-rose-400 rounded-full"
                            style={{ width: `${scenario.metrics.stressIndex}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-slate-200">{scenario.metrics.stressIndex}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">Adaptability:</span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full"
                            style={{ width: `${scenario.metrics.adaptabilityScore}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-slate-200">{scenario.metrics.adaptabilityScore}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Potential Benefits
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {scenario.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold leading-none mt-1">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risks */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Possible Friction & Risks
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {scenario.risks.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold leading-none mt-1">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Assumptions & Uncertainty Indicator */}
              <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Underlying Uncertainty:</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded ${
                      scenario.uncertainty === 'Low'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : scenario.uncertainty === 'Medium'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {scenario.uncertainty} Uncertainty
                  </span>
                </div>

                <div className="text-slate-400">
                  <span className="text-slate-500 font-medium">Key Assumptions: </span>
                  <span>{scenario.assumptions.join(' • ')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
