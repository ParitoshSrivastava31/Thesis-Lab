# ThesisLab: The Investment Constellation Engine

> **"Your thesis has hidden fault lines. We map them."**

ThesisLab is a **structured belief modeling tool** for investors who think probabilistically. It transforms your investment thesis—typically scattered across notes, gut feelings, and slide decks—into a living, mathematically connected **constellation graph**. 

By visualizing the causal relationships between your assumptions, ThesisLab allows you to stress-test your logic, identify weak points, and model future scenarios with precision.

![ThesisLab Screenshot](https://via.placeholder.com/800x450.png?text=ThesisLab+Constellation+Demo)

---

## 🌟 Why ThesisLab?

Most investors have beliefs, but few have **structured** beliefs. When asked about a complex thesis (e.g., "AI Infrastructure"), you might tell a story. ThesisLab forces a rigorous answer: 

*   "What are the 8 core assumptions driving this?"
*   "How confident are you in each?"
*   "If assumption X fails, does the whole thesis collapse?"

It bridges the gap between **narrative** and **quantitative modeling**, giving you the clarity of a quant with the intuition of a fundamental investor.

### Key Differentiators

*   **Visual Logic**: See your thesis as a 3D constellation, not a spreadsheet.
*   **Dynamic Simulation**: Change one probability, and watch the ripple effect across your entire model.
*   **Sensitivity Analysis**: Instantly identify the single "load-bearing" assumption that matters most.
*   **Version Control for Thoughts**: Track how your conviction evolves over time (e.g., "Why did I sell in Q3?").

---

## 🚀 Core Features

### 1. The Constellation Canvas (3D & 2D)
The heart of ThesisLab is an interactive graph where every node represents a key factor in your thesis (e.g., "GPU Costs", "Regulatory Approval").
*   **Nodes**: Colored by type (Macro, Risk, Catalyst, etc.). Size indicates sensitivity (how critical it is).
*   **Edges**: Represent causal links. Stronger edges transmit more impact.
*   **Simulation**: Drag a probability slider, and watch the graph pulse as the impact propagates through the network.

### 2. Thesis Strength Score
A single, dynamic metric (0–100) that quantifies your conviction.
*   Calculated based on node probabilities, confidence levels, and network centrality.
*   **Risk Penalties**: Automatically detects and penalizes "risk clusters" (groups of low-confidence, high-impact nodes).

### 3. Sensitivity Analysis ("What Kills the Deal?")
With one click, ThesisLab simulates thousands of failure scenarios to rank your assumptions by importance.
*   **Impact Score**: Shows exactly how much your thesis strength drops if a specific node fails.
*   **Focus**: Tells you exactly what to research next.

### 4. Monte Carlo Simulation
Don't just guess one outcome—simulate 1,000 parallel futures.
*   Generates a probability distribution (Bear / Base / Bull cases).
*   Visualize the full range of potential outcomes based on the uncertainty in your assumptions.

### 5. Scenario Management
*   **Save Snapshots**: Create "Bull Case", "Bear Case", or "Fed Pivot" scenarios.
*   **Compare**: Instantly toggle between scenarios to see how the graph and score change.

### 6. Team & Sharing (Coming Soon)
*   Share a live, interactive link to your thesis. 
*   Allow LPs or partners to tweak assumptions and see the result themselves ("What if you're wrong about inflation? Adjust the slider.").

---

## 🖥️ The Dashboard Experience

The dashboard is your command center for portfolio intelligence.

1.  **Thesis Grid**: View all your active theses at a glance, with live Strength Scores and trend indicators (7-day change).
2.  **Quick Actions**: Create new theses from templates or scratch using the "New Thesis" wizard.
3.  **Analytics**: See aggregate stats across your portfolio—where is your confidence highest? Where are you taking the most risk?

---

## 🛠️ How It Works (The Math)

ThesisLab runs a custom **Graph Propagation Engine** in the browser:

1.  **Propagation**: When Node A changes (e.g., probability drops), the engine uses a Breadth-First Search (BFS) algorithm to push that change to connected nodes.
    *   *Decay*: Impact fades as it travels further away (decay factor ~0.6 per hop).
    *   *Multipliers*: Causal links transmit 100% impact; Correlated links transmit 70%.
2.  **Scoring**: The Thesis Strength Score is a weighted average of all active nodes, adjusted for:
    *   *Centrality*: Core nodes matter more.
    *   *Confidence*: High-confidence beliefs stabilize the score.
    *   *Volatility*: Conflicting signals lower the score.

---

## 📦 Tech Stack

Built with a modern, performance-obsessed stack:

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript (Strict Mode)
*   **3D Rendering**: React Three Fiber (R3F) + Drei
*   **State Management**: Zustand (for the high-frequency simulation loop)
*   **Database**: Supabase (Postgres + Realtime)
*   **Styling**: Tailwind CSS + Framer Motion
*   **Charts**: Recharts (for Monte Carlo distributions)

---

## 🏁 Getting Started

### Prerequisites
*   Node.js 18+
*   npm or pnpm

### Installation

1.  **Clone the repo**
    ```bash
    git clone https://github.com/yourusername/thesislab.git
    cd thesislab
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file with your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to start building.

---

> *Built for the Orbital Intelligence of modern investing.*
