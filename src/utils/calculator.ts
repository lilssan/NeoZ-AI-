export type ScopeOptionKey = 'custom_ai' | 'fullstack_app' | 'agent_workflows' | 'enterprise_trans';
export type DataOptionKey = 'clean_data' | 'unstructured' | 'legacy_sync' | 'greenfield';
export type DeployOptionKey = 'cloud_mt' | 'dedicated_vpc' | 'air_gapped' | 'compliance_reg';
export type VelocityOptionKey = 'standard' | 'expedited' | 'rapid_sprint';

export interface ScopeOption {
  key: ScopeOptionKey;
  label: string;
  cost: number;
  weeks: number;
  description: string;
  icon: string;
  badge: string;
}

export interface OptionItem<T extends string> {
  key: T;
  label: string;
  cost: number;
  weeks: number;
  description: string;
  costLabel: string;
}

export interface VelocityOption {
  key: VelocityOptionKey;
  label: string;
  subtitle: string;
  rateLabel: string;
  mult: number;
  timeMult: number;
}

export const SCOPE_OPTIONS: ScopeOption[] = [
  {
    key: 'custom_ai',
    label: 'Custom AI & Fine-Tuning',
    cost: 36000,
    weeks: 6,
    description: 'Proprietary domain LoRA/QLoRA tuning, synthetic datasets, and distillation.',
    icon: 'psychology',
    badge: 'From $36,000'
  },
  {
    key: 'fullstack_app',
    label: 'Full-Stack Web/Mobile App',
    cost: 28000,
    weeks: 5,
    description: 'Reactive high-performance UI, backend microservices & vector search.',
    icon: 'devices',
    badge: 'From $28,000'
  },
  {
    key: 'agent_workflows',
    label: 'AI Agents & Workflows',
    cost: 24000,
    weeks: 4,
    description: 'Autonomous multi-agent swarms with tool usage, memory graphs, and webhooks.',
    icon: 'smart_toy',
    badge: 'From $24,000'
  },
  {
    key: 'enterprise_trans',
    label: 'Enterprise Transformation',
    cost: 58000,
    weeks: 9,
    description: 'Omnichannel cognitive architecture, legacy core migration & scale governance.',
    icon: 'hub',
    badge: 'From $58,000'
  }
];

export const DATA_OPTIONS: OptionItem<DataOptionKey>[] = [
  {
    key: 'clean_data',
    label: 'Clean Structured Data',
    cost: 0,
    weeks: 0,
    description: 'Postgres/Parquet, pre-indexed vectors, ready APIs.',
    costLabel: 'Baseline +$0'
  },
  {
    key: 'unstructured',
    label: 'Unstructured Multimodal Data',
    cost: 9000,
    weeks: 1,
    description: 'Raw PDFs, audio, imagery needing OCR & embeddings.',
    costLabel: '+$9,000 · +1 wk'
  },
  {
    key: 'legacy_sync',
    label: 'Legacy System Integration',
    cost: 14000,
    weeks: 2,
    description: 'Mainframe/ERP hooks, custom middleware & SOAP.',
    costLabel: '+$14,000 · +2 wks'
  },
  {
    key: 'greenfield',
    label: 'Greenfield Architecture',
    cost: 4000,
    weeks: 1,
    description: 'Net-new database design, schemas, and pipelines.',
    costLabel: '+$4,000 · +1 wk'
  }
];

export const DEPLOY_OPTIONS: OptionItem<DeployOptionKey>[] = [
  {
    key: 'cloud_mt',
    label: 'Cloud Multi-Tenant',
    cost: 0,
    weeks: 0,
    description: 'High-concurrency serverless inference via AWS/GCP.',
    costLabel: 'Included'
  },
  {
    key: 'dedicated_vpc',
    label: 'Dedicated VPC / Private Cloud',
    cost: 7500,
    weeks: 1,
    description: 'Isolated VPC peering, zero public egress, KMS encryption.',
    costLabel: '+$7,500 · +1 wk'
  },
  {
    key: 'air_gapped',
    label: 'On-Premises / Air-Gapped',
    cost: 16000,
    weeks: 2,
    description: 'NVIDIA DGX clusters, bare-metal container runtimes.',
    costLabel: '+$16,000 · +2 wks'
  },
  {
    key: 'compliance_reg',
    label: 'HIPAA / SOC2 / GDPR Audit',
    cost: 11000,
    weeks: 1,
    description: 'Full audit trails, verifiable PII redaction layer.',
    costLabel: '+$11,000 · +1 wk'
  }
];

export const VELOCITY_OPTIONS: VelocityOption[] = [
  {
    key: 'standard',
    label: 'Standard Pace',
    subtitle: 'Balanced cadences.',
    rateLabel: '1.0x Rate',
    mult: 1.0,
    timeMult: 1.0
  },
  {
    key: 'expedited',
    label: 'Expedited Squad',
    subtitle: 'Dual-shift commits.',
    rateLabel: '+25% Velocity',
    mult: 1.25,
    timeMult: 0.65
  },
  {
    key: 'rapid_sprint',
    label: 'Blitz MVP Sprint',
    subtitle: 'Max parallel dev.',
    rateLabel: '+45% Priority',
    mult: 1.45,
    timeMult: 0.45
  }
];

export const SQUAD_DEFINITIONS: Record<ScopeOptionKey, string> = {
  custom_ai: '1 Principal AI Researcher · 2 Senior ML Engineers · 1 Cloud MLOps Architect',
  fullstack_app: '1 Lead Architect · 2 Senior Full-Stack Engineers · 1 UI/UX Systems Designer',
  agent_workflows: '1 Autonomous Agent Specialist · 1 Backend Systems Engineer · 1 QA Lead',
  enterprise_trans: '1 Solutions Director · 3 Senior Engineers · 1 Security Auditor · 1 Data Lead'
};

export interface CalculatorState {
  scope: ScopeOptionKey;
  data: DataOptionKey;
  deploy: DeployOptionKey;
  velocity: VelocityOptionKey;
}

export interface CalculationResult {
  minCost: number;
  maxCost: number;
  formattedMinCost: string;
  formattedMaxCost: string;
  totalWeeksMin: number;
  totalWeeksMax: number;
  timelineLabel: string;
  timelinePercent: number;
  squadText: string;
  scopeLabel: string;
  dataLabel: string;
  deployLabel: string;
  velocityLabel: string;
}

export function calculateProjectEstimate(state: CalculatorState): CalculationResult {
  const scopeObj = SCOPE_OPTIONS.find((o) => o.key === state.scope) || SCOPE_OPTIONS[0];
  const dataObj = DATA_OPTIONS.find((o) => o.key === state.data) || DATA_OPTIONS[0];
  const deployObj = DEPLOY_OPTIONS.find((o) => o.key === state.deploy) || DEPLOY_OPTIONS[0];
  const velocityObj = VELOCITY_OPTIONS.find((o) => o.key === state.velocity) || VELOCITY_OPTIONS[0];

  const baseCost = scopeObj.cost + dataObj.cost + deployObj.cost;
  const minCost = Math.round(baseCost * velocityObj.mult);
  const maxCost = Math.round(minCost * 1.35);

  const rawWeeks = (scopeObj.weeks + dataObj.weeks + deployObj.weeks) * velocityObj.timeMult;
  const totalWeeksMin = Math.max(2, Math.round(rawWeeks));
  const totalWeeksMax = totalWeeksMin + 2;

  // Visual percent for timeline bar (2 to 14 weeks range)
  const timelinePercent = Math.min(100, Math.max(20, Math.round((totalWeeksMin / 14) * 100)));

  return {
    minCost,
    maxCost,
    formattedMinCost: `$${minCost.toLocaleString()}`,
    formattedMaxCost: `$${maxCost.toLocaleString()}`,
    totalWeeksMin,
    totalWeeksMax,
    timelineLabel: `${totalWeeksMin} – ${totalWeeksMax} Weeks`,
    timelinePercent,
    squadText: SQUAD_DEFINITIONS[state.scope] || SQUAD_DEFINITIONS.custom_ai,
    scopeLabel: scopeObj.label,
    dataLabel: dataObj.label,
    deployLabel: deployObj.label,
    velocityLabel: velocityObj.label
  };
}
