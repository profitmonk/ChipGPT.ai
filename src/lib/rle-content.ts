// Copy for /rle (ChipGPT Engineering RLE).
// Copy is constrained by the internal RLE claims ledger: every number and
// availability statement must match it — do not add claims without an entry.

export const RLE_HREF = "/rle";
export const RLE_FORM_ID = "rle-briefing";
export const RLE_GRADING_ID = "grading";

export const RLE_TITLE = "Engineering RLE for RTL & Verification Agents | ChipGPT";
export const RLE_DESCRIPTION =
  "Evaluate semiconductor AI agents on executable RTL, DV, firmware, RTOS, security, formal, and coverage tasks with protected grading and repeatability evidence.";

export const RLE_EVIDENCE_STRIP = [
  "70 task candidates",
  "70 distinct concept groups",
  "Golden / broken / oracle validated",
  "Private executable grading",
] as const;

export const RLE_BENCHMARK_GAPS = [
  {
    k: "Repository navigation",
    v: "Real work starts by finding the right files in a codebase, not by reading a self-contained prompt.",
  },
  {
    k: "Iterative tool use",
    v: "Engineers compile, simulate, read failures, and try again. A single response measures none of that.",
  },
  {
    k: "Hidden behavior",
    v: "Visible checks can be satisfied by pattern-matching. Protected tests check the behavior that actually matters.",
  },
  {
    k: "Regressions",
    v: "A fix that breaks adjacent behavior is not a fix. Non-regression has to be graded, not assumed.",
  },
  {
    k: "Test tampering",
    v: "An agent that weakens a test, adds a waiver, or hard-codes a fixture can look like it passed.",
  },
  {
    k: "Repeatability and cost",
    v: "One lucky success is not a capability. Repeated runs, tokens, time, and compute all belong in the result.",
  },
] as const;

export const RLE_PORTFOLIO = [
  { lane: "RTL semantic repair", count: 20 },
  { lane: "Security and safety implementation", count: 10 },
  { lane: "Firmware and RTOS", count: 10 },
  { lane: "Mutation-scored DV generation", count: 10 },
  { lane: "Coverage engineering and evidence", count: 20 },
] as const;

export const RLE_FLOW = [
  { label: "Pinned source + specification", detail: "Fixed revision, precise engineering objective" },
  { label: "Isolated agent workspace", detail: "Fresh, resource-bounded, with bounded tools" },
  { label: "RTL / DV / software patch", detail: "Agent edits RTL, DV, C, assembly, or properties" },
  { label: "Protected grader", detail: "Integrity → build → hidden behavior → non-regression → replay" },
  { label: "Report", detail: "Capability · reliability · quality · efficiency" },
] as const;

export const RLE_CONTROLS = [
  {
    k: "Network-disabled OCI",
    v: "The production backend is designed for digest-pinned, network-disabled OCI runs. Only campaigns actually run there qualify as production evidence.",
  },
  {
    k: "Credential separation",
    v: "Model-provider and grader credentials are kept separate from the agent-visible workspace.",
  },
  {
    k: "Protected tests",
    v: "Private tests, mutants, and oracle repairs stay outside the agent workspace. Grader or test tampering is rejected before private grading.",
  },
  {
    k: "Deterministic replay",
    v: "A passing submission must replay to the same verdict. Replay is a hard gate, not a bonus.",
  },
  {
    k: "Bounded tools",
    v: "Agents get read, search, patch, and shell operations within declared allowed paths and resource limits.",
  },
] as const;

export const RLE_LEARNINGS = [
  { k: "Capability", metric: "Family-macro pass@1", v: "Does the agent solve the task on its first attempt, macro-averaged across task families?" },
  { k: "Reliability", metric: "Repeated-run success", v: "Does it succeed again, or only once by chance?" },
  {
    k: "Verification strength",
    metric: "Hidden mutant detection and false-failure control",
    v: "Do the agent's tests catch real bugs without failing on unrelated changes?",
  },
  {
    k: "RTL quality",
    metric: "Lint, latches, X behavior, interfaces, maintainability",
    v: "Is the result something an engineer would accept into the tree?",
  },
  {
    k: "Efficiency",
    metric: "Tokens, time, tools, simulation compute, retries, patch size",
    v: "What did the result cost to produce?",
  },
] as const;

export const RLE_EVIDENCE = [
  "70/70 golden states pass candidate validation.",
  "70/70 deliberately broken states are detected.",
  "70/70 oracle states pass.",
  "Three complete validations produced the same normalized verdict digest.",
  "Oracle baselines cover all 70 tasks.",
] as const;

export const RLE_PILOT_INCLUDES = [
  "Five representative tasks",
  "One model / agent configuration",
  "Three attempts per task",
  "Standard integration and hosted private grading",
  "Normalized results and a capability report",
  "Two technical reviews",
] as const;

// Answers adapted from the approved buyer FAQ. Deployment-tier pricing is
// deliberately omitted (not approved for publication).
export const RLE_FAQ = [
  {
    q: "What does 70/70 mean?",
    a: [
      "All 70 task candidates pass golden / broken / oracle construction validation: every golden state passes its candidate checks, every deliberately broken state is detected, and every oracle repair passes. Three complete validation runs produced the same normalized verdict digest.",
      "This proves executable task construction, not model difficulty. 70/70 is not a model score.",
    ],
  },
  {
    q: "Did Granite pass all tasks?",
    a: [
      "No. No portfolio score exists. Granite 4.2 8B solved one ORI task in one successful development smoke episode. Other attempts on that task were not all successful, and Granite has not been run across all 70 tasks.",
    ],
  },
  {
    q: "Does this run synthesis or report PPA?",
    a: [
      "No. This tranche excludes synthesis, place-and-route, gate count, physical timing, power, scan insertion, and ATPG. RTL structure may be reported as a review diagnostic, not a PPA reward.",
    ],
  },
  {
    q: "How are private graders protected?",
    a: [
      "Allowed and protected paths are declared per task. Grader or test tampering, prohibited paths, oversized patches, new waivers, force/release bypasses, and other integrity violations are rejected before private grading.",
      "Under the standard hosted offer, protected tests, mutants, and oracle repairs remain behind the grader boundary; buyers receive normalized results and permitted evidence.",
    ],
  },
  {
    q: "Can model weights stay in our environment?",
    a: [
      "The architecture supports controlled evaluation patterns where customer models remain behind the customer's endpoint. The exact deployment, logging, data retention, and grader boundary are agreed during security design.",
      "Customer-VPC and connected on-premise execution are separately scoped and are not included in the pilot by default.",
    ],
  },
  {
    q: "Can tasks be used for training?",
    a: [
      "Yes. The standard pilot grants one named customer organization or business unit a 90-day right to use its five licensed tasks for internal evaluation and internal model training / improvement, subject to applicable source and provider terms.",
      "The customer retains its generated model weights, outputs, and patches, subject to underlying task, environment, and third-party rights. Continued task access, redistribution, and publication are not included. Training on the suite is not a guarantee of model improvement.",
    ],
  },
  {
    q: "What is included in the pilot?",
    a: [
      "Five tasks, one model / agent configuration, three attempts per task, standard integration, hosted private grading, normalized evidence, one capability report, and two technical reviews.",
      "API / compute, commercial EDA tools, custom integrations, deployment changes, and expanded rights are separate unless stated in the order form.",
    ],
  },
  {
    q: "Do you use an LLM judge?",
    a: [
      "An LLM review may be advisory, but it is never a correctness hard gate. The authoritative result comes from executable checks and explicit policies.",
    ],
  },
] as const;

// Form options — categorical values are the only form data sent to analytics.
export const RLE_OBJECTIVES = [
  { value: "evaluation", label: "Evaluation" },
  { value: "post-training", label: "Post-training" },
  { value: "regression", label: "Regression" },
  { value: "vendor-selection", label: "Vendor selection" },
  { value: "eda-integration", label: "EDA product integration" },
  { value: "other", label: "Other" },
] as const;

export const RLE_DEPLOYMENTS = [
  { value: "hosted-endpoint", label: "Hosted endpoint" },
  { value: "customer-vpc", label: "Customer VPC" },
  { value: "onprem-airgap-discovery", label: "On-prem / air-gap (discovery)" },
  { value: "undecided", label: "Undecided" },
] as const;

export const RLE_TIMELINES = [
  { value: "0-3-months", label: "Within 3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "exploring", label: "Exploring" },
] as const;
