import React from 'react';
import { Sparkles, Shield, Cpu, GitFork, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#060910] text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">
                WhatIf<span className="text-cyan-400">?</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                Powered by Ripple
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Don't just make a decision. Explore its ripple effect. A decision-intelligence platform
              built to simulate multi-order consequences, evaluate tradeoffs, and test key assumptions
              before executing life-defining choices.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Built for the Google Gemini API Hackathon</span>
            </div>
          </div>

          {/* Column 2: Core Principles */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">
              Core Principles
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <GitFork className="w-3.5 h-3.5 text-purple-400" />
                <span>Multi-branch scenario trees</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Gemini reasoning + deterministic math</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Non-prescriptive decision support</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Technology */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Google Gemini API',
                '@google/genai SDK',
                'Node.js & Express',
                'TypeScript',
                'React & Vite',
                'Tailwind CSS',
                'React Flow',
                'Recharts',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} WhatIf? – Powered by Ripple. All simulations are probabilistic scenarios for exploration.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">
              Disclaimer: Does not constitute formal financial, medical, or legal advice.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
