// Copy for /sovereign-ai — ChipGPT's sovereign AI platform.
// Honesty rules: describe what the platform is built to do and how an engagement
// proceeds; quantitative claims are limited to the validated Engineering RLE facts
// below (keep them matched to the internal RLE claims ledger). Deployment options
// are scoped per program — never imply a configuration is generally available.

export const SOVEREIGN_HREF = "/sovereign-ai";
export const SOVEREIGN_FORM_ID = "briefing";
export const SOVEREIGN_STACK_ID = "stack";

export const SOVEREIGN_TITLE = "Sovereign AI for Semiconductor Engineering | ChipGPT";
export const SOVEREIGN_DESCRIPTION =
  "A private AI stack your engineering organization owns: AI-ready data from your systems of record, a reasoning graph of your design knowledge, skills your teams create, and an owned model on compute you control — plugged into the orchestrators and tools you already use.";

export const SOVEREIGN_WHY = [
  {
    k: "Your data isn't AI-ready",
    v: "The knowledge lives in legacy systems of record, bug trackers, regressions, and documents. None of it was built to be searched or reasoned over by AI.",
  },
  {
    k: "Agents on raw data are guesswork",
    v: "Pointing an orchestrator straight at legacy data skips the hard part: a clean data layer and explicit decision logic. Without them, agents improvise.",
  },
  {
    k: "Rented AI learns from your IP",
    v: "When a vendor trains on your designs and workflows, your advantage becomes their product. The intelligence built from your IP should stay yours.",
  },
] as const;

// Layered architecture, top (where engineers meet it) to bottom (where data enters).
export const SOVEREIGN_LAYERS = [
  {
    k: "Interfaces",
    items: ["MCP to any orchestrator", "Your IDE or EDA environment", "Slack, Teams, and more"],
    v: "Reach engineers where they already work. ChipGPT plugs into your orchestrator rather than replacing it.",
  },
  {
    k: "Skills harness",
    items: ["AI co-workers", "Skills your teams create", "EDA and open-source tool calls"],
    v: "Skills walk the reasoning graph and call the tools you license. Engineers create them on demand, and they stay your IP.",
  },
  {
    k: "Reasoning graph",
    items: ["Silicon-engineering graph", "Your IP graph"],
    v: "Decision logic as an explicit graph, not a prompt: general silicon-engineering knowledge plus a graph specific to your designs and rules.",
  },
  {
    k: "Semantic layer",
    items: ["Semantic index", "Semantic search", "Semantic cache"],
    v: "Everything is indexed for meaning. Questions that have already been answered come from cache instead of a fresh model call.",
  },
  {
    k: "Data layer",
    items: ["Systems of record", "Unstructured documents", "Prior programs", "Expert-generated tasks"],
    v: "Connect legacy systems and documents, then clean, normalize, and vectorize them continuously so every layer above runs on current data.",
  },
] as const;

export const SOVEREIGN_RAIL = [
  {
    k: "Owned model",
    v: "An open-weight model adapted to your work and served on compute you control. It handles routine decisions locally.",
  },
  {
    k: "Frontier models",
    v: "Called only for the hardest steps, and only where your data policy allows.",
  },
] as const;

// The three kinds of data, and what each one is for.
export const SOVEREIGN_DATA = [
  {
    k: "Real-time",
    use: "Runs the work",
    v: "Live feeds from systems of record and unstructured sources (regressions, bug trackers, code review, specs) keep the graph and co-workers current.",
  },
  {
    k: "Empirical",
    use: "Trains the model",
    v: "Prior programs, replayed: snapshot a design before a known fix, let co-workers attempt it, and score the result against what actually worked.",
  },
  {
    k: "Synthetic",
    use: "Trains the model",
    v: "New tasks, verified solutions, and graders written by ChipGPT's silicon engineers to cover what your history doesn't.",
  },
] as const;

export const SOVEREIGN_ADVANTAGES = [
  {
    k: "Local first, frontier when it matters",
    v: "Your own model and the semantic cache handle routine work on your compute. Frontier calls are saved for hard reasoning, which keeps token spend in check and IP in your environment.",
  },
  {
    k: "Your skills are your moat",
    v: "Designers and verification engineers build skills that encode how your organization works. They run on your stack and are never pooled into anyone else's model.",
  },
  {
    k: "No orchestrator lock-in",
    v: "Expose skills over MCP to Claude, your cloud provider's agent platform, or your own orchestrator, or embed them directly in the IDE and EDA tools your teams use.",
  },
] as const;

export const SOVEREIGN_LOOP = [
  { k: "Measure", v: "Evaluate the model on executable tasks drawn from your work." },
  { k: "Generate", v: "Create new tasks aimed at the gaps the evaluation found." },
  { k: "Train", v: "Improve your model in the learning environment." },
  { k: "Re-verify", v: "Re-run protected grading before any change is trusted." },
  { k: "Deploy", v: "Serve the improved model to your skills and co-workers." },
] as const;

// Engineering RLE — the component that exists and is validated today.
export const RLE_EVIDENCE = [
  "70 task candidates across RTL repair, security, firmware/RTOS, DV, and coverage",
  "70/70 golden states pass; 70/70 deliberately broken states are detected; 70/70 oracle repairs pass",
  "Three complete validations produced the same normalized verdict digest",
  "Private executable grading: hidden tests, mutants, and oracle repairs stay outside the agent workspace",
] as const;

export const SOVEREIGN_PHASES = [
  {
    k: "Foundation",
    v: "Forward-deployed engineers connect your systems of record and documents, make one or two prior programs AI-ready, and stand up the semantic layer and reasoning graph. Exit gate: retrieval quality on your own history meets an agreed bar and security review passes.",
  },
  {
    k: "Prove",
    v: "Choose, with you, the first capabilities to target. Build skills, tasks, and evaluations around them and validate on your own data, with explicit acceptance and kill criteria.",
  },
  {
    k: "Compound",
    v: "Run the measure → generate → train → re-verify loop on the capabilities you rank highest. Your teams create their own skills and use them in the tools they already work in.",
  },
] as const;

export const SOVEREIGN_FAQ = [
  {
    q: "What does “sovereign” mean here?",
    a: [
      "Your organization owns and controls the AI: the model weights you train, the data it learns from, the evaluations that decide whether it improved, and the infrastructure it runs on.",
      "ChipGPT does not train shared models on your data.",
    ],
  },
  {
    q: "Do we have to build a model from scratch?",
    a: [
      "No. The platform adapts open-weight models to your organization and serves them on compute you control. Routine decisions resolve locally or from the semantic cache; the hardest steps go to frontier models only where your data policy allows it. The adapted weights are yours.",
    ],
  },
  {
    q: "Our data lives in legacy systems. Is that a problem?",
    a: [
      "That's the normal starting point, and it's why the foundation phase exists. We connect to your systems of record and unstructured sources as they are, then clean, normalize, and index the data so it is usable by AI without migrating those systems.",
    ],
  },
  {
    q: "Do we have to switch orchestrators or tools?",
    a: [
      "No. Skills are exposed over MCP, so they work with the orchestrator you already use, whether that's Claude, a cloud agent platform, or your own. They can also be embedded directly in your IDE or EDA environment.",
    ],
  },
  {
    q: "Where does it run?",
    a: [
      "In your environment. The exact deployment — your cloud account, on-premise, or more isolated configurations — is scoped per program during security design. We don't assume a configuration until it has been agreed and qualified.",
    ],
  },
  {
    q: "What is the Engineering RLE?",
    a: [
      "The reinforcement-learning environment at the center of the stack: executable silicon-engineering tasks with protected graders. Its 70-task portfolio has passed golden / broken / oracle construction validation. That validates the tasks, not any model's score; multi-model calibration is pending.",
    ],
  },
  {
    q: "Who creates the tasks?",
    a: [
      "Three sources: tasks replayed from your own history (real bugs and the fixes that resolved them), tasks generated around goals you set, and tasks authored by ChipGPT's silicon engineers to cover what your history doesn't.",
    ],
  },
  {
    q: "Does it replace our EDA tools or sign-off?",
    a: [
      "No. Skills call the EDA and open-source tools your teams already run and read their results. It is not silicon sign-off and does not replace licensed EDA sign-off flows.",
    ],
  },
  {
    q: "How do we start?",
    a: [
      "With a design-partner engagement: a foundation phase on one or two prior programs, then a small set of capabilities chosen with you and validated on your own data before anything expands.",
    ],
  },
] as const;

// Form options — categorical values are the only form data sent to analytics.
export const SOVEREIGN_OBJECTIVES = [
  { value: "ai-ready-data", label: "Make our engineering data AI-ready" },
  { value: "owned-model", label: "Own and adapt a model" },
  { value: "evaluation", label: "Evaluate models or agents" },
  { value: "post-training", label: "Train / post-train on our tasks" },
  { value: "coworkers", label: "Deploy AI co-workers or skills" },
  { value: "private-infra", label: "Private AI infrastructure" },
  { value: "other", label: "Other" },
] as const;

export const SOVEREIGN_DEPLOYMENTS = [
  { value: "hosted-endpoint", label: "Hosted / managed" },
  { value: "customer-vpc", label: "Our cloud account (VPC)" },
  { value: "onprem-airgap-discovery", label: "On-prem / air-gap (discovery)" },
  { value: "undecided", label: "Undecided" },
] as const;

export const SOVEREIGN_TIMELINES = [
  { value: "0-3-months", label: "Within 3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "exploring", label: "Exploring" },
] as const;
