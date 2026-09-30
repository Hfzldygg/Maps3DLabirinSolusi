import React from 'react';
import { MazeNode } from '../data/mazeData';
import { soundFX } from '../utils/soundEffects';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface MilestoneTimelineProps {
  nodes: MazeNode[];
  selectedNode: MazeNode | null;
  onSelectNode: (node: MazeNode) => void;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  nodes,
  selectedNode,
  onSelectNode,
}) => {
  const handleClick = (node: MazeNode) => {
    if (node.id === 'konseling-dudi') {
      soundFX.playSuccessChime();
    } else if (node.pathType === 'shortcut') {
      soundFX.playShortcutSound();
    } else {
      soundFX.playNodeClick();
    }
    onSelectNode(node);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>Tahapan Alur Presentasi (Kiri ke Kanan)</span>
        </h3>
        <span className="text-xs text-cyan-400">Klik kartu untuk membuka materi & audio</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {nodes.map((node, index) => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => handleClick(node)}
              className={`relative text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between group overflow-hidden ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-400 shadow-lg shadow-cyan-950 ring-1 ring-cyan-400/50 -translate-y-1'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-cyan-800/60 hover:bg-slate-900/50'
              }`}
            >
              {/* Top Accent line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 transition-opacity"
                style={{ backgroundColor: node.color.primary }}
              />

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 pt-1">
                  <span className="font-mono text-cyan-400 font-bold">
                    {node.stepNumber}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                    {node.category}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {node.shortTitle}
                </h4>

                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {node.summary}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                <span>Buka Detail</span>
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Group Members Footer (Matching Reference Slide Footer) */}
      <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="text-[11px]">
          Konsep Labirin Solusi: Visualisasi Alur Tantangan, Perubahan, Peluang & Konseling DUDI
        </div>
        <div className="text-[11px] text-slate-400">
          Group Members: <span className="text-slate-300 font-medium">Bolia Shman, John, Javuni Tw... & Tim Penyusun</span>
        </div>
      </div>
    </div>
  );
};
