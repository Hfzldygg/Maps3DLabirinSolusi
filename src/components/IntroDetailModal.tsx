import React, { useState, useEffect } from 'react';
import { DIAGRAM_SECTIONS } from '../data/diagramData';
import { soundFX } from '../utils/soundEffects';
import { X, Volume2, VolumeX, BookOpen, Compass, CheckCircle2 } from 'lucide-react';

interface IntroDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntroDetailModal: React.FC<IntroDetailModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const section = DIAGRAM_SECTIONS.pendahuluan;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFX.playSoftTick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${section.title}. ${section.introText}. Kunci keberhasilan di era digital bukanlah menolak teknologi, melainkan meningkatkan kemampuan adaptabilitas secara konsisten.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'id-ID';

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
      onClick={() => {
        soundFX.playSoftTick();
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-purple-500/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-900/40 via-purple-800/30 to-slate-900 border-b border-purple-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                1. Pendahuluan
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">
                Transformasi Digital Dunia Kerja
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSpeech}
              title={isPlayingAudio ? "Jeda Narasi" : "Dengarkan Audio"}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                isPlayingAudio
                  ? 'bg-purple-500 text-white border-purple-400 animate-pulse font-bold'
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
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm leading-relaxed text-slate-300">
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-200">
            <p className="font-medium text-sm leading-relaxed">
              "{section.introText}"
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Poin Refleksi Utama:
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong>Bukan Sekadar Alat Bantu:</strong> Teknologi telah menyatu secara organik ke dalam denyut nadi pekerjaan sehari-hari.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong>Koin Bermata Dua:</strong> Membuka peluang akselerasi tak terbatas sekaligus membawa ancaman disrupsi bagi yang enggan berubah.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span><strong>Kompas Adaptasi:</strong> Kunci utama terletak pada kemauan mengasah keterampilan baru (upskilling) dan menjaga kesehatan mental.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={() => {
              soundFX.playSoftTick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            Tutup Keterangan
          </button>
        </div>
      </div>
    </div>
  );
};
