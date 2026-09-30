import React from 'react';
import { Volume2, VolumeX, Presentation, Sparkles, HelpCircle, Layers, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface HeaderBannerProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isTourActive: boolean;
  onToggleTour: () => void;
  onOpenQuiz: () => void;
  activePathFilter: 'all' | 'winding' | 'shortcut';
  onSelectPathFilter: (filter: 'all' | 'winding' | 'shortcut') => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  isMuted,
  onToggleMute,
  isTourActive,
  onToggleTour,
  onOpenQuiz,
  activePathFilter,
  onSelectPathFilter,
}) => {
  return (
    <header className="w-full space-y-4">
      {/* Top Slide Meta Concept Bar (Matching Reference Slide Top Text) */}
      <div className="bg-[#04091a] border-b border-cyan-900/30 px-4 py-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-cyan-400">3.</span>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Konsep Labirin Solusi <span className="text-cyan-400 font-normal">(Interactive Maze Map)</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Desain ini menampilkan <span className="text-cyan-300 font-medium">labirin digital yang elegan</span> sebagai metafora kompleksitas dunia kerja. Alur presentasi bergerak dari kiri ke kanan, di mana <span className="text-amber-300 font-medium">"Tantangan"</span> dan <span className="text-indigo-300 font-medium">"Perubahan"</span> adalah jalan berliku, tetapi <span className="text-cyan-300 font-medium">"Peluang"</span> dan <span className="text-emerald-300 font-medium">"Konseling"</span> menjadi jalur pintas yang terang menuju kesuksesan.
            </p>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-medium transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tes Posisi Karier</span>
            </button>

            <button
              onClick={onToggleTour}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isTourActive
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>{isTourActive ? 'Hentikan Tur' : 'Tur Presentasi'}</span>
            </button>

            <button
              onClick={onToggleMute}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
              title={isMuted ? 'Nyalakan Efek Suara' : 'Bisukan Suara'}
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Title & Filter Zone */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
        <div>
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-0.5">
            Welcome to the Future:
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Dunia Kerja dalam Genggaman Teknologi
          </h2>
          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-[11px] font-semibold text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Interactive Maze Map
          </div>
        </div>

        {/* Path Filter Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-cyan-900/40 text-xs">
          <button
            onClick={() => {
              soundFX.playSoftTick();
              onSelectPathFilter('all');
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activePathFilter === 'all'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semua Rute
          </button>
          <button
            onClick={() => {
              soundFX.playSoftTick();
              onSelectPathFilter('winding');
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activePathFilter === 'winding'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Jalur Berliku (Tantangan)
          </button>
          <button
            onClick={() => {
              soundFX.playShortcutSound();
              onSelectPathFilter('shortcut');
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activePathFilter === 'shortcut'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Jalur Pintas (Peluang & DUDI)
          </button>
        </div>
      </div>
    </header>
  );
};
