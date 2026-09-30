import React, { useState } from 'react';
import { CAREER_QUIZ_QUESTIONS, MAZE_NODES, MazeNode } from '../data/mazeData';
import { soundFX } from '../utils/soundEffects';
import { X, CheckCircle2, RotateCcw, ArrowRight, Award } from 'lucide-react';

interface SelfAssessmentQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (node: MazeNode) => void;
}

export const SelfAssessmentQuiz: React.FC<SelfAssessmentQuizProps> = ({
  isOpen,
  onClose,
  onSelectNode,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = CAREER_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (targetNodeId: string) => {
    soundFX.playSoftTick();
    const newAnswers = [...answers, targetNodeId];
    setAnswers(newAnswers);

    if (currentQuestionIndex < CAREER_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      soundFX.playSuccessChime();
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    soundFX.playSoftTick();
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Calculate dominant result
  const getQuizResult = () => {
    const counts: Record<string, number> = {};
    answers.forEach((id) => {
      counts[id] = (counts[id] || 0) + 1;
    });

    let topNodeId = 'pendahuluan';
    let maxCount = 0;
    Object.entries(counts).forEach(([id, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topNodeId = id;
      }
    });

    const resultNode = MAZE_NODES.find((n) => n.id === topNodeId) || MAZE_NODES[0];
    return resultNode;
  };

  const resultNode = getQuizResult();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-gradient-to-b from-[#0a1535] to-[#040817] border border-cyan-700/60 rounded-2xl shadow-2xl p-6 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-900/40">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              Refleksi Interaktif
            </span>
            <h3 className="text-lg font-bold text-white">
              Di Mana Posisi Anda di Labirin Karier?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCompleted ? (
          <div className="py-4 space-y-4">
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Pertanyaan {currentQuestionIndex + 1} dari {CAREER_QUIZ_QUESTIONS.length}</span>
              <div className="flex gap-1">
                {CAREER_QUIZ_QUESTIONS.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentQuestionIndex
                        ? 'w-6 bg-cyan-400'
                        : idx < currentQuestionIndex
                        ? 'w-3 bg-cyan-700'
                        : 'w-3 bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <p className="text-sm sm:text-base font-medium text-slate-200">
              {currentQ.question}
            </p>

            {/* Option Choices */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.targetNodeId)}
                  className="w-full text-left p-3.5 rounded-xl bg-slate-900/70 border border-cyan-950/80 hover:border-cyan-500/60 hover:bg-cyan-950/20 text-xs sm:text-sm text-slate-200 transition-all flex items-start gap-2.5 group"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-slate-400 flex items-center justify-center text-xs font-semibold shrink-0 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-400">
              <Award className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium">Hasil Analisis Jalur Anda</span>
              <h4 className="text-xl font-bold text-white mt-1">
                {resultNode.title}
              </h4>
              <p className="text-xs sm:text-sm text-cyan-300 mt-1 max-w-sm mx-auto">
                {resultNode.summary}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-left text-xs text-slate-300">
              <span className="font-semibold text-white block mb-1">Rekomendasi Langkah:</span>
              {resultNode.actionableTips[0]}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 py-2 px-3 rounded-lg border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectNode(resultNode);
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950"
              >
                <span>Lihat Titik di Peta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
