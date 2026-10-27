import React, { useState } from 'react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  savedCount: number;
  onOpenSavedModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  savedCount,
  onOpenSavedModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'ai-cost-estimator', label: 'AI Cost Estimator' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0a0e17]/85 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-20 w-full px-4 sm:px-8 xl:px-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Live Badge */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            aria-label="NeoZ AI Homepage"
          >
            {/* Cybernetic Geometric Logo Glyph */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-secondary-container via-surface-container-high to-primary-container p-[1px] shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_22px_rgba(0,240,255,0.6)] transition-all">
              <div className="w-full h-full rounded-[7px] bg-surface-container-lowest flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-container" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16l-10 16h10" />
                </svg>
              </div>
            </div>
            <span className="font-title text-title text-primary tracking-tight font-extrabold group-hover:text-primary-container transition-colors">
              NeoZ AI
            </span>
          </button>

          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/90 border border-outline-variant/30">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse shadow-[0_0_6px_#00f0ff]"></span>
            <span className="font-label-sm text-label-sm text-primary-fixed">
              ⚡ Accepting New Q2/Q3 Projects
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-semibold transition-all relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-primary-container font-bold drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-container to-secondary rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Book Strategy Call Button */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md shadow-[0_0_24px_rgba(0,240,255,0.35)] hover:shadow-[0_0_34px_rgba(0,240,255,0.6)] hover:-translate-y-0.5 transition-all cursor-pointer font-bold"
          >
            <span>Book AI Strategy Call</span>
          </button>

          {/* User Saved Bookings & Proposals Button */}
          <button
            onClick={onOpenSavedModal}
            className="relative w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-on-surface hover:text-primary transition-all cursor-pointer"
            aria-label="View Saved Quotes and Booked Strategy Calls"
            title="View Saved Proposals & Bookings"
          >
            <span className="material-symbols-outlined text-[19px]">account_circle</span>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-container text-on-primary-container text-[10px] font-bold flex items-center justify-center animate-pulse">
                {savedCount}
              </span>
            )}
          </button>

          {/* Animated Hamburger Button for Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-surface-container-high flex flex-col items-center justify-center gap-1.5 p-2 focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`w-5 h-0.5 bg-primary-container transition-all duration-300 origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-primary-container transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-primary-container transition-all duration-300 origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-surface-container-lowest/98 border-b border-surface-container-high ${
          mobileMenuOpen ? 'max-h-[420px] opacity-100 py-4 px-6' : 'max-h-0 opacity-0 py-0 px-6'
        }`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between p-2.5 rounded-lg text-left text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-surface-container-high text-primary-container font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="material-symbols-outlined text-[16px] text-primary-container">
                    check
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 mt-2 border-t border-surface-container-high flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 rounded-lg bg-primary-container text-on-primary-container font-bold text-center shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>Book AI Strategy Call</span>
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-on-surface-variant font-code-tech">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
              <span>Accepting New Q2/Q3 Projects</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
