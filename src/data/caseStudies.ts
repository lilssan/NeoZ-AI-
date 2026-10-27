import { CaseStudy } from '../types';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'fintech-document-intelligence',
    category: 'rag',
    categoryLabel: 'AI & RAG Systems',
    badge: 'FinTech • Production Tier 1',
    isFeatured: true,
    title: 'FinTech Enterprise: Autonomous Document Intelligence & Fraud Detection',
    bottleneck: '12,000+ unstructured multi-lingual loan docs processed manually, causing critical 72-hour turnaround latency and recurrent human error cascades.',
    solution: 'Multi-agent RAG workflow with fine-tuned embeddings, validation microservices, and an audited human-in-the-loop review interface.',
    metrics: [
      { label: 'Processing Speed', value: '+84%', highlight: true, color: 'text-primary-container' },
      { label: 'Extraction Accuracy', value: '99.7%', highlight: false, color: 'text-primary' },
      { label: 'Annual Operational Savings', value: '$1.8M', highlight: true, color: 'text-secondary' }
    ],
    tags: ['Python', 'FastEmbed', 'LangGraph', 'Azure OpenAI', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'High-tech enterprise FinTech operations center with cybernetic data dashboard displaying document ingestion nodes',
    clientName: 'Marcus Vance',
    clientRole: 'CTO, Meridian FinTech Global',
    fullDescription: 'By architecting a distributed HNSW vector mesh alongside a fine-tuned quantization pipeline on FP8 models, NeoZ AI compressed document turnaround from 72 hours down to 240 milliseconds per transaction, maintaining zero PII leakage under strict SOC2 Type II compliance.'
  },
  {
    id: 'hipaa-clinical-trial-matching',
    category: 'webapp',
    categoryLabel: 'Web App & Software',
    badge: 'HealthTech Platform',
    title: 'HIPAA-Compliant Clinical Trial Matching Web App',
    bottleneck: 'Complex patient eligibility criteria caused 40% candidate drop-off in active oncological trials across US clinical sites.',
    solution: 'Secure patient data anonymization engine paired with semantic query vector search running isolated zero-retention embeddings.',
    metrics: [
      { label: 'Enrollment', value: '3.8x', color: 'text-primary-container' },
      { label: 'Breaches', value: '0', color: 'text-primary' },
      { label: 'Matched', value: '45K+', color: 'text-secondary' }
    ],
    tags: ['Next.js', 'AWS Bedrock', 'Milvus', 'HIPAA Cloud'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Modern clinical trial bioinformatics user interface showcasing secure medical vector representations',
    fullDescription: 'Engineered an end-to-end patient anonymization proxy on isolated VPC nodes that matches complex oncological clinical notes against ClinicalTrials.gov protocol embeddings in real-time with zero audit flags.'
  },
  {
    id: 'multimodal-creative-campaign',
    category: 'media',
    categoryLabel: 'Media & Creative',
    badge: 'E-Commerce Global',
    title: 'Multimodal Creative Campaign Pipeline',
    bottleneck: 'Seasonal localization costs exceeded $400K per quarter for digital ad creative iterations across 18 regional retail markets.',
    solution: 'Custom LoRA visual models locked to strict corporate brand guidelines with automated localized copy generation and aspect refits.',
    metrics: [
      { label: 'Cost', value: '-72%', color: 'text-primary-container' },
      { label: 'CTR', value: '3.1x', color: 'text-secondary' },
      { label: 'Assets/48h', value: '1,200+', color: 'text-primary' }
    ],
    tags: ['Stable Diffusion XL', 'Custom LoRA', 'ComfyUI', 'Next.js'],
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Multimodal generative fashion and product commercial showcase grid with dynamic neon cyan lighting',
    fullDescription: 'Deployed an automated LoRA fine-tuning workflow that trains on client luxury asset catalogs in 3 hours, enabling instant generation of photorealistic, multi-aspect-ratio campaigns localized into 14 languages.'
  },
  {
    id: 'developer-copilot-engine',
    category: 'webapp',
    categoryLabel: 'Web App & Software',
    badge: 'SaaS Unicorn',
    title: 'Real-Time Code Synthesis & Developer Co-Pilot Integration',
    bottleneck: 'Engineering throughput plateaued across 800+ distributed developers with massive legacy codebase comprehension overhead.',
    solution: 'Self-hosted low-latency code model pipeline hooked directly into VSCode & GitHub CI/CD with AST context injection.',
    metrics: [
      { label: 'Dev Cycle Duration', value: '-42%', color: 'text-primary-container' },
      { label: 'Active Daily Queries', value: '120K', color: 'text-secondary' }
    ],
    tags: ['vLLM', 'Triton Server', 'TypeScript', 'Kubernetes'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Cybernetic code synthesis and real time AST context injection stream',
    fullDescription: 'Custom AST context retriever feeding quantized Qwen-2.5 Coder 32B models on Triton server pods, providing sub-85ms completion tokens with zero training leakage to external commercial LLMs.'
  },
  {
    id: 'autonomous-risk-radar',
    category: 'rag',
    categoryLabel: 'AI & RAG Systems',
    badge: 'RegTech Infrastructure',
    title: 'Autonomous Financial Risk & Sanction Scanner',
    bottleneck: 'Regulatory compliance alerts generated over 85% false positives, burying Tier 1 fraud analysts under 200+ hours of backlog weekly.',
    solution: 'Graph-augmented retrieval (GraphRAG) with temporal entity linking and autonomous multi-agent dispute verification trees.',
    metrics: [
      { label: 'False Positives', value: '-78%', color: 'text-primary-container' },
      { label: 'Audit Speed', value: '12x', color: 'text-primary' },
      { label: 'Compliance Score', value: '100%', color: 'text-secondary' }
    ],
    tags: ['Neo4j', 'Llama 3.3', 'FastAPI', 'Redis'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'High-density knowledge graph nodes and algorithmic risk analysis dashboard',
    fullDescription: 'GraphRAG pipeline that traces international transaction flows across 40+ sanction databases and historical KYC files in under 2 seconds, surfacing complete explainable audit trails.'
  },
  {
    id: 'synthetic-audio-translation',
    category: 'media',
    categoryLabel: 'Media & Creative',
    badge: 'Streaming & Media',
    title: 'Zero-Latency Synthetic Voice & Video Dubbing Engine',
    bottleneck: 'Global video streaming platform spent 3 weeks per episode manually recording localized multilingual voiceovers.',
    solution: 'Few-shot acoustic voice clone models coupled with lip-sync diffusion networks and automated cultural idiom adaptation.',
    metrics: [
      { label: 'Turnaround', value: '< 2 Hrs', color: 'text-primary-container' },
      { label: 'Viewer Retention', value: '+34%', color: 'text-secondary' },
      { label: 'Languages', value: '28+', color: 'text-primary' }
    ],
    tags: ['PyTorch', 'XTTS', 'Wav2Lip', 'CUDA'],
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Audio spectrogram visualization and synthetic vocal waveform generation display',
    fullDescription: 'Engineered a real-time streaming pipeline that extracts speaker timbre and intonation to produce natural, perfectly lip-synced audio across 28 global languages within 2 hours of broadcast.'
  }
];
