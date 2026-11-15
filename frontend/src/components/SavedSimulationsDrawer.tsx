import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Download, Calendar, Tag } from 'lucide-react';
import { SimulationResult } from '../types/simulation';
import { deleteSavedSimulation, exportSimulationsAsJSON } from '../services/localHistory';

interface SavedSimulationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedSimulations: SimulationResult[];
  onSelectSimulation: (sim: SimulationResult) => void;
  onRefreshList: () => void;
}

export const SavedSimulationsDrawer: React.FC<SavedSimulationsDrawerProps> = ({
  isOpen,
  onClose,
  savedSimulations,
  onSelectSimulation,
  onRefreshList,
}) => {
  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSavedSimulation(id);
    onRefreshList();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0f1d] border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Saved Simulations</h3>
                <p className="text-xs text-slate-400">{savedSimulations.length} decision ripple histories</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {savedSimulations.length === 0 ? (
              <div className="py-16 text-center text-slate-500 space-y-3">
                <Bookmark className="w-10 h-10 mx-auto opacity-30 text-cyan-400" />
                <p className="text-sm">No saved simulations yet.</p>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  When you run a simulation, click "Save Simulation" on the dashboard to review it later.
                </p>
              </div>
            ) : (
              savedSimulations.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => {
                    onSelectSimulation(sim);
                    onClose();
                  }}
                  className="group relative p-4 rounded-xl glass-panel hover:border-cyan-500/40 hover:bg-slate-900/80 cursor-pointer transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                      {sim.category}
                    </span>
                    <button
                      onClick={(e) => handleDelete(sim.id, e)}
                      title="Delete simulation"
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {sim.decisionTitle}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {sim.executiveSummary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(sim.meta.generatedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400 font-medium group-hover:translate-x-1 transition-transform">
                      Open Ripple <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Export */}
          {savedSimulations.length > 0 && (
            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
              <button
                onClick={exportSimulationsAsJSON}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-700 hover:bg-slate-800/80 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export All Simulations (JSON)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
