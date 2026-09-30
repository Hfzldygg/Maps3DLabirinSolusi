import React, { useState, useEffect } from 'react';
import { DiagramItem } from '../data/diagramData';
import { DiagramIcon } from './DiagramIcon';
import { soundFX } from '../utils/soundEffects';
import { X, Volume2, VolumeX, ChevronLeft, ChevronRight, CheckCircle2, Briefcase, Lightbulb } from 'lucide-react';

interface DiagramDetailModalProps {
  item: DiagramItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const DiagramDetailModal: React.FC<DiagramDetailModalProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFX.playSoftTick();
        onClose();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [item]);

  if (!item) return null;

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${item.title}. Kategori ${item.category}. ${item.detailedExplanation}. Contoh nyata: ${item.practicalExample}. Rekomendasi langkah: ${item.actionableStep}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;

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

  const getThemeHeaderStyles = () => {
    switch (item.colorTheme) {
      case 'yellow':
        return 'from-amber-500/20 border-amber-500/50 text-amber-300';
      case 'green':
        return 'from-emerald-500/20 border-emerald-500/50 text-emerald-300';
      case 'red':
        return 'from-rose-500/20 border-rose-500/50 text-rose-300';
      case 'purple':
        return 'from-purple-500/20 border-purple-500/50 text-purple-300';
      case 'teal':
        return 'from-cyan-500/20 border-cyan-500/50 text-cyan-300';
      case 'pink':
        return 'from-pink-500/20 border-pink-500/50 text-pink-300';
      default:
        return 'from-blue-500/20 border-blue-500/50 text-blue-300';
    }
  };

  const getIconBg = () => {
    switch (item.colorTheme) {
      case 'yellow': return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'green': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'red': return 'bg-rose-100 text-rose-700 border-rose-300';
      case 'purple': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'teal': return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'pink': return 'bg-pink-100 text-pink-700 border-pink-300';
      default: return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
      onClick={() => {
        soundFX.playSoftTick();
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className={`px-5 py-4 border-b bg-gradient-to-r ${getThemeHeaderStyles()} flex items-start justify-between gap-3`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm ${getIconBg()} shrink-0`}>
              <DiagramIcon name={item.iconType} size={22} className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider block opacity-90">
                {item.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleToggleSpeech}
              title={isPlayingAudio ? "Jeda Narasi" : "Dengarkan Audio Penjelasan"}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                isPlayingAudio
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 animate-pulse font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white border-slate-700'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                soundFX.playSoftTick();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 text-sm leading-relaxed text-slate-300">
          {/* Bullet points if present (like in Bentuk Perubahan) */}
          {item.bulletPoints && item.bulletPoints.length > 0 && (
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-400 block mb-2">
                Komponen Utama:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.bulletPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed explanation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Penjelasan Lengkap:
            </h4>
            <p className="text-slate-200 text-sm leading-relaxed">
              {item.detailedExplanation}
            </p>
          </div>

          {/* Practical Example */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Contoh Nyata di Dunia Kerja</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {item.practicalExample}
            </p>
          </div>

          {/* Actionable Step */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Rekomendasi Tindakan</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200">
              {item.actionableStep}
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => {
              soundFX.playSoftTick();
              onPrev && onPrev();
            }}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              hasPrev
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'opacity-40 cursor-not-allowed text-slate-600'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <span className="text-[11px] text-slate-500">
            Gunakan tombol panah ◄ ► untuk berpindah
          </span>

          <button
            onClick={() => {
              soundFX.playSoftTick();
              onNext && onNext();
            }}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              hasNext
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md'
                : 'opacity-40 cursor-not-allowed text-slate-600'
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
