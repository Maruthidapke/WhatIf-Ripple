import React from 'react';
import { ArrowRight, Sparkles, AlertCircle, Link2, GitFork } from 'lucide-react';
import { CausalChain } from '../../types/simulation';

interface RippleCausalChainsProps {
  causalChains: CausalChain[];
}

export const RippleCausalChains: React.FC<RippleCausalChainsProps> = ({ causalChains }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-purple-400" />
            <span>Ripple Effect Causal Chains</span>
          </h2>
          <p className="text-xs text-slate-400">
            Understand how an initial trigger ripples through progressive stages of consequence.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-xl">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Probabilistic relationships, not guaranteed linear outcomes</span>
        </div>
      </div>

      {/* Chains List */}
      <div className="space-y-6">
        {causalChains.map((chain, chainIdx) => (
          <div
            key={chain.id || chainIdx}
            className="p-6 rounded-3xl glass-panel-purple border-purple-500/30 space-y-5"
          >
            {/* Trigger Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold flex items-center justify-center">
                  #{chainIdx + 1}
                </span>
                <span className="text-xs font-mono uppercase font-bold text-slate-400">
                  Catalyst Trigger:
                </span>
                <h4 className="text-sm font-bold text-cyan-300">{chain.factorTrigger}</h4>
              </div>

              {chain.summary && (
                <span className="text-xs text-slate-400 font-normal italic">
                  "{chain.summary}"
                </span>
              )}
            </div>

            {/* Stepped Sequence Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
              {chain.sequence.map((step, idx) => (
                <div
                  key={idx}
                  className="relative p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-2 hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-purple-400">
                      Step {step.step || idx + 1}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        step.sentiment === 'positive'
                          ? 'bg-emerald-400'
                          : step.sentiment === 'negative'
                          ? 'bg-rose-400'
                          : 'bg-amber-400'
                      }`}
                    />
                  </div>

                  <h5 className="text-xs font-bold text-white">{step.title}</h5>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {step.explanation}
                  </p>

                  {idx < chain.sequence.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-purple-400">
                      <ArrowRight className="w-4 h-4 bg-[#0a0f1d] rounded-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Caveat */}
            {chain.caveat && (
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                <span className="text-purple-400 font-bold shrink-0">Note:</span>
                <span className="italic">{chain.caveat}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
