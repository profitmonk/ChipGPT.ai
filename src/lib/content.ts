import {
  BarChart3,
  Bug,
  Brain,
  Cpu,
  Database,
  Eye,
  FileCode2,
  GitBranch,
  Lock,
  Microscope,
  Network,
  RefreshCw,
  Server,
  Shield,
  TestTube2,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "Lifecycle", href: "/lifecycle" },
  { label: "Agents", href: "/agents" },
  { label: "Architecture", href: "/architecture" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Blog", href: "/blog" },
] as const;

export const DEMO_HREF = "/demo";

export const SITE_DESCRIPTION =
  "The biggest chipmakers built private AI to move faster on every node. ChipGPT brings that leverage to everyone else through specialized AI co-workers that produce silicon-grade work, validated by the tools your teams already run.";

export const CTA_LABEL = "Request a Briefing";

export const CTA_SUPPORTING =
  "We work with a small number of design-partner programs each cycle.";

export const DATA_OWNERSHIP_STATEMENT =
  "Your data stays in your environment. You own it, you can export it anytime, and we don't train models on it — ever.";

export const INSTITUTIONAL_MEMORY_TAGLINE =
  "Agents learn your program, not just your prompt.";

export const COMPETITIVE_POSITIONING =
  "Purpose-built for silicon teams — not a general-purpose tool adapted after the fact.";

export const PLATFORM_MOAT = {
  title: "Program-native learning",
  description:
    "ChipGPT learns from your program's own history. Your data stays yours and private — we never train shared models on it.",
};

export const PAYBACK_OUTCOMES = [
  "Faster verification investigations",
  "Reduced engineering context switching",
  "Improved design continuity",
  "Better traceability across programs",
  "Institutional knowledge retention",
  "Accelerated onboarding",
] as const;

export type RoleUseCase = {
  persona: string;
  cases: string[];
};

export const USE_CASES_BY_ROLE: RoleUseCase[] = [
  {
    persona: "Design Engineers",
    cases: [
      "Preserve spec-to-RTL context across interface revisions",
      "Surface prior closure decisions during design reviews",
      "Maintain continuity between derivative programs",
    ],
  },
  {
    persona: "Verification Engineers",
    cases: [
      "Reduce time reconstructing regression and coverage context",
      "Match current failures against prior tapeout patterns",
      "Keep verification narratives aligned across handoffs",
    ],
  },
  {
    persona: "Bring-Up Engineers",
    cases: [
      "Carry debug thread history across lab sessions",
      "Connect silicon observations to pre-silicon artifacts",
      "Retain experiment rationale for the next engineer",
    ],
  },
  {
    persona: "Yield Engineers",
    cases: [
      "Connect yield learning signals across program history",
      "Retain institutional context when investigating shifts",
      "Cross-reference prior programs without restarting analysis",
    ],
  },
  {
    persona: "Test Engineers",
    cases: [
      "Preserve characterization and test-program continuity",
      "Surface historical guardband decisions during updates",
      "Maintain knowledge across test insertions and revisions",
    ],
  },
  {
    persona: "Failure Analysis Engineers",
    cases: [
      "Correlate failure signatures across prior silicon generations",
      "Surface historical root-cause investigations",
      "Reduce duplicate debug effort across programs",
    ],
  },
];

export type CapabilityPreview = {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
};

export const HOME_CAPABILITIES: CapabilityPreview[] = [
  {
    eyebrow: "Platform",
    title: "Engineering Intelligence Layer",
    description:
      "Knowledge graph, domain engines, and agent orchestration spanning the full semiconductor lifecycle.",
    href: "/platform",
  },
  {
    eyebrow: "Lifecycle",
    title: "Specification Through Production",
    description:
      "ChipGPT operates above the workflow—not as a stage—powering every phase from RTL to yield.",
    href: "/lifecycle",
  },
  {
    eyebrow: "Agents",
    title: "Specialized Co-Workers",
    description:
      "RTL, verification, bring-up, yield, failure analysis, and knowledge agents with governed outputs.",
    href: "/agents",
  },
  {
    eyebrow: "Architecture",
    title: "Enterprise Infrastructure",
    description:
      "EDA integrations, secure data ingestion, and deployment models built for tapeout scale.",
    href: "/architecture",
  },
  {
    eyebrow: "Outcomes",
    title: "Where Teams See Payback",
    description:
      "Qualitative outcomes across verification continuity, design traceability, and institutional knowledge.",
    href: "/outcomes",
  },
  {
    eyebrow: "Enterprise",
    title: "Security & Governance",
    description:
      "VPC, on-prem, air-gap deployment with audit trails and human-in-the-loop controls.",
    href: "/enterprise",
  },
];

export const PLATFORM_LAYERS = [
  {
    title: "Intelligence Layer",
    description:
      "Multi-agent orchestration with tool use, structured outputs, and domain-tuned reasoning for semiconductor workflows.",
    components: ["LLM Reasoning", "Tool Routing", "Structured Outputs"],
    icon: Brain,
  },
  {
    title: "Knowledge Layer",
    description:
      "Cross-lifecycle entity graph linking specs, netlists, verification artifacts, silicon data, and field records.",
    components: ["Entity Graph", "Provenance Tracking", "Lifecycle Memory"],
    icon: Network,
  },
  {
    title: "Agent Orchestration",
    description:
      "Lifecycle-specific agents with permission gates, audit logging, and mandatory human approval for critical actions.",
    components: ["Agent Router", "Policy Engine", "Approval Queue"],
    icon: Cpu,
  },
];

export const PLATFORM_HORIZONTAL_PIPELINE = [
  {
    label: "EDA Tools",
    items: ["Synopsys", "Cadence", "Siemens EDA"],
    variant: "source" as const,
  },
  {
    label: "Knowledge Graph",
    items: ["Entity linking", "Provenance", "Lifecycle memory"],
    variant: "intelligence" as const,
  },
  {
    label: "Domain Engines",
    items: ["RTL", "Verification", "Yield", "FA"],
    variant: "intelligence" as const,
  },
  {
    label: "Agent Orchestration",
    items: ["Routing", "Policy gates", "Approval queue"],
    variant: "orchestration" as const,
  },
  {
    label: "Structured Outputs",
    items: ["Cited reports", "Workflows", "Review queue"],
    variant: "output" as const,
  },
];

export const SYSTEM_DATA_FLOW_PIPELINE = [
  {
    label: "Semiconductor Data Sources",
    items: ["EDA", "Lab", "ATE", "MES", "Docs"],
    variant: "source" as const,
  },
  {
    label: "Ingestion",
    items: ["Connectors", "Normalize", "Validate"],
    variant: "core" as const,
  },
  {
    label: "Knowledge Graph",
    items: ["Cross-lifecycle graph", "Vector search", "Audit trail"],
    variant: "intelligence" as const,
  },
  {
    label: "Agent Layer",
    items: ["RTL", "Verification", "Bring-Up", "Yield", "FA", "Knowledge"],
    variant: "orchestration" as const,
  },
  {
    label: "Structured Outputs",
    items: ["Recommendations", "RCA", "Debug threads", "Knowledge capture"],
    variant: "output" as const,
  },
];

export const OPERATING_LAYER_DIAGRAM = {
  applications: [
    "RTL Agent",
    "Verification Agent",
    "Bring-Up Agent",
    "Yield Agent",
    "Failure Analysis Agent",
    "Knowledge Agent",
  ],
  intelligence: [
    "Engineering Memory",
    "Knowledge Graph",
    "Vector Search",
    "Workflow Engine",
    "Reasoning Engine",
  ],
  dataSources: [
    "EDA Tools",
    "Design Databases",
    "Simulation Data",
    "Lab Systems",
    "Test Systems",
    "Documentation",
    "Knowledge Bases",
  ],
} as const;

export const LIFECYCLE_STAGES = [
  "Specification",
  "RTL",
  "Verification",
  "Physical Design",
  "Tapeout",
  "Bring-Up",
  "Validation",
  "Yield Learning",
  "Production",
] as const;

export type LifecycleStageDetail = {
  stage: string;
  summary: string;
  engineeringFocus: string[];
  chipgptRole: string;
};

export const LIFECYCLE_STAGE_DETAILS: LifecycleStageDetail[] = [
  {
    stage: "Specification",
    summary: "Architecture definition, interface contracts, and design constraints.",
    engineeringFocus: ["Arch specs", "Interface definitions", "Power/performance budgets"],
    chipgptRole: "RTL Agent ingests specs for scaffolding; Knowledge Layer captures institutional constraints.",
  },
  {
    stage: "RTL",
    summary: "Register-transfer level design, lint, CDC/RDC analysis, and hierarchy integration.",
    engineeringFocus: ["Module design", "CDC/RDC review", "Lint closure"],
    chipgptRole: "RTL Agent provides lint-aware review, CDC risk surfacing, and spec-to-RTL assistance.",
  },
  {
    stage: "Verification",
    summary: "UVM environments, constrained-random stimulus, coverage closure, and regression triage.",
    engineeringFocus: ["Coverage closure", "UVM environments", "Regression analysis"],
    chipgptRole: "Verification Agent prioritizes coverage gaps, generates test plans, and triages failures.",
  },
  {
    stage: "Physical Design",
    summary: "Floorplanning, placement, routing, timing closure, and signoff.",
    engineeringFocus: ["STA closure", "Power analysis", "DRC/LVS signoff"],
    chipgptRole: "Knowledge Layer correlates STA history and closure playbooks across programs.",
  },
  {
    stage: "Tapeout",
    summary: "Final GDS submission, mask data preparation, and foundry handoff.",
    engineeringFocus: ["Signoff checklist", "Mask data review", "Foundry submission"],
    chipgptRole: "Governance layer enforces approval gates; audit trail captures all tapeout-critical actions.",
  },
  {
    stage: "Bring-Up",
    summary: "First-silicon lab debug, register analysis, and targeted experiments.",
    engineeringFocus: ["Lab triage", "JTAG/scan debug", "Register dumps"],
    chipgptRole: "Bring-Up Agent structures failures, proposes experiments, and maintains debug threads.",
  },
  {
    stage: "Validation",
    summary: "Silicon validation against spec, characterization, and corner testing.",
    engineeringFocus: ["Spec validation", "Characterization", "Corner analysis"],
    chipgptRole: "Verification and Bring-Up agents correlate lab results with pre-silicon predictions.",
  },
  {
    stage: "Yield Learning",
    summary: "Wafer map analysis, parametric drift detection, and excursion root cause.",
    engineeringFocus: ["Wafer maps", "Bin analysis", "Process correlation"],
    chipgptRole: "Yield Agent detects spatial patterns, correlates tool commonality, and accelerates RCA.",
  },
  {
    stage: "Production",
    summary: "ATE optimization, production test programs, and field failure monitoring.",
    engineeringFocus: ["Test optimization", "Guardbands", "Field quality"],
    chipgptRole: "Yield and Failure Analysis agents optimize test flows and correlate field escalations.",
  },
];

export type LifecycleAgent = {
  id: string;
  label: string;
  stages: number[];
};

export const LIFECYCLE_AGENTS: LifecycleAgent[] = [
  { id: "rtl", label: "RTL Agent", stages: [0, 1] },
  { id: "verification", label: "Verification Agent", stages: [2, 6] },
  { id: "bringup", label: "Bring-Up Agent", stages: [5, 6] },
  { id: "yield", label: "Yield Agent", stages: [7, 8] },
  { id: "failure", label: "Failure Analysis Agent", stages: [8] },
  { id: "knowledge", label: "Knowledge Agent", stages: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
];

export type AgentDetail = {
  id: string;
  label: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  capabilities: string[];
  inputs: string[];
  outputs: string[];
  workflow: string[];
  lifecycleStages: string[];
};

export const AGENT_DETAILS: AgentDetail[] = [
  {
    id: "rtl",
    label: "RTL Agent",
    tagline: "Design acceleration and review intelligence",
    description:
      "Accelerates spec-to-RTL workflows, surfaces CDC/RDC risks, and provides continuous lint-aware review across large hierarchies.",
    icon: FileCode2,
    capabilities: [
      "Spec-to-RTL scaffolding",
      "CDC/RDC risk surfacing",
      "Lint-aware hierarchy review",
    ],
    inputs: ["Architecture specs", "RTL hierarchies", "Lint reports", "CDC/RDC databases"],
    outputs: ["RTL scaffolding", "Review summaries", "Risk assessments", "ECO recommendations"],
    workflow: [
      "Ingest spec and existing RTL hierarchy",
      "Run lint and CDC/RDC correlation against design rules",
      "Generate structured review with prioritized findings",
      "Route tapeout-critical items to human approval queue",
    ],
    lifecycleStages: ["Specification", "RTL"],
  },
  {
    id: "verification",
    label: "Verification Agent",
    tagline: "Coverage closure and regression intelligence",
    description:
      "Bootstraps UVM environments, prioritizes coverage holes, and accelerates regression triage with historical closure patterns.",
    icon: TestTube2,
    capabilities: [
      "Coverage gap prioritization",
      "Regression failure clustering",
      "Directed test generation",
    ],
    inputs: ["Coverage databases", "UVM environments", "Regression logs", "Interface specs"],
    outputs: ["Test plans", "Directed test recommendations", "Failure cluster analysis", "Closure reports"],
    workflow: [
      "Analyze coverage gaps against closure targets",
      "Correlate failures across regression runs",
      "Generate constrained-random and directed test proposals",
      "Produce triage narrative with source provenance",
    ],
    lifecycleStages: ["Verification", "Validation"],
  },
  {
    id: "bringup",
    label: "Bring-Up Agent",
    tagline: "First-silicon debug orchestration",
    description:
      "Structures lab failures, correlates register dumps, and proposes targeted debug experiments for bring-up teams.",
    icon: Bug,
    capabilities: [
      "Lab failure structuring",
      "Pre-silicon correlation",
      "Debug thread continuity",
    ],
    inputs: ["Lab logs", "Register dumps", "JTAG/scan results", "Silicon characterization data"],
    outputs: ["Debug hypotheses", "Experiment proposals", "Thread summaries", "Correlation reports"],
    workflow: [
      "Ingest lab failure report and associated artifacts",
      "Correlate with pre-silicon verification predictions",
      "Propose ranked debug experiments with expected outcomes",
      "Maintain debug thread continuity across team handoffs",
    ],
    lifecycleStages: ["Bring-Up", "Validation"],
  },
  {
    id: "yield",
    label: "Yield Agent",
    tagline: "Excursion detection and yield learning",
    description:
      "Detects spatial defect patterns, correlates parametric drift to process tools, and accelerates yield RCA across lots.",
    icon: BarChart3,
    capabilities: [
      "Spatial excursion detection",
      "Process tool correlation",
      "Yield RCA acceleration",
    ],
    inputs: ["Wafer maps", "Bin data", "MES tool logs", "Parametric test results"],
    outputs: ["Excursion alerts", "RCA hypotheses", "Hold recommendations", "Trend reports"],
    workflow: [
      "Ingest wafer map and parametric data for target lots",
      "Run spatial clustering and reticle-aware pattern detection",
      "Correlate excursions to process tool commonality",
      "Generate hold/exclusion recommendations with confidence scores",
    ],
    lifecycleStages: ["Yield Learning", "Production"],
  },
  {
    id: "failure",
    label: "Failure Analysis Agent",
    tagline: "Field failure and RMA intelligence",
    description:
      "Structures RMA narratives, correlates failure modes to errata, and accelerates FA workflows with institutional memory.",
    icon: Microscope,
    capabilities: [
      "RMA signature matching",
      "Errata cross-reference",
      "FA workflow structuring",
    ],
    inputs: ["RMA records", "Errata databases", "FA reports", "Customer BOM revisions"],
    outputs: ["FA narratives", "Errata cross-references", "Root cause reports", "Customer advisories"],
    workflow: [
      "Ingest RMA intake and associated failure artifacts",
      "Match failure signatures against errata and field history",
      "Generate structured FA plan with recommended measurements",
      "Capture validated outcomes into knowledge graph",
    ],
    lifecycleStages: ["Production"],
  },
  {
    id: "knowledge",
    label: "Knowledge Agent",
    tagline: "Institutional memory and engineering retrieval",
    description:
      "Retrieves program history, surfaces prior engineering decisions, and maintains cross-lifecycle context for every specialized agent.",
    icon: Brain,
    capabilities: [
      "Cross-program artifact retrieval",
      "Prior decision surfacing",
      "Lifecycle context preservation",
    ],
    inputs: ["Knowledge bases", "Design archives", "Closure logs", "Program documentation"],
    outputs: ["Retrieval results", "Source citations", "Context summaries", "Knowledge graph updates"],
    workflow: [
      "Index engineering artifacts with provenance and program scope",
      "Resolve queries against knowledge graph and vector search",
      "Return cited results with lifecycle and program context",
      "Write validated outcomes back to institutional memory",
    ],
    lifecycleStages: ["All lifecycle stages"],
  },
];

export type OperationalOutcome = {
  domain: string;
  signals: string[];
  artifacts: string[];
  agents: string[];
};

export const OPERATIONAL_OUTCOMES: OperationalOutcome[] = [
  {
    domain: "Verification",
    signals: [
      "Coverage gap against closure targets",
      "Regression failure recurrence",
      "Prior tapeout pattern match",
    ],
    artifacts: [
      "Directed test recommendations",
      "Triage narrative with provenance",
      "Traceability matrix updates",
    ],
    agents: ["Verification Agent", "Knowledge Agent"],
  },
  {
    domain: "Design Continuity",
    signals: [
      "Spec-to-RTL drift across revisions",
      "Interface change impact",
      "Derivative program divergence",
    ],
    artifacts: [
      "Review summaries with risk ranking",
      "ECO recommendations",
      "Prior closure decision retrieval",
    ],
    agents: ["RTL Agent", "Knowledge Agent"],
  },
  {
    domain: "Bring-Up",
    signals: [
      "Lab failure without pre-silicon match",
      "Register dump anomaly clusters",
      "Debug thread handoff gaps",
    ],
    artifacts: [
      "Ranked debug hypotheses",
      "Experiment proposals",
      "Thread continuity record",
    ],
    agents: ["Bring-Up Agent", "Knowledge Agent"],
  },
  {
    domain: "Yield Learning",
    signals: [
      "Parametric shift across lots",
      "Spatial defect clustering",
      "Cross-program yield pattern",
    ],
    artifacts: [
      "Excursion alerts with confidence",
      "RCA hypotheses",
      "Hold/exclusion recommendations",
    ],
    agents: ["Yield Agent", "Failure Analysis Agent", "Knowledge Agent"],
  },
];

export type SecurityLayer = {
  layer: string;
  controls: string[];
};

export const SECURITY_ARCHITECTURE_LAYERS: SecurityLayer[] = [
  {
    layer: "Perimeter & Network",
    controls: ["VPC isolation", "Private endpoints", "Air-gap option", "TLS 1.3"],
  },
  {
    layer: "Identity & Access",
    controls: ["SSO/SAML", "RBAC by org", "Program-level isolation", "MFA enforcement"],
  },
  {
    layer: "Data Plane",
    controls: ["Customer-managed CMK", "Encryption at rest", "Zero shared training", "Export controls"],
  },
  {
    layer: "Agent Runtime",
    controls: ["Permission gates", "Tool allowlists", "Human approval queue", "Sandboxed execution"],
  },
  {
    layer: "Audit & Compliance",
    controls: ["Immutable action logs", "Data access events", "SOC 2 aligned", "Exportable reports"],
  },
];

export type DeploymentReadinessItem = {
  category: string;
  items: { label: string; status: string }[];
};

export const DEPLOYMENT_READINESS: DeploymentReadinessItem[] = [
  {
    category: "Infrastructure",
    items: [
      { label: "VPC / on-prem sizing guide", status: "Available" },
      { label: "Network topology templates", status: "Available" },
      { label: "Air-gap deployment runbook", status: "Available" },
    ],
  },
  {
    category: "Integration",
    items: [
      { label: "EDA connector specifications", status: "Available" },
      { label: "SSO/SAML configuration", status: "Available" },
      { label: "SIEM log forwarding", status: "Available" },
    ],
  },
  {
    category: "Governance",
    items: [
      { label: "RBAC policy templates", status: "Available" },
      { label: "Approval workflow configuration", status: "Available" },
      { label: "Audit export formats", status: "Available" },
    ],
  },
  {
    category: "Security Review",
    items: [
      { label: "Architecture documentation", status: "Available" },
      { label: "Data flow diagrams", status: "Available" },
      { label: "Penetration test summary", status: "On request" },
    ],
  },
];

export const AGENT_NETWORK = {
  center: "Knowledge Layer",
  agents: [
    { id: "rtl", label: "RTL Agent", position: "left" as const },
    { id: "verification", label: "Verification Agent", position: "top" as const },
    { id: "yield", label: "Yield Agent", position: "right" as const },
    { id: "bringup", label: "Bring-Up Agent", position: "bottom-left" as const },
    { id: "failure", label: "Failure Analysis Agent", position: "bottom-right" as const },
  ],
};

export const ARCHITECTURE_INPUTS = [
  "EDA Tools",
  "Design Databases",
  "Test Systems",
  "Silicon Data",
  "Lab Systems",
  "Documentation",
  "Knowledge Bases",
];

export const ARCHITECTURE_OUTPUTS = [
  "Recommendations",
  "Root Cause Analysis",
  "Debug Workflows",
  "Yield Insights",
  "Knowledge Capture",
];

export const ARCHITECTURE_INTEGRATIONS = [
  { category: "EDA", systems: ["Synopsys", "Cadence", "Siemens EDA"] },
  { category: "Verification", systems: ["Simulators", "Coverage tools", "Formal engines"] },
  { category: "Test & Lab", systems: ["ATE platforms", "Lab instruments", "Characterization systems"] },
  { category: "Manufacturing", systems: ["MES", "Wafer map systems", "Yield management"] },
  { category: "Enterprise", systems: ["SSO/SAML", "SIEM", "Ticketing systems"] },
  { category: "Knowledge Systems", systems: ["Confluence", "SharePoint", "Internal Wikis"] },
];

export const DEPLOYMENT_MODELS = [
  {
    title: "VPC Deployment",
    description: "Dedicated cloud instance in customer-controlled VPC with private networking and CMK encryption.",
  },
  {
    title: "On-Premises",
    description: "Full platform deployment within customer data center with air-gapped option for IP-sensitive programs.",
  },
  {
    title: "Hybrid",
    description: "Control plane on-prem with optional cloud burst for compute-intensive agent workloads.",
  },
];

export type AgentOutput = {
  agent: string;
  title: string;
  timestamp: string;
  lines: { type: "header" | "data" | "insight" | "source"; text: string }[];
};

export const AGENT_OUTPUTS: AgentOutput[] = [
  {
    agent: "Verification Agent",
    title: "Coverage Review — Interface Subsystem",
    timestamp: "2026-05-31 14:18 UTC",
    lines: [
      { type: "header", text: "REGRESSION RUN · build_8842 · subsystem review" },
      { type: "data", text: "Coverage gap identified in recovery-state bins" },
      { type: "data", text: "Pattern matched against prior tapeout closure log" },
      { type: "insight", text: "→ Recommend directed tests aligned with historical closure approach" },
      { type: "insight", text: "→ Traceability matrix references updated FMEDA artifacts" },
      { type: "source", text: "Sources: coverage.db, closure_log, verification_playbook" },
    ],
  },
  {
    agent: "Failure Analysis Agent",
    title: "Field Escalation — Thermal Event Review",
    timestamp: "2026-05-31 13:41 UTC",
    lines: [
      { type: "header", text: "ESCALATION · thermal event · customer program review" },
      { type: "data", text: "Failure mode correlated with documented errata record" },
      { type: "data", text: "Historical engineering decision surfaced from prior FA cycle" },
      { type: "insight", text: "→ Recommended FA path references validated internal playbook" },
      { type: "insight", text: "→ Cross-program dependency flagged for related derivative" },
      { type: "source", text: "Sources: errata_db, fa_history, program_knowledge_graph" },
    ],
  },
  {
    agent: "Yield Learning Agent",
    title: "Program Signal Review — Parametric Shift",
    timestamp: "2026-05-31 14:32 UTC",
    lines: [
      { type: "header", text: "YIELD LEARNING · parametric shift · program history review" },
      { type: "data", text: "Shift correlated with prior program learning record" },
      { type: "data", text: "Institutional context retrieved from earlier investigation" },
      { type: "insight", text: "→ Hypothesis references validated cross-program pattern" },
      { type: "insight", text: "→ Recommended review path preserves lifecycle continuity" },
      { type: "source", text: "Sources: yield_graph, program_history, knowledge_base" },
    ],
  },
  {
    agent: "Engineering Knowledge Retrieval",
    title: "Query — CDC Requirements for Async FIFO Bridge",
    timestamp: "2026-05-31 12:07 UTC",
    lines: [
      { type: "header", text: "QUERY · CDC requirements for async FIFO bridge crossing" },
      { type: "data", text: "Retrieved relevant artifacts from program knowledge base" },
      { type: "insight", text: "→ Design rule reference surfaced with source citation" },
      { type: "insight", text: "→ Prior closure approach retrieved from institutional memory" },
      { type: "source", text: "Sources: design_rules, rtl_review_archive, cdc_closure_log" },
    ],
  },
];

export type EnterpriseFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const ENTERPRISE_FEATURES: EnterpriseFeature[] = [
  {
    title: "Secure deployment",
    description:
      "VPC, on-prem, or air-gapped installation. Customer-managed encryption keys and network isolation.",
    icon: Server,
  },
  {
    title: "Permission-aware workflows",
    description:
      "Role-based access mapped to design, verification, test, and yield org structures with program-level isolation.",
    icon: Lock,
  },
  {
    title: "Human-in-the-loop review",
    description:
      "Mandatory engineer sign-off before any change touches tapeout-critical artifacts or production test programs.",
    icon: UserCheck,
  },
  {
    title: "Auditability",
    description:
      "Immutable logs of every agent action, data access event, and human approval. Exportable compliance reports.",
    icon: Eye,
  },
  {
    title: "Private engineering data",
    description:
      "ChipGPT learns from your program's own history. Your data stays yours and private — we never train shared models on it.",
    icon: Shield,
  },
  {
    title: "Enterprise governance",
    description:
      "Policy gates, approval chains, and SOC 2-aligned controls for regulated semiconductor programs.",
    icon: Shield,
  },
];

export const COMMAND_CENTER = {
  program: "program-alpha",
  status: "Connected",
  metrics: [
    { label: "Open Derivative Programs", value: "3", delta: "this cycle" },
    { label: "Verification Threads Tracked", value: "12", delta: "open items" },
    { label: "Recurring Patterns Flagged", value: "7", delta: "review queue" },
    { label: "Engineer-Hours Returned", value: "—", delta: "institutional memory" },
  ],
  debugWorkflows: [
    { id: "DBG-0847", status: "Active", subject: "Interface revision — spec and RTL sync pending", owner: "Design" },
    { id: "DBG-0844", status: "Review", subject: "Traceability matrix update — FMEDA review", owner: "Verification" },
    { id: "DBG-0839", status: "Closed", subject: "Cross-program dependency resolved", owner: "Platform" },
  ],
  activity: [
    { time: "14:32", agent: "Memory", event: "Pattern matched against prior tapeout" },
    { time: "14:18", agent: "RTL", event: "Specification and RTL synchronized after interface revision" },
    { time: "13:55", agent: "Verification", event: "Traceability matrix updated against latest FMEDA review" },
    { time: "13:41", agent: "Platform", event: "Cross-program dependency flagged" },
    { time: "13:22", agent: "Knowledge", event: "Historical engineering decision surfaced" },
  ],
  insights: [
    { label: "Program Continuity", value: "Active", trend: "knowledge graph" },
    { label: "Lifecycle Context", value: "Retained", trend: "one yield-learning reference" },
  ],
};

export const DATA_FLOW_STEPS = [
  { step: "Ingest", description: "Secure connectors pull engineering data from EDA, lab, ATE, and manufacturing systems.", icon: Database },
  { step: "Normalize", description: "Data mapped to canonical semiconductor schema with provenance and timestamps.", icon: GitBranch },
  { step: "Reason", description: "Agents query knowledge graph and domain engines with governed tool access.", icon: Brain },
  { step: "Output", description: "Structured insights delivered with citations, confidence scores, and approval gates.", icon: RefreshCw },
];
