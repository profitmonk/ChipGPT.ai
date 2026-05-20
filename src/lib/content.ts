import {
  Activity,
  BarChart3,
  Brain,
  Bug,
  CircuitBoard,
  ClipboardCheck,
  Cpu,
  FileCode2,
  GitBranch,
  Layers,
  Map,
  MessageSquare,
  Microscope,
  Network,
  Shield,
  Sparkles,
  TestTube2,
  Timer,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Modules", href: "#modules" },
  { label: "Architecture", href: "#architecture" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Demo", href: "#demo" },
] as const;

export const WORKFLOW_STEPS = [
  "Design",
  "Verification",
  "Bring-Up",
  "Yield",
  "Test",
  "Support",
] as const;

export type ModuleItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
};

export const PRODUCT_MODULES: ModuleItem[] = [
  {
    title: "Spec-to-RTL Assistant",
    description:
      "Translate architecture specs into structured RTL scaffolding with constraint-aware module boundaries.",
    icon: FileCode2,
    tag: "Design",
  },
  {
    title: "RTL Review Co-Worker",
    description:
      "Continuous linting, CDC/RDC risk surfacing, and design-rule commentary across large RTL hierarchies.",
    icon: GitBranch,
    tag: "Design",
  },
  {
    title: "Verification/Testbench Generator",
    description:
      "Generate UVM environments, constrained-random stimulus, and coverage closure plans from interface specs.",
    icon: TestTube2,
    tag: "Verification",
  },
  {
    title: "Timing Closure Assistant",
    description:
      "Correlate STA reports, path groups, and ECO recommendations with historical closure playbooks.",
    icon: Timer,
    tag: "Physical",
  },
  {
    title: "Silicon Bring-Up Debug Assistant",
    description:
      "Triage lab failures, correlate register dumps, and propose targeted experiments for first-silicon debug.",
    icon: Bug,
    tag: "Bring-Up",
  },
  {
    title: "Yield Learning Co-Worker",
    description:
      "Connect parametric drift, process corners, and bin splits to root-cause hypotheses across lots.",
    icon: BarChart3,
    tag: "Yield",
  },
  {
    title: "Wafer Map Defect Analyzer",
    description:
      "Spatial clustering, reticle-aware pattern detection, and excursion alerts on wafer-level signatures.",
    icon: Map,
    tag: "Yield",
  },
  {
    title: "FAE Knowledge Co-Worker",
    description:
      "Instant retrieval across datasheets, errata, and field notes with traceable source citations.",
    icon: MessageSquare,
    tag: "Field",
  },
  {
    title: "RMA Failure Analysis Assistant",
    description:
      "Structure RMA narratives, correlate failure modes, and accelerate FA workflows with institutional memory.",
    icon: Microscope,
    tag: "Support",
  },
];

export type RoiItem = {
  rank: number;
  title: string;
  impact: string;
  metric: string;
};

export const ROI_MODULES: RoiItem[] = [
  {
    rank: 1,
    title: "Yield Learning Assistant",
    impact: "Highest",
    metric: "−38% excursion time-to-root-cause",
  },
  {
    rank: 2,
    title: "Silicon Bring-Up Debug Assistant",
    impact: "Very High",
    metric: "−42% mean time to first-pass debug",
  },
  {
    rank: 3,
    title: "Verification Automation",
    impact: "High",
    metric: "+31% coverage closure velocity",
  },
  {
    rank: 4,
    title: "FAE Knowledge Assistant",
    impact: "High",
    metric: "−55% time-to-answer on field escalations",
  },
  {
    rank: 5,
    title: "Automated Characterization",
    impact: "Medium-High",
    metric: "−28% lab characterization cycles",
  },
  {
    rank: 6,
    title: "Test Optimization",
    impact: "Medium-High",
    metric: "−19% production test time per die",
  },
];

export type ArchLayer = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const ARCHITECTURE_LAYERS: ArchLayer[] = [
  {
    title: "LLM Reasoning Layer",
    description:
      "Multi-agent orchestration with tool use, structured outputs, and domain-tuned reasoning for semiconductor workflows.",
    icon: Brain,
  },
  {
    title: "Domain Engines",
    description:
      "RTL analysis, STA correlation, ATE pattern synthesis, and yield statistics—purpose-built compute, not generic chat.",
    icon: Cpu,
  },
  {
    title: "Semiconductor Knowledge Graph",
    description:
      "Cross-lifecycle entity linking from specs and netlists to test programs, wafer maps, and field failure records.",
    icon: Network,
  },
  {
    title: "Human Approval Layer",
    description:
      "Policy gates, audit trails, and mandatory sign-off before any change touches tapeout-critical artifacts.",
    icon: Shield,
  },
];

export type PersonaUseCase = {
  persona: string;
  icon: LucideIcon;
  cases: string[];
};

export const USE_CASES: PersonaUseCase[] = [
  {
    persona: "RTL Engineers",
    icon: CircuitBoard,
    cases: [
      "Accelerate spec-to-RTL drafts with lint-aware scaffolding",
      "Surface CDC/RDC risks before integration milestones",
      "Summarize review feedback across multi-team hierarchies",
    ],
  },
  {
    persona: "Verification Engineers",
    icon: ClipboardCheck,
    cases: [
      "Bootstrap UVM environments from interface specifications",
      "Prioritize coverage holes with historical closure patterns",
      "Auto-generate regression triage narratives",
    ],
  },
  {
    persona: "Test Engineers",
    icon: Activity,
    cases: [
      "Optimize ATE flows with die-level cost modeling",
      "Correlate characterization data to spec guardbands",
      "Reduce bring-up iterations on new test insertions",
    ],
  },
  {
    persona: "Yield Engineers",
    icon: BarChart3,
    cases: [
      "Detect spatial defect excursions across lots and reticles",
      "Link parametric drift to process tool commonality",
      "Accelerate yield learning loops with graph-backed RCA",
    ],
  },
  {
    persona: "FAEs",
    icon: Users,
    cases: [
      "Answer customer escalations with cited institutional knowledge",
      "Draft application notes from validated internal playbooks",
      "Track errata impact across customer BOM revisions",
    ],
  },
  {
    persona: "Executives",
    icon: Layers,
    cases: [
      "Portfolio-level visibility into tapeout risk and cycle time",
      "ROI dashboards across design, test, and field operations",
      "Governed AI adoption with audit-ready compliance trails",
    ],
  },
];

export const MOAT_ITEMS = [
  {
    title: "Proprietary semiconductor workflow data",
    description:
      "Trained on anonymized tapeout, verification, and yield datasets—not generic web corpora.",
    icon: Sparkles,
  },
  {
    title: "Deep EDA integrations",
    description:
      "Native connectors for Synopsys, Cadence, Siemens, and lab/ATE ecosystems your teams already run.",
    icon: Wrench,
  },
  {
    title: "Cross-lifecycle knowledge graph",
    description:
      "Single graph linking RTL, STA, test programs, wafer maps, and RMA records for unified reasoning.",
    icon: Network,
  },
  {
    title: "Human-in-the-loop safety",
    description:
      "Every tapeout-critical action requires explicit engineer approval with full provenance.",
    icon: Shield,
  },
  {
    title: "Agent memory across the lifecycle",
    description:
      "Persistent context from design through field failures—agents learn your program, not just your prompt.",
    icon: Brain,
  },
];

export const DASHBOARD_METRICS = [
  { label: "Yield Risk", value: "Low", status: "good" as const },
  { label: "Verification Coverage", value: "94.2%", status: "good" as const },
  { label: "Open Debug Threads", value: "17", status: "warn" as const },
  { label: "Estimated Time Saved", value: "312 hrs", status: "good" as const },
  { label: "Tapeout Confidence", value: "87%", status: "neutral" as const },
];
