import React, { useState, useEffect } from 'react';

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15);
  const [activeChapter, setActiveChapter] = useState(1);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        const next = prev + 1;
        if (next < 33) setActiveChapter(1);
        else if (next < 66) setActiveChapter(2);
        else setActiveChapter(3);
        return next;
      });
    }, 400);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const chapters = [
    { num: 1, title: 'Multi-Agent Swarms & Routing' },
    { num: 2, title: 'HNSW Hybrid Vector Mesh' },
    { num: 3, title: 'Quantized vLLM & Zero-Spillover' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e17]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-surface-container-low border border-primary-container/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-surface-container-lowest border-b border-surface-container-high">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00f0ff]"></div>
            <span className="font-code-tech text-xs text-primary font-semibold">
              NEOZ_SHOWREEL_2025 // 4K STREAM NODE 01
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            aria-label="Close Showreel"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Cinematic Video Simulation Surface */}
        <div className="relative w-full aspect-video bg-[#05080e] overflow-hidden flex items-center justify-center">
          {/* Cybernetic grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

          {/* Dynamic Scene Rendering based on active chapter */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 max-w-xl">
            <span className="font-code-tech text-xs text-secondary bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/30 uppercase tracking-widest mb-3">
              CHAPTER 0{activeChapter} · {chapters[activeChapter - 1].title}
            </span>

            <h3 className="font-headline-sm text-2xl md:text-3xl text-primary font-extrabold tracking-tight mb-2">
              {activeChapter === 1 && 'Deploying Sub-50ms Multi-Agent Orchestration'}
              {activeChapter === 2 && '10M+ Document Dense/Sparse Ingestion Pipeline'}
              {activeChapter === 3 && 'Zero-Hallucination Deterministic Safeguards'}
            </h3>

            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant max-w-md">
              Streamed live from our accelerated inference cluster in Frankfurt &amp; us-east.
            </p>

            {/* Glowing Center Glyph */}
            <div className="my-6 relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-secondary-container via-surface-container-high to-primary-container p-[2px] shadow-[0_0_35px_rgba(0,240,255,0.4)]">
                <div className="w-full h-full rounded-[14px] bg-[#0a0e17] flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary-container animate-pulse">
                    {activeChapter === 1 ? 'psychology' : activeChapter === 2 ? 'hub' : 'security'}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Telemetry Ticker Overlay */}
            <div className="flex items-center gap-4 text-xs font-code-tech text-outline bg-surface-container-lowest/80 px-4 py-2 rounded-lg border border-outline-variant/30">
              <span className="text-primary-container">vLLM: 142.8 tok/s</span>
              <span>•</span>
              <span className="text-secondary">p99: 41ms</span>
              <span>•</span>
              <span className="text-primary-fixed">VRAM: 68% FP8</span>
            </div>
          </div>

          {/* Ambient Corner Diagnostics */}
          <div className="absolute top-4 left-4 font-code-tech text-[10px] text-outline flex flex-col gap-0.5 pointer-events-none">
            <span>RES: 3840x2160</span>
            <span>CODEC: AV1 RAW</span>
            <span>FPS: 60.0 LOCKED</span>
          </div>

          <div className="absolute top-4 right-4 font-code-tech text-[10px] text-primary-container flex items-center gap-1 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
            <span>REC // ARCH_2025</span>
          </div>
        </div>

        {/* Video Scrubber & Playback Controls */}
        <div className="p-4 bg-surface-container-lowest border-t border-surface-container-high flex flex-col gap-3">
          {/* Timeline Bar */}
          <div className="flex items-center gap-3">
            <span className="font-code-tech text-xs text-outline">
              {Math.floor((progress * 1.2) / 60)}:{(Math.floor(progress * 1.2) % 60).toString().padStart(2, '0')}
            </span>
            <div
              className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = Math.round((clickX / rect.width) * 100);
                setProgress(Math.max(0, Math.min(100, newProgress)));
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-primary-container via-primary to-secondary transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="font-code-tech text-xs text-outline">02:00</span>
          </div>

          {/* Chapter Buttons & Action Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <div className="hidden sm:flex items-center gap-1.5 ml-2">
                {chapters.map((ch) => (
                  <button
                    key={ch.num}
                    type="button"
                    onClick={() => {
                      setActiveChapter(ch.num);
                      setProgress((ch.num - 1) * 33 + 5);
                    }}
                    className={`px-3 py-1 rounded text-xs font-code-tech transition-all cursor-pointer ${
                      activeChapter === ch.num
                        ? 'bg-surface-container-high text-primary-container border border-primary-container/40'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    0{ch.num}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold cursor-pointer border border-outline-variant/30"
            >
              Done Watching
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
