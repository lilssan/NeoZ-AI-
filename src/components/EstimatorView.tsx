import React, { useState } from 'react';
import {
  SCOPE_OPTIONS,
  DATA_OPTIONS,
  DEPLOY_OPTIONS,
  VELOCITY_OPTIONS,
  CalculatorState,
  calculateProjectEstimate,
  ScopeOptionKey,
  DataOptionKey,
  DeployOptionKey,
  VelocityOptionKey
} from '../utils/calculator';
import { validateEstimatorForm, EstimatorFormErrors } from '../utils/validation';
import { EstimatorProposalSubmission, PageId } from '../types';

interface EstimatorViewProps {
  initialScope?: ScopeOptionKey;
  onProposalSubmitted: (proposal: EstimatorProposalSubmission) => void;
  onNavigate: (page: PageId) => void;
}

export const EstimatorView: React.FC<EstimatorViewProps> = ({
  initialScope = 'custom_ai',
  onProposalSubmitted,
  onNavigate
}) => {
  const [calcState, setCalcState] = useState<CalculatorState>({
    scope: initialScope,
    data: 'clean_data',
    deploy: 'cloud_mt',
    velocity: 'standard'
  });

  // Lead Form State
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [targetLaunch, setTargetLaunch] = useState('Q3 2025');
  const [techContext, setTechContext] = useState('');
  const [errors, setErrors] = useState<EstimatorFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProposal, setSubmittedProposal] = useState<EstimatorProposalSubmission | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0); // 0th open by default

  const calculation = calculateProjectEstimate(calcState);

  // Dynamic progress tracker based on active selections
  const getStepProgress = () => {
    let completed = 1;
    if (calcState.data !== 'clean_data') completed = 2;
    if (calcState.deploy !== 'cloud_mt') completed = 3;
    if (calcState.velocity !== 'standard') completed = 4;
    return completed;
  };

  const handleScopeSelect = (key: ScopeOptionKey) => {
    setCalcState((prev) => ({ ...prev, scope: key }));
  };

  const handleDataSelect = (key: DataOptionKey) => {
    setCalcState((prev) => ({ ...prev, data: key }));
  };

  const handleDeploySelect = (key: DeployOptionKey) => {
    setCalcState((prev) => ({ ...prev, deploy: key }));
  };

  const handleVelocitySelect = (key: VelocityOptionKey) => {
    setCalcState((prev) => ({ ...prev, velocity: key }));
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEstimatorForm({ email, company, targetLaunch, techContext });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const newProposal: EstimatorProposalSubmission = {
        id: `prop-${Date.now()}`,
        submittedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        email,
        company,
        targetLaunch,
        techContext,
        calculatorState: { ...calcState },
        calculationResult: { ...calculation }
      };

      setIsSubmitting(false);
      setSubmittedProposal(newProposal);
      onProposalSubmitted(newProposal);
    }, 700);
  };

  const faqItems = [
    {
      q: 'How accurate is this automated estimation model?',
      a: 'Our dynamic algorithm aggregates real sprint velocities and compute consumption data from over 40+ completed enterprise AI deployments. In 94% of projects, our official statement of work lands directly within the generated range.'
    },
    {
      q: 'Do you charge fixed-price milestones or open-ended hourly retainers?',
      a: 'We default to capped, deliverable-driven fixed sprints. Every engagement features concrete sprint milestones, defined acceptance criteria, and a guaranteed maximum investment. Ongoing architectural retainers are optionally available post-launch.'
    },
    {
      q: 'Who owns the intellectual property and model weights?',
      a: 'You own 100% of the intellectual property upon milestone payment. All code repositories, fine-tuned weights, synthetic dataset generators, and orchestration pipelines are transferred into your private VPC and GitHub organization.'
    },
    {
      q: 'Can we utilize our existing cloud credits (AWS Activate, Azure, GCP)?',
      a: 'Absolutely. We orchestrate training and deployment directly within your private cloud tenant, meaning your team utilizes its existing compute discounts, enterprise agreements, and startup credits with zero markup.'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 right-1/4 w-[580px] h-[580px] rounded-full bg-secondary-container/15 blur-[140px]"></div>
        <div className="pointer-events-none absolute top-96 -left-32 w-[620px] h-[620px] rounded-full bg-primary-container/10 blur-[160px]"></div>

        {/* Page Header Section */}
        <section className="w-full px-4 sm:px-8 xl:px-16 pt-12 pb-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-primary-fixed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                <span className="font-label-sm text-xs uppercase tracking-wider font-semibold">
                  Algorithmic Resource Calibration
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary font-extrabold tracking-tight">
                AI &amp; Software Project{' '}
                <span className="bg-gradient-to-r from-primary-container via-tertiary-fixed to-secondary text-transparent bg-clip-text">
                  Cost Estimator
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Transparent algorithmic pricing matrices with production-grade engineering timelines delivered dynamically in under 60 seconds.
              </p>
            </div>

            {/* Live Compute Metric Badge */}
            <div className="flex items-center gap-4 bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl shadow-lg shrink-0">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[24px]">tune</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-on-surface-variant">Active Computation Rate</span>
                <span className="font-code-tech text-xs text-tertiary font-semibold">
                  Q2 Fixed Benchmark · 99.4% Quote Precision
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dynamic Calculator & Side Summary Grid */}
        <section className="w-full px-4 sm:px-8 xl:px-16 pb-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Multi-Step Configuration (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Stepper Progress Tracker */}
              <div className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl flex flex-col gap-2 shadow-md">
                <div className="flex items-center justify-between text-on-surface-variant text-xs">
                  <span className="font-label-sm text-primary uppercase font-bold">Configuration Flow</span>
                  <span className="font-code-tech text-on-surface">
                    Step {getStepProgress()} of 4 Active Calibration
                  </span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-container to-secondary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(getStepProgress() / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Calculator Container */}
              <div className="bg-surface-container-low border border-outline-variant/30 p-6 md:p-8 rounded-xl shadow-xl flex flex-col gap-8">
                {/* Step 1: Project Architecture & Scope */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-xs text-primary-fixed uppercase tracking-wider font-semibold">
                        Step 01
                      </span>
                      <h2 className="font-headline-sm text-xl text-on-surface font-bold">
                        Select Project Architecture &amp; Scope
                      </h2>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[22px]">developer_board</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Choose the primary structural baseline for your cognitive deployment.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {SCOPE_OPTIONS.map((opt) => {
                      const isSelected = calcState.scope === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleScopeSelect(opt.key)}
                          type="button"
                          className={`text-left p-4 rounded-lg bg-surface-container border transition-all cursor-pointer shadow-md ${
                            isSelected
                              ? 'border-primary-container ring-2 ring-primary-container bg-surface-container-high'
                              : 'border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-high/60'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className={`material-symbols-outlined text-[26px] ${isSelected ? 'text-primary-container' : 'text-on-surface-variant'}`}>
                              {opt.icon}
                            </span>
                            <span
                              className={`w-2.5 h-2.5 rounded-full transition-all ${
                                isSelected ? 'bg-primary-container shadow-[0_0_8px_#00f0ff]' : 'bg-transparent border border-outline-variant'
                              }`}
                            ></span>
                          </div>
                          <h3 className="font-title text-sm md:text-base text-on-surface font-bold mt-2 mb-1">
                            {opt.label}
                          </h3>
                          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                            {opt.description}
                          </p>
                          <span className="mt-3 inline-block font-code-tech text-xs text-tertiary-fixed font-semibold">
                            {opt.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Integration & Data Complexity */}
                <div className="flex flex-col gap-3 pt-4 border-t border-surface-container-high/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-xs text-primary-fixed uppercase tracking-wider font-semibold">
                        Step 02
                      </span>
                      <h2 className="font-headline-sm text-xl text-on-surface font-bold">
                        Integration &amp; Data Complexity
                      </h2>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[22px]">database</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Audit your existing data pipelines, formats, and structural readiness.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DATA_OPTIONS.map((opt) => {
                      const isSelected = calcState.data === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleDataSelect(opt.key)}
                          type="button"
                          className={`text-left p-4 rounded-lg bg-surface-container border transition-all cursor-pointer shadow-md ${
                            isSelected
                              ? 'border-primary-container ring-2 ring-primary-container bg-surface-container-high'
                              : 'border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-high/60'
                          }`}
                        >
                          <span className="font-label-md text-sm text-on-surface block font-bold">
                            {opt.label}
                          </span>
                          <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                            {opt.description}
                          </p>
                          <span className="font-code-tech text-xs text-primary mt-2.5 inline-block font-semibold">
                            {opt.costLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Deployment & Compliance Standards */}
                <div className="flex flex-col gap-3 pt-4 border-t border-surface-container-high/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-xs text-primary-fixed uppercase tracking-wider font-semibold">
                        Step 03
                      </span>
                      <h2 className="font-headline-sm text-xl text-on-surface font-bold">
                        Deployment &amp; Compliance Standards
                      </h2>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[22px]">verified_user</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Determine isolation tiers, latency guarantees, and governance standards.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DEPLOY_OPTIONS.map((opt) => {
                      const isSelected = calcState.deploy === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleDeploySelect(opt.key)}
                          type="button"
                          className={`text-left p-4 rounded-lg bg-surface-container border transition-all cursor-pointer shadow-md ${
                            isSelected
                              ? 'border-primary-container ring-2 ring-primary-container bg-surface-container-high'
                              : 'border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-high/60'
                          }`}
                        >
                          <span className="font-label-md text-sm text-on-surface block font-bold">
                            {opt.label}
                          </span>
                          <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                            {opt.description}
                          </p>
                          <span className="font-code-tech text-xs text-primary mt-2.5 inline-block font-semibold">
                            {opt.costLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Desired Delivery Velocity */}
                <div className="flex flex-col gap-3 pt-4 border-t border-surface-container-high/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-xs text-primary-fixed uppercase tracking-wider font-semibold">
                        Step 04
                      </span>
                      <h2 className="font-headline-sm text-xl text-on-surface font-bold">
                        Desired Delivery Velocity
                      </h2>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[22px]">speed</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Adjust engineering squad capacity and concurrent sprint throughput.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {VELOCITY_OPTIONS.map((opt) => {
                      const isSelected = calcState.velocity === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleVelocitySelect(opt.key)}
                          type="button"
                          className={`text-left p-4 rounded-lg bg-surface-container border transition-all cursor-pointer shadow-md ${
                            isSelected
                              ? 'border-primary-container ring-2 ring-primary-container bg-surface-container-high'
                              : 'border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-high/60'
                          }`}
                        >
                          <span className="font-label-md text-sm text-on-surface block font-bold">
                            {opt.label}
                          </span>
                          <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                            {opt.subtitle}
                          </p>
                          <span className="font-code-tech text-xs text-primary-container mt-2.5 inline-block font-semibold">
                            {opt.rateLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-surface-container border border-outline-variant/30 p-3 rounded-lg flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-primary-container text-[20px] mb-1">lock</span>
                  <span className="font-label-sm text-xs text-on-surface font-semibold">100% IP Handover</span>
                  <span className="font-body-sm text-[11px] text-outline">Git code &amp; weights</span>
                </div>
                <div className="bg-surface-container border border-outline-variant/30 p-3 rounded-lg flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-primary-container text-[20px] mb-1">workspace_premium</span>
                  <span className="font-label-sm text-xs text-on-surface font-semibold">ISO 27001 SLA</span>
                  <span className="font-body-sm text-[11px] text-outline">90-day warranty</span>
                </div>
                <div className="bg-surface-container border border-outline-variant/30 p-3 rounded-lg flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-primary-container text-[20px] mb-1">terminal</span>
                  <span className="font-label-sm text-xs text-on-surface font-semibold">Native Vector DB</span>
                  <span className="font-body-sm text-[11px] text-outline">Milvus / Pinecone</span>
                </div>
                <div className="bg-surface-container border border-outline-variant/30 p-3 rounded-lg flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-primary-container text-[20px] mb-1">memory</span>
                  <span className="font-label-sm text-xs text-on-surface font-semibold">CUDA Optimized</span>
                  <span className="font-body-sm text-[11px] text-outline">vLLM &amp; TensorRT</span>
                </div>
              </div>
            </div>

            {/* Right: Real-Time Dynamic Estimation Panel (5 Cols, Sticky) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
              <div className="bg-surface-container-low border border-outline-variant/30 p-6 md:p-7 rounded-xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-40 h-40 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>

                {/* Top Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
                    <span className="font-label-sm text-xs text-primary uppercase font-bold tracking-wide">
                      Dynamic Valuation
                    </span>
                  </div>
                  <span className="font-code-tech text-xs text-on-surface-variant">Live Synced</span>
                </div>

                {/* Estimated Investment Metric */}
                <div className="flex flex-col gap-1">
                  <span className="font-body-sm text-xs text-on-surface-variant">Estimated Investment Matrix</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-lg text-3xl font-extrabold text-primary tracking-tight transition-all duration-300">
                      {calculation.formattedMinCost} – {calculation.formattedMaxCost}
                    </span>
                  </div>
                  <span className="font-label-sm text-[11px] text-outline">
                    Fixed-milestone cap guarantees no hidden scope creep.
                  </span>
                </div>

                {/* Time to Production Metric */}
                <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/20 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-xs text-on-surface-variant flex items-center gap-1.5 font-semibold">
                      <span className="material-symbols-outlined text-[18px] text-primary-container">schedule</span>
                      Time-to-Production
                    </span>
                    <span className="font-headline-sm text-lg text-on-surface font-bold">
                      {calculation.timelineLabel}
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mt-1">
                    <div
                      className="bg-gradient-to-r from-primary-container to-secondary h-full rounded-full transition-all duration-500"
                      style={{ width: `${calculation.timelinePercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Squad Composition */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    Dedicated Squad Allocation
                  </span>
                  <div className="p-3.5 rounded-lg bg-surface-container border border-outline-variant/20 flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">groups</span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-xs text-on-surface font-semibold leading-snug">
                        {calculation.squadText}
                      </span>
                      <span className="font-body-sm text-[11px] text-outline mt-1 leading-snug">
                        Dedicated 100% capacity · Daily async Slack sync · Weekly staging deployments
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scope Checklist Deliverables */}
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    Engineering Guarantees Included
                  </span>
                  <ul className="flex flex-col gap-2 font-body-sm text-xs text-on-surface">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">check_circle</span>
                      <span>Full Intellectual Property &amp; Git repository ownership</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">check_circle</span>
                      <span>Comprehensive architectural blueprint &amp; benchmark suite</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">check_circle</span>
                      <span>Synthetic test suites &amp; continuous evaluation pipeline</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">check_circle</span>
                      <span>90-Day post-deployment production SLA &amp; warm standby</span>
                    </li>
                  </ul>
                </div>

                {/* Lead Capture Conversion Form with Validation */}
                <div className="pt-2 border-t border-surface-container-high/60 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-title text-base text-on-surface font-bold">Lock In Estimate &amp; Receive Proposal</h3>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      We generate a detailed technical scope doc tailored to these specs within 2 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmitProposal} className="flex flex-col gap-3">
                    <div>
                      <label className="block font-label-sm text-xs text-on-surface-variant mb-1" htmlFor="workEmail">
                        Corporate Email Address <span className="text-primary-container">*</span>
                      </label>
                      <input
                        id="workEmail"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="alex@enterprise.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container border text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all ${
                          errors.email ? 'border-error' : 'border-outline-variant/30'
                        }`}
                      />
                      {errors.email && (
                        <p className="font-body-sm text-xs text-error mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-label-sm text-xs text-on-surface-variant mb-1" htmlFor="companyName">
                          Company Entity <span className="text-primary-container">*</span>
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          value={company}
                          onChange={(e) => {
                            setCompany(e.target.value);
                            if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
                          }}
                          placeholder="Vanguard Health"
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container border text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all ${
                            errors.company ? 'border-error' : 'border-outline-variant/30'
                          }`}
                        />
                        {errors.company && (
                          <p className="font-body-sm text-xs text-error mt-1">{errors.company}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-label-sm text-xs text-on-surface-variant mb-1" htmlFor="timelineGoal">
                          Target Launch
                        </label>
                        <input
                          id="timelineGoal"
                          type="text"
                          value={targetLaunch}
                          onChange={(e) => setTargetLaunch(e.target.value)}
                          placeholder="Q3 2025"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-sm text-xs text-on-surface-variant mb-1" htmlFor="techContext">
                        Technical Requirements &amp; Stack Notes (Optional)
                      </label>
                      <textarea
                        id="techContext"
                        rows={2}
                        value={techContext}
                        onChange={(e) => setTechContext(e.target.value)}
                        placeholder="e.g. Existing AWS Lambda backend, requires Python LangGraph + Qdrant vectors..."
                        className="w-full px-3.5 py-2 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-outline text-xs focus:outline-none focus:ring-2 focus:ring-primary-container resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-lg bg-primary-container text-on-primary-container font-label-md text-sm font-bold shadow-[0_0_24px_rgba(0,240,255,0.4)] hover:shadow-[0_0_36px_rgba(0,240,255,0.65)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                          <span>Compiling Engineering Matrix...</span>
                        </>
                      ) : (
                        <>
                          <span>Lock In Estimate &amp; Receive Proposal</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </>
                      )}
                    </button>

                    {/* Feedback Toast */}
                    {submittedProposal && (
                      <div className="p-4 rounded-lg bg-primary-container/15 border border-primary-container/40 text-primary font-body-sm text-xs flex flex-col gap-2 animate-fadeIn">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary-container text-[18px]">check_circle</span>
                          <span className="font-bold">Estimate Locked for {submittedProposal.company}!</span>
                        </div>
                        <p className="text-on-surface-variant leading-relaxed">
                          Your custom blueprint has been saved ({calculation.formattedMinCost} – {calculation.formattedMaxCost}, {calculation.timelineLabel}). A confirmation has been logged to your local session.
                        </p>
                        <div className="pt-1 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onNavigate('contact')}
                            className="text-primary-container hover:underline font-semibold flex items-center gap-1"
                          >
                            <span>Schedule direct call with Alex Vance</span>
                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Architecture Diagram Section */}
        <section className="w-full px-4 sm:px-8 xl:px-16 py-8">
          <div className="max-w-6xl mx-auto bg-surface-container-low border border-outline-variant/30 p-6 md:p-8 rounded-xl shadow-xl flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="font-label-sm text-xs text-primary uppercase font-bold">Pipeline Blueprint</span>
                <h2 className="font-headline-sm text-xl md:text-2xl text-on-surface font-bold">
                  How We Build: From Blueprint to Production Inference
                </h2>
              </div>
              <span className="font-code-tech text-xs text-secondary px-3 py-1 rounded bg-surface-container border border-outline-variant/30">
                Zero Vendor Lock-In Framework
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-surface-container border border-outline-variant/20 flex flex-col gap-1 relative">
                <span className="font-code-tech text-xs text-primary font-semibold">01 / DISCOVERY</span>
                <h3 className="font-title text-base text-on-surface font-bold">Data &amp; Latency Audit</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Profile token ingestion, baseline accuracy scores, evaluate embedding dimensionality.
                </p>
                <div className="mt-2 flex items-center gap-1 text-primary-container font-label-sm text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check</span> Week 1
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface-container border border-outline-variant/20 flex flex-col gap-1 relative">
                <span className="font-code-tech text-xs text-primary font-semibold">02 / ARCHITECTURE</span>
                <h3 className="font-title text-base text-on-surface font-bold">Core Infrastructure</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Setup vector stores, prompt caching, fine-tuning checkpoints, and API orchestration.
                </p>
                <div className="mt-2 flex items-center gap-1 text-primary-container font-label-sm text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check</span> Weeks 2-3
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface-container border border-outline-variant/20 flex flex-col gap-1 relative">
                <span className="font-code-tech text-xs text-primary font-semibold">03 / EVALUATION</span>
                <h3 className="font-title text-base text-on-surface font-bold">Automated Red-Teaming</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Adversarial stress-testing, hallucination guardrails, and latency p99 benchmark locks.
                </p>
                <div className="mt-2 flex items-center gap-1 text-primary-container font-label-sm text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">check</span> Weeks 4-5
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface-container border border-outline-variant/20 flex flex-col gap-1 relative">
                <span className="font-code-tech text-xs text-secondary font-semibold">04 / HANDOVER</span>
                <h3 className="font-title text-base text-on-surface font-bold">VPC Launch &amp; SLA</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  CI/CD deployment to your cloud, source repos transferred, 90-day telemetry monitoring.
                </p>
                <div className="mt-2 flex items-center gap-1 text-secondary font-label-sm text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">rocket_launch</span> Go-Live
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing FAQ Accordion Section */}
        <section className="w-full px-4 sm:px-8 xl:px-16 py-12">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="text-center flex flex-col items-center gap-1">
              <span className="font-label-sm text-xs text-primary uppercase tracking-widest font-semibold">
                Pricing Transparency
              </span>
              <h2 className="font-headline-md text-2xl text-on-surface font-bold">
                Frequently Asked Engineering &amp; Cost Inquiries
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant">
                Everything you need to know about our pricing structures, milestones, and deliverables.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {faqItems.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 md:p-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="font-title text-base text-on-surface font-semibold">{item.q}</span>
                      <span
                        className={`material-symbols-outlined text-primary-container transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 md:px-5 pb-5 text-on-surface-variant font-body-md text-sm leading-relaxed border-t border-surface-container-high/40 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
