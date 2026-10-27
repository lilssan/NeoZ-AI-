import React, { useState } from 'react';
import { PageId, CaseStudy } from '../types';
import { CASE_STUDIES_DATA } from '../data/caseStudies';

interface CaseStudiesViewProps {
  onNavigate: (page: PageId) => void;
}

export const CaseStudiesView: React.FC<CaseStudiesViewProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'rag' | 'webapp' | 'media'>('all');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [hoveredThroughputBar, setHoveredThroughputBar] = useState<string | null>(null);

  const featuredCase = CASE_STUDIES_DATA.find((c) => c.isFeatured) || CASE_STUDIES_DATA[0];
  const otherCases = CASE_STUDIES_DATA.filter((c) => !c.isFeatured);

  const filterTabs = [
    { key: 'all', label: 'All Projects (12)' },
    { key: 'rag', label: 'AI & RAG Systems (5)' },
    { key: 'webapp', label: 'Web App & Software (4)' },
    { key: 'media', label: 'Media & Creative (3)' }
  ] as const;

  const filteredOtherCases = otherCases.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const throughputBars = [
    { label: '02:00', height: '40%', docs: '480 docs/min' },
    { label: '06:00', height: '65%', docs: '790 docs/min' },
    { label: '10:00', height: '55%', docs: '640 docs/min' },
    { label: '14:00', height: '80%', docs: '980 docs/min' },
    { label: '18:00', height: '95%', docs: '1,280 docs/min' },
    { label: '22:00', height: '70%', docs: '840 docs/min' },
    { label: 'Live', height: '100%', docs: '1,420 docs/min (Peak)' }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="relative w-full px-4 sm:px-8 xl:px-16 py-12 md:py-16 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[340px] bg-gradient-to-b from-primary-container/15 via-secondary-container/10 to-transparent blur-[120px] pointer-events-none -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30 text-primary-fixed font-code-tech text-xs shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
                <span>PRODUCTION METRICS • AUDITED PORTFOLIO</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-extrabold">
                Proven Impact &amp; Client Deployments
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Real problems solved with measurable ROI, not generic prototypes. Engineered for enterprise precision and autonomous execution.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-end bg-surface-container-low border border-outline-variant/30 px-5 py-3 rounded-xl shadow-lg">
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Cumulative Value Generated
                </span>
                <span className="font-headline-sm text-headline-sm text-primary-container font-extrabold">
                  $48.6M+
                </span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-5 py-2 rounded-full font-label-md text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)]'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border border-outline-variant/20'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Portfolio Grid Section */}
      <section className="w-full px-4 sm:px-8 xl:px-16 pb-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Featured Case Study (shows when filter is 'all' or 'rag') */}
          {(activeFilter === 'all' || activeFilter === 'rag') && (
            <div className="group relative bg-surface-container-low rounded-xl border border-outline-variant/30 p-6 md:p-10 shadow-xl overflow-hidden transition-all duration-300 hover:border-primary-container/40 hover:shadow-[0_8px_32px_-8px_rgba(0,240,255,0.2)]">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Left Information */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/30 text-primary-container font-label-sm text-xs font-semibold tracking-wide uppercase">
                        Featured Deployment
                      </span>
                      <span className="px-3 py-0.5 rounded-full bg-surface-container text-secondary font-code-tech text-xs">
                        {featuredCase.badge}
                      </span>
                    </div>

                    <h2 className="font-headline-md text-2xl md:text-3xl text-primary font-bold tracking-tight">
                      {featuredCase.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 text-error">
                          <span className="material-symbols-outlined text-[18px]">warning</span>
                          <span className="font-label-sm text-xs uppercase font-bold tracking-wider">The Bottleneck</span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                          {featuredCase.bottleneck}
                        </p>
                      </div>

                      <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 text-primary-container">
                          <span className="material-symbols-outlined text-[18px]">memory</span>
                          <span className="font-label-sm text-xs uppercase font-bold tracking-wider">The AI Solution</span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                          {featuredCase.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {featuredCase.metrics.map((m, idx) => (
                        <div key={idx} className="bg-surface-container-high/60 border border-outline-variant/20 rounded-lg p-3 flex flex-col">
                          <span className={`font-headline-sm text-xl md:text-2xl font-extrabold ${m.color || 'text-primary'}`}>
                            {m.value}
                          </span>
                          <span className="font-body-sm text-xs text-on-surface-variant">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-surface-container-high/60">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {featuredCase.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 rounded bg-surface-container border border-outline-variant/20 text-on-surface-variant font-code-tech text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedStudy(featuredCase)}
                        className="inline-flex items-center gap-1.5 text-primary-container hover:text-primary font-label-md text-sm transition-all cursor-pointer font-bold"
                      >
                        <span>Explore Architecture</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Ingestion Monitor */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="relative w-full h-64 md:h-72 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/30">
                    <img
                      className="w-full h-full object-cover"
                      src={featuredCase.imageUrl}
                      alt={featuredCase.imageAlt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/30 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded bg-surface-container-lowest/85 backdrop-blur-md border border-outline-variant/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
                        <span className="font-code-tech text-xs text-primary font-semibold">
                          Pipeline Status: Active Vector Stream
                        </span>
                      </div>
                      <span className="font-code-tech text-xs text-on-surface-variant">Avg: 240ms</span>
                    </div>
                  </div>

                  {/* Interactive Throughput Histogram */}
                  <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                        Real-Time Ingestion Throughput
                      </span>
                      {hoveredThroughputBar && (
                        <span className="font-code-tech text-xs text-primary-container animate-fadeIn">
                          {hoveredThroughputBar}
                        </span>
                      )}
                    </div>

                    <div className="w-full h-16 flex items-end gap-1.5 pt-2">
                      {throughputBars.map((bar, idx) => (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredThroughputBar(`${bar.label}: ${bar.docs}`)}
                          onMouseLeave={() => setHoveredThroughputBar(null)}
                          className={`flex-1 rounded-t transition-all duration-300 cursor-pointer ${
                            idx === throughputBars.length - 1
                              ? 'bg-primary-container shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                              : 'bg-surface-container-high hover:bg-primary-container/80'
                          }`}
                          style={{ height: bar.height }}
                          title={`${bar.label} - ${bar.docs}`}
                        ></div>
                      ))}
                    </div>

                    <div className="flex justify-between font-code-tech text-on-surface-variant text-[11px] pt-1">
                      <span>00:00 UTC</span>
                      <span className="text-primary font-medium">Peak: 1,420 docs/min</span>
                      <span className="text-primary-container font-semibold">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Other Case Studies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOtherCases.map((study) => (
              <div
                key={study.id}
                className="case-card flex flex-col justify-between bg-surface-container-low rounded-xl border border-outline-variant/30 p-6 shadow-lg hover:border-primary-container/40 hover:shadow-[0_8px_24px_-6px_rgba(0,240,255,0.2)] transition-all"
              >
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-44 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/20">
                    <img
                      className="w-full h-full object-cover"
                      src={study.imageUrl}
                      alt={study.imageAlt}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-surface-container-lowest/90 text-primary-container font-code-tech text-xs border border-outline-variant/30">
                      {study.badge}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-title text-lg text-primary font-bold">{study.title}</h3>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      {study.bottleneck}
                    </p>
                  </div>

                  <div className="bg-surface-container rounded-lg p-3 border border-outline-variant/20 flex flex-col gap-1">
                    <span className="font-label-sm text-xs text-primary-container font-semibold">Engineered Solution</span>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">{study.solution}</p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-1.5 text-center py-2 bg-surface-container-high/40 rounded-lg border border-outline-variant/20">
                    {study.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className={`font-title text-base font-bold ${m.color || 'text-primary'}`}>{m.value}</span>
                        <span className="font-code-tech text-on-surface-variant text-[10px] uppercase truncate">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-surface-container-high/60 mt-4">
                  <div className="flex flex-wrap gap-1">
                    {study.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-tech text-[11px] border border-outline-variant/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedStudy(study)}
                    className="w-full py-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-primary font-label-sm text-xs transition-colors text-center border border-outline-variant/20 cursor-pointer font-semibold"
                  >
                    View Study &amp; Architecture
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT VERIFICATION TESTIMONIAL */}
      <section className="w-full px-4 sm:px-8 xl:px-16 py-14 bg-surface-container-lowest border-y border-surface-container-high/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="inline-flex items-center gap-1.5 text-primary-container font-label-sm text-xs uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[18px]">format_quote</span>
              Client Verification
            </div>
            <h3 className="font-headline-sm text-2xl text-primary font-bold">
              Uncompromising engineering velocity under real load.
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              We partner with enterprise leaders who require verifiable architectures, not slide decks. Hear how our delivery changed core unit economics.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex flex-col">
                <span className="font-title text-xl text-on-surface font-bold">100%</span>
                <span className="font-body-sm text-xs text-on-surface-variant">On-Schedule Delivery</span>
              </div>
              <div className="w-px h-8 bg-surface-container-highest"></div>
              <div className="flex flex-col">
                <span className="font-title text-xl text-primary-container font-bold">Zero</span>
                <span className="font-body-sm text-xs text-on-surface-variant">Security Vulnerabilities</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-surface-container-low rounded-xl border border-outline-variant/30 p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute -left-16 -bottom-16 w-60 h-60 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="w-28 h-28 md:w-36 md:h-36 shrink-0 rounded-xl overflow-hidden bg-surface-container shadow-md border border-outline-variant/30">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                alt="Marcus Vance, CTO of Meridian FinTech Global"
              />
            </div>

            <div className="flex flex-col gap-2.5 relative z-10">
              <div className="flex items-center gap-1 text-primary-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-[20px] text-primary-container">
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-lg text-base md:text-lg text-on-surface italic leading-relaxed">
                &ldquo;NeoZ didn&apos;t deliver a wrapper or a hacky demo. They deployed a resilient multi-agent intelligence infrastructure that slashed our document turnaround from 3 days to under 4 minutes, passing all enterprise SOC2 compliance hurdles in cycle one.&rdquo;
              </p>
              <div className="flex flex-col pt-1">
                <span className="font-label-md text-sm text-primary font-bold">Marcus Vance</span>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  CTO, Meridian FinTech Global • Former Staff Infra Architect
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONVERSION BANNER */}
      <section className="w-full px-4 sm:px-8 xl:px-16 py-14">
        <div className="max-w-7xl mx-auto rounded-xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low border border-outline-variant/30 p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute right-0 top-0 w-96 h-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
          <div className="flex flex-col gap-2 max-w-2xl relative z-10">
            <span className="font-code-tech text-xs text-primary-container uppercase tracking-wider font-semibold">
              Ready For Deployment
            </span>
            <h2 className="font-headline-md text-2xl md:text-3xl text-primary font-bold tracking-tight">
              Ready to build your next breakthrough product?
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Reserve an engineering deep-dive with our principal AI architects to evaluate system feasibility, token economics, and migration blueprints.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto relative z-10">
            <button
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-sm transition-colors border border-outline-variant/30 cursor-pointer"
            >
              View Technical Whitepapers
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto text-center px-5 py-2.5 rounded-lg bg-primary-container hover:shadow-[0_0_28px_rgba(0,240,255,0.5)] text-on-primary-container font-label-md text-sm transition-all shadow-[0_0_18px_rgba(0,240,255,0.3)] font-bold cursor-pointer"
            >
              Schedule Briefing
            </button>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 bg-[#0a0e17]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="font-code-tech text-xs text-primary-container uppercase font-semibold">
                  {selectedStudy.badge}
                </span>
                <h3 className="font-headline-sm text-xl md:text-2xl text-primary font-bold mt-1">
                  {selectedStudy.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStudy(null)}
                className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
                aria-label="Close Case Study Details"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              {selectedStudy.fullDescription || selectedStudy.solution}
            </p>

            <div className="grid grid-cols-3 gap-3 py-3 border-y border-surface-container-high">
              {selectedStudy.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col text-center">
                  <span className={`font-headline-sm text-xl font-bold ${m.color || 'text-primary'}`}>{m.value}</span>
                  <span className="font-code-tech text-xs text-on-surface-variant">{m.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedStudy.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded bg-surface-container border border-outline-variant/20 font-code-tech text-xs text-on-surface-variant">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedStudy(null);
                  onNavigate('ai-cost-estimator');
                }}
                className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-semibold cursor-pointer"
              >
                Estimate Similar Project
              </button>
              <button
                onClick={() => {
                  setSelectedStudy(null);
                  onNavigate('contact');
                }}
                className="px-5 py-2 rounded-lg bg-primary-container text-on-primary-container text-sm font-bold shadow-[0_0_18px_rgba(0,240,255,0.4)] cursor-pointer"
              >
                Discuss with Architect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
