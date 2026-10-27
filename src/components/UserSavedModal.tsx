import React, { useState } from 'react';
import { EstimatorProposalSubmission, BookedStrategySession } from '../types';

interface UserSavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposals: EstimatorProposalSubmission[];
  bookings: BookedStrategySession[];
  onClearAll: () => void;
}

export const UserSavedModal: React.FC<UserSavedModalProps> = ({
  isOpen,
  onClose,
  proposals,
  bookings,
  onClearAll
}) => {
  const [activeTab, setActiveTab] = useState<'proposals' | 'bookings'>('proposals');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e17]/85 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-5 max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary-container text-[24px]">dataset</span>
            <div>
              <h3 className="font-headline-sm text-lg text-primary font-bold">
                Your Local Session Activity
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Captured proposals, estimate matrices, and booked strategy sessions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            aria-label="Close Activity Modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('proposals')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'proposals'
                ? 'bg-primary-container text-on-primary-container font-bold shadow'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Locked Estimates ({proposals.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-primary-container text-on-primary-container font-bold shadow'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Booked Calls ({bookings.length})
          </button>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
          {activeTab === 'proposals' && (
            <>
              {proposals.length === 0 ? (
                <div className="p-8 text-center flex flex-col items-center justify-center gap-2 bg-surface-container rounded-xl border border-outline-variant/20">
                  <span className="material-symbols-outlined text-outline text-[32px]">calculate</span>
                  <p className="font-body-sm text-sm text-on-surface-variant">No locked estimates yet.</p>
                  <p className="font-body-sm text-xs text-outline">
                    Configure your stack in the AI Cost Estimator and submit the proposal form to save a quote here.
                  </p>
                </div>
              ) : (
                proposals.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-label-sm text-xs text-primary-fixed uppercase font-bold">
                          {prop.company}
                        </span>
                        <h4 className="font-title text-base text-primary font-bold">
                          {prop.calculationResult.scopeLabel}
                        </h4>
                      </div>
                      <span className="font-headline-sm text-base text-primary-container font-extrabold">
                        {prop.calculationResult.formattedMinCost} – {prop.calculationResult.formattedMaxCost}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-code-tech text-on-surface-variant bg-surface-container-low p-2.5 rounded">
                      <div>
                        <span className="text-outline block">Data:</span> {prop.calculationResult.dataLabel}
                      </div>
                      <div>
                        <span className="text-outline block">Deploy:</span> {prop.calculationResult.deployLabel}
                      </div>
                      <div>
                        <span className="text-outline block">Timeline:</span> {prop.calculationResult.timelineLabel}
                      </div>
                      <div>
                        <span className="text-outline block">Pace:</span> {prop.calculationResult.velocityLabel}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-outline pt-1">
                      <span>Recipient: {prop.email}</span>
                      <span>{prop.submittedAt}</span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'bookings' && (
            <>
              {bookings.length === 0 ? (
                <div className="p-8 text-center flex flex-col items-center justify-center gap-2 bg-surface-container rounded-xl border border-outline-variant/20">
                  <span className="material-symbols-outlined text-outline text-[32px]">calendar_month</span>
                  <p className="font-body-sm text-sm text-on-surface-variant">No strategy sessions booked yet.</p>
                  <p className="font-body-sm text-xs text-outline">
                    Schedule a 30-minute discovery call with Alex Vance in the Contact tab.
                  </p>
                </div>
              ) : (
                bookings.map((call) => (
                  <div
                    key={call.id}
                    className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-label-sm text-xs text-secondary uppercase font-bold">
                          {call.companyOrg}
                        </span>
                        <h4 className="font-title text-base text-primary font-bold">{call.fullName}</h4>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/20 text-primary-container text-xs font-code-tech font-bold">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span>{call.selectedTime} {call.selectedTimezone}</span>
                      </div>
                    </div>

                    <p className="font-body-sm text-xs text-on-surface-variant">
                      <strong>Date:</strong> {call.selectedDate} &bull; <strong>Scope:</strong> {call.projectType} &bull; <strong>Budget:</strong> {call.budgetTier}
                    </p>

                    <div className="p-2 rounded bg-surface-container-low text-xs text-on-surface-variant italic">
                      &ldquo;{call.projectDetails}&rdquo;
                    </div>

                    <div className="flex items-center justify-between text-xs text-outline pt-1">
                      <span className="flex items-center gap-1 text-primary-container">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        Delaware Mutual NDA Signed
                      </span>
                      <span>Booked {call.bookedAt}</span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-container-high">
          {(proposals.length > 0 || bookings.length > 0) ? (
            <button
              onClick={onClearAll}
              className="text-xs text-error hover:underline cursor-pointer"
            >
              Clear Session Activity
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
