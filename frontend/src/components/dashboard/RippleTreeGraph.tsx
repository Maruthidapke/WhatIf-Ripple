import React, { useState } from 'react';
import {
  GitBranch,
  Clock,
  Sparkles,
  Info,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  X,
  Layers,
  Filter,
} from 'lucide-react';
import { RippleNode } from '../../types/simulation';

interface RippleTreeGraphProps {
  rippleNodes: RippleNode[];
  decisionTitle: string;
}

export const RippleTreeGraph: React.FC<RippleTreeGraphProps> = ({
  rippleNodes,
  decisionTitle,
}) => {
  const [selectedNode, setSelectedNode] = useState<RippleNode | null>(
    rippleNodes.find((n) => n.type === 'option') || rippleNodes[0] || null
  );
  const [filterBranch, setFilterBranch] = useState<'All' | 'Option A' | 'Option B'>('All');

  const rootNode = rippleNodes.find((n) => n.type === 'root') || {
    id: 'root-default',
    label: decisionTitle,
    type: 'root' as const,
    optionBranch: 'Root',
    timeFrame: 'Day 0',
    probability: 'High' as const,
    impact: 'Neutral' as const,
    description: 'Starting point of your decision journey.',
    keyTakeaway: 'Choices made here trigger divergent ripple trajectories.',
    metrics: { effort: 5, risk: 5, reward: 7 },
  };

  const optionNodes = rippleNodes.filter((n) => n.type === 'option');
  const firstOrderNodes = rippleNodes.filter((n) => n.type === 'first_order');
  const secondOrderNodes = rippleNodes.filter((n) => n.type === 'second_order');
  const thirdOrderNodes = rippleNodes.filter((n) => n.type === 'third_order');

  const filterByBranch = (nodes: RippleNode[]) => {
    if (filterBranch === 'All') return nodes;
    return nodes.filter((n) => n.optionBranch.toLowerCase().includes(filterBranch.toLowerCase()));
  };

  const getNodeColor = (type: RippleNode['type'], impact: RippleNode['impact']) => {
    switch (type) {
      case 'root':
        return 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border-cyan-500/50 text-cyan-200';
      case 'option':
        return 'bg-slate-900/90 border-purple-500/50 text-purple-200 hover:border-purple-400';
      case 'first_order':
        return impact === 'Positive'
          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
          : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200';
      case 'second_order':
        return 'bg-blue-950/40 border-blue-500/40 text-blue-200';
      case 'third_order':
        return 'bg-purple-950/40 border-purple-500/40 text-purple-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <span>Interactive Ripple Decision Tree</span>
          </h2>
          <p className="text-xs text-slate-400">
            Click any branch node to inspect its specific downstream consequences and metrics.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-[11px] text-slate-500 px-2 font-medium flex items-center gap-1">
            <Filter className="w-3 h-3" /> Branch:
          </span>
          {(['All', 'Option A', 'Option B'] as const).map((branch) => (
            <button
              key={branch}
              onClick={() => setFilterBranch(branch)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterBranch === branch
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {branch}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tree Canvas Column (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl glass-panel-glow border-slate-700/80 overflow-x-auto min-h-[460px] flex flex-col justify-between space-y-8">
          {/* Level 0: Root Initial Decision */}
          <div className="flex justify-center">
            <div
              onClick={() => setSelectedNode(rootNode)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer max-w-md text-center shadow-lg ${
                selectedNode?.id === rootNode.id
                  ? 'ring-2 ring-cyan-400 border-cyan-400 bg-slate-900'
                  : 'border-cyan-500/40 bg-slate-950/80 hover:border-cyan-400'
              }`}
            >
              <div className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider mb-1">
                Root Decision • Day 0
              </div>
              <h4 className="text-sm font-bold text-white line-clamp-2">{rootNode.label}</h4>
            </div>
          </div>

          {/* SVG Connector Line */}
          <div className="flex justify-center -my-4 pointer-events-none">
            <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-purple-500" />
          </div>

          {/* Level 1: Options Layer */}
          <div>
            <div className="text-[11px] font-mono uppercase font-bold text-purple-400 tracking-wider mb-3 text-center">
              Layer 1: Strategic Choices
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filterByBranch(optionNodes).map((node) => (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    selectedNode?.id === node.id
                      ? 'ring-2 ring-purple-400 border-purple-400 bg-slate-900 shadow-purple-500/20'
                      : 'border-slate-700 bg-slate-950/70 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                      {node.optionBranch}
                    </span>
                    <span className="text-[10px] text-slate-400">{node.timeFrame}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2">{node.label}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-medium">
                    <span>Inspect Ripple</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Level 2: 1st Order Consequences */}
          {firstOrderNodes.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase font-bold text-cyan-400 tracking-wider mb-3 text-center">
                Layer 2: 1st-Order Consequences (1-3 Months)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filterByBranch(firstOrderNodes).map((node) => (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      selectedNode?.id === node.id
                        ? 'ring-2 ring-cyan-400 border-cyan-400 bg-slate-900 shadow-cyan-500/20'
                        : 'border-slate-800 bg-slate-950/60 hover:border-cyan-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-cyan-400">{node.optionBranch}</span>
                      <span className="text-slate-500">{node.timeFrame}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 line-clamp-2">{node.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Level 3: 2nd & 3rd Order Cascades */}
          {(secondOrderNodes.length > 0 || thirdOrderNodes.length > 0) && (
            <div>
              <div className="text-[11px] font-mono uppercase font-bold text-blue-400 tracking-wider mb-3 text-center">
                Layer 3: 2nd & 3rd Order Long-Term Impacts (6-24 Months)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filterByBranch([...secondOrderNodes, ...thirdOrderNodes]).map((node) => (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      selectedNode?.id === node.id
                        ? 'ring-2 ring-blue-400 border-blue-400 bg-slate-900 shadow-blue-500/20'
                        : 'border-slate-800/80 bg-slate-950/50 hover:border-blue-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-blue-400">{node.timeFrame}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          node.impact === 'Positive'
                            ? 'text-emerald-400 bg-emerald-950'
                            : node.impact === 'Negative'
                            ? 'text-rose-400 bg-rose-950'
                            : 'text-amber-400 bg-amber-950'
                        }`}
                      >
                        {node.impact} Impact
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 line-clamp-2">{node.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Node Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl glass-panel border border-slate-700/80 flex flex-col justify-between space-y-5">
          {selectedNode ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="pb-3 border-b border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {selectedNode.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {selectedNode.timeFrame}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white pt-1">{selectedNode.label}</h3>
                <p className="text-xs text-purple-400 font-medium">{selectedNode.optionBranch}</p>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Consequence Details
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {selectedNode.description}
                </p>
              </div>

              {/* Key Takeaway */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Strategic Takeaway
                </span>
                <p className="text-xs text-emerald-200/90 font-medium bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/20">
                  {selectedNode.keyTakeaway}
                </p>
              </div>

              {/* Metrics Rating */}
              {selectedNode.metrics && (
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    Relative Burden & Yield (1-10)
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Required Effort:</span>
                      <span className="font-mono text-cyan-400 font-bold">{selectedNode.metrics.effort}/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Incurred Risk:</span>
                      <span className="font-mono text-amber-400 font-bold">{selectedNode.metrics.risk}/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Expected Reward:</span>
                      <span className="font-mono text-emerald-400 font-bold">{selectedNode.metrics.reward}/10</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500 space-y-2">
              <Info className="w-8 h-8 mx-auto opacity-40 text-cyan-400" />
              <p className="text-xs">Click any node on the left tree to inspect its ripple effects.</p>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
            Node consequences are projected using Gemini's reasoning graph and second-order causality logic.
          </div>
        </div>
      </div>
    </div>
  );
};
