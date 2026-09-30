import React, { useState } from 'react';
import { DIAGRAM_SECTIONS, DiagramItem, getAllDiagramItems } from './data/diagramData';
import { MAZE_3D_NODES } from './data/maze3dNodes';
import { Interactive3DMazeMap } from './components/Interactive3DMazeMap';
import { FullInfographicDiagram } from './components/FullInfographicDiagram';
import { DiagramDetailModal } from './components/DiagramDetailModal';
import { IntroDetailModal } from './components/IntroDetailModal';
import { SelfAssessmentQuiz } from './components/SelfAssessmentQuiz';
import { soundFX } from './utils/soundEffects';
import { 
  Sparkles, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Search, 
  Box, 
  LayoutGrid,
  Info
} from 'lucide-react';

export default function App() {
  // Default to 'maze3d' as requested by the user
  const [activeView, setActiveView] = useState<'maze3d' | 'diagram'>('maze3d');

  // Detail Modal states
  const [selectedDiagramItem, setSelectedDiagramItem] = useState<DiagramItem | null>(null);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());
  const [searchQuery, setSearchQuery] = useState('');

  const allItems = getAllDiagramItems();
  const currentItemIndex = selectedDiagramItem 
    ? allItems.findIndex((it) => it.id === selectedDiagramItem.id) 
    : -1;

  const handleNextDiagramItem = () => {
    if (currentItemIndex >= 0 && currentItemIndex < allItems.length - 1) {
      setSelectedDiagramItem(allItems[currentItemIndex + 1]);
    }
  };

  const handlePrevDiagramItem = () => {
    if (currentItemIndex > 0) {
      setSelectedDiagramItem(allItems[currentItemIndex - 1]);
    }
  };

  const handleToggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  // Search filter across all 30+ items
  const filteredItems = searchQuery.trim()
    ? allItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.detailedExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bulletPoints?.some(bp => bp.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen bg-[#040816] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-[#030713]/95 border-b border-cyan-900/40 backdrop-blur-md px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-cyan-950">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                  Labirin 3D Interaktif
                </span>
                <span className="text-xs text-slate-400">28 Titik Interaktif (Alur Runtut Nyambung)</span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
                Dunia Kerja dalam Genggaman Teknologi
              </h1>
            </div>
          </div>

          {/* Switcher & Utility Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Switcher Tabs */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-700/80 rounded-xl text-xs">
              <button
                onClick={() => {
                  soundFX.playSoftTick();
                  setActiveView('maze3d');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeView === 'maze3d'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Labirin 3D Isometrik</span>
              </button>
              <button
                onClick={() => {
                  soundFX.playSoftTick();
                  setActiveView('diagram');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeView === 'diagram'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Diagram Alur (Bagan Datar)</span>
              </button>
            </div>

            {/* Career Readiness Quiz */}
            <button
              onClick={() => {
                soundFX.playSoftTick();
                setIsQuizOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-semibold transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kuis Refleksi Diri</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleMute}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
              title={isMuted ? 'Nyalakan Efek Suara' : 'Bisukan Suara'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-2 sm:px-6 py-4 flex-1 flex flex-col items-center">
        
        {/* Quick Search Bar */}
        <div className="w-full max-w-md mb-3 relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari materi (AI, cloud, data, hybrid, tantangan, konseling)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-30 max-h-64 overflow-y-auto p-1.5 space-y-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDiagramItem(item);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 flex items-center justify-between text-xs text-slate-200 transition-colors"
                  >
                    <span className="font-semibold text-white">{item.title}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">{item.category}</span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-slate-500">
                  Tidak ditemukan materi untuk "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* PRIMARY VIEW: 3D ISOMETRIC LABYRINTH MAP WITH ALL ICONS */}
        {activeView === 'maze3d' && (
          <Interactive3DMazeMap
            onSelectItem={(item) => setSelectedDiagramItem(item)}
            onSelectIntro={() => setIsIntroModalOpen(true)}
          />
        )}

        {/* SECONDARY VIEW: 2D FLAT INFOGRAPHIC DIAGRAM */}
        {activeView === 'diagram' && (
          <FullInfographicDiagram
            onSelectItem={(item) => setSelectedDiagramItem(item)}
            onSelectIntro={() => setIsIntroModalOpen(true)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#030611] border-t border-slate-800/80 py-3.5 px-4 text-center text-xs text-slate-500">
        <p>Peta Labirin Solusi 3D Interaktif: "Dunia Kerja dalam Genggaman Teknologi - Adaptasi hari ini, peluang esok nanti"</p>
      </footer>

      {/* POPUP: DIAGRAM ITEM DETAIL MODAL ("Pas di klik muncul keterangannya") */}
      {selectedDiagramItem && (
        <DiagramDetailModal
          item={selectedDiagramItem}
          onClose={() => setSelectedDiagramItem(null)}
          onNext={handleNextDiagramItem}
          onPrev={handlePrevDiagramItem}
          hasNext={currentItemIndex < allItems.length - 1}
          hasPrev={currentItemIndex > 0}
        />
      )}

      {/* POPUP: SECTION 1 PENDAHULUAN DETAIL MODAL */}
      <IntroDetailModal
        isOpen={isIntroModalOpen}
        onClose={() => setIsIntroModalOpen(false)}
      />

      {/* POPUP: CAREER QUIZ */}
      <SelfAssessmentQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectNode={() => {
          setIsQuizOpen(false);
        }}
      />
    </div>
  );
}
