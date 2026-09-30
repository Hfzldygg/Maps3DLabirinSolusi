import React, { useEffect, useState } from 'react';
import { MazeNode } from '../data/mazeData';
import { Play, Pause, SkipForward, SkipBack, X, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface PresentationTourProps {
  isActive: boolean;
  onClose: () => void;
  nodes: MazeNode[];
  currentNode: MazeNode;
  onSelectNode: (node: MazeNode) => void;
}

export const PresentationTour: React.FC<PresentationTourProps> = ({
  isActive,
  onClose,
  nodes,
  currentNode,
  onSelectNode,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [countdown, setCountdown] = useState(8);

  const currentIndex = nodes.findIndex((n) => n.id === currentNode.id);

  // Auto-advance timer when playing
  useEffect(() => {
    if (!isActive || !isPlaying) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Go to next node
          const nextIdx = (currentIndex + 1) % nodes.length;
          onSelectNode(nodes[nextIdx]);
          soundFX.playSoftTick();
          return 8;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isPlaying, currentIndex, nodes, onSelectNode]);

  // Reset countdown when current node changes
  useEffect(() => {
    setCountdown(8);
  }, [currentNode]);

  if (!isActive) return null;

  const handlePrev = () => {
    soundFX.playSoftTick();
    const prevIdx = currentIndex === 0 ? nodes.length - 1 : currentIndex - 1;
    onSelectNode(nodes[prevIdx]);
  };

  const handleNext = () => {
    soundFX.playSoftTick();
    const nextIdx = (currentIndex + 1) % nodes.length;
    onSelectNode(nodes[nextIdx]);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-xl bg-slate-950/90 border border-cyan-500/60 rounded-2xl shadow-2xl backdrop-blur-lg px-4 py-3 text-slate-100 flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs shrink-0">
          {currentNode.stepNumber}
        </div>
        <div className="truncate">
          <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
            Mode Presentasi Otomatis
          </div>
          <div className="text-sm font-semibold text-white truncate">
            {currentNode.title}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handlePrev}
          title="Tahap Sebelumnya"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? 'Jeda Tur' : 'Lanjutkan Tur'}
          className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shadow-md"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button
          onClick={handleNext}
          title="Tahap Berikutnya"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        <div className="text-[11px] text-slate-400 font-mono pl-1 border-l border-slate-700">
          {isPlaying ? `${countdown}s` : 'Jeda'}
        </div>

        <button
          onClick={onClose}
          title="Keluar dari mode presentasi"
          className="p-1.5 ml-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
