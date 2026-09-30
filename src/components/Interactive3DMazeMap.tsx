import React, { useState, useEffect } from 'react';
import { MAZE_3D_NODES, Maze3DNode } from '../data/maze3dNodes';
import { DiagramItem } from '../data/diagramData';
import { DiagramIcon } from './DiagramIcon';
import { soundFX } from '../utils/soundEffects';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  Play, 
  Pause, 
  Compass, 
  GitBranch,
  Zap,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Users
} from 'lucide-react';

interface Interactive3DMazeMapProps {
  onSelectItem: (item: DiagramItem) => void;
  onSelectIntro: () => void;
}

export const Interactive3DMazeMap: React.FC<Interactive3DMazeMapProps> = ({
  onSelectItem,
  onSelectIntro,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeRoute, setActiveRoute] = useState<'all' | 'shortcut' | 'winding'>('all');
  const [hoveredNode, setHoveredNode] = useState<Maze3DNode | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [showTeamInfo, setShowTeamInfo] = useState(true);

  // Sequential order sorted strictly by stepSeq 1 to 28 (Kesiapan Pekerja removed!)
  const allOrderedNodes = [...MAZE_3D_NODES].sort((a, b) => a.stepSeq - b.stepSeq);
  
  // Shortcut route sequence: 1-9 (Pendorong & Perubahan) -> 10-15 (Peluang Skybridge) -> 22-28 (Konseling & Sukses)
  const shortcutRouteSeq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 22, 23, 24, 25, 26, 27, 28];

  // Winding route sequence: 1-9 (Pendorong & Perubahan) -> 16-21 (Tantangan Labirin) -> 22-28 (Konseling & Sukses)
  const windingRouteSeq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

  // Active tour list based on selected route
  const currentTourSeq = activeRoute === 'shortcut' 
    ? shortcutRouteSeq 
    : activeRoute === 'winding' 
    ? windingRouteSeq 
    : allOrderedNodes.map(n => n.stepSeq);

  // Simulation timer that moves sequentially step-by-step along the continuous path
  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      setSimStep((prev) => {
        const next = (prev + 1) % currentTourSeq.length;
        const currentSeqNum = currentTourSeq[next];
        const targetNode = MAZE_3D_NODES.find(n => n.stepSeq === currentSeqNum);
        if (targetNode) {
          setSelectedNodeId(targetNode.id);
          soundFX.playSoftTick();
        }
        return next;
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [isSimulating, activeRoute, currentTourSeq]);

  const handleNodeClick = (node: Maze3DNode) => {
    setSelectedNodeId(node.id);
    if (node.zone === 'konseling' || node.zone === 'hasil-akhir') {
      soundFX.playSuccessChime();
    } else if (node.zone === 'peluang') {
      soundFX.playShortcutSound();
    } else {
      soundFX.playNodeClick();
    }
    onSelectItem(node.itemData);
  };

  const handleToggleSimulation = (route: 'shortcut' | 'winding' | 'all') => {
    soundFX.playSoftTick();
    if (activeRoute === route && isSimulating) {
      setIsSimulating(false);
    } else {
      setActiveRoute(route);
      setIsSimulating(true);
      setSimStep(0);
      const firstSeq = (route === 'shortcut' ? shortcutRouteSeq : route === 'winding' ? windingRouteSeq : allOrderedNodes.map(n => n.stepSeq))[0];
      const firstNode = MAZE_3D_NODES.find(n => n.stepSeq === firstSeq);
      if (firstNode) setSelectedNodeId(firstNode.id);
    }
  };

  const isNodeActiveForRoute = (node: Maze3DNode) => {
    if (activeRoute === 'all') return true;
    if (activeRoute === 'shortcut') {
      return shortcutRouteSeq.includes(node.stepSeq);
    }
    if (activeRoute === 'winding') {
      return windingRouteSeq.includes(node.stepSeq);
    }
    return true;
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-slate-100">
      
      {/* 1. TOP CONTROL BAR */}
      <div className="w-full max-w-7xl px-2 sm:px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 mb-2 text-xs">
        
        {/* Route Selector Tabs with Clear Flow Identity */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/95 rounded-2xl border border-cyan-900/50 shadow-inner">
          <button
            onClick={() => {
              soundFX.playSoftTick();
              setActiveRoute('all');
              setIsSimulating(false);
            }}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
              activeRoute === 'all'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Semua Alur Runtut (01 ➔ 28)</span>
          </button>

          <button
            onClick={() => {
              soundFX.playShortcutSound();
              setActiveRoute('shortcut');
              setIsSimulating(false);
            }}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
              activeRoute === 'shortcut'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-300" />
            <span>Jalur Pintas: Jembatan Layang Peluang (Hijau)</span>
          </button>

          <button
            onClick={() => {
              soundFX.playSoftTick();
              setActiveRoute('winding');
              setIsSimulating(false);
            }}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
              activeRoute === 'winding'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Jalur Berliku: Tantangan Labirin (Kuning/Merah)</span>
          </button>
        </div>

        {/* Action Controls: Live Sequential Simulation + Zoom */}
        <div className="flex items-center gap-2">
          {/* Simulation Toggle */}
          <button
            onClick={() => handleToggleSimulation(activeRoute)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isSimulating
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/30 animate-pulse'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Jeda Perjalanan' : 'Simulasi Alur Nyambung (01 ➔ 28)'}</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-800 text-slate-300">
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.1, 0.75))}
              className="p-1 hover:text-white transition-colors"
              title="Perkecil"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.1, 1.35))}
              className="p-1 hover:text-white transition-colors"
              title="Perbesar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 hover:text-white border-l border-slate-700 pl-1.5 ml-0.5"
              title="Reset"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* 2. DEDICATED HEADER & LEGEND BAR (Diletakkan di atas kanvas, TIDAK MENGHALANGI / MENIMBUN MAPS) */}
      <div className="w-full max-w-7xl px-3 sm:px-4 py-2.5 mb-2 rounded-2xl bg-slate-900/90 border border-cyan-800/40 backdrop-blur-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-lg">
        
        {/* Left: Alur Runtut Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-white text-[11px] uppercase tracking-wider mr-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Alur 01 ➔ 28:</span>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-700/50 px-2.5 py-1 rounded-lg text-[10.5px] text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Peluang Pintas (10-15)
          </span>
          <span className="inline-flex items-center gap-1.5 bg-amber-950/70 border border-amber-700/50 px-2.5 py-1 rounded-lg text-[10.5px] text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Tantangan Labirin (16-21)
          </span>
          <span className="inline-flex items-center gap-1.5 bg-cyan-950/70 border border-cyan-700/50 px-2.5 py-1 rounded-lg text-[10.5px] text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Konseling & Sukses (22-28)
          </span>
        </div>

        {/* Right: Welcome to the Future & Kelompok 7 (Rapi di atas kanvas, maps bebas tertimbun) */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 block">
                Welcome to the Future:
              </span>
              <span className="font-extrabold text-white text-xs tracking-tight">
                Dunia Kerja dalam Genggaman Teknologi
              </span>
            </div>
            <span className="text-[10px] font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 text-white px-2 py-0.5 rounded shadow-xs">
              Kelompok 7
            </span>
          </div>

          <button
            onClick={() => setShowTeamInfo(!showTeamInfo)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[10px] font-semibold transition-colors"
            title="Sembunyikan / Tampilkan detail anggota"
          >
            <Users className="w-3 h-3 text-cyan-400" />
            <span>{showTeamInfo ? 'Tutup Anggota' : 'Lihat Anggota (3)'}</span>
          </button>
        </div>
      </div>

      {/* Expanded Team Members Horizontal Strip (Diletakkan di luar kanvas) */}
      {showTeamInfo && (
        <div className="w-full max-w-7xl px-4 py-2 mb-2 rounded-xl bg-slate-950/80 border border-cyan-900/40 text-xs flex flex-wrap items-center justify-between gap-2 animate-in fade-in">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Anggota Kelompok 7:</span>
          </span>
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="font-medium text-slate-200">1. Sherly Sri Wulandari</span>
              <span className="font-mono text-cyan-300 text-[10px] bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800/60 font-bold">23110038</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="font-medium text-slate-200">2. Christine Bella Oktavia</span>
              <span className="font-mono text-cyan-300 text-[10px] bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800/60 font-bold">23110041</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="font-medium text-slate-200">3. Desty Nur Rahmawati</span>
              <span className="font-mono text-cyan-300 text-[10px] bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800/60 font-bold">23110092</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. THE CONTINUOUS ISOMETRIC LABYRINTH MAP CANVAS (100% BEBAS DARI TIMBUNAN KARTU) */}
      <div className="w-full max-w-7xl overflow-x-auto p-2 sm:p-5 rounded-3xl bg-gradient-to-b from-[#050c1f] via-[#040816] to-[#02040c] border-2 border-cyan-800/40 shadow-2xl relative">
        
        {/* Hover Info Tooltip */}
        {hoveredNode && (
          <div 
            className="absolute z-30 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-4"
            style={{ 
              left: `${(hoveredNode.x / 1400) * 100}%`, 
              top: `${(hoveredNode.y / 820) * 100}%` 
            }}
          >
            <div className="bg-slate-950/95 border-2 border-cyan-400 rounded-xl px-3.5 py-2 shadow-2xl shadow-cyan-950 text-center whitespace-nowrap min-w-[150px] animate-in zoom-in-95">
              <span className="text-[10px] uppercase font-bold text-cyan-400 block tracking-wider">
                Langkah #{String(hoveredNode.stepSeq).padStart(2, '0')} · {hoveredNode.category}
              </span>
              <span className="text-xs font-extrabold text-white block mt-0.5">
                {hoveredNode.title}
              </span>
              <span className="text-[9.5px] text-slate-300 italic block mt-0.5">
                Klik untuk rincian & audio narasi
              </span>
            </div>
          </div>
        )}

        <div 
          className="min-w-[1200px] transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
        >
          <svg
            viewBox="0 0 1400 820"
            className="w-full h-auto filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="pedestalBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d2147" />
                <stop offset="50%" stopColor="#081430" />
                <stop offset="100%" stopColor="#030816" />
              </linearGradient>

              <linearGradient id="pedestalSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06132b" />
                <stop offset="100%" stopColor="#01040a" />
              </linearGradient>

              <linearGradient id="skybridgeSurface" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.95" />
                <stop offset="85%" stopColor="#34d399" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="wallTopSurface" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0e234c" />
              </linearGradient>

              <linearGradient id="goldCarpet" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fef08a" stopOpacity="1" />
              </linearGradient>

              {/* Glowing Filters */}
              <filter id="neonGlowStrong" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <filter id="intenseLightFlare" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="b1" />
                <feGaussianBlur stdDeviation="3" result="b2" />
                <feMerge>
                  <feMergeNode in="b1" />
                  <feMergeNode in="b2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Grid pattern */}
              <pattern id="isoFloorGrid" width="40" height="23" patternUnits="userSpaceOnUse">
                <path d="M 0 11.5 L 20 0 L 40 11.5 L 20 23 Z" fill="none" stroke="#1d4ed8" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>

            {/* 1. BASE ISOMETRIC SLAB */}
            <g id="base-slab">
              {/* Left 3D depth */}
              <polygon
                points="90,460 700,770 700,805 90,495"
                fill="url(#pedestalSideGrad)"
                stroke="#091b38"
                strokeWidth="1.5"
              />
              {/* Right 3D depth */}
              <polygon
                points="700,770 1310,460 1310,495 700,805"
                fill="url(#pedestalSideGrad)"
                stroke="#0d244c"
                strokeWidth="1.5"
              />
              {/* Top Isometric Diamond Surface */}
              <polygon
                points="700,120 1310,460 700,770 90,460"
                fill="url(#pedestalBaseGrad)"
                stroke="#0284c7"
                strokeWidth="2"
                strokeOpacity="0.6"
              />
              {/* Isometric gridlines on ground */}
              <polygon
                points="700,120 1310,460 700,770 90,460"
                fill="url(#isoFloorGrid)"
                opacity="0.8"
              />
              {/* Neon border perimeter glow */}
              <polyline
                points="90,460 700,770 1310,460"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                filter="url(#neonGlowStrong)"
                opacity="0.85"
              />
            </g>

            {/* 2. THE CONTINUOUS CONNECTED HIGHWAYS (RUNUT & NYAMBUNG DARI 01 HINGGA 28) */}
            {/* ========================================================================= */}
            <g id="connected-continuous-highway">

              {/* SECTION A: ENTRANCE CONCOURSE ➔ 01, 02, 03, 04 ➔ 05 (NYAMBUNG FISIK) */}
              <g id="concourse-track-01-to-05">
                {/* Thick roadbed */}
                <path
                  d="M 100 480 L 160 190 L 245 165 L 330 175 L 415 205 L 200 340"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                />
                {/* Glowing neon center pulse line */}
                <path
                  d="M 100 480 L 160 190 L 245 165 L 330 175 L 415 205 L 200 340"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeDasharray="8,8"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </g>

              {/* SECTION B: BENTUK PERUBAHAN AVENUE 05 ➔ 06 ➔ 07 ➔ 08 ➔ 09 (NYAMBUNG FISIK) */}
              <g id="perubahan-track-05-to-09">
                <path
                  d="M 200 340 L 280 310 L 355 335 L 430 370 L 505 335"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.35"
                />
                <path
                  d="M 200 340 L 280 310 L 355 335 L 430 370 L 505 335"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3.5"
                  strokeDasharray="8,8"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </g>

              {/* SECTION C: FORK 1 - JALUR PINTAS (JEMBATAN LAYANG PELUANG 10 ➔ 15) */}
              {/* Melayang naik dari 09 ➔ 10 ➔ 11 ➔ 12 ➔ 13 ➔ 14 ➔ 15 ➔ Turun ke 22 (Konseling) */}
              <g id="skybridge-shortcut-track-10-to-15" opacity={activeRoute === 'winding' ? 0.25 : 1}>
                
                {/* Support pillars under each station 10-15 */}
                <g stroke="#0284c7" strokeWidth="3" opacity="0.8">
                  <line x1="480" y1="200" x2="480" y2="290" />
                  <line x1="575" y1="215" x2="575" y2="305" />
                  <line x1="670" y1="230" x2="670" y2="320" />
                  <line x1="765" y1="245" x2="765" y2="335" />
                  <line x1="860" y1="260" x2="860" y2="350" />
                  <line x1="955" y1="275" x2="955" y2="365" />
                </g>

                {/* Ascending Entry Ramp from 09 (505,335) up to 10 (480,190) */}
                <polygon
                  points="505,335 480,190 520,185 535,330"
                  fill="#0369a1"
                  opacity="0.6"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />

                {/* Skybridge Deck Surface across 10-15 */}
                <polygon
                  points="440,195 560,130 1000,210 1020,290 890,320 470,240"
                  fill="url(#skybridgeSurface)"
                  stroke="#a5f3fc"
                  strokeWidth="2.5"
                  filter="url(#neonGlowStrong)"
                  opacity="0.9"
                />

                {/* Highway Centerline with Animated Energy Flow (Green & Cyan) */}
                <path
                  d="M 505 335 L 480 190 L 575 205 L 670 220 L 765 235 L 860 250 L 955 265 L 990 200"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4.5"
                  strokeDasharray="14,18"
                  strokeLinecap="round"
                  className="animate-[dash_1.2s_linear_infinite]"
                />

                {/* Sequential directional arrows along skybridge */}
                <g fill="#0284c7" opacity="0.9">
                  <polygon points="520,195 530,195 525,190" />
                  <polygon points="615,210 625,210 620,205" />
                  <polygon points="710,225 720,225 715,220" />
                  <polygon points="805,240 815,240 810,235" />
                  <polygon points="900,255 910,255 905,250" />
                </g>
              </g>

              {/* SECTION D: FORK 2 - JALUR BERLIKU (TANTANGAN LABIRIN 16 ➔ 21 ➔ LANGSUNG KE 22 KONSELING) */}
              {/* Berbelok turun dari 08 (430,370) ➔ 16 ➔ 17 ➔ 18 ➔ 19 ➔ 20 ➔ 21 ➔ Menyambung mulus langsung ke 22 Konseling! */}
              <g id="ground-maze-track-16-to-21" opacity={activeRoute === 'shortcut' ? 0.25 : 1}>
                
                {/* Continuous Winding Ground Roadbed leading directly into Konseling (tanpa kesiapan) */}
                <path
                  d="M 430 370 L 230 530 L 330 590 L 435 540 L 540 595 L 645 545 L 750 600 Q 880 580 990 200"
                  fill="none"
                  stroke="#b91c1c"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.35"
                />

                {/* Glowing Danger Warning Center Track (Red/Amber Animated) */}
                <path
                  d="M 430 370 L 230 530 L 330 590 L 435 540 L 540 595 L 645 545 L 750 600 Q 880 580 990 200"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3.5"
                  strokeDasharray="8,8"
                  strokeLinecap="round"
                  className="animate-pulse"
                />

                {/* Directional Chevrons on Winding Track */}
                <g fill="#f87171" opacity="0.85">
                  <polygon points="275,555 280,550 275,545" />
                  <polygon points="380,560 385,555 380,550" />
                  <polygon points="485,565 490,560 485,555" />
                  <polygon points="590,570 595,565 590,560" />
                  <polygon points="695,575 700,570 695,565" />
                  <polygon points="840,490 845,485 840,480" />
                </g>

                {/* Dead End Warning Markers in Maze */}
                <g fill="#ef4444" fontSize="9.5" fontWeight="bold">
                  <text x="350" y="625">✕ JALAN BUNTU (SKILL GAP)</text>
                  <text x="560" y="635">✕ RESIKO OTOMASI</text>
                  <text x="770" y="640">✕ KELELAHAN STRES</text>
                </g>
              </g>

              {/* SECTION E: KONSELING DUDI & HASIL AKHIR (22 ➔ 23 ➔ 24 ➔ 25 ➔ 26 ➔ 27 ➔ 28) */}
              <g id="konseling-track-22-to-28">
                {/* Continuous serpentine path through all 6 counseling pillars */}
                <path
                  d="M 990 200 L 1085 225 L 1010 285 L 1105 310 L 1030 375 L 1125 400 L 1220 510"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.4"
                />
                <path
                  d="M 990 200 L 1085 225 L 1010 285 L 1105 310 L 1030 375 L 1125 400 L 1220 510"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="3.5"
                  strokeDasharray="8,8"
                  className="animate-pulse"
                />

                {/* Radiant Golden Carpet Road directly into 28. Hasil Akhir */}
                <polygon
                  points="1030,375 1125,400 1220,510 1120,490"
                  fill="url(#goldCarpet)"
                  opacity="0.85"
                  filter="url(#neonGlowStrong)"
                />
                <line
                  x1="1070"
                  y1="390"
                  x2="1220"
                  y2="510"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeDasharray="6,6"
                  className="animate-[dash_1s_linear_infinite]"
                />
              </g>

            </g>

            {/* 3. ISOMETRIC 3D MAZE WALL BLOCKS (PHYSICAL OBSTACLES) */}
            {/* ============================================================== */}
            <g id="physical-maze-walls" opacity={activeRoute === 'shortcut' ? 0.35 : 0.95}>
              
              {/* Wall Block 1 */}
              <g>
                <polygon points="260,460 320,425 320,455 260,490" fill="#07122a" />
                <polygon points="320,425 380,460 380,490 320,455" fill="#0f244f" />
                <polygon points="320,400 380,435 320,470 260,435" fill="url(#wallTopSurface)" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.6" />
              </g>

              {/* Wall Block 2 */}
              <g>
                <polygon points="360,520 420,485 420,515 360,550" fill="#07122a" />
                <polygon points="420,485 480,520 480,550 420,515" fill="#0f244f" />
                <polygon points="420,460 480,495 420,530 360,495" fill="url(#wallTopSurface)" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.6" />
              </g>

              {/* Wall Block 3 (Central Barrier) */}
              <g>
                <polygon points="460,470 530,430 530,460 460,500" fill="#07122a" />
                <polygon points="530,430 600,470 600,500 530,460" fill="#142c5c" />
                <polygon points="530,405 600,445 530,485 460,445" fill="url(#wallTopSurface)" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" />
              </g>

              {/* Wall Block 4 (Lower Alley) */}
              <g>
                <polygon points="560,540 630,500 630,530 560,570" fill="#07122a" />
                <polygon points="630,500 700,540 700,570 630,530" fill="#0f244f" />
                <polygon points="630,475 700,515 630,555 560,515" fill="url(#wallTopSurface)" stroke="#f87171" strokeWidth="1.2" strokeOpacity="0.6" />
              </g>

              {/* Mini travelers with status indicator */}
              <g id="maze-travelers" opacity="0.9">
                <g transform="translate(360, 590)">
                  <circle cx="0" cy="-6" r="3.5" fill="#f87171" />
                  <path d="M -3 -2 L 3 -2 L 2 5 L -2 5 Z" fill="#38bdf8" />
                  <text x="5" y="-8" fill="#fbbf24" fontSize="9" fontWeight="bold">?</text>
                </g>

                <g transform="translate(670, 590)">
                  <circle cx="0" cy="-6" r="3.5" fill="#fbbf24" />
                  <path d="M -3 -2 L 3 -2 L 2 5 L -2 5 Z" fill="#60a5fa" />
                  <text x="5" y="-8" fill="#f87171" fontSize="9" fontWeight="bold">!</text>
                </g>

                <g transform="translate(770, 240)">
                  <circle cx="0" cy="-6" r="3.5" fill="#34d399" />
                  <path d="M -3 -2 L 3 -2 L 2 5 L -2 5 Z" fill="#ffffff" />
                  <text x="5" y="-8" fill="#34d399" fontSize="9" fontWeight="bold">⚡</text>
                </g>
              </g>

            </g>

            {/* 4. LANDMARK GATES: START PORTAL & END PORTAL */}
            {/* ============================================================== */}
            
            {/* START PORTAL (Left Entrance Gate) */}
            <g
              id="landmark-pendahuluan"
              className="cursor-pointer group"
              onClick={() => {
                soundFX.playNodeClick();
                onSelectIntro();
              }}
            >
              {/* Ground Entrance Platform */}
              <polygon
                points="70,480 130,450 160,480 100,510"
                fill="#311042"
                stroke="#c084fc"
                strokeWidth="2"
                filter="url(#neonGlowStrong)"
              />

              {/* Glowing Arched Entrance Doorway */}
              <g transform="translate(100, 480)">
                <path
                  d="M -24 10 L -24 -30 C -24 -50 24 -50 24 -30 L 24 10"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="5"
                  filter="url(#neonGlowStrong)"
                />
                <path
                  d="M -18 10 L -18 -26 C -18 -44 18 -44 18 -26 L 18 10 Z"
                  fill="url(#goldCarpet)"
                  opacity="0.8"
                />
              </g>

              {/* Badge Label */}
              <g transform="translate(100, 535)">
                <rect x="-56" y="-13" width="112" height="26" rx="13" fill="#2e1065" stroke="#c084fc" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                  Start: Pendahuluan
                </text>
              </g>
            </g>

            {/* END PORTAL (28. Hasil Akhir - Right Exit Gate of Success) */}
            <g
              id="landmark-hasil-akhir"
              className="cursor-pointer group"
              onClick={() => {
                const item = MAZE_3D_NODES.find(n => n.id === 'ha-sukses');
                if (item) handleNodeClick(item);
              }}
            >
              {/* Triumphal Exit Platform */}
              <polygon
                points="1170,520 1250,480 1280,520 1200,560"
                fill="#064e3b"
                stroke="#34d399"
                strokeWidth="2.5"
                filter="url(#intenseLightFlare)"
              />

              {/* Radiant Open Door of Success */}
              <g transform="translate(1220, 510)">
                <polygon points="0,-60 55,25 -20,25" fill="url(#goldCarpet)" opacity="0.45" filter="url(#neonGlowStrong)" />
                <rect x="-18" y="-55" width="36" height="65" fill="#064e3b" stroke="#34d399" strokeWidth="3" filter="url(#neonGlowStrong)" />
                <polygon points="-18,-55 8,-44 8,20 -18,10" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" opacity="0.95" />
                <circle cx="2" cy="-12" r="2.5" fill="#f59e0b" />
              </g>

              {/* Target / Hasil Akhir Badge */}
              <g transform="translate(1220, 585)">
                <rect x="-65" y="-14" width="130" height="28" rx="14" fill="#831843" stroke="#f472b6" strokeWidth="2" />
                <text x="0" y="4.5" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                  28. Hasil Akhir
                </text>
              </g>
            </g>

            {/* 5. ALL 28 SEQUENTIAL STATIONS (01 HINGGA 28 DENGAN NOMOR JELAS & RUNTUT) */}
            {/* ========================================================================= */}
            {allOrderedNodes.map((node) => {
              const isRelevant = isNodeActiveForRoute(node);
              const isHovered = hoveredNode?.id === node.id;
              const isSelected = selectedNodeId === node.id;

              return (
                <g
                  key={node.id}
                  id={`node-${node.id}`}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  opacity={isRelevant ? 1 : 0.25}
                >
                  {/* Station Pedestal Platform Tile under each node */}
                  <polygon
                    points={`${node.x - 20},${node.y + 14} ${node.x},${node.y + 5} ${node.x + 20},${node.y + 14} ${node.x},${node.y + 23}`}
                    fill={node.colorTheme === 'red' ? '#450a0a' : node.colorTheme === 'green' ? '#064e3b' : node.colorTheme === 'yellow' ? '#451a03' : '#082f49'}
                    stroke={node.colorTheme === 'red' ? '#f87171' : node.colorTheme === 'green' ? '#34d399' : node.colorTheme === 'yellow' ? '#fbbf24' : '#38bdf8'}
                    strokeWidth={isHovered || isSelected ? 2 : 1}
                    filter="url(#neonGlowStrong)"
                  />

                  {/* Beacon Ping on Selected / Hovered */}
                  {(isHovered || isSelected) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="24"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      className="animate-ping"
                      opacity="0.85"
                    />
                  )}

                  {/* Vertical Light Pin Column */}
                  <line
                    x1={node.x}
                    y1={node.y + 14}
                    x2={node.x}
                    y2={node.y}
                    stroke="#ffffff"
                    strokeWidth={isHovered || isSelected ? 2.5 : 1.5}
                    opacity="0.8"
                  />

                  {/* The Station Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered || isSelected ? 18 : 15}
                    fill={node.colorTheme === 'red' ? '#1c0707' : node.colorTheme === 'green' ? '#022115' : node.colorTheme === 'yellow' ? '#1c1202' : '#031726'}
                    stroke={node.colorTheme === 'red' ? '#f87171' : node.colorTheme === 'green' ? '#34d399' : node.colorTheme === 'yellow' ? '#fbbf24' : '#38bdf8'}
                    strokeWidth={isHovered || isSelected ? 3 : 2}
                    filter="url(#neonGlowStrong)"
                  />

                  {/* Icon inside station */}
                  <foreignObject
                    x={node.x - (isHovered || isSelected ? 10 : 8)}
                    y={node.y - (isHovered || isSelected ? 10 : 8)}
                    width={isHovered || isSelected ? 20 : 16}
                    height={isHovered || isSelected ? 20 : 16}
                    className="pointer-events-none"
                  >
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <DiagramIcon
                        name={node.iconType}
                        size={isHovered || isSelected ? 16 : 13}
                        className="w-full h-full"
                      />
                    </div>
                  </foreignObject>

                  {/* Sequential Number Badge (Left-top pill e.g. "01", "02") */}
                  <g transform={`translate(${node.x - 18}, ${node.y - 12})`}>
                    <circle cx="0" cy="0" r="8" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
                    <text
                      x="0"
                      y="2.8"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="7.5"
                      fontWeight="900"
                      className="select-none font-mono"
                    >
                      {String(node.stepSeq).padStart(2, '0')}
                    </text>
                  </g>

                  {/* Clean Station Name Badge above node */}
                  <g transform={`translate(${node.x}, ${node.y - 20})`}>
                    <rect
                      x={- (node.shortTitle.length * 3.4 + 9)}
                      y="-9"
                      width={node.shortTitle.length * 6.8 + 18}
                      height="18"
                      rx="9"
                      fill="#020817"
                      stroke={node.colorTheme === 'red' ? '#f87171' : node.colorTheme === 'green' ? '#34d399' : node.colorTheme === 'yellow' ? '#fbbf24' : '#38bdf8'}
                      strokeWidth={isHovered || isSelected ? 1.8 : 1}
                      className="shadow-md"
                      opacity={isHovered || isSelected ? 1 : 0.9}
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      className="select-none"
                    >
                      {node.shortTitle}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* 6. LIVE TRAVELER BEACON IN SEQUENTIAL ORDER */}
            {isSimulating && (
              <g className="transition-all duration-700">
                {(() => {
                  const currentSeq = currentTourSeq[simStep % currentTourSeq.length];
                  const n = MAZE_3D_NODES.find(item => item.stepSeq === currentSeq);
                  if (!n) return null;
                  return (
                    <g transform={`translate(${n.x}, ${n.y})`}>
                      <circle cx="0" cy="0" r="32" fill="none" stroke="#22d3ee" strokeWidth="3" className="animate-ping" />
                      <circle cx="0" cy="-30" r="9" fill="#38bdf8" filter="url(#intenseLightFlare)" />
                      <text x="0" y="-27" textAnchor="middle" fill="#000000" fontSize="8" fontWeight="black">▼</text>
                    </g>
                  );
                })()}
              </g>
            )}

          </svg>
        </div>
      </div>

      {/* 3. NARRATIVE GUIDE & STEPPING TIMELINE */}
      <div className="w-full max-w-7xl px-4 py-3.5 mt-3 bg-slate-900/80 rounded-2xl border border-cyan-900/40 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold shrink-0 font-mono">
            28
          </div>
          <div>
            <h4 className="font-bold text-white text-xs sm:text-sm">
              Alur Runtut & Nyambung: 28 Titik Terhubung Berurutan dari 01 hingga 28
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Jalur Tantangan dan Jalur Peluang kini mengalir langsung menyatu ke Konseling DUDI dan Gerbang Hasil Akhir secara bersih dan teratur.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleToggleSimulation(activeRoute)}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Hentikan Simulasi' : 'Jalankan Tur 01 ➔ 28'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
