import { useState, useEffect } from 'react';
import { PageId, EstimatorProposalSubmission, BookedStrategySession } from './types';
import { ScopeOptionKey } from './utils/calculator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OverviewView } from './components/OverviewView';
import { ServicesView } from './components/ServicesView';
import { CaseStudiesView } from './components/CaseStudiesView';
import { EstimatorView } from './components/EstimatorView';
import { ContactView } from './components/ContactView';
import { ReelModal } from './components/ReelModal';
import { UserSavedModal } from './components/UserSavedModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('overview');
  const [reelModalOpen, setReelModalOpen] = useState(false);
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [preselectedScope, setPreselectedScope] = useState<ScopeOptionKey>('custom_ai');

  // Local storage persisted state for user activity
  const [proposals, setProposals] = useState<EstimatorProposalSubmission[]>(() => {
    try {
      const stored = localStorage.getItem('neoz_proposals');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [bookings, setBookings] = useState<BookedStrategySession[]>(() => {
    try {
      const stored = localStorage.getItem('neoz_bookings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync hash routing on mount and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['overview', 'services', 'case-studies', 'ai-cost-estimator', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProposalSubmitted = (newProposal: EstimatorProposalSubmission) => {
    const updated = [newProposal, ...proposals];
    setProposals(updated);
    try {
      localStorage.setItem('neoz_proposals', JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  const handleBookingSubmitted = (newBooking: BookedStrategySession) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('neoz_bookings', JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  const handleClearAllActivity = () => {
    setProposals([]);
    setBookings([]);
    try {
      localStorage.removeItem('neoz_proposals');
      localStorage.removeItem('neoz_bookings');
    } catch {
      // fallback
    }
  };

  const totalSavedCount = proposals.length + bookings.length;

  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ef] flex flex-col font-sans selection:bg-[#00f0ff] selection:text-[#006970]">
      {/* Top Fixed Header with animated mobile menu */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        savedCount={totalSavedCount}
        onOpenSavedModal={() => setSavedModalOpen(true)}
      />

      {/* Main Page Content Body */}
      <main className="w-full pt-20 flex-1 flex flex-col">
        {currentPage === 'overview' && (
          <OverviewView
            onNavigate={navigateTo}
            onOpenReel={() => setReelModalOpen(true)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesView
            onNavigate={navigateTo}
            onSelectServiceForEstimate={(scopeKey) => setPreselectedScope(scopeKey as ScopeOptionKey)}
          />
        )}

        {currentPage === 'case-studies' && (
          <CaseStudiesView onNavigate={navigateTo} />
        )}

        {currentPage === 'ai-cost-estimator' && (
          <EstimatorView
            initialScope={preselectedScope}
            onProposalSubmitted={handleProposalSubmitted}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView onBookingSubmitted={handleBookingSubmitted} />
        )}
      </main>

      {/* Global Enterprise Footer */}
      <Footer onNavigate={navigateTo} />

      {/* 2-Min Cybernetic Showcase Reel Modal */}
      <ReelModal
        isOpen={reelModalOpen}
        onClose={() => setReelModalOpen(false)}
      />

      {/* User Session Saved Quotes & Bookings Modal */}
      <UserSavedModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        proposals={proposals}
        bookings={bookings}
        onClearAll={handleClearAllActivity}
      />
    </div>
  );
}
