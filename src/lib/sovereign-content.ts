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
  "An AI stack your engineering organization owns: your own model, a learning environment and evaluations shaped to your goals, expert-generated tasks, and private infrastructure that ingests and manages your data.";

export const SOVEREIGN_WHY = [
  {
    k: "General models don't know your silicon",
    v: "Your architecture, your bug history, your sign-off rules, your tribal knowledge — none of it is in a public model's training data.",
  },
  {
    k: "Your IP can't leave the building",
    v: "RTL, specs, and silicon data are the company. The AI that learns from them has to run where they live, under your control.",
  },
  {
    k: "You can't improve what you can't measure",
    v: "Without executable tests built around your own goals, there is no way to know whether a model is getting better at the work you care about.",
  },
] as const;

// The five components of the stack.
export const SOVEREIGN_STACK = [
  {
    k: "Owned model",
    v: "A model adapted to your organization's designs, flows, and conventions. The weights you train are yours — routed alongside frontier models for the hardest reasoning steps.",
  },
  {
    k: "Reinforcement-learning environment",
    v: "Executable engineering tasks with protected graders, so a model learns from outcomes — a fix that passes hidden tests — not from imitation alone.",
  },
  {
    k: "Evaluation",
    v: "Capability, reliability, verification strength, RTL quality, and cost, measured on your own history before anything is trusted, and continuously after.",
  },
  {
    k: "Goal-driven task generation",
    v: "New tasks are generated around the capabilities you need next — your bug classes, your flows, your weak spots — so every training cycle targets a real gap.",
  },
  {
    k: "Private infrastructure",
    v: "The ingestion, storage, training, and serving layer that holds all of it, deployed in your environment and governed by your access controls.",
  },
] as const;

// The three data sources the platform is built on.
export const SOVEREIGN_DATA = [
  {
    k: "Real-time engineering data",
    v: "Live signals from the tools your teams already run — regressions, simulation and formal results, bug trackers, code review.",
  },
  {
    k: "Empirical data across the organization",
    v: "Prior programs: RTL at every revision, bugs and the commits that fixed them, specs, coverage, and silicon learnings.",
  },
  {
    k: "Expert-generated tasks and data",
    v: "New tasks, verified solutions, and graders authored by ChipGPT's silicon engineers, built to cover what your history doesn't.",
  },
] as const;

export const SOVEREIGN_LOOP = [
  { k: "Measure", v: "Evaluate the model on executable tasks drawn from your work." },
  { k: "Generate", v: "Create new tasks aimed at the gaps the evaluation found." },
  { k: "Train", v: "Improve your model in the learning environment." },
  { k: "Re-verify", v: "Re-run protected grading before any change is trusted." },
  { k: "Deploy", v: "Serve the improved model to your AI co-workers." },
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
    v: "Deploy the infrastructure in your environment and ingest one or two prior programs. Exit gate: retrieval quality on your own history meets an agreed bar and security review passes.",
  },
  {
    k: "Prove",
    v: "Choose, with you, the first capabilities to target. Build tasks and evaluations around them and validate on your own data, with explicit acceptance and kill criteria.",
  },
  {
    k: "Compound",
    v: "Run the measure → generate → train → re-verify loop on the capabilities you rank highest, and serve the improved model to your co-workers.",
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
      "No. The platform adapts open-weight models to your organization and routes the hardest reasoning steps to frontier models where your data policy allows it. The adapted weights are yours.",
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
      "Three sources: tasks derived from your own history (real bugs and their fixes), tasks generated around goals you set, and tasks authored by ChipGPT's silicon engineers to cover what your history doesn't.",
    ],
  },
  {
    q: "Does it replace our EDA tools or sign-off?",
    a: [
      "No. It works alongside the tools your teams already run and reads their results. It is not silicon sign-off and does not replace licensed EDA sign-off flows.",
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
  { value: "owned-model", label: "Own and adapt a model" },
  { value: "evaluation", label: "Evaluate models or agents" },
  { value: "post-training", label: "Train / post-train on our tasks" },
  { value: "coworkers", label: "Deploy AI co-workers" },
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
