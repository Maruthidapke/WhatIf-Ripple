# WhatIf? – Experience the Consequences Before Making a Decision
### *Powered by Ripple – See how one decision creates multiple consequences.*

Built for the **Google Gemini API Hackathon**.

---

## 🌟 Vision & Overview

**WhatIf?** transforms a human decision into an interactive multi-dimensional exploration of possible futures. Rather than acting as a chatbot that offers generic advice or dictates what someone *must* do, WhatIf? acts as a **decision-support intelligence platform**.

### Core Tenet
> **"Don't just make a decision. Explore its ripple effect."**

WhatIf? helps people explore:
- What happens if they choose **Option A** vs **Option B**?
- What are the **1st-order**, **2nd-order**, and **3rd-order** consequences?
- What **fragile assumptions** or hidden risks exist?
- How does changing a variable (budget, hours, expenses) alter the outcome?

---

## 🚀 Live Demo & Local Quickstart

### Prerequisites
- Node.js >= 18 (Tested on Node v22.14.0)
- npm >= 9 (Tested on npm 10.9.2)

### Running the Application

1. **Clone or navigate to the project directory:**
   ```bash
   cd /Users/maruthidapke/.gemini/antigravity/scratch/whatif-ripple
   ```

2. **Configure Environment Variables (Optional for Live Gemini):**
   ```bash
   cp .env.example backend/.env
   ```
   Edit `backend/.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-3.8-flash
   PORT=5002
   ```
   > **Note:** If `GEMINI_API_KEY` is not provided, the application runs seamlessly in **Demo Mode** with 4 rich, pre-configured real-world scenario presets. You can also connect your Gemini API Key directly inside the web UI at any time without restarting!

3. **Start the Backend:**
   ```bash
   cd backend
   npm run dev
   # Server runs at http://localhost:5002
   ```

4. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   # Client runs at http://localhost:5173
   ```

5. **Open in Browser:**
   ```
   http://localhost:5173
   ```

---

## 🛠 Technology Stack

- **Frontend:**
  - React.js 18 + TypeScript + Vite
  - Tailwind CSS (Dark theme with custom glassmorphism, electric cyan, and purple accents)
  - Lucide React (Clean icon set)
  - Recharts (Visual dimensional metric radar and bar distributions)
  - Canvas Confetti (Celebratory goal feedback)
  - Print & PDF styling support

- **Backend:**
  - Node.js & Express.js with TypeScript
  - Official `@google/genai` SDK (`^3.3.0`)
  - Zod (Strict schema validation for inputs and model outputs)
  - Deterministic Math Engine (Instant calculations for financial runway, burnout index, and stress risk)

---

## 🧠 Google Gemini API Integration

Gemini is central to the product architecture:
1. **Natural Language Understanding (NLU):** Extracts implicit constraints and context from freeform decision dilemmas.
2. **Variable Identification:** Isolates continuous numeric factors (hours, capital, costs) and configures dynamic sliders with appropriate steps and bounds.
3. **Scenario Triad Generation:** Generates 3 distinct scenario narratives:
   - *Optimistic* (high agency & favorable conditions)
   - *Expected* (realistic baseline with typical friction)
   - *Difficult* (stress-test scenario where assumptions fail)
4. **Branching Decision Tree (Ripple Graph):** Synthesizes a hierarchical multi-stage graph linking Root Decision → Choices → 1st-Order Outcomes → 2nd-Order Ripples → 3rd-Order Compounding Impacts.
5. **Adaptive Re-simulation:** When users alter variables, Gemini dynamically re-evaluates scenario probabilities and downstream consequences based on modified assumptions.
6. **Graceful Fallback:** If the API key is unavailable, a clearly labeled **Demo Mode** delivers high-fidelity sample data without ever pretending to be a live model.

---

## 📐 Project Structure

```
whatif-ripple/
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── backend/
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── config.ts
│       ├── index.ts
│       ├── types.ts
│       ├── routes/
│       │   ├── health.routes.ts
│       │   └── simulation.routes.ts
│       └── services/
│           ├── gemini.service.ts
│           ├── recalculation.service.ts
│           └── sampleData.service.ts
└── frontend/
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── vite.config.ts
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── index.css
        ├── types/
        │   └── simulation.ts
        ├── services/
        │   ├── api.ts
        │   └── localHistory.ts
        ├── components/
        │   ├── Navbar.tsx
        │   ├── Footer.tsx
        │   ├── ApiKeyModal.tsx
        │   ├── SavedSimulationsDrawer.tsx
        │   └── dashboard/
        │       ├── DecisionOverview.tsx
        │       ├── ScenarioCards.tsx
        │       ├── RippleTreeGraph.tsx
        │       ├── VariableTuningPanel.tsx
        │       ├── PathComparisonView.tsx
        │       ├── RippleCausalChains.tsx
        │       └── DecisionSummarySection.tsx
        └── pages/
            ├── LandingPage.tsx
            ├── CreateDecisionPage.tsx
            └── DashboardPage.tsx
```

---

## 🏆 Hackathon Highlights

- **Original, Purpose-Built Codebase:** Completely original architecture built specifically for this hackathon.
- **AI Reasoning vs Deterministic Calculations:** Clearly distinguishes probabilistic AI foresight from deterministic financial formulas (e.g. runway = capital / burn rate).
- **Interactive Ripple Experience:** Focuses on dynamic sensitivity tuning, branching decision trees, and consequence exploration rather than a generic linear chat interface.
- **Judge-Friendly:** Includes an interactive in-UI Gemini API Key activation dialog, status indicator, and instant presets for immediate evaluation.
