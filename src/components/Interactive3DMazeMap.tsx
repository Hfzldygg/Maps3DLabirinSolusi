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
  CheckCircle2,
  GitBranch,
  Zap,
  AlertTriangle,
  Info
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

  // Sequential order for the shortcut tour
  const shortcutTourNodes = [
    'fp-inovasi', 'bp-teknologi-ai', 'pp-produktivitas', 'pp-kesempatan-global', 
    'pp-pekerjaan-baru', 'kp-teknis', 'kd-nasihat', 'kd-komunikasi-efektif', 'ha-sukses'
  ];

  // Sequential order for the winding tour
  const windingTourNodes = [
    'fp-ai', 'bp-data', 'bp-pola-kerja', 'tp-adaptasi-teknologi', 
    'tp-upskilling-reskilling', 'tp-keamanan-data', 'tp-tekanan-stres', 
    'kp-psikologis', 'kd-ketegangan', 'kd-penjernihan', 'ha-sukses'
  ];

  // Simulation runner
  useEffect(() => {
    if (!isSimulating) return;

    const tourList = activeRoute === 'winding' ? windingTourNodes : shortcutTourNodes;

    const timer = setInterval(() => {
      setSimStep((prev) => {
        const next = (prev + 1) % tourList.length;
        const targetId = tourList[next];
        const targetNode = MAZE_3D_NODES.find(n => n.id === targetId);
        if (targetNode) {
          setSelectedNodeId(targetNode.id);
          soundFX.playSoftTick();
        }
        return next;
      });
    }, 2200);

    return () => clearInterval(timer);
  }, [isSimulating, activeRoute]);

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

  const handleToggleSimulation = (route: 'shortcut' | 'winding') => {
    soundFX.playSoftTick();
    if (activeRoute === route && isSimulating) {
      setIsSimulating(false);
    } else {
      setActiveRoute(route);
      setIsSimulating(true);
      setSimStep(0);
      const list = route === 'winding' ? windingTourNodes : shortcutTourNodes;
      setSelectedNodeId(list[0]);
    }
  };

  // Node route visibility check
  const isNodeActiveForRoute = (node: Maze3DNode) => {
    if (activeRoute === 'all') return true;
    if (activeRoute === 'shortcut') {
      return (
        node.zone === 'peluang' || 
        node.zone === 'faktor-pendorong' || 
        node.zone === 'konseling' || 
        node.zone === 'hasil-akhir' ||
        node.id === 'bp-teknologi-ai' ||
        node.id === 'kp-teknis'
      );
    }
    if (activeRoute === 'winding') {
      return (
        node.zone === 'tantangan' || 
        node.zone === 'bentuk-perubahan' || 
        node.zone === 'kesiapan' || 
        node.zone === 'konseling' || 
        node.zone === 'hasil-akhir'
      );
    }
    return true;
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      
      {/* Top Controls: Route Selector, Simulation Player, & Zoom */}
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
            <span>Semua Alur Terpadu</span>
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
            <span>Alur Cepat (Peluang & Jembatan Layang)</span>
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
            <span>Alur Berliku (Tantangan Labirin)</span>
          </button>
        </div>

        {/* Action Controls: Live Simulation + Zoom */}
        <div className="flex items-center gap-2">
          {/* Simulation Toggle */}
          <button
            onClick={() => handleToggleSimulation(activeRoute === 'winding' ? 'winding' : 'shortcut')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isSimulating
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/30 animate-pulse'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Jeda Simulasi Alur' : 'Simulasi Gerak Alur'}</span>
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

      {/* Main 3D Isometric Viewport */}
      <div className="w-full max-w-7xl overflow-x-auto p-2 sm:p-5 rounded-3xl bg-gradient-to-b from-[#050c1f] via-[#040816] to-[#02040c] border-2 border-cyan-800/40 shadow-2xl relative">
        
        {/* Route Status Legend Overlay */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-cyan-800/60 text-xs shadow-xl pointer-events-none max-w-xs">
          <div className="flex items-center gap-2 font-bold text-white text-[11px] uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Peta Labirin Berjalur Interaktif</span>
          </div>
          <div className="text-[10px] text-slate-300 space-y-1 mt-0.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-emerald-400 rounded-full" />
              <span>Jalur Hijau Melayang: Peluang Positif (Pintas)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-amber-400 rounded-full" />
              <span>Jalur Kuning/Merah: Tantangan Berliku & Buntu</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-cyan-400 rounded-full" />
              <span>Jalur Biru/Emas: Konseling DUDI & Sukses</span>
            </div>
          </div>
        </div>

        {/* Hover Info Tooltip */}
        {hoveredNode && (
          <div 
            className="absolute z-30 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-4"
            style={{ 
              left: `${(hoveredNode.x / 1150) * 100}%`, 
              top: `${(hoveredNode.y / 680) * 100}%` 
            }}
          >
            <div className="bg-slate-950/95 border-2 border-cyan-400 rounded-xl px-3.5 py-2 shadow-2xl shadow-cyan-950 text-center whitespace-nowrap min-w-[150px] animate-in zoom-in-95">
              <span className="text-[10px] uppercase font-bold text-cyan-400 block tracking-wider">
                {hoveredNode.category}
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
          className="min-w-[1080px] transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
        >
          <svg
            viewBox="0 0 1150 680"
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

              <linearGradient id="bridgeSurface" x1="0%" y1="50%" x2="100%" y2="50%">
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

            {/* 1. BASE ISOMETRIC PEDESTAL (THE DIGITAL FOUNDATION) */}
            <g id="base-slab">
              {/* Left 3D depth */}
              <polygon
                points="110,380 575,640 575,675 110,415"
                fill="url(#pedestalSideGrad)"
                stroke="#091b38"
                strokeWidth="1.5"
              />
              {/* Right 3D depth */}
              <polygon
                points="575,640 1040,380 1040,415 575,675"
                fill="url(#pedestalSideGrad)"
                stroke="#0d244c"
                strokeWidth="1.5"
              />
              {/* Top Isometric Diamond Surface */}
              <polygon
                points="575,120 1040,380 575,640 110,380"
                fill="url(#pedestalBaseGrad)"
                stroke="#0284c7"
                strokeWidth="2"
                strokeOpacity="0.6"
              />
              {/* Isometric gridlines on ground */}
              <polygon
                points="575,120 1040,380 575,640 110,380"
                fill="url(#isoFloorGrid)"
                opacity="0.8"
              />
              {/* Neon border perimeter glow */}
              <polyline
                points="110,380 575,640 1040,380"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                filter="url(#neonGlowStrong)"
                opacity="0.85"
              />
            </g>

            {/* 2. THE HIGHWAY & ALUR TRACKS (HIGHLY VISIBLE CONNECTED ROADS) */}
            {/* ============================================================== */}
            <g id="pathways-network">

              {/* A. SKYWAY BUS: Connecting Faktor Pendorong in the Sky down to Entrance & Perubahan */}
              <g id="sky-corridor" opacity={activeRoute === 'winding' ? 0.3 : 1}>
                {/* Orbital track ribbon connecting 4 items of Faktor Pendorong */}
                <path
                  d="M 140 440 L 170 130 L 270 110 L 370 110 L 470 125 L 440 260"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="6,6"
                  opacity="0.6"
                />
              </g>

              {/* B. THE ELEVATED SKYBRIDGE HIGHWAY (JALUR PINTAS PELUANG POSITIF) */}
              <g id="shortcut-elevated-road" opacity={activeRoute === 'winding' ? 0.25 : 1}>
                
                {/* Support Columns under Skybridge */}
                <g stroke="#0284c7" strokeWidth="3" opacity="0.8">
                  <line x1="410" y1="205" x2="410" y2="280" />
                  <line x1="500" y1="225" x2="500" y2="300" />
                  <line x1="585" y1="245" x2="585" y2="320" />
                  <line x1="670" y1="265" x2="670" y2="340" />
                  <line x1="755" y1="290" x2="755" y2="365" />
                  <line x1="835" y1="320" x2="835" y2="395" />
                </g>

                {/* Ascending Entry Ramp from Bentuk Perubahan up to Skybridge */}
                <polygon
                  points="230,280 320,240 410,195 380,215"
                  fill="#0369a1"
                  opacity="0.7"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />

                {/* Skybridge Deck Surface (Thick Glowing Elevated Highway) */}
                <polygon
                  points="360,205 500,140 850,230 890,290 770,330 430,245"
                  fill="url(#bridgeSurface)"
                  stroke="#a5f3fc"
                  strokeWidth="2.5"
                  filter="url(#neonGlowStrong)"
                  opacity="0.9"
                />

                {/* Guardrail Neon Tubes */}
                <polyline
                  points="360,195 500,130 850,220 890,280"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  filter="url(#intenseLightFlare)"
                />
                <polyline
                  points="430,255 770,340 860,300"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  filter="url(#neonGlowStrong)"
                />

                {/* Highway Centerline with Animated Energy Flow (Green & Cyan) */}
                <path
                  d="M 230 280 L 320 240 L 410 195 L 500 215 L 585 235 L 670 255 L 755 280 L 835 310 L 890 220"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeDasharray="12,18"
                  strokeLinecap="round"
                  className="animate-[dash_1.2s_linear_infinite]"
                />

                {/* Highway Lane Directional Chevron Arrows painted on road surface */}
                <g fill="#0284c7" opacity="0.8">
                  <polygon points="450,205 460,200 455,200 445,205" />
                  <polygon points="540,225 550,220 545,220 535,225" />
                  <polygon points="630,245 640,240 635,240 625,245" />
                  <polygon points="710,265 720,260 715,260 705,265" />
                  <polygon points="790,295 800,290 795,290 785,295" />
                </g>
              </g>

              {/* C. THE GROUND LEVEL WINDING LABYRINTH ROAD (JALUR BERLIKU TANTANGAN) */}
              <g id="winding-maze-ground-tracks" opacity={activeRoute === 'shortcut' ? 0.25 : 1}>
                
                {/* Winding Yellow/Red Circuit Roadbed */}
                <path
                  d="M 140 440 L 230 280 L 290 335 L 250 475 L 345 520 L 430 480 L 520 545 L 615 505 L 705 560 L 805 395 L 890 220"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.35"
                />

                {/* Glowing Danger Warning Center Track (Red/Amber Animated) */}
                <path
                  d="M 140 440 L 230 280 L 290 335 L 250 475 L 345 520 L 430 480 L 520 545 L 615 505 L 705 560 L 805 395 L 890 220"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeDasharray="8,8"
                  strokeLinecap="round"
                  className="animate-pulse"
                />

                {/* Dead End Traps / Hazard Loops in Maze */}
                <g stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4,4" opacity="0.8">
                  <path d="M 345 520 L 380 550 L 410 535" fill="none" />
                  <path d="M 520 545 L 550 580 L 580 560" fill="none" />
                  <path d="M 615 505 L 650 530 L 670 510" fill="none" />
                </g>

                {/* Danger Signs on Floor of Dead-Ends */}
                <g fill="#ef4444" fontSize="9" fontWeight="bold">
                  <text x="390" y="555">✕ BUNTU</text>
                  <text x="560" y="585">✕ RISIKO</text>
                  <text x="655" y="535">✕ STRES</text>
                </g>
              </g>

              {/* D. CENTRAL FOUNDATION ROAD: Kesiapan Pekerja (5 Items Transit Highway) */}
              <g id="kesiapan-foundation-road" opacity={activeRoute === 'shortcut' ? 0.35 : 1}>
                {/* Purple glowing highway connecting Kesiapan nodes into Konseling */}
                <path
                  d="M 380 300 L 480 375 L 560 350 L 645 380 L 725 355 L 805 395 L 930 375"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.4"
                />
                <path
                  d="M 380 300 L 480 375 L 560 350 L 645 380 L 725 355 L 805 395 L 930 375"
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="2.5"
                  strokeDasharray="6,8"
                  className="animate-[dash_2s_linear_infinite]"
                />
              </g>

              {/* E. SANCTUARY PLAZA: Konseling DUDI Roadway leading into 7. Hasil Akhir */}
              <g id="sanctuary-dudi-tracks">
                {/* Convergence Ring connecting Konseling nodes */}
                <ellipse
                  cx="960"
                  cy="320"
                  rx="75"
                  ry="50"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  strokeDasharray="8,6"
                  opacity="0.7"
                />

                {/* Radiant Golden Carpet Road from Konseling to Hasil Akhir */}
                <polygon
                  points="930,375 1015,400 1060,480 990,460"
                  fill="url(#goldCarpet)"
                  opacity="0.85"
                  filter="url(#neonGlowStrong)"
                />
                <line
                  x1="970"
                  y1="390"
                  x2="1060"
                  y2="480"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeDasharray="6,6"
                  className="animate-[dash_1s_linear_infinite]"
                />
              </g>

            </g>

            {/* 3. ISOMETRIC 3D MAZE WALLS (SOLID PHYSICAL LABYRINTH BLOCKS) */}
            {/* ============================================================== */}
            <g id="physical-maze-walls" opacity={activeRoute === 'shortcut' ? 0.35 : 0.95}>
              
              {/* Left Sector Wall Blocks (Surrounding Bentuk Perubahan) */}
              <g>
                <polygon points="190,340 240,310 240,335 190,365" fill="#091836" />
                <polygon points="240,310 290,340 290,365 240,335" fill="#142c5c" />
                <polygon points="240,290 290,320 240,350 190,320" fill="url(#wallTopSurface)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
              </g>

              {/* Maze Block: Winding Corridor 1 */}
              <g>
                <polygon points="270,410 340,370 340,400 270,440" fill="#07122a" />
                <polygon points="340,370 410,410 410,440 340,400" fill="#0f244f" />
                <polygon points="340,345 410,385 340,425 270,385" fill="url(#wallTopSurface)" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.6" />
              </g>

              {/* Maze Block: Dead-End Wall 2 */}
              <g>
                <polygon points="360,470 430,430 430,460 360,500" fill="#07122a" />
                <polygon points="430,430 500,470 500,500 430,460" fill="#0f244f" />
                <polygon points="430,405 500,445 430,485 360,445" fill="url(#wallTopSurface)" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.6" />
              </g>

              {/* Maze Block: Central Junction 3 */}
              <g>
                <polygon points="450,420 530,375 530,405 450,450" fill="#07122a" />
                <polygon points="530,375 610,420 610,450 530,405" fill="#142c5c" />
                <polygon points="530,348 610,393 530,438 450,393" fill="url(#wallTopSurface)" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" />
              </g>

              {/* Maze Block: Lower Danger Alley 4 */}
              <g>
                <polygon points="480,510 560,465 560,495 480,540" fill="#07122a" />
                <polygon points="560,465 640,510 640,540 560,495" fill="#0f244f" />
                <polygon points="560,438 640,483 560,528 480,483" fill="url(#wallTopSurface)" stroke="#f87171" strokeWidth="1.2" strokeOpacity="0.6" />
              </g>

              {/* Maze Block: Right Alley 5 */}
              <g>
                <polygon points="650,440 730,395 730,425 650,470" fill="#07122a" />
                <polygon points="730,395 810,440 810,470 730,425" fill="#142c5c" />
                <polygon points="730,368 810,413 730,458 650,413" fill="url(#wallTopSurface)" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.6" />
              </g>

              {/* Mini 3D Human travelers navigating maze floor with status bubbles */}
              <g id="maze-travelers" opacity="0.9">
                {/* Traveler stuck at Dead End 1 */}
                <g transform="translate(370, 525)">
                  <circle cx="0" cy="-6" r="3.5" fill="#f87171" />
                  <path d="M -3 -2 L 3 -2 L 2 5 L -2 5 Z" fill="#38bdf8" />
                  <text x="5" y="-8" fill="#fbbf24" fontSize="9" fontWeight="bold">?</text>
                </g>

                {/* Traveler at Central Junction */}
                <g transform="translate(635, 520)">
                  <circle cx="0" cy="-6" r="3.5" fill="#fbbf24" />
                  <path d="M -3 -2 L 3 -2 L 2 5 L -2 5 Z" fill="#60a5fa" />
                  <text x="5" y="-8" fill="#f87171" fontSize="9" fontWeight="bold">!</text>
                </g>

                {/* Traveler walking fast on Highway */}
                <g transform="translate(685, 245)">
                  <circle cx="0" cy="-6" r="3.5" fill="#34d399" />
                  <path d="M -3 -2 L 3 -2 L 2 5 L -2 5 Z" fill="#ffffff" />
                  <text x="5" y="-8" fill="#34d399" fontSize="9" fontWeight="bold">⚡</text>
                </g>
              </g>

            </g>

            {/* 4. LANDMARK GATES: 1. PENDAHULUAN & 7. HASIL AKHIR */}
            {/* ============================================================== */}
            
            {/* 1. PENDAHULUAN PORTAL (Left Entrance Gate) */}
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
                points="110,430 170,400 200,430 140,460"
                fill="#311042"
                stroke="#c084fc"
                strokeWidth="2"
                filter="url(#neonGlowStrong)"
              />

              {/* Glowing Arched Entrance Doorway */}
              <g transform="translate(140, 430)">
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
              <g transform="translate(140, 485)">
                <rect x="-56" y="-13" width="112" height="26" rx="13" fill="#2e1065" stroke="#c084fc" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                  1. Pendahuluan
                </text>
              </g>
            </g>

            {/* 7. HASIL AKHIR PORTAL (Right Exit Gate of Success) */}
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
                points="1010,450 1090,410 1120,450 1040,490"
                fill="#064e3b"
                stroke="#34d399"
                strokeWidth="2.5"
                filter="url(#intenseLightFlare)"
              />

              {/* Radiant Open Door of Success */}
              <g transform="translate(1060, 440)">
                {/* Light beam pouring forward */}
                <polygon points="0,-60 55,25 -20,25" fill="url(#goldCarpet)" opacity="0.45" filter="url(#neonGlowStrong)" />
                <rect x="-18" y="-55" width="36" height="65" fill="#064e3b" stroke="#34d399" strokeWidth="3" filter="url(#neonGlowStrong)" />
                <polygon points="-18,-55 8,-44 8,20 -18,10" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" opacity="0.95" />
                <circle cx="2" cy="-12" r="2.5" fill="#f59e0b" />
              </g>

              {/* Target / Hasil Akhir Badge */}
              <g transform="translate(1060, 515)">
                <rect x="-65" y="-14" width="130" height="28" rx="14" fill="#831843" stroke="#f472b6" strokeWidth="2" />
                <text x="0" y="4.5" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                  7. Hasil Akhir
                </text>
              </g>
            </g>

            {/* 5. ALL 30+ INTERACTIVE ICONS & NODES WITH CLEAN ALIGNED STATIONS */}
            {/* ============================================================== */}
            {MAZE_3D_NODES.map((node) => {
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
                    points={`${node.x - 18},${node.y + 12} ${node.x},${node.y + 4} ${node.x + 18},${node.y + 12} ${node.x},${node.y + 20}`}
                    fill={node.colorTheme === 'red' ? '#450a0a' : node.colorTheme === 'green' ? '#064e3b' : node.colorTheme === 'yellow' ? '#451a03' : node.colorTheme === 'purple' ? '#3b0764' : '#082f49'}
                    stroke={node.colorTheme === 'red' ? '#f87171' : node.colorTheme === 'green' ? '#34d399' : node.colorTheme === 'yellow' ? '#fbbf24' : node.colorTheme === 'purple' ? '#c084fc' : '#38bdf8'}
                    strokeWidth={isHovered || isSelected ? 2 : 1}
                    filter="url(#neonGlowStrong)"
                  />

                  {/* Beacon Ping on Selected / Hovered */}
                  {(isHovered || isSelected) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="22"
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
                    y1={node.y + 12}
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
                    r={isHovered || isSelected ? 17 : 14}
                    fill={node.colorTheme === 'red' ? '#1c0707' : node.colorTheme === 'green' ? '#022115' : node.colorTheme === 'yellow' ? '#1c1202' : node.colorTheme === 'purple' ? '#180524' : '#031726'}
                    stroke={node.colorTheme === 'red' ? '#f87171' : node.colorTheme === 'green' ? '#34d399' : node.colorTheme === 'yellow' ? '#fbbf24' : node.colorTheme === 'purple' ? '#c084fc' : '#38bdf8'}
                    strokeWidth={isHovered || isSelected ? 2.8 : 1.8}
                    filter="url(#neonGlowStrong)"
                  />

                  {/* Icon mapped inside station */}
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

                  {/* Clean Station Name Badge */}
                  <g transform={`translate(${node.x}, ${node.y - 18})`}>
                    <rect
                      x={- (node.shortTitle.length * 3.4 + 9)}
                      y="-9"
                      width={node.shortTitle.length * 6.8 + 18}
                      height="18"
                      rx="9"
                      fill="#020817"
                      stroke={node.colorTheme === 'red' ? '#f87171' : node.colorTheme === 'green' ? '#34d399' : node.colorTheme === 'yellow' ? '#fbbf24' : node.colorTheme === 'purple' ? '#c084fc' : '#38bdf8'}
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

            {/* Traveler simulation beacon */}
            {isSimulating && (
              <g className="transition-all duration-700">
                {(() => {
                  const list = activeRoute === 'winding' ? windingTourNodes : shortcutTourNodes;
                  const currentId = list[simStep % list.length];
                  const n = MAZE_3D_NODES.find(item => item.id === currentId);
                  if (!n) return null;
                  return (
                    <g transform={`translate(${n.x}, ${n.y})`}>
                      <circle cx="0" cy="0" r="28" fill="none" stroke="#22d3ee" strokeWidth="3" className="animate-ping" />
                      <circle cx="0" cy="-28" r="8" fill="#38bdf8" filter="url(#intenseLightFlare)" />
                      <text x="0" y="-25" textAnchor="middle" fill="#000000" fontSize="8" fontWeight="black">▼</text>
                    </g>
                  );
                })()}
              </g>
            )}

          </svg>
        </div>
      </div>

      {/* Narrative Guide Card below map */}
      <div className="w-full max-w-7xl px-4 py-3.5 mt-3 bg-slate-900/80 rounded-2xl border border-cyan-900/40 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs sm:text-sm">
              {activeRoute === 'all' && 'Alur Terpadu: 30+ Titik Terkoneksi Menuju Kesuksesan Era 5.0'}
              {activeRoute === 'shortcut' && 'Alur Pintas: Jembatan Layang Peluang Positif Melompati Rintangan Konvensional'}
              {activeRoute === 'winding' && 'Alur Berliku: Navigasi Tantangan & Kesiapan Mental Menghadapi Hambatan'}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Garis neon yang berdenyut menunjukkan rute perjalanan dari gerbang awal hingga pintu kesuksesan bersama DUDI.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleToggleSimulation(activeRoute === 'winding' ? 'winding' : 'shortcut')}
            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-1.5"
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Hentikan Simulasi' : 'Jalankan Tur Alur'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
