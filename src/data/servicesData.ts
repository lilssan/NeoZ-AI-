import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-consulting',
    category: 'ai-core',
    categoryLabel: 'Core AI & ML',
    title: 'AI Consulting & Strategy',
    description: 'Strategic roadmaps translating enterprise balance sheets into high-yield algorithmic moats with verifiable governance.',
    icon: 'psychology',
    tags: ['Claude 3.5', 'GPT-4o', 'Mistral', 'LangChain'],
    deliverables: [
      'Enterprise GenAI Roadmapping & ROI Forecasts',
      'Model Vendor Evaluation & TCO Optimization',
      'AI Compliance, Safety Guardrails & Governance',
      'Executive Immersion & Staff Enablement Clinics'
    ],
    timeline: '2–4 Weeks'
  },
  {
    id: 'custom-software',
    category: 'engineering',
    categoryLabel: 'Software Architecture',
    title: 'Custom Software Development',
    description: 'High-throughput, reactive distributed platforms engineered to process millions of transactions without latency degradation.',
    icon: 'deployed_code',
    tags: ['Next.js', 'TypeScript', 'Go', 'Rust'],
    deliverables: [
      'Cloud-Native Distributed Microservice Mesh',
      'High-Concurrency Event-Driven GraphQL/gRPC APIs',
      'Edge-Rendered Web & Mobile Client Platforms',
      'Self-Healing Kubernetes Orchestration'
    ],
    timeline: '6–16 Weeks'
  },
  {
    id: 'model-tuning-rag',
    category: 'ai-core',
    categoryLabel: 'Core AI & ML',
    title: 'Model Tuning & RAG Systems',
    description: 'Customized open & private weights tuned for specialized enterprise vocabulary, citations, and proprietary corpora.',
    icon: 'hub',
    tags: ['LoRA / QLoRA', 'Pinecone', 'Milvus', 'vLLM'],
    deliverables: [
      'Hyperparameter LoRA/QLoRA Optimization Pipelines',
      'Sub-100ms Hybrid Keyword & Vector Embeddings Search',
      'Zero-Data Leakage Enterprise Sandbox Infrastructure',
      'Token Cost Reductions Up to 70% Via Quantization'
    ],
    timeline: '4–10 Weeks'
  },
  {
    id: 'generative-media',
    category: 'creative',
    categoryLabel: 'Creative & Growth',
    title: 'AI Media & Generative Campaigns',
    description: 'End-to-end autonomous generative pipelines for hyper-customized, brand-safe marketing visuals, motion, and synthetic assets.',
    icon: 'movie_creation',
    tags: ['ComfyUI', 'Midjourney API', 'Runway Gen-3', 'Stable Diffusion'],
    deliverables: [
      'Automated Dynamic Creative Optimization (DCO)',
      'Custom Visual Identity LoRA Fine-Tuning',
      'Programmatic High-Resolution Commercial Render Engines',
      'Multimodal Voice & Video Personalization Hooks'
    ],
    timeline: '2–6 Weeks'
  },
  {
    id: 'interface-architecture',
    category: 'engineering',
    categoryLabel: 'Software Architecture',
    title: 'Interface Architecture (UI/UX)',
    description: 'Mathematical design systems, dark-mode biomechanics, and low-latency interaction models tailored for complex AI applications.',
    icon: 'draw',
    tags: ['Figma Tokens', 'Design Tokens', 'Tailwind Engine', 'Framer Motion'],
    deliverables: [
      'End-to-End Enterprise Design System Frameworks',
      'Complex Data Density & Analytics Dashboard UX',
      'Real-Time Interactive Micro-Interaction Protocols',
      'Conversion-Maximized Checkout & Onboarding Paths'
    ],
    timeline: '3–8 Weeks'
  },
  {
    id: 'growth-systems',
    category: 'creative',
    categoryLabel: 'Creative & Growth',
    title: 'Growth Systems & Social Engines',
    description: 'Algorithmic distribution engines, real-time market sentiment telemetry, and predictive feedback loops that compound brand reach.',
    icon: 'query_stats',
    tags: ['Kafka', 'Sentiment LLMs', 'FastAPI', 'Redis Graph'],
    deliverables: [
      'Automated Content Syndication & Timing Predictors',
      'Live Audience Sentiment Analysis & Alert Routing',
      'AI Community Moderation & Zero-Latency Reply Bots',
      'Cohort Retention Analytics & Churn Modeling'
    ],
    timeline: 'Ongoing Continuous'
  }
];
