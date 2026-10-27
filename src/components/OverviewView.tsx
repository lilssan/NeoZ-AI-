import React, { useState, useEffect } from 'react';
import { PageId } from '../types';

interface OverviewViewProps {
  onNavigate: (page: PageId) => void;
  onOpenReel: () => void;
}

const TELEMETRY_STREAM_ITEMS = [
  { icon: 'chevron_forward', text: 'Auto-Vector Embedding [Docs_v9]', time: '12ms', color: 'text-primary-container' },
  { icon: 'memory', text: 'Multi-Hop Context Resolver', time: '29ms', color: 'text-secondary' },
  { icon: 'verified_user', text: 'Guardrail Synthesis & Redact', time: '4ms', color: 'text-primary-container' },
  { icon: 'bolt', text: 'Prompt Compression Routine [Token -42%]', time: '8ms', color: 'text-tertiary-fixed' },
  { icon: 'sync', text: 'Dynamic Agent Hand-Off Complete', time: '18ms', color: 'text-primary-fixed' },
  { icon: 'lock', text: 'Zero-Knowledge Cryptographic Hash Logged', time: '11ms', color: 'text-primary-container' },
  { icon: 'terminal', text: 'Final Response Streamed via gRPC', time: '42ms total', color: 'text-outline' }
];

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate, onOpenReel }) => {
  const [logIndex, setLogIndex] = useState(0);
  const [liveThroughput, setLiveThroughput] = useState(14.2);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % TELEMETRY_STREAM_ITEMS.length);
      setLiveThroughput((prev) => +(14.2 + (Math.random() * 0.8 - 0.4)).toFixed(1));
    }, 3800);
    return () => clearInterval(logInterval);
  }, []);

  const visibleLogs = [
    TELEMETRY_STREAM_ITEMS[logIndex % TELEMETRY_STREAM_ITEMS.length],
    TELEMETRY_STREAM_ITEMS[(logIndex + 1) % TELEMETRY_STREAM_ITEMS.length],
    TELEMETRY_STREAM_ITEMS[(logIndex + 2) % TELEMETRY_STREAM_ITEMS.length],
    TELEMETRY_STREAM_ITEMS[(logIndex + 3) % TELEMETRY_STREAM_ITEMS.length]
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full pt-10 pb-20 md:pb-28 px-4 sm:px-8 xl:px-16">
        {/* Ambient glowing backdrop lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-secondary-container/20 via-primary-container/10 to-transparent blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-container/5 blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-[1360px] mx-auto flex flex-col gap-10">
          {/* Top Announcement & Header Content */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-5">
            {/* Live Status Pill */}
            <div
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/90 border border-outline-variant/30 backdrop-blur-md shadow-sm hover:bg-surface-container-highest transition-colors cursor-pointer group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
              </span>
              <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase font-semibold">
                Next-Gen Intelligence Studio
              </span>
              <span className="font-code-tech text-code-tech text-outline">•</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                Powering Enterprise Scale
              </span>
              <span className="material-symbols-outlined text-[16px] text-primary-container group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-display text-primary tracking-tight font-extrabold max-w-4xl">
              Architecting Custom Software &amp; Autonomous AI Systems That Scale.
            </h1>

            {/* Subheadline */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl text-center leading-relaxed">
              From fine-tuned proprietary LLMs to mission-critical web platforms, NeoZ AI accelerates product velocity and operational efficiency for high-growth enterprises.
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md shadow-[0_0_28px_rgba(0,240,255,0.4)] hover:shadow-[0_0_38px_rgba(0,240,255,0.65)] hover:-translate-y-0.5 transition-all font-bold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                <span>Book AI Strategy Call</span>
              </button>
              <button
                onClick={() => onNavigate('case-studies')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-high/90 hover:bg-surface-bright text-on-surface font-label-md text-label-md shadow-sm transition-all border border-outline-variant/30 cursor-pointer"
              >
                <span>Explore Case Studies</span>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">arrow_forward</span>
              </button>
              <button
                onClick={onOpenReel}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors border border-outline-variant/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-secondary">play_circle</span>
                <span>Watch 2-Min Reel</span>
              </button>
            </div>
          </div>

          {/* HERO VISUAL: Cybernetic Autonomous Agent HUD */}
          <div className="relative w-full max-w-5xl mx-auto -mt-2">
            {/* Floating Angular Badge */}
            <div className="absolute -top-4 -right-2 hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-surface-container-highest border border-primary-container/30 shadow-xl z-20">
              <span className="material-symbols-outlined text-primary-container text-[18px]">verified</span>
              <span className="font-code-tech text-code-tech text-primary font-semibold">CLUSTER: v4.8 ACTIVE</span>
            </div>

            <div className="relative w-full rounded-2xl bg-surface-container-low/95 border border-outline-variant/30 backdrop-blur-2xl shadow-2xl overflow-hidden p-5 md:p-6 flex flex-col gap-4">
              {/* Terminal / Dashboard Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high/60">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-error/80"></span>
                    <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim/80"></span>
                    <span className="w-3 h-3 rounded-full bg-primary-container/80"></span>
                  </div>
                  <span className="font-code-tech text-code-tech text-outline font-mono">
                    neoz-telemetry://agent-orchestrator.node-01
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 font-code-tech text-code-tech text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                    Inference Engine: ONLINE
                  </span>
                  <span className="font-code-tech text-code-tech text-on-surface-variant hidden sm:inline">
                    Region: us-east (Accelerated)
                  </span>
                </div>
              </div>

              {/* Main HUD Interactive Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left Panel: Live Agent Activity Stream */}
                <div className="lg:col-span-5 flex flex-col gap-3 bg-surface-container/70 p-4 rounded-xl border border-outline-variant/20 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-primary font-semibold">Active Agent Threads</span>
                    <span className="font-code-tech text-code-tech text-primary-fixed bg-surface-container-high px-2 py-0.5 rounded border border-outline-variant/30">
                      8 Parallel Nodes
                    </span>
                  </div>

                  {/* Stream nodes */}
                  <div className="flex flex-col gap-2 font-code-tech text-code-tech">
                    {visibleLogs.map((log, idx) => (
                      <div
                        key={`${log.text}-${idx}`}
                        className="p-2.5 rounded bg-surface-container-low/80 border border-outline-variant/20 flex items-center justify-between transition-all"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className={`material-symbols-outlined text-[16px] ${log.color}`}>{log.icon}</span>
                          <span className="text-on-surface truncate text-xs">{log.text}</span>
                        </div>
                        <span className={`${log.color} shrink-0 text-xs font-mono ml-2`}>{log.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Real-time Token Cost & Efficiency Meter */}
                  <div className="mt-auto pt-2 flex flex-col gap-1.5">
                    <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                      <span>Cache Hit Ratio (Semantic)</span>
                      <span className="text-primary font-semibold">94.8%</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary-container via-primary to-secondary h-full rounded-full transition-all duration-700"
                        style={{ width: '94.8%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Benchmark Performance & Topology Graph */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Fast Metric Tiles */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-surface-container/70 p-3 rounded-xl border border-outline-variant/20 flex flex-col">
                      <span className="font-code-tech text-[11px] text-outline">P99 LATENCY</span>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        42<span className="text-xs font-normal text-on-surface-variant">ms</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-primary-container flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[14px]">trending_down</span> -68% YoY
                      </span>
                    </div>

                    <div className="bg-surface-container/70 p-3 rounded-xl border border-outline-variant/20 flex flex-col">
                      <span className="font-code-tech text-[11px] text-outline">TOKEN EFFICIENCY</span>
                      <span className="font-headline-sm text-headline-sm text-secondary font-bold">
                        18.4<span className="text-xs font-normal text-on-surface-variant">x</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[14px]">bolt</span> Quantized
                      </span>
                    </div>

                    <div className="bg-surface-container/70 p-3 rounded-xl border border-outline-variant/20 flex flex-col">
                      <span className="font-code-tech text-[11px] text-outline">UPTIME SLA</span>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        99.99<span className="text-xs font-normal text-on-surface-variant">%</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-primary-fixed flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[14px]">verified</span> Guaranteed
                      </span>
                    </div>
                  </div>

                  {/* Inline SVG Real-Time Performance & Node Waveform */}
                  <div className="bg-surface-container/70 p-4 rounded-xl border border-outline-variant/20 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary-container text-[18px]">query_stats</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Autonomous Cluster Throughput (req/sec)
                        </span>
                      </div>
                      <span className="font-code-tech text-code-tech text-primary bg-primary-container/10 px-2 py-0.5 rounded border border-primary-container/20">
                        Live Telemetry
                      </span>
                    </div>

                    {/* SVG Waveform */}
                    <div className="w-full h-32 relative pt-2">
                      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 120">
                        <defs>
                          <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="strokeGradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#571bc1" />
                            <stop offset="50%" stopColor="#00f0ff" />
                            <stop offset="100%" stopColor="#c4e7ff" />
                          </linearGradient>
                        </defs>
                        <path d="M0,85 Q60,30 130,60 T250,45 T370,18 T500,32 L500,120 L0,120 Z" fill="url(#areaGradient)" />
                        <path d="M0,85 Q60,30 130,60 T250,45 T370,18 T500,32" fill="none" stroke="url(#strokeGradient)" strokeLinecap="round" strokeWidth="3" />
                        <circle className="animate-pulse" cx="130" cy="60" fill="#00f0ff" r="4" />
                        <circle cx="250" cy="45" fill="#00f0ff" r="4" />
                        <circle className="animate-ping" cx="370" cy="18" fill="#dbfcff" r="6" style={{ animationDuration: '2.5s' }} />
                        <circle cx="370" cy="18" fill="#00f0ff" r="5" />
                        <circle cx="500" cy="32" fill="#c4e7ff" r="4" />
                      </svg>

                      {/* Timeline Markers */}
                      <div className="flex justify-between font-code-tech text-code-tech text-outline pt-2 text-[11px]">
                        <span>-60 min</span>
                        <span>-45 min</span>
                        <span>-30 min</span>
                        <span>-15 min</span>
                        <span className="text-primary font-semibold">Now ({liveThroughput}k ops/s)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF & LOGO MATRIX SECTION */}
      <section className="w-full bg-surface-container-lowest/80 border-y border-surface-container-high/40 py-10 px-4 sm:px-8 xl:px-16">
        <div className="max-w-[1360px] mx-auto flex flex-col items-center gap-6 text-center">
          <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest font-semibold">
            Trusted by engineering and product leaders at forward-thinking innovators
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center justify-center gap-6 w-full opacity-85">
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-surface-container-low transition-colors group">
              <span className="material-symbols-outlined text-[28px] text-outline group-hover:text-primary transition-colors">hub</span>
              <span className="font-headline-sm text-lg text-outline group-hover:text-on-surface transition-colors font-bold tracking-tight">Synthetix</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-surface-container-low transition-colors group">
              <span className="material-symbols-outlined text-[28px] text-outline group-hover:text-primary-container transition-colors">flare</span>
              <span className="font-headline-sm text-lg text-outline group-hover:text-on-surface transition-colors font-bold tracking-tight">QuantumFlow</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-surface-container-low transition-colors group">
              <span className="material-symbols-outlined text-[28px] text-outline group-hover:text-secondary transition-colors">cloud_sync</span>
              <span className="font-headline-sm text-lg text-outline group-hover:text-on-surface transition-colors font-bold tracking-tight">NexusCloud</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-surface-container-low transition-colors group">
              <span className="material-symbols-outlined text-[28px] text-outline group-hover:text-primary transition-colors">speed</span>
              <span className="font-headline-sm text-lg text-outline group-hover:text-on-surface transition-colors font-bold tracking-tight">HyperScale</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-surface-container-low transition-colors group">
              <span className="material-symbols-outlined text-[28px] text-outline group-hover:text-primary-container transition-colors">dataset</span>
              <span className="font-headline-sm text-lg text-outline group-hover:text-on-surface transition-colors font-bold tracking-tight">Vectra AI</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-surface-container-low transition-colors group">
              <span className="material-symbols-outlined text-[28px] text-outline group-hover:text-tertiary-fixed transition-colors">cyclone</span>
              <span className="font-headline-sm text-lg text-outline group-hover:text-on-surface transition-colors font-bold tracking-tight">Aurora Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT & FAST STATS BENTO */}
      <section className="w-full py-16 px-4 sm:px-8 xl:px-16 relative">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider font-semibold">
                Measurable Results
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold mt-1">
                Engineered For Immediate Commercial Impact.
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              We do not deliver theoretical slide decks. NeoZ AI delivers deployed, production-grade intelligence that converts straight to enterprise bottom-line value.
            </p>
          </div>

          {/* Stat Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary-container/40 transition-all shadow-md group flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-primary-container text-[28px]">psychology</span>
                <span className="font-code-tech text-[11px] text-outline">BENCHMARKED</span>
              </div>
              <div className="my-5">
                <span className="font-headline-lg text-3xl font-extrabold text-primary group-hover:text-primary-container transition-colors">
                  99.4%
                </span>
                <span className="block font-title text-title text-on-surface mt-1">Model Precision</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Achieved across domain-specific Retrieval Augmented Generation and deterministic extraction workflows.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-secondary/40 transition-all shadow-md group flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-secondary text-[28px]">trending_up</span>
                <span className="font-code-tech text-[11px] text-outline">TIME TO VALUE</span>
              </div>
              <div className="my-5">
                <span className="font-headline-lg text-3xl font-extrabold text-primary group-hover:text-secondary transition-colors">
                  4.2x
                </span>
                <span className="block font-title text-title text-on-surface mt-1">Avg ROI in 90 Days</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Documented operational headcount efficiency and automated customer query resolution times.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-tertiary-fixed/40 transition-all shadow-md group flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-tertiary-fixed text-[28px]">payments</span>
                <span className="font-code-tech text-[11px] text-outline">NET VALUE</span>
              </div>
              <div className="my-5">
                <span className="font-headline-lg text-3xl font-extrabold text-primary group-hover:text-tertiary-fixed transition-colors">
                  $34M+
                </span>
                <span className="block font-title text-title text-on-surface mt-1">Client Value Created</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Through infrastructure cost compression, automated pipeline scale, and net-new product features.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary-container/40 transition-all shadow-md group flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-primary-container text-[28px]">rocket_launch</span>
                <span className="font-code-tech text-[11px] text-outline">DELIVERY RECORD</span>
              </div>
              <div className="my-5">
                <span className="font-headline-lg text-3xl font-extrabold text-primary group-hover:text-primary-container transition-colors">
                  40+
                </span>
                <span className="block font-title text-title text-on-surface mt-1">AI Systems Shipped</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                End-to-end full stack deployments in production across FinTech, HealthTech, and Cloud Infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULAR ARCHITECTURE HIGHLIGHT */}
      <section className="w-full py-16 px-4 sm:px-8 xl:px-16 bg-surface-container-lowest/50 border-t border-surface-container-high/30">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Pitch */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
              Modular Architecture
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              Deterministic Reliability Meets Generative Autonomy.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Off-the-shelf wrappers break under production edge-cases. We engineer state-machine-backed agent clusters, hybrid vector topologies, and specialized micro-model routing that guarantee low-latency, zero-hallucination compliance.
            </p>
            <div className="flex flex-col gap-3 pt-1">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary-container text-[22px] mt-0.5">terminal</span>
                <div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold block">
                    Full-Stack Cloud &amp; Model Integration
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    React/Next.js interfaces connected seamlessly to vLLM, Triton, and high-throughput vector backends.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">security</span>
                <div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold block">
                    Sovereign On-Premise &amp; VPC Deployments
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Zero data exfiltration. Strict HIPAA, SOC2 Type II, and ISO 27001 compliant containment boundaries.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-1.5 text-primary font-label-md text-label-md hover:text-primary-container transition-colors cursor-pointer"
              >
                <span>Explore Engineering Services</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <span className="text-outline">•</span>
              <button
                onClick={() => onNavigate('ai-cost-estimator')}
                className="inline-flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors cursor-pointer"
              >
                <span>Open AI Compute Estimator</span>
                <span className="material-symbols-outlined text-[18px]">calculate</span>
              </button>
            </div>
          </div>

          {/* Right Architecture Dashboard Preview */}
          <div className="lg:col-span-6 relative">
            <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl flex flex-col gap-4">
              <div className="w-full h-72 rounded-xl overflow-hidden relative shadow-inner bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
                  alt="Futuristic software engineering control center with high contrast cybernetic neural mesh"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-lg bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
                    <span className="font-code-tech text-code-tech text-primary font-semibold">
                      Active Pipeline: FinTech Agent Cluster v2
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary-fixed bg-surface-container px-2 py-0.5 rounded">
                    99.98% Healthy
                  </span>
                </div>
              </div>

              {/* Architecture Capabilities Micro-List */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20 flex flex-col">
                  <span className="font-code-tech text-[11px] text-outline">RETRIEVAL</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Hybrid Dense/Sparse Vector
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Milvus, Qdrant, pgvector</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/20 flex flex-col">
                  <span className="font-code-tech text-[11px] text-outline">MODELS</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Fine-Tuned Open Weights
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Llama 3.3, Mistral, Qwen 2.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONVERSION BANNER */}
      <section className="w-full py-16 px-4 sm:px-8 xl:px-16 relative">
        <div className="max-w-[1360px] mx-auto rounded-3xl bg-gradient-to-br from-surface-container via-surface-container-low to-surface-container-high border border-outline-variant/30 p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-container/10 blur-[100px] pointer-events-none"></div>
          <div className="flex flex-col gap-2 max-w-xl z-10">
            <span className="font-label-sm text-label-sm text-primary-container font-semibold uppercase tracking-wider">
              Ready to Outpace The Competition?
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              Deploy Your Custom AI Systems in 4 to 8 Weeks.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
              Schedule a direct architecture consultation with our Principal AI Engineers. We review your tech stack, pinpoint high-ROI generative capabilities, and outline your production blueprint.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-[0_0_32px_rgba(0,240,255,0.45)] hover:shadow-[0_0_42px_rgba(0,240,255,0.7)] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              <span>Schedule Architecture Session</span>
            </button>
            <button
              onClick={() => onNavigate('ai-cost-estimator')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors border border-outline-variant/30 cursor-pointer"
            >
              <span>Calculate Infrastructure ROI</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
