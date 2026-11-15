export type DecisionCategory =
  | 'Education'
  | 'Career'
  | 'Business'
  | 'Personal Finance'
  | 'Lifestyle'
  | 'Other';

export interface DecisionInput {
  title: string;
  description: string;
  category: DecisionCategory;
  options: string[];
  mainGoal: string;
  timeHorizon: string;
  constraints: string;
  customApiKey?: string;
}

export interface InfluencingFactor {
  id: string;
  name: string;
  category: string;
  importance: 'High' | 'Medium' | 'Low';
  description: string;
  currentValue: number;
  defaultValue: number;
  unit: string;
  min: number;
  max: number;
  step: number;
}

export interface ScenarioMetric {
  financialScore: number;
  careerGrowthScore: number;
  stressIndex: number;
  adaptabilityScore: number;
}

export interface Scenario {
  type: 'optimistic' | 'expected' | 'difficult';
  title: string;
  description: string;
  likelihood: string;
  benefits: string[];
  risks: string[];
  assumptions: string[];
  uncertainty: 'Low' | 'Medium' | 'High';
  metrics: ScenarioMetric;
}

export interface RippleNode {
  id: string;
  parentId?: string;
  label: string;
  type: 'root' | 'option' | 'first_order' | 'second_order' | 'third_order';
  optionBranch: string;
  timeFrame: string;
  probability: 'High' | 'Medium' | 'Low';
  impact: 'Positive' | 'Neutral' | 'Negative' | 'Mixed';
  description: string;
  keyTakeaway: string;
  metrics: {
    effort: number;
    risk: number;
    reward: number;
  };
}

export interface OptionComparison {
  name: string;
  summary: string;
  pros: string[];
  cons: string[];
  requiredResources: {
    time: string;
    financial: string;
    mentalBandwidth: string;
  };
  longTermOutlook: string;
  scores: {
    roi: number;
    risk: number;
    flexibility: number;
    speed: number;
  };
}

export interface SideBySideComparison {
  optionA: OptionComparison;
  optionB: OptionComparison;
}

export interface CausalChainStep {
  step: number;
  title: string;
  explanation: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface CausalChain {
  id: string;
  factorTrigger: string;
  summary: string;
  sequence: CausalChainStep[];
  caveat: string;
}

export interface KeyConsiderations {
  criticalRisks: string[];
  keyOpportunities: string[];
  majorUncertainties: string[];
  questionsToAskSelf: string[];
}

export interface DeterministicProjections {
  runwayMonths: number;
  estimatedTotalCost: number;
  weeklyHoursBudgeted: number;
  stressRiskScore: number;
  resilienceRating: string;
  assumptionsModified: string[];
}

export interface SimulationResult {
  id: string;
  decisionTitle: string;
  category: DecisionCategory;
  mainObjective: string;
  timeHorizon: string;
  constraints: string;
  executiveSummary: string;
  influencingFactors: InfluencingFactor[];
  scenarios: Scenario[];
  ripplePaths: RippleNode[];
  sideBySideComparison: SideBySideComparison;
  causalChains: CausalChain[];
  keyConsiderations: KeyConsiderations;
  deterministicCalculations: DeterministicProjections;
  meta: {
    generatedAt: string;
    source: 'gemini-live' | 'demo-mode';
    modelUsed: string;
    latencyMs?: number;
  };
}

export interface HealthStatus {
  status: string;
  service: string;
  gemini: {
    isConfigured: boolean;
    model: string;
    keyMask: string;
    mode: 'live-gemini' | 'demo-mode';
  };
}
