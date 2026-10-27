import React, { useState } from 'react';
import { BookedStrategySession } from '../types';
import { validateStrategyBookingForm, StrategyBookingErrors } from '../utils/validation';

interface ContactViewProps {
  onBookingSubmitted: (session: BookedStrategySession) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onBookingSubmitted }) => {
  // Calendar selection state
  const [selectedTz, setSelectedTz] = useState('EST');
  const [selectedDay, setSelectedDay] = useState<{ dayName: string; dateNum: number; fullDate: string }>({
    dayName: 'TUE',
    dateNum: 20,
    fullDate: 'Tuesday, May 20'
  });
  const [selectedTime, setSelectedTime] = useState('01:30 PM');

  // Form input state
  const [fullName, setFullName] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [companyOrg, setCompanyOrg] = useState('');
  const [projectType, setProjectType] = useState('');
  const [budgetTier, setBudgetTier] = useState('$50k – $100k');
  const [projectDetails, setProjectDetails] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(true);

  // Form interaction state
  const [formErrors, setFormErrors] = useState<StrategyBookingErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookedStrategySession | null>(null);

  const daysList = [
    { dayName: 'MON', dateNum: 19, fullDate: 'Monday, May 19' },
    { dayName: 'TUE', dateNum: 20, fullDate: 'Tuesday, May 20' },
    { dayName: 'WED', dateNum: 21, fullDate: 'Wednesday, May 21' },
    { dayName: 'THU', dateNum: 22, fullDate: 'Thursday, May 22' },
    { dayName: 'FRI', dateNum: 23, fullDate: 'Friday, May 23' }
  ];

  const timeSlots = ['10:00 AM', '01:30 PM', '03:00 PM', '04:30 PM'];

  const budgetTiers = ['$25k – $50k', '$50k – $100k', '$100k+ (Enterprise)'];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateStrategyBookingForm({
      fullName,
      corporateEmail,
      companyOrg,
      projectType,
      budgetTier,
      projectDetails,
      ndaAccepted,
      selectedDate: selectedDay.fullDate,
      selectedTime,
      selectedTimezone: selectedTz
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking: BookedStrategySession = {
        id: `call-${Date.now()}`,
        bookedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        fullName,
        corporateEmail,
        companyOrg: companyOrg || 'Stealth / Private',
        projectType,
        budgetTier,
        projectDetails,
        selectedDate: selectedDay.fullDate,
        selectedTime,
        selectedTimezone: selectedTz,
        ndaAccepted
      };

      setIsSubmitting(false);
      setConfirmedBooking(newBooking);
      onBookingSubmitted(newBooking);
    }, 850);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden">
        {/* Subtle decorative ambient backdrop */}
        <div className="pointer-events-none absolute -top-40 right-1/4 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[140px] -z-10"></div>
        <div className="pointer-events-none absolute top-1/2 left-[-150px] w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[160px] -z-10"></div>

        {/* Top Headline & Executive Sub-bar */}
        <section className="w-full px-4 sm:px-8 xl:px-16 pt-12 pb-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/30">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
                <span className="font-label-sm text-xs text-primary-fixed tracking-wider uppercase font-semibold">
                  Live Availability · Q2/Q3 Slots
                </span>
              </div>
              <span className="text-outline-variant font-code-tech text-xs hidden sm:inline">|</span>
              <span className="font-code-tech text-xs text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary-container text-base">verified_user</span>
                Direct Principal Partner Access · Zero Gatekeepers
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="flex flex-col max-w-3xl">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight font-extrabold leading-none">
                  Let’s Engineer <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed via-primary-container to-secondary">
                    What’s Next
                  </span>
                </h1>
                <p className="font-body-lg text-base sm:text-lg text-on-surface-variant mt-3 max-w-2xl leading-relaxed">
                  Book a 30-minute direct technical consultation with our engineering partners. We audit architectures, size model infrastructure, and deliver actionable execution blueprints.
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-xl">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-xl text-primary font-bold">14+ Days</span>
                  <span className="font-label-sm text-xs text-on-surface-variant">Avg Prototype Speed</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-xl text-primary font-bold">99.4%</span>
                  <span className="font-label-sm text-xs text-on-surface-variant">SLA Deployment Rate</span>
                </div>
                <div className="flex flex-col col-span-2 sm:col-span-1">
                  <span className="font-headline-sm text-xl text-primary-fixed font-bold">&lt; 2 hrs</span>
                  <span className="font-label-sm text-xs text-on-surface-variant">Direct Architect SLA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Consultation & Strategy Intake Core Grid */}
        <section className="w-full px-4 sm:px-8 xl:px-16 pb-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Host Card, Calendar Selector & Office Coordinates */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Host Card: Alex Vance */}
              <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-xl flex flex-col gap-4 transition-all hover:bg-surface-container">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img
                        className="w-16 h-16 rounded-xl object-cover shadow-md border border-outline-variant/30"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                        alt="Alex Vance, Principal AI Architect"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-surface-container-low flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-title text-lg text-on-surface font-bold">Alex Vance</span>
                        <span className="material-symbols-outlined text-primary-container text-base" title="Verified Principal Lead">
                          verified
                        </span>
                      </div>
                      <span className="font-label-md text-xs text-on-surface-variant">
                        Principal AI Architect &amp; Managing Partner
                      </span>
                      <span className="font-code-tech text-xs text-secondary mt-0.5">
                        Ex-DeepMind · Stanford AI Systems Lab
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="font-code-tech text-xs text-primary-fixed bg-surface-container-highest px-2.5 py-1 rounded border border-outline-variant/30 font-semibold">
                      30 MIN SESSION
                    </span>
                    <span className="font-label-sm text-[11px] text-outline mt-1">Free Technical Discovery</span>
                  </div>
                </div>

                {/* Structured 30-Min Agenda Breakdown */}
                <div className="bg-surface-container-lowest p-3.5 rounded-lg border border-outline-variant/20 flex flex-col gap-2">
                  <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    Session Agenda Protocol
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="flex flex-col gap-0.5 bg-surface-container-low p-2.5 rounded border border-outline-variant/20">
                      <div className="flex items-center gap-1.5">
                        <span className="font-code-tech text-xs text-primary-container font-semibold">01</span>
                        <span className="font-label-sm text-xs text-on-surface font-medium">Arch Audit</span>
                      </div>
                      <span className="font-code-tech text-[11px] text-outline">10 Mins · Bottlenecks</span>
                    </div>
                    <div className="flex flex-col gap-0.5 bg-surface-container-low p-2.5 rounded border border-outline-variant/20">
                      <div className="flex items-center gap-1.5">
                        <span className="font-code-tech text-xs text-secondary font-semibold">02</span>
                        <span className="font-label-sm text-xs text-on-surface font-medium">ROI &amp; Feasibility</span>
                      </div>
                      <span className="font-code-tech text-[11px] text-outline">10 Mins · Latency/Cost</span>
                    </div>
                    <div className="flex flex-col gap-0.5 bg-surface-container-low p-2.5 rounded border border-outline-variant/20">
                      <div className="flex items-center gap-1.5">
                        <span className="font-code-tech text-xs text-tertiary-fixed font-semibold">03</span>
                        <span className="font-label-sm text-xs text-on-surface font-medium">Action Roadmap</span>
                      </div>
                      <span className="font-code-tech text-[11px] text-outline">10 Mins · Next Steps</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Calendar & Timezone Slot Selector */}
              <div className="p-6 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-xl flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">calendar_today</span>
                    <span className="font-title text-base text-on-surface font-bold">Select Date &amp; Time</span>
                  </div>

                  {/* Timezone Selector */}
                  <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/30">
                    <span className="material-symbols-outlined text-outline text-sm">schedule</span>
                    <select
                      value={selectedTz}
                      onChange={(e) => setSelectedTz(e.target.value)}
                      className="bg-transparent font-code-tech text-xs text-on-surface focus:outline-none cursor-pointer"
                    >
                      <option className="bg-[#1c1f29] text-on-surface" value="PST">PST (UTC-8) San Francisco</option>
                      <option className="bg-[#1c1f29] text-on-surface" value="EST">EST (UTC-5) New York</option>
                      <option className="bg-[#1c1f29] text-on-surface" value="UTC">UTC (GMT+0) London</option>
                      <option className="bg-[#1c1f29] text-on-surface" value="CET">CET (UTC+1) Zurich</option>
                    </select>
                  </div>
                </div>

                {/* Mini Month Display */}
                <div className="flex items-center justify-between bg-surface-container-lowest px-4 py-2.5 rounded-lg border border-outline-variant/20">
                  <span className="font-label-md text-sm text-on-surface font-semibold">May 2025</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="w-7 h-7 rounded bg-surface-container hover:bg-surface-bright flex items-center justify-center text-on-surface text-xs cursor-pointer"
                      aria-label="Previous week"
                    >
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      className="w-7 h-7 rounded bg-surface-container hover:bg-surface-bright flex items-center justify-center text-on-surface text-xs cursor-pointer"
                      aria-label="Next week"
                    >
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>

                {/* Day Picker Row */}
                <div className="grid grid-cols-5 gap-2 text-center">
                  {daysList.map((day) => {
                    const isSelected = selectedDay.dateNum === day.dateNum;
                    return (
                      <button
                        key={day.dateNum}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-surface-container-highest border border-primary-container ring-1 ring-primary-container shadow-md'
                            : 'bg-surface-container hover:bg-surface-bright border border-outline-variant/20'
                        }`}
                      >
                        <span className={`font-code-tech text-xs ${isSelected ? 'text-primary-container font-semibold' : 'text-outline'}`}>
                          {day.dayName}
                        </span>
                        <span className={`font-title text-base font-bold ${isSelected ? 'text-primary-container' : 'text-on-surface'}`}>
                          {day.dateNum}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary-container shadow-[0_0_6px_#00f0ff]' : 'bg-outline-variant'}`}></span>
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                <div className="flex flex-col gap-2 pt-1">
                  <span className="font-label-sm text-xs text-on-surface-variant flex items-center justify-between">
                    <span>Available Slots for <strong className="text-on-surface">{selectedDay.fullDate}</strong>:</span>
                    <span className="text-primary-container font-code-tech text-xs">4 Slots Available</span>
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-1 rounded font-label-md text-xs transition-all text-center cursor-pointer ${
                            isSelected
                              ? 'bg-primary-container text-on-primary-container font-bold shadow-lg'
                              : 'bg-surface-container text-on-surface hover:bg-surface-bright border border-outline-variant/20'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selection Confirmation Bar */}
                <div className="p-3 rounded bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-on-surface text-xs">
                    <span className="material-symbols-outlined text-primary-container text-base">event_available</span>
                    <span className="font-code-tech">
                      Selected: <span className="text-primary-container font-bold">{selectedDay.fullDate} @ {selectedTime} {selectedTz}</span>
                    </span>
                  </div>
                  <span className="font-label-sm text-[11px] text-outline">Auto-sync with Google/Outlook</span>
                </div>
              </div>

              {/* Coordinates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-md flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-primary-container">
                      <span className="material-symbols-outlined text-base">location_on</span>
                      <span className="font-label-md text-sm font-semibold text-on-surface">San Francisco HQ</span>
                    </div>
                    <span className="font-code-tech text-xs text-outline">US-WEST</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    500 Howard Street, Suite 420<br />
                    San Francisco, CA 94105
                  </p>
                  <a
                    className="font-code-tech text-xs text-primary-fixed hover:text-primary transition-colors flex items-center gap-1 mt-2"
                    href="mailto:sf-partners@neoz.ai"
                  >
                    <span className="material-symbols-outlined text-xs">mail</span> sf-partners@neoz.ai
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-md flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <span className="material-symbols-outlined text-base">domain</span>
                      <span className="font-label-md text-sm font-semibold text-on-surface">Zurich Applied Lab</span>
                    </div>
                    <span className="font-code-tech text-xs text-outline">EU-CENTRAL</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Gotthardstrasse 26<br />
                    8002 Zürich, Switzerland
                  </p>
                  <a
                    className="font-code-tech text-xs text-secondary hover:text-secondary-fixed transition-colors flex items-center gap-1 mt-2"
                    href="mailto:ch-partners@neoz.ai"
                  >
                    <span className="material-symbols-outlined text-xs">mail</span> ch-partners@neoz.ai
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Technical Intake Form */}
            <div className="lg:col-span-6">
              <div className="p-6 md:p-8 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-2xl flex flex-col gap-6 relative">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-xs text-secondary uppercase tracking-widest font-semibold">
                      Technical Architecture Brief
                    </span>
                    <span className="font-code-tech text-xs text-primary-fixed bg-surface-container px-2 py-0.5 rounded border border-outline-variant/30 font-semibold">
                      High Priority Queue
                    </span>
                  </div>
                  <h2 className="font-headline-sm text-xl md:text-2xl text-on-surface font-bold">
                    Deploy Your Project Specifications
                  </h2>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Fill in your project requirements. Alex and the lead engineering team review incoming telemetry prior to every strategy call.
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-md text-xs text-on-surface" htmlFor="full-name">
                        Full Name <span className="text-primary-container">*</span>
                      </label>
                      <input
                        id="full-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (formErrors.fullName) setFormErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder="e.g. Elena Rostova"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container border text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all ${
                          formErrors.fullName ? 'border-error' : 'border-outline-variant/30'
                        }`}
                      />
                      {formErrors.fullName && (
                        <p className="font-body-sm text-xs text-error mt-0.5">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-md text-xs text-on-surface" htmlFor="work-email">
                        Corporate Email <span className="text-primary-container">*</span>
                      </label>
                      <input
                        id="work-email"
                        type="email"
                        value={corporateEmail}
                        onChange={(e) => {
                          setCorporateEmail(e.target.value);
                          if (formErrors.corporateEmail) setFormErrors((prev) => ({ ...prev, corporateEmail: undefined }));
                        }}
                        placeholder="elena@enterprise.ai"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container border text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all ${
                          formErrors.corporateEmail ? 'border-error' : 'border-outline-variant/30'
                        }`}
                      />
                      {formErrors.corporateEmail && (
                        <p className="font-body-sm text-xs text-error mt-0.5">{formErrors.corporateEmail}</p>
                      )}
                    </div>
                  </div>

                  {/* Company and Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-md text-xs text-on-surface" htmlFor="company-org">
                        Organization / Company
                      </label>
                      <input
                        id="company-org"
                        type="text"
                        value={companyOrg}
                        onChange={(e) => setCompanyOrg(e.target.value)}
                        placeholder="Synthetix Labs or Stealth"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-md text-xs text-on-surface" htmlFor="project-type">
                        Project Type Architecture <span className="text-primary-container">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="project-type"
                          value={projectType}
                          onChange={(e) => {
                            setProjectType(e.target.value);
                            if (formErrors.projectType) setFormErrors((prev) => ({ ...prev, projectType: undefined }));
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-container border text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary-container transition-all appearance-none cursor-pointer ${
                            formErrors.projectType ? 'border-error' : 'border-outline-variant/30'
                          }`}
                        >
                          <option className="bg-[#1c1f29] text-outline" value="">Select architecture scope...</option>
                          <option className="bg-[#1c1f29] text-on-surface" value="autonomous-agents">Multi-Agent Autonomous Orchestration</option>
                          <option className="bg-[#1c1f29] text-on-surface" value="rag-vector">Enterprise RAG &amp; Vector Pipeline</option>
                          <option className="bg-[#1c1f29] text-on-surface" value="fine-tuning">Domain-Specific LLM Fine-Tuning &amp; Quantization</option>
                          <option className="bg-[#1c1f29] text-on-surface" value="cost-latency">Model Inference Latency &amp; Cost Reduction</option>
                          <option className="bg-[#1c1f29] text-on-surface" value="full-stack">Full AI Native System Build (0 to 1)</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-sm">
                          expand_more
                        </span>
                      </div>
                      {formErrors.projectType && (
                        <p className="font-body-sm text-xs text-error mt-0.5">{formErrors.projectType}</p>
                      )}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-xs text-on-surface">Estimated Project Budget Tier</label>
                    <div className="grid grid-cols-3 gap-2">
                      {budgetTiers.map((tier) => {
                        const isSelected = budgetTier === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setBudgetTier(tier)}
                            className={`py-2 px-1 rounded-lg font-label-sm text-xs text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-surface-container-highest text-primary-container ring-1 ring-primary-container/60 font-bold shadow'
                                : 'bg-surface-container hover:bg-surface-bright text-on-surface border border-outline-variant/20'
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tech Specs */}
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-xs text-on-surface" htmlFor="project-details">
                      Technical Specifications &amp; Current Blockers <span className="text-primary-container">*</span>
                    </label>
                    <textarea
                      id="project-details"
                      rows={4}
                      value={projectDetails}
                      onChange={(e) => {
                        setProjectDetails(e.target.value);
                        if (formErrors.projectDetails) setFormErrors((prev) => ({ ...prev, projectDetails: undefined }));
                      }}
                      placeholder="Outline your models in production, inference latency constraints, target data corpora, or architectural objectives..."
                      className={`w-full px-3.5 py-2 rounded-lg bg-surface-container border text-on-surface placeholder:text-outline text-xs focus:outline-none focus:ring-2 focus:ring-primary-container transition-all ${
                        formErrors.projectDetails ? 'border-error' : 'border-outline-variant/30'
                      }`}
                    ></textarea>
                    {formErrors.projectDetails && (
                      <p className="font-body-sm text-xs text-error mt-0.5">{formErrors.projectDetails}</p>
                    )}
                  </div>

                  {/* Mutual NDA Checkbox */}
                  <div className="flex items-start gap-3 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/20">
                    <input
                      id="nda-checkbox"
                      type="checkbox"
                      checked={ndaAccepted}
                      onChange={(e) => {
                        setNdaAccepted(e.target.checked);
                        if (formErrors.ndaAccepted) setFormErrors((prev) => ({ ...prev, ndaAccepted: undefined }));
                      }}
                      className="mt-0.5 w-4 h-4 rounded bg-surface-container text-primary-container focus:ring-0 focus:outline-none cursor-pointer accent-[#00f0ff]"
                    />
                    <label htmlFor="nda-checkbox" className="font-body-sm text-xs text-on-surface-variant cursor-pointer select-none leading-relaxed">
                      <strong className="text-on-surface">100% Confidentiality Guarantee.</strong> Execute mutual instant NDA under Delaware jurisdiction upon submission. All data and architecture diagrams are purged according to SOC2 Type II standards.
                    </label>
                  </div>
                  {formErrors.ndaAccepted && (
                    <p className="font-body-sm text-xs text-error -mt-2">{formErrors.ndaAccepted}</p>
                  )}

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-sm font-bold shadow-[0_0_28px_rgba(0,240,255,0.35)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                        <span>Securing Strategy Slot...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">bolt</span>
                        <span>Confirm Strategy Call &amp; Send Brief</span>
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-outline font-code-tech text-[11px] pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    <span>Calendar invite + Direct video link generated in real time</span>
                  </div>

                  {/* Confirmation Banner */}
                  {confirmedBooking && (
                    <div className="p-4 rounded-lg bg-primary-container/15 border border-primary-container/40 flex items-start gap-3 animate-fadeIn">
                      <span className="material-symbols-outlined text-primary-container shrink-0 mt-0.5">task_alt</span>
                      <div className="flex flex-col gap-1">
                        <span className="font-label-md text-sm text-primary font-bold">
                          Strategy Session Confirmed with Alex Vance!
                        </span>
                        <span className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                          Scheduled for <strong>{confirmedBooking.selectedDate} @ {confirmedBooking.selectedTime} {confirmedBooking.selectedTimezone}</strong>. A calendar invite, meeting link, and mutual Delaware NDA have been routed to <strong>{confirmedBooking.corporateEmail}</strong>.
                        </span>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Trust & Compliance Verified */}
        <section className="w-full px-4 sm:px-8 xl:px-16 py-14 bg-surface-container-lowest border-y border-surface-container-high/40">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-xs text-primary-container uppercase tracking-widest font-semibold">
                  Institutional Grade Security
                </span>
                <h3 className="font-headline-sm text-2xl text-on-surface font-bold">
                  Enterprise Trust &amp; Compliance Verified
                </h3>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant max-w-md leading-relaxed">
                Our infrastructure, fine-tuning sandbox, and private VPC clusters adhere to the most demanding regulatory frameworks.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-sm flex flex-col gap-2 hover:bg-surface-container transition-all">
                <div className="w-10 h-10 rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <span className="font-title text-sm text-on-surface font-semibold">SOC 2 Type II</span>
                <span className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Continuous automated auditing &amp; zero-retention logging on model inference.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-sm flex flex-col gap-2 hover:bg-surface-container transition-all">
                <div className="w-10 h-10 rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">cloud_done</span>
                </div>
                <span className="font-title text-sm text-on-surface font-semibold">AWS Advanced Partner</span>
                <span className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Specialized Generative AI competency &amp; custom Trainium/Inferentia accelerators.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-sm flex flex-col gap-2 hover:bg-surface-container transition-all">
                <div className="w-10 h-10 rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center text-primary-fixed">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <span className="font-title text-sm text-on-surface font-semibold">OpenAI Enterprise</span>
                <span className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Early checkpoint access, dedicated throughput allotments, &amp; enterprise sandboxes.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-sm flex flex-col gap-2 hover:bg-surface-container transition-all">
                <div className="w-10 h-10 rounded-lg bg-surface-container border border-outline-variant/20 flex items-center justify-center text-tertiary-fixed">
                  <span className="material-symbols-outlined">shield</span>
                </div>
                <span className="font-title text-sm text-on-surface font-semibold">ISO 27001 Certified</span>
                <span className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Rigid technical safeguards across all generative vector clusters and model caches.
                </span>
              </div>
            </div>

            {/* Architecture SVG diagram */}
            <div className="mt-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col gap-2">
                <span className="font-label-sm text-xs text-primary-container uppercase tracking-wider font-semibold">
                  Production Architecture Snapshot
                </span>
                <h4 className="font-headline-sm text-xl text-on-surface font-bold">
                  Zero Latency Spillover &amp; VPC Isolation
                </h4>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Every client engagement begins with a dedicated, single-tenant isolated cluster. Your proprietary IP, vector weights, and contextual embeddings never intermingle with public pipelines.
                </p>
                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center gap-1.5 text-on-surface font-code-tech text-xs">
                    <span className="w-2 h-2 rounded-full bg-primary-container"></span> TLS 1.3 Active
                  </div>
                  <div className="flex items-center gap-1.5 text-on-surface font-code-tech text-xs">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span> Single-Tenant VPC
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 rounded-xl bg-surface-container-lowest border border-outline-variant/20 p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between font-code-tech text-xs text-outline">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-error-container inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-surface-bright inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container inline-block"></span>
                    <span className="text-on-surface-variant ml-2">arch-inference-mesh.svg</span>
                  </div>
                  <span className="text-primary-container font-semibold">STATUS: 100% OPERATIONAL</span>
                </div>

                <svg className="w-full h-36 text-on-surface" fill="none" viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="#1C1F29" height="50" rx="6" stroke="none" width="120" x="20" y="55"></rect>
                  <text fill="#DBFCFF" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle" x="80" y="80">Client Gateway</text>
                  <text fill="#849495" fontFamily="Inter" fontSize="9" textAnchor="middle" x="80" y="94">gRPC / 1.2ms</text>
                  <path d="M140 80 H220" stroke="#00F0FF" strokeDasharray="4 4" strokeWidth="2"></path>
                  <rect fill="#181B25" height="100" rx="8" stroke="none" width="150" x="220" y="30"></rect>
                  <text fill="#00F0FF" fontFamily="Plus Jakarta Sans" fontSize="12" fontWeight="700" textAnchor="middle" x="295" y="55">NeoZ Vector Mesh</text>
                  <text fill="#DFE2EF" fontFamily="Inter" fontSize="10" textAnchor="middle" x="295" y="75">HNSW Distributed Index</text>
                  <text fill="#849495" fontFamily="Inter" fontSize="9" textAnchor="middle" x="295" y="93">p99 Latency: 4.8ms</text>
                  <circle cx="295" cy="115" fill="#00F0FF" r="4"></circle>
                  <path d="M370 80 H450" stroke="#D0BCFF" strokeDasharray="4 4" strokeWidth="2"></path>
                  <rect fill="#1C1F29" height="50" rx="6" stroke="none" width="120" x="450" y="55"></rect>
                  <text fill="#D0BCFF" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle" x="510" y="80">Quantized LLM</text>
                  <text fill="#849495" fontFamily="Inter" fontSize="9" textAnchor="middle" x="510" y="94">vLLM Engine / FP8</text>
                  <path d="M570 80 H620" stroke="#7DF4FF" strokeWidth="2"></path>
                  <circle cx="630" cy="80" fill="#00F0FF" fillOpacity="0.2" r="10"></circle>
                  <circle cx="630" cy="80" fill="#00F0FF" r="5"></circle>
                </svg>

                <div className="flex items-center justify-between text-outline font-code-tech text-[11px] pt-1">
                  <span>Dynamic Routing: Active</span>
                  <span>Memory Footprint: -68%</span>
                  <span>Tokens / Sec: 142.6 t/s</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation FAQ */}
        <section className="w-full px-4 sm:px-8 xl:px-16 py-12">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col gap-1 text-center max-w-2xl mx-auto">
              <span className="font-label-sm text-xs text-secondary uppercase tracking-widest font-semibold">
                Consultation FAQ
              </span>
              <h3 className="font-headline-sm text-xl md:text-2xl text-on-surface font-bold">
                Frequently Asked Questions Before Booking
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                <span className="font-title text-sm text-primary-container font-semibold">
                  Is an NDA signed before the call?
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Yes. Checking the confidentiality protocol auto-signs a standard bidirectional mutual NDA governed by Delaware law, countersigned by our legal counsel.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                <span className="font-title text-sm text-secondary font-semibold">
                  Who joins the call?
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Alex Vance or one of our lead partners directly. We do not have sales representatives or non-technical intermediaries conducting discovery meetings.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                <span className="font-title text-sm text-tertiary-fixed font-semibold">
                  What is the minimum timeline to launch?
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Rapid Proof-of-Concepts deploy in 10 to 14 days. Production-grade enterprise agent ecosystems generally reach pilot deployment in 4 to 6 weeks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
