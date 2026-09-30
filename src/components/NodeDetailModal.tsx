import React, { useState, useEffect } from 'react';
import { MazeNode } from '../data/mazeData';
import { soundFX } from '../utils/soundEffects';
import { 
  X, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Lightbulb, 
  Briefcase, 
  HelpCircle,
  TrendingUp,
  Sparkles,
  Compass
} from 'lucide-react';

interface NodeDetailModalProps {
  node: MazeNode | null;
  onClose: () => void;
  onNavigateNode: (direction: 'next' | 'prev') => void;
  currentIndex: number;
  totalNodes: number;
  onOpenQuiz?: () => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  onClose,
  onNavigateNode,
  currentIndex,
  totalNodes,
  onOpenQuiz,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'points' | 'case' | 'actions'>('overview');

  // Handle ESC key and arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFX.playSoftTick();
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigateNode('next');
      } else if (e.key === 'ArrowLeft') {
        onNavigateNode('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigateNode]);

  // Clean up any ongoing TTS speech when modal closes or node changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [node]);

  if (!node) return null;

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Fitur suara tidak didukung di browser ini.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(node.speechScript || node.fullDescription);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Check if an Indonesian voice is available
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePrev = () => {
    soundFX.playSoftTick();
    onNavigateNode('prev');
  };

  const handleNext = () => {
    soundFX.playSoftTick();
    onNavigateNode('next');
  };

  const handleClose = () => {
    soundFX.playSoftTick();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-b from-[#0a1532] via-[#071126] to-[#040916] border border-cyan-800/60 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header Accent Bar */}
        <div 
          className="h-1.5 w-full transition-all duration-300"
          style={{ backgroundColor: node.color.primary }}
        />

        {/* Modal Top Bar */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-cyan-900/30">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${node.color.bgBadge} border border-current/20`}>
              Tahap {node.stepNumber} / {String(totalNodes).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {node.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Read-Aloud Button */}
            <button
              onClick={handleToggleSpeech}
              title={isPlayingAudio ? 'Hentikan narasi suara' : 'Dengarkan narasi suara (Bahasa Indonesia)'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isPlayingAudio 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 animate-pulse' 
                  : 'bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Jeda Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dengarkan</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Tutup keterangan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Header */}
        <div className="px-6 pt-4 pb-2">
          <h2 id="modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {node.title}
          </h2>
          <p className="text-sm text-cyan-300/90 mt-1 font-medium">
            {node.subtitle}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-2 pb-1 border-b border-cyan-900/30 flex gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { soundFX.playSoftTick(); setActiveTab('overview'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            Ringkasan & Filosofi
          </button>
          <button
            onClick={() => { soundFX.playSoftTick(); setActiveTab('points'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'points'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            Poin Strategis ({node.keyPoints.length})
          </button>
          <button
            onClick={() => { soundFX.playSoftTick(); setActiveTab('case'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'case'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            Contoh Nyata Industri
          </button>
          <button
            onClick={() => { soundFX.playSoftTick(); setActiveTab('actions'); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'actions'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            Tips & Tindakan ({node.actionableTips.length})
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="px-6 py-4 overflow-y-auto flex-1 space-y-4 text-sm leading-relaxed text-slate-300 max-h-[50vh]">
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-200 text-sm">
                <span className="font-semibold text-white">Intisari Labirin: </span>
                {node.summary}
              </div>
              <p className="text-slate-300 whitespace-pre-line text-sm sm:text-base">
                {node.fullDescription}
              </p>
              
              {/* Reflection Callout */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3 mt-3">
                <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Pertanyaan Refleksi Diri
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 italic">
                    "{node.reflectionQuestion}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'points' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              {node.keyPoints.map((point, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-950/60 hover:border-cyan-800/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      {point.title}
                    </h4>
                    {point.metric && (
                      <span className="text-[11px] font-mono text-cyan-400 px-2 py-0.5 bg-cyan-950/40 rounded border border-cyan-800/30">
                        {point.metric}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 pl-7">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'case' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-900/40">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-2">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <h4>{node.realWorldExample.title}</h4>
                </div>
                <div className="text-slate-300 space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-slate-100">Kondisi Riil: </span>
                    {node.realWorldExample.caseStudy}
                  </div>
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="font-semibold text-emerald-300">Pelajaran & Solusi: </span>
                    {node.realWorldExample.impact}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-2.5 animate-in fade-in duration-150">
              <p className="text-xs text-slate-400 mb-2">
                Rekomendasi langkah konkret yang bisa langsung diterapkan:
              </p>
              {node.actionableTips.map((tip, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Actions / Navigation */}
        <div className="px-6 py-3 border-t border-cyan-900/30 bg-[#030816] flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {/* Quick Quiz Shortcut or Stage Indicators */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalNodes }).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'w-5 bg-cyan-400' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === totalNodes - 1}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentIndex === totalNodes - 1
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-900/30'
            }`}
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
