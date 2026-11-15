import { DeterministicProjections, InfluencingFactor } from '../types.js';

export function calculateDeterministicProjections(
  factors: InfluencingFactor[],
  modifiedVariables: Record<string, number> = {}
): DeterministicProjections {
  const values: Record<string, number> = {};
  const assumptionsModified: string[] = [];

  for (const factor of factors) {
    const val = modifiedVariables[factor.id] !== undefined
      ? modifiedVariables[factor.id]
      : factor.currentValue ?? factor.defaultValue;
    values[factor.id] = val;

    if (modifiedVariables[factor.id] !== undefined && modifiedVariables[factor.id] !== factor.defaultValue) {
      assumptionsModified.push(
        `${factor.name}: changed from ${factor.defaultValue}${factor.unit} to ${val}${factor.unit}`
      );
    }
  }

  // Factor lookups with fallbacks
  const budget = values['budget'] ?? values['available_budget'] ?? 50000;
  const monthlyExpenses = values['monthly_expenses'] ?? values['expenses'] ?? 15000;
  const expectedIncome = values['expected_income'] ?? values['income'] ?? 5000;
  const timeInvested = values['time_invested'] ?? values['time_hours'] ?? 25;
  const learningHours = values['learning_hours'] ?? values['skills_hours'] ?? 15;
  const riskTolerance = values['risk_tolerance'] ?? 5; // 1-10 scale

  // Financial Runway Calculation (Deterministic)
  const netBurnPerMonth = Math.max(1, monthlyExpenses - expectedIncome);
  const runwayMonths = Math.min(60, Number((budget / netBurnPerMonth).toFixed(1)));
  const estimatedTotalCost = Math.round(monthlyExpenses * Math.min(12, Math.max(3, runwayMonths)));

  // Weekly hours commitment & workload stress
  const weeklyHoursBudgeted = Math.round(timeInvested + learningHours);

  // Stress calculation (1-100)
  let baseStress = 25;
  if (weeklyHoursBudgeted > 60) {
    baseStress += 40;
  } else if (weeklyHoursBudgeted > 45) {
    baseStress += 25;
  } else if (weeklyHoursBudgeted > 30) {
    baseStress += 10;
  }

  // Financial stress factor
  if (runwayMonths < 3) {
    baseStress += 35;
  } else if (runwayMonths < 6) {
    baseStress += 20;
  } else if (runwayMonths < 12) {
    baseStress += 10;
  } else {
    baseStress -= 10;
  }

  // Risk tolerance mitigation
  baseStress -= (riskTolerance - 5) * 3;
  const stressRiskScore = Math.max(5, Math.min(95, Math.round(baseStress)));

  // Resilience rating
  let resilienceRating = 'Moderate';
  if (runwayMonths >= 12 && weeklyHoursBudgeted <= 45 && stressRiskScore < 40) {
    resilienceRating = 'High - Strong Safety Margin';
  } else if (runwayMonths >= 6 && stressRiskScore <= 60) {
    resilienceRating = 'Solid - Manageable Tradeoffs';
  } else if (runwayMonths < 3 || stressRiskScore > 75) {
    resilienceRating = 'Vulnerable - High Friction Risk';
  } else {
    resilienceRating = 'Moderate - Requires Discipline';
  }

  return {
    runwayMonths,
    estimatedTotalCost,
    weeklyHoursBudgeted,
    stressRiskScore,
    resilienceRating,
    assumptionsModified,
  };
}
