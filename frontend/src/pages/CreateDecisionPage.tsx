import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  Clock,
  Target,
  ShieldAlert,
  HelpCircle,
  Lightbulb,
  Loader2,
  Zap,
} from 'lucide-react';
import { DecisionCategory, DecisionInput } from '../types/simulation';

interface CreateDecisionPageProps {
  onSubmit: (input: DecisionInput) => void;
  isLoading: boolean;
  onSelectPreset: (presetKey: string) => void;
  isLive: boolean;
}

export const CreateDecisionPage: React.FC<CreateDecisionPageProps> = ({
  onSubmit,
  isLoading,
  onSelectPreset,
  isLive,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<DecisionCategory>('Career');
  const [options, setOptions] = useState<string[]>([
    'Option A: Accept the immediate offer',
    'Option B: Dedicate 6 months to independent skill sprint',
  ]);
  const [mainGoal, setMainGoal] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('1 Year');
  const [constraints, setConstraints] = useState('');

  const categories: DecisionCategory[] = [
    'Education',
    'Career',
    'Business',
    'Personal Finance',
    'Lifestyle',
    'Other',
  ];

  const quickPrompts = [
    {
      title: 'Internship vs Skill Sprint',
      fullTitle: 'Should I take an internship or focus on learning new skills?',
      desc: 'Deciding between an early-stage startup internship with a modest stipend vs staying home to build full-stack projects and prepare for top-tier tech placements.',
      category: 'Career' as DecisionCategory,
      options: [
        'Option A: Take 6-month startup internship (30 hrs/wk, ₹8,000 stipend)',
        'Option B: Independent deep-work skill sprint (build 3 showcase apps + LeetCode)',
      ],
      goal: 'Maximize employability, placement salary, and technical depth in 12 months',
      timeHorizon: '1 Year',
      constraints: 'Total savings buffer of ₹40,000; must maintain college attendance',
    },
    {
      title: 'Micro-Business with ₹20,000',
      fullTitle: 'Should I start a small business with ₹20,000?',
      desc: 'Exploring whether to risk a hard budget of ₹20,000 on launching a digital service agency or niche physical product vs keeping the cash safe in a deposit account.',
      category: 'Business' as DecisionCategory,
      options: [
        'Option A: Launch a digital automation agency using capital for software tools & domain',
        'Option B: Manufacture and sell a batch of 50 niche customized merchandise products',
      ],
      goal: 'Achieve breakeven in 90 days and develop real-world entrepreneurial cash-flow instincts',
      timeHorizon: '6 Months',
      constraints: 'Hard budget limit of ₹20,000; zero personal debt permitted',
    },
    {
      title: 'Job vs Higher Education',
      fullTitle: 'Should I choose a job or pursue higher education?',
      desc: 'Choosing between accepting an immediate ₹45,000/month software developer job offer or enrolling in a 2-year masters degree abroad in computer science.',
      category: 'Education' as DecisionCategory,
      options: [
        'Option A: Join the corporate software developer role immediately',
        'Option B: Prepare and enroll into a 2-year Master of Science program',
      ],
      goal: 'Maximize 5-year career compensation, global mobility, and long-term autonomy',
      timeHorizon: '2-3 Years',
      constraints: 'Tuition loan sensitivity; family expectations for early financial contribution',
    },
    {
      title: 'Relocate to Tech Hub',
      fullTitle: 'Should I move to another city for better opportunities?',
      desc: 'Considering relocating from a tier-2 hometown to a major tech epicenter (Bengaluru) to immerse into founder meetups, hackathons, and high-density networking.',
      category: 'Lifestyle' as DecisionCategory,
      options: [
        'Option A: Relocate to Bengaluru, rent shared accommodation, attend in-person events',
        'Option B: Stay in hometown working remotely, maximizing monthly savings and home support',
      ],
      goal: 'Accelerate career network density and serendipitous high-growth startup opportunities',
      timeHorizon: '1 Year',
      constraints: 'Higher monthly rent and rental deposit (₹60,000 upfront buffer needed)',
    },
  ];

  const handleApplyQuickPrompt = (prompt: (typeof quickPrompts)[0]) => {
    setTitle(prompt.fullTitle);
    setDescription(prompt.desc);
    setCategory(prompt.category);
    setOptions(prompt.options);
    setMainGoal(prompt.goal);
    setTimeHorizon(prompt.timeHorizon);
    setConstraints(prompt.constraints);
  };

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, `Option ${String.fromCharCode(65 + options.length)}: `]);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !mainGoal.trim()) {
      alert('Please fill in the decision title, description, and main goal.');
      return;
    }

    const validOptions = options.map((o) => o.trim()).filter((o) => o.length > 0);
    if (validOptions.length < 2) {
      alert('Please provide at least 2 valid options to compare.');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      options: validOptions,
      mainGoal: mainGoal.trim(),
      timeHorizon: timeHorizon.trim() || '1 Year',
      constraints: constraints.trim() || 'None specified',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Decision Framing Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Frame Your Decision Dilemma
        </h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Provide your context, alternatives, and goals. Gemini will unfold three possible futures,
          build a branching ripple tree, and extract sensitive variables.
        </p>
      </div>

      {/* Example Prompt Chips */}
      <div className="p-4 rounded-2xl glass-panel space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Need inspiration? Click an example to pre-fill the form:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyQuickPrompt(p)}
              className="text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 transition-all text-xs space-y-1 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400 uppercase">{p.category}</span>
                <span className="text-[10px] text-slate-500 group-hover:text-cyan-400">Use</span>
              </div>
              <p className="font-semibold text-slate-200 group-hover:text-cyan-300 line-clamp-1">
                {p.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl glass-panel-glow border-slate-700/80 space-y-6">
        {/* Category Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            1. Decision Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  category === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Decision Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            2. Decision Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Should I take an internship or focus on learning new skills?"
            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        {/* Decision Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            3. Decision Context & Background
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your current situation, doubts, and why this decision matters right now..."
            className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        {/* Available Options */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              4. Available Options to Compare (2 to 4)
            </label>
            {options.length < 4 && (
              <button
                type="button"
                onClick={handleAddOption}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Alternative</span>
              </button>
            )}
          </div>
          <div className="space-y-2.5">
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-slate-800 text-cyan-400 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <input
                  type="text"
                  required
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + idx)} description...`}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(idx)}
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Goal & Time Horizon in 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>5. Main Goal / Objective</span>
            </label>
            <input
              type="text"
              required
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              placeholder="e.g., Secure high-tier tech placement in 12 months"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>6. Evaluation Time Horizon</span>
            </label>
            <select
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
            >
              <option value="3 Months">3 Months (Immediate Tactical)</option>
              <option value="6 Months">6 Months (Semester / Milestone)</option>
              <option value="1 Year">1 Year (Standard Annual Horizon)</option>
              <option value="2-3 Years">2-3 Years (Strategic Mid-Term)</option>
              <option value="5 Years">5 Years (Long-Term Trajectory)</option>
            </select>
          </div>
        </div>

        {/* Constraints */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>7. Important Constraints (Budget, Location, Risks)</span>
          </label>
          <input
            type="text"
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="e.g., Monthly budget under ₹15,000; cannot take personal loans; family support"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 disabled:opacity-50 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Gemini is Synthesizing Scenarios & Ripple Graph...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 text-slate-950" />
                <span>Generate My Ripple</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-slate-500 mt-2">
            {isLive ? 'Powered by Google Gemini Live Reasoning Engine' : 'Running with Demo Mode sample engine (Connect key anytime in navbar)'}
          </p>
        </div>
      </form>
    </div>
  );
};
