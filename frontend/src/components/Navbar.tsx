import React from 'react';
import { Sparkles, Key, Bookmark, PlusCircle, Compass, Zap } from 'lucide-react';
import { HealthStatus } from '../types/simulation';

interface NavbarProps {
  health: HealthStatus | null;
  onOpenApiKeyModal: () => void;
  onOpenHistoryDrawer: () => void;
  onNewSimulation: () => void;
  onGoHome: () => void;
  savedCount: number;
  currentView: 'landing' | 'create' | 'dashboard';
}

export const Navbar: React.FC<NavbarProps> = ({
  health,
  onOpenApiKeyModal,
  onOpenHistoryDrawer,
  onNewSimulation,
  onGoHome,
  savedCount,
  currentView,
}) => {
  const isLive = health?.gemini.isConfigured;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#080c14]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-cyan-400/20 animate-ping opacity-20 pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                WhatIf<span className="text-cyan-400">?</span>
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 tracking-wider">
                Ripple Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Experience the consequences before deciding
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Gemini Mode Badge */}
          <button
            onClick={onOpenApiKeyModal}
            title={isLive ? 'Connected to live Google Gemini API' : 'Click to connect your Gemini API Key'}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isLive
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-300 hover:bg-amber-900/50'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="hidden md:inline font-mono">
              {isLive ? `Gemini Live (${health?.gemini.model || 'Flash'})` : 'Demo Mode (Sample Data)'}
            </span>
            <span className="md:hidden">
              {isLive ? 'Live' : 'Demo'}
            </span>
            <Key className="w-3 h-3 opacity-60 ml-0.5" />
          </button>

          {/* Saved History */}
          <button
            onClick={onOpenHistoryDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 border border-slate-800 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* New Simulation CTA */}
          {currentView !== 'create' && (
            <button
              onClick={onNewSimulation}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Start Simulation</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
