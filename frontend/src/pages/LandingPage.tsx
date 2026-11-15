import React from 'react';
import {
  ArrowRight,
  GitBranch,
  Sliders,
  Scale,
  BrainCircuit,
  ShieldAlert,
  Sparkles,
  Zap,
  TrendingUp,
  Target,
  Compass,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { DecisionCategory } from '../types/simulation';

interface LandingPageProps {
  onStartSimulation: () => void;
  onSelectPreset: (preset: string) => void;
  onOpenApiKeyModal: () => void;
  isLive: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartSimulation,
  onSelectPreset,
  onOpenApiKeyModal,
  isLive,
}) => {
  const examplePrompts = [
    {
      id: 'internship',
      category: 'Career' as DecisionCategory,
      title: 'Should I take an internship or focus on learning new skills?',
      desc: 'Compare early startup production code exposure and mentorship against an autonomous deep-learning project sprint.',
      presetKey: 'internship',
      gradient: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30',
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/40',
    },
    {
      id: 'business',
      category: 'Business' as DecisionCategory,
      title: 'Should I start a small business with ₹20,000?',
      desc: 'Explore asymmetric upside: capped ₹20,000 downside vs real-world unit economics, cash-flow literacy, and client sales.',
      presetKey: 'business',
      gradient: 'from-purple-500/20 to-pink-500/10 border-purple-500/30',
      badgeColor: 'text-purple-400 bg-purple-950/60 border-purple-800/40',
    },
    {
      id: 'education',
      category: 'Education' as DecisionCategory,
      title: 'Should I choose a job or pursue higher education?',
      desc: 'Evaluate immediate industry financial independence and corporate rank against masters specialization and global mobility.',
      presetKey: 'education',
      gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40',
    },
    {
      id: 'relocation',
      category: 'Lifestyle' as DecisionCategory,
      title: 'Should I move to another city for better opportunities?',
      desc: 'Weigh tech ecosystem serendipity, coffee chats, and in-person referrals against metro cost of living and hometown savings.',
      presetKey: 'relocation',
      gradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800/40',
    },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 text-center px-4 max-w-5xl mx-auto overflow-hidden">
        {/* Glow backdrop elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-purple-600/15 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-6 shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Don't just make a decision. Explore its ripple effect.</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          What if your next decision{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            changed everything?
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Explore possibilities. Understand consequences. Make informed decisions with multi-scenario
          AI simulations powered by Google Gemini.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartSimulation}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Start Simulation</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => onSelectPreset('internship')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 font-semibold text-base border border-slate-700 transition-all hover:border-slate-600 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Load Quick Demo</span>
          </button>
        </div>

        {/* Interactive Ripple Preview Teaser Banner */}
        <div className="relative mx-auto max-w-4xl rounded-2xl glass-panel-glow border-slate-700/80 p-6 md:p-8 text-left shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>RIPPLE CONFLICT RESOLUTION ARCHITECTURE</span>
              </div>
              <h3 className="text-xl font-bold text-white">How Ripple Simulates Your Choices</h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
              Decision Support • Not Chat Advice
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Optimistic Scenario
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aggressive growth path assuming disciplined execution, low friction, and favorable market conditions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Expected Baseline
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Realistic balance accounting for standard friction, learning curves, and average outcome distributions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Difficult Scenario
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stress-test plan when assumptions fail, living costs spike, or unforeseen blockers arise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            Intelligent Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            How WhatIf? Unfolds Consequences
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Three simple steps to transform subjective hesitation into clear, structured scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative p-6 rounded-2xl glass-panel space-y-4 hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg font-mono">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Define Your Dilemma</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your real-life decision, available choices, main objective, timeline, and budget or geographic constraints.
            </p>
          </div>

          <div className="relative p-6 rounded-2xl glass-panel space-y-4 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-lg font-mono">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Gemini Generates Ripples</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gemini extracts key factors, projects 3 distinct scenarios, and builds a multi-order consequence decision graph.
            </p>
          </div>

          <div className="relative p-6 rounded-2xl glass-panel space-y-4 hover:border-blue-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg font-mono">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Tune Variables & Compare</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Move budget and hour sliders to see deterministic runway changes, compare paths side-by-side, and re-simulate instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Example Simulations Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Real-World Scenarios
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Explore Example Decision Simulations
            </h2>
          </div>
          <button
            onClick={onStartSimulation}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>Or build a custom decision</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examplePrompts.map((example) => (
            <div
              key={example.id}
              onClick={() => onSelectPreset(example.presetKey)}
              className={`p-6 rounded-2xl glass-panel bg-gradient-to-br ${example.gradient} hover:scale-[1.01] transition-all cursor-pointer group space-y-4 border`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${example.badgeColor}`}>
                  {example.category}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-cyan-300 flex items-center gap-1 transition-colors">
                  Run Ripple <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {example.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {example.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why WhatIf? Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel-glow border-slate-700/80 p-8 sm:p-12">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-purple-400">
              Why WhatIf?
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">
              Beyond Chatbot Advice: A Second-Order Consequence Engine
            </h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Most AI assistants give simple answers: "You should do X because of Y."
              WhatIf? never tells you what to do. It surfaces the blindspots, cascades, and probabilities so you retain complete agency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <GitBranch className="w-5 h-5 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">Multi-Branch Ripple Trees</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visually trace 1st-order consequences into 2nd- and 3rd-order long-term outcomes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <Sliders className="w-5 h-5 text-purple-400" />
              <h4 className="text-sm font-bold text-white">Variable Sensitivity Tuning</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tweak budget, time, and expenses to observe how mathematical runway and stress change dynamically.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Side-by-Side Tradeoffs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contrast advantages, disadvantages, required energy, and long-term outlook across options.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold text-white">Explicit Assumptions & Risks</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pinpoint fragile assumptions and critical uncertainties before risking your capital or time.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <BrainCircuit className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-bold text-white">Deterministic + AI Hybrid</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Combines strict financial & workload formulas with Gemini's nuanced strategic foresight.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <Target className="w-5 h-5 text-rose-400" />
              <h4 className="text-sm font-bold text-white">Exportable Summary</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Save simulations locally, review critical questions, and export clean printable PDF reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gemini Feature Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-blue-950/40 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Gemini API Integration</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Built with the Official Google GenAI SDK
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              WhatIf? leverages Gemini models to comprehend complex human situations,
              identify implicit constraints, parse quantifiable variables, and generate structured
              JSON scenario graphs that power the interactive Ripple experience.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-cyan-300">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                @google/genai SDK
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                Structured JSON Output
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                Multi-model Fallbacks
              </span>
            </div>
          </div>

          <div className="text-center md:text-right shrink-0 space-y-3">
            <button
              onClick={onOpenApiKeyModal}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {isLive ? 'Change Gemini Key' : 'Connect Your Gemini Key'}
            </button>
            <p className="text-[11px] text-slate-400">
              {isLive ? 'Live Gemini engine is active' : 'Demo mode active with full sample support'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
