import React, { useState } from 'react';
import { PageId } from '../types';
import { SERVICES_DATA } from '../data/servicesData';

interface ServicesViewProps {
  onNavigate: (page: PageId) => void;
  onSelectServiceForEstimate?: (serviceKey: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onNavigate, onSelectServiceForEstimate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai-core' | 'engineering' | 'creative'>('all');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    'ai-consulting': true // Pre-open first for immediate clarity
  });

  const toggleDeliverables = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredServices = SERVICES_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const filterTabs = [
    { key: 'all', label: 'All Capabilities' },
    { key: 'ai-core', label: 'Core AI & ML' },
    { key: 'engineering', label: 'Software Architecture' },
    { key: 'creative', label: 'Creative & Growth' }
  ] as const;

  const handleDeepDive = (serviceId: string) => {
    if (onSelectServiceForEstimate) {
      if (serviceId === 'custom-software' || serviceId === 'interface-architecture') {
        onSelectServiceForEstimate('fullstack_app');
      } else if (serviceId === 'growth-systems' || serviceId === 'generative-media') {
        onSelectServiceForEstimate('agent_workflows');
      } else {
        onSelectServiceForEstimate('custom_ai');
      }
    }
    onNavigate('ai-cost-estimator');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden px-4 sm:px-8 xl:px-16 py-12 md:py-16">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[340px] bg-gradient-to-r from-primary-container/10 via-secondary-container/20 to-primary-container/5 rounded-full blur-[110px] pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Header Content */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high/80 border border-outline-variant/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
                <span className="font-label-sm text-label-sm text-primary-container tracking-wider uppercase font-semibold">
                  Production-Grade Enterprise Systems
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-on-surface-variant font-code-tech text-xs">
                <span className="material-symbols-outlined text-[16px] text-primary-container">terminal</span>
                <span>SYSTEM_SPEC // V4.8.2 ARCHITECTURE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 flex flex-col gap-2">
                <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
                  Capabilities &amp; Solutions
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-primary to-secondary">
                    Engineered for Commercial Impact.
                  </span>
                </h1>
              </div>
              <div className="lg:col-span-4 flex flex-col justify-end">
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  NeoZ bridges frontier artificial intelligence research with fault-tolerant distributed infrastructure. We move past theoretical proofs-of-concept into resilient, sovereign production engines.
                </p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveFilter(tab.key)}
                    className={`px-5 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)]'
                        : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright border border-outline-variant/20'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const isExpanded = !!expandedCards[service.id];
              return (
                <div
                  key={service.id}
                  className="service-card group relative flex flex-col justify-between p-6 rounded-xl bg-surface-container-low/85 border border-outline-variant/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary-container/40 hover:shadow-[0_16px_40px_-12px_rgba(0,240,255,0.22)]"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary-container shadow-inner">
                        <span className="material-symbols-outlined text-[28px]">{service.icon}</span>
                      </div>
                      <span className="px-3 py-0.5 rounded-full font-label-sm text-xs bg-surface-container-high border border-outline-variant/30 text-primary-fixed">
                        {service.categoryLabel}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-headline-sm text-xl text-primary font-bold group-hover:text-primary-container transition-colors">
                        {service.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-code-tech text-xs px-2.5 py-0.5 rounded bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Core Deliverables Toggle */}
                    <div className="pt-2 border-t border-surface-container-high/60 flex flex-col gap-1.5">
                      <button
                        onClick={() => toggleDeliverables(service.id)}
                        className="flex items-center justify-between w-full py-1 text-left font-label-sm text-label-sm text-primary-container hover:text-primary transition-colors cursor-pointer"
                        aria-expanded={isExpanded}
                      >
                        <span className="font-semibold">Core Deliverables ({service.deliverables.length})</span>
                        <span
                          className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : 'rotate-0'
                          }`}
                        >
                          expand_more
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="flex flex-col gap-2 pl-1 pt-1.5 animate-fadeIn">
                          {service.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 font-body-sm text-xs text-on-surface-variant">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-container shrink-0 mt-1"></span>
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-surface-container-high/60 flex items-center justify-between">
                    <span className="font-label-sm text-xs text-on-surface-variant">Timeline: {service.timeline}</span>
                    <button
                      onClick={() => handleDeepDive(service.id)}
                      className="inline-flex items-center gap-1 font-label-md text-xs text-primary-container hover:gap-2 transition-all cursor-pointer font-bold"
                    >
                      <span>Estimate Cost</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operational Velocity Delivery Framework Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 md:p-8 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container/10 rounded-full blur-[90px] pointer-events-none"></div>

            <div className="lg:col-span-8 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-semibold">
                  Operational Velocity Guarantee
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
                Our Delivery Framework
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                From raw requirements to audited production code with full observability instrumentation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container-lowest/70 border border-outline-variant/20">
                  <span className="font-code-tech text-xs text-primary-container font-semibold">PHASE 01</span>
                  <span className="font-title text-base text-on-surface font-bold">2-Week Discovery Sprint</span>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    Technical audit, data pipeline clearance, and baseline KPI calibration.
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container-lowest/70 border border-outline-variant/20">
                  <span className="font-code-tech text-xs text-secondary font-semibold">PHASE 02</span>
                  <span className="font-title text-base text-on-surface font-bold">Architecture Blueprint</span>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    Latency budget, private vector graph setup, and model benchmarking.
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container-lowest/70 border border-outline-variant/20">
                  <span className="font-code-tech text-xs text-primary-fixed-dim font-semibold">PHASE 03</span>
                  <span className="font-title text-base text-on-surface font-bold">Production Deployment</span>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    CI/CD pipelines, SLA compliance, telemetry monitors, and handover.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <div className="p-5 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 w-full flex flex-col gap-3 shadow-lg">
                <div className="flex items-center gap-2 text-primary-container">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wide font-bold">Enterprise Retainer</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface">
                  Need a customized capability mix? Speak with our Principal Architect.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-[0_0_24px_rgba(0,240,255,0.35)] hover:shadow-[0_0_32px_rgba(0,240,255,0.6)] transition-all text-center cursor-pointer"
                >
                  Request Technical Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
