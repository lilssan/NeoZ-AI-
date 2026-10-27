import React, { useState } from 'react';
import { PageId } from '../types';
import { isValidEmail } from '../utils/validation';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !isValidEmail(newsletterEmail)) {
      setNewsletterError('Please enter a valid work email');
      return;
    }
    setNewsletterError('');
    setSubscribed(true);
    // Persist newsletter subscriber locally
    try {
      const subs = JSON.parse(localStorage.getItem('neoz_subscribers') || '[]');
      subs.push({ email: newsletterEmail, date: new Date().toISOString() });
      localStorage.setItem('neoz_subscribers', JSON.stringify(subs));
    } catch {
      // safe fallback
    }
  };

  return (
    <footer className="w-full bg-[#0a0e17] border-t border-surface-container-high/60">
      <div className="w-full px-4 sm:px-8 xl:px-16 py-12 md:py-16 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-headline-sm text-2xl text-primary font-extrabold tracking-tight">
                NeoZ AI
              </span>
              <span className="font-code-tech text-xs text-secondary px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant/30">
                v4.8 Enterprise
              </span>
            </div>
            <p className="font-body-sm text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Engineering high-impact generative and cognitive system architectures for enterprise leaders, technical founders, and next-generation platforms.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_6px_#00f0ff]"></span>
              <span className="font-label-sm text-xs text-on-surface-variant">
                Operational Cluster: All Nodes Online (99.99%)
              </span>
            </div>
          </div>

          {/* Platform & Solutions */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-md text-sm text-on-surface font-semibold">Platform &amp; Solutions</span>
            <button
              onClick={() => onNavigate('services')}
              className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors text-left cursor-pointer"
            >
              Autonomous Agents
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors text-left cursor-pointer"
            >
              LLM Fine-Tuning
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors text-left cursor-pointer"
            >
              Vector Architecture
            </button>
            <button
              onClick={() => onNavigate('ai-cost-estimator')}
              className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors text-left cursor-pointer"
            >
              AI Compute Estimator
            </button>
          </div>

          {/* Company & Trust */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-md text-sm text-on-surface font-semibold">Company &amp; Trust</span>
            <button
              onClick={() => onNavigate('contact')}
              className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors text-left cursor-pointer"
            >
              Engineering Team
            </button>
            <button
              onClick={() => onNavigate('case-studies')}
              className="font-body-sm text-xs text-on-surface-variant hover:text-primary transition-colors text-left cursor-pointer"
            >
              Case Studies &amp; ROI
            </button>
            <span className="font-body-sm text-xs text-on-surface-variant">ISO 27001 Certified</span>
            <span className="font-body-sm text-xs text-on-surface-variant">SOC 2 Type II Verified</span>
          </div>

          {/* Stay Synchronized Newsletter Form with Validation */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-md text-sm text-on-surface font-semibold">Stay Synchronized</span>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Weekly enterprise briefings on production AI models and inference efficiency.
            </p>
            {subscribed ? (
              <div className="p-2.5 rounded bg-surface-container border border-primary-container/40 text-primary-container text-xs flex items-center gap-1.5 animate-fadeIn">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>Subscribed to enterprise briefings!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-1.5">
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError('');
                    }}
                    placeholder="work@enterprise.com"
                    className={`w-full px-3 py-1.5 rounded bg-surface-container border text-on-surface placeholder:text-outline text-xs focus:outline-none focus:ring-1 focus:ring-primary-container ${
                      newsletterError ? 'border-error' : 'border-outline-variant/30'
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-xs transition-colors border border-outline-variant/30 cursor-pointer font-semibold shrink-0"
                  >
                    Join
                  </button>
                </div>
                {newsletterError && (
                  <span className="text-error text-[11px]">{newsletterError}</span>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-6 border-t border-surface-container-high/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant text-xs">
          <div className="flex items-center gap-4">
            <span className="font-body-sm">© 2025 NeoZ AI Architectural Systems Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('overview')}
              className="font-label-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('overview')}
              className="font-label-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              Security Protocol
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="font-label-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              Status Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
