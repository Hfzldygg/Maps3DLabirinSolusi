import React, { useState } from 'react';
import { MazeNode } from '../data/mazeData';
import { soundFX } from '../utils/soundEffects';

interface IsometricMazeMapProps {
  nodes: MazeNode[];
  selectedNode: MazeNode | null;
  onSelectNode: (node: MazeNode) => void;
  activePathFilter: 'all' | 'winding' | 'shortcut';
}

export const IsometricMazeMap: React.FC<IsometricMazeMapProps> = ({
  nodes,
  selectedNode,
  onSelectNode,
  activePathFilter,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const handleNodeClick = (node: MazeNode) => {
    if (node.id === 'konseling-dudi') {
      soundFX.playSuccessChime();
    } else if (node.pathType === 'shortcut') {
      soundFX.playShortcutSound();
    } else {
      soundFX.playNodeClick();
    }
    onSelectNode(node);
  };

  const isHighlighted = (node: MazeNode) => {
    if (activePathFilter === 'all') return true;
    if (activePathFilter === 'winding') return node.pathType === 'winding' || node.pathType === 'entry';
    if (activePathFilter === 'shortcut') return node.pathType === 'shortcut' || node.pathType === 'destination' || node.pathType === 'entry';
    return true;
  };

  return (
    <div className="relative w-full aspect-[16/10] max-h-[640px] select-none rounded-2xl overflow-hidden bg-gradient-to-b from-[#081126] via-[#050c1d] to-[#030712] border border-cyan-900/40 shadow-2xl shadow-cyan-950/40 flex items-center justify-center p-2 md:p-6">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.25) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* SVG Isometric Labyrinth Render */}
      <svg
        viewBox="0 0 1000 620"
        className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Linear Gradients */}
          <linearGradient id="pedestalTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d214a" />
            <stop offset="50%" stopColor="#081432" />
            <stop offset="100%" stopColor="#040b1c" />
          </linearGradient>

          <linearGradient id="pedestalSideLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#07132a" />
            <stop offset="100%" stopColor="#020611" />
          </linearGradient>

          <linearGradient id="pedestalSideRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0c1e3d" />
            <stop offset="100%" stopColor="#030815" />
          </linearGradient>

          <linearGradient id="neonBridge" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="neonBridgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="wallTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0f224a" />
          </linearGradient>

          <linearGradient id="wallSideLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0b1739" />
            <stop offset="100%" stopColor="#050a1b" />
          </linearGradient>

          <linearGradient id="wallSideRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#172e6b" />
            <stop offset="100%" stopColor="#081026" />
          </linearGradient>

          <linearGradient id="goldPortal" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="1" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="3" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pattern for floor tiles */}
          <pattern id="isoGrid" width="40" height="23" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
            <path d="M 0 11.5 L 20 0 L 40 11.5 L 20 23 Z" fill="none" stroke="#1e3a8a" strokeWidth="0.5" strokeOpacity="0.3" />
          </pattern>
        </defs>

        {/* 1. PEDESTAL PLATFORM BASE (ISOMETRIC SLAB) */}
        <g id="pedestal">
          {/* Depth / Extrusion under top */}
          {/* Left extrusion */}
          <polygon
            points="100,340 500,560 500,595 100,375"
            fill="url(#pedestalSideLeft)"
            stroke="#0f224a"
            strokeWidth="1.5"
          />
          {/* Right extrusion */}
          <polygon
            points="500,560 900,340 900,375 500,595"
            fill="url(#pedestalSideRight)"
            stroke="#172e6b"
            strokeWidth="1.5"
          />
          {/* Top isometric platform */}
          <polygon
            points="500,120 900,340 500,560 100,340"
            fill="url(#pedestalTop)"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeOpacity="0.5"
          />
          {/* Grid lines on platform */}
          <polygon
            points="500,120 900,340 500,560 100,340"
            fill="url(#isoGrid)"
            opacity="0.8"
          />
          {/* Outer glowing edge line */}
          <polyline
            points="100,340 500,560 900,340"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            filter="url(#cyanGlow)"
            opacity="0.75"
          />
          <polyline
            points="100,375 500,595 900,375"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            opacity="0.4"
          />
        </g>

        {/* 2. ISOMETRIC MAZE WALLS (3D BLOCKS) */}
        <g id="maze-walls" className="transition-opacity duration-300" opacity={activePathFilter === 'shortcut' ? 0.35 : 1}>
          {/* Left Maze Sector 1 (near entrance) */}
          {/* Block A1 */}
          <g transform="translate(0, 0)">
            <polygon points="260,320 310,292 310,302 260,330" fill="url(#wallSideLeft)" />
            <polygon points="310,292 360,320 360,330 310,302" fill="url(#wallSideRight)" />
            <polygon points="310,282 360,310 310,338 260,310" fill="url(#wallTop)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
          </g>

          {/* Block A2 - L-shaped wall corridor */}
          <g>
            {/* Front vertical face */}
            <polygon points="280,390 350,350 350,370 280,410" fill="url(#wallSideLeft)" />
            <polygon points="350,350 420,390 420,410 350,370" fill="url(#wallSideRight)" />
            <polygon points="350,330 420,370 350,410 280,370" fill="url(#wallTop)" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.5" />
          </g>

          {/* Maze Corridor: Inner winding walls (Tantangan Sector 1) */}
          <g>
            {/* Winding wall segment 1 */}
            <polygon points="330,420 390,385 390,405 330,440" fill="url(#wallSideLeft)" />
            <polygon points="390,385 450,420 450,440 390,405" fill="url(#wallSideRight)" />
            <polygon points="390,365 450,400 390,435 330,400" fill="url(#wallTop)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />

            {/* Inner wall loop creating dead end */}
            <polygon points="370,445 420,415 420,435 370,465" fill="url(#wallSideLeft)" />
            <polygon points="420,415 470,445 470,465 420,435" fill="url(#wallSideRight)" />
            <polygon points="420,395 470,425 420,455 370,425" fill="url(#wallTop)" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.5" />

            {/* Central Maze Block B (Complex Junction) */}
            <polygon points="430,340 500,300 500,325 430,365" fill="url(#wallSideLeft)" />
            <polygon points="500,300 570,340 570,365 500,325" fill="url(#wallSideRight)" />
            <polygon points="500,275 570,315 500,355 430,315" fill="url(#wallTop)" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" />

            {/* Inner loop wall */}
            <polygon points="480,380 540,345 540,365 480,400" fill="url(#wallSideLeft)" />
            <polygon points="540,345 600,380 600,400 540,365" fill="url(#wallSideRight)" />
            <polygon points="540,325 600,360 540,395 480,360" fill="url(#wallTop)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />

            {/* Bottom intricate maze corridors */}
            <polygon points="460,470 520,435 520,455 460,490" fill="url(#wallSideLeft)" />
            <polygon points="520,435 580,470 580,490 520,455" fill="url(#wallSideRight)" />
            <polygon points="520,415 580,450 520,485 460,450" fill="url(#wallTop)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />

            {/* Right maze obstacle walls */}
            <polygon points="560,410 630,370 630,392 560,432" fill="url(#wallSideLeft)" />
            <polygon points="630,370 700,410 700,432 630,392" fill="url(#wallSideRight)" />
            <polygon points="630,348 700,388 630,428 560,388" fill="url(#wallTop)" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Right Sector Maze Block 3 */}
            <polygon points="650,330 710,295 710,318 650,353" fill="url(#wallSideLeft)" />
            <polygon points="710,295 770,330 770,353 710,318" fill="url(#wallSideRight)" />
            <polygon points="710,272 770,307 710,342 650,307" fill="url(#wallTop)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
          </g>

          {/* Mini walking figures in winding maze floor (representing workers navigating obstacles) */}
          <g id="maze-travelers" opacity="0.85">
            {/* Traveler 1 (Bottom Left maze dead-end) */}
            <g transform="translate(305, 435)">
              <ellipse cx="0" cy="5" rx="5" ry="2.5" fill="#000" opacity="0.4" />
              {/* Torso & Head */}
              <circle cx="0" cy="-6" r="3.5" fill="#f87171" />
              <path d="M -3 -2 L 3 -2 L 2 5 L -2 5 Z" fill="#38bdf8" />
              {/* Question mark above head */}
              <text x="5" y="-7" fill="#fbbf24" fontSize="9" fontWeight="bold">?</text>
            </g>

            {/* Traveler 2 (Center maze dead-end) */}
            <g transform="translate(615, 420)">
              <ellipse cx="0" cy="5" rx="5" ry="2.5" fill="#000" opacity="0.4" />
              <circle cx="0" cy="-6" r="3.5" fill="#fbbf24" />
              <path d="M -3 -2 L 3 -2 L 2 5 L -2 5 Z" fill="#60a5fa" />
              <text x="5" y="-7" fill="#f87171" fontSize="9" fontWeight="bold">!</text>
            </g>
          </g>
        </g>

        {/* 3. WINDING PATHS (TANTANGAN GROUND TRACKS) */}
        <g id="ground-paths" className="transition-opacity duration-300" opacity={activePathFilter === 'shortcut' ? 0.2 : 1}>
          {/* Tangled dotted line on floor */}
          <path
            d="M 230 430 Q 300 480 340 450 T 430 470 T 520 500 T 590 450 T 670 430"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3.5"
            strokeDasharray="6,6"
            strokeOpacity="0.75"
            className="animate-pulse"
          />
          {/* Additional winding dead-end routes */}
          <path
            d="M 340 450 Q 360 410 400 415"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="4,4"
            strokeOpacity="0.6"
          />
          <path
            d="M 520 500 Q 560 510 590 490"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="4,4"
            strokeOpacity="0.6"
          />
        </g>

        {/* 4. THE ICONIC ELEVATED SKYBRIDGE (JALUR PINTAS PELUANG POSITIF) */}
        <g id="elevated-skybridge" className="transition-opacity duration-300" opacity={activePathFilter === 'winding' ? 0.3 : 1}>
          {/* Bridge Shadow on maze floor */}
          <path
            d="M 320 330 L 460 270 L 720 280 L 820 320 L 770 345 L 430 310 Z"
            fill="#030815"
            opacity="0.6"
            filter="url(#cyanGlow)"
          />

          {/* Support Pillars under bridge */}
          <g stroke="#0284c7" strokeWidth="2.5" opacity="0.8">
            <line x1="430" y1="260" x2="430" y2="305" />
            <line x1="560" y1="240" x2="560" y2="285" />
            <line x1="680" y1="250" x2="680" y2="295" />
          </g>

          {/* Glowing Translucent Bridge Deck Surface */}
          <polygon
            points="310,290 460,210 740,225 830,285 770,310 430,270"
            fill="url(#neonBridge)"
            stroke="#67e8f9"
            strokeWidth="2"
            filter="url(#cyanGlow)"
            opacity="0.9"
          />

          {/* Left glowing guardrail */}
          <polyline
            points="310,280 460,200 740,215 830,275"
            fill="none"
            stroke="#a5f3fc"
            strokeWidth="3.5"
            filter="url(#intenseGlow)"
          />

          {/* Right glowing guardrail */}
          <polyline
            points="330,300 430,260 770,300 820,300"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            filter="url(#cyanGlow)"
          />

          {/* Animated Energy Flow Particles & Light Arrows moving left to right */}
          <g id="bridge-flow">
            {/* Glowing trajectory line */}
            <path
              id="shortcut-trajectory"
              d="M 330 285 L 470 230 L 620 240 L 780 285"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeDasharray="12,18"
              strokeLinecap="round"
              className="animate-[dash_1.5s_linear_infinite]"
              style={{
                strokeDashoffset: 30,
              }}
            />

            {/* Glowing Arrow Indicator on Bridge */}
            <g transform="translate(560, 240) rotate(12)">
              <polygon points="0,-12 18,0 0,12 4,0" fill="#38bdf8" filter="url(#intenseGlow)" />
            </g>
            <g transform="translate(670, 260) rotate(22)">
              <polygon points="0,-10 16,0 0,10 4,0" fill="#67e8f9" filter="url(#intenseGlow)" />
            </g>
          </g>
        </g>

        {/* 5. INTERACTIVE NODES & LANDMARKS */}
        {/* ============================================================== */}

        {/* NODE 1: PENDAHULUAN (Left Entrance Portal) */}
        <g
          id="node-pendahuluan"
          className="cursor-pointer transition-all duration-300"
          onClick={() => handleNodeClick(nodes[0])}
          onMouseEnter={() => setHoveredNodeId('pendahuluan')}
          onMouseLeave={() => setHoveredNodeId(null)}
          opacity={isHighlighted(nodes[0]) ? 1 : 0.4}
        >
          {/* Spotlight Circle on Base */}
          <ellipse
            cx="175"
            cy="465"
            rx="45"
            ry="25"
            fill="#0284c7"
            opacity={selectedNode?.id === 'pendahuluan' || hoveredNodeId === 'pendahuluan' ? 0.5 : 0.2}
            filter="url(#cyanGlow)"
          />

          {/* Futuristic Arched Gateway / Portal (Matching Reference) */}
          <g transform="translate(175, 440)">
            {/* Outer portal frame */}
            <path
              d="M -26 15 L -26 -28 C -26 -48 26 -48 26 -28 L 26 15"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5"
              filter="url(#cyanGlow)"
            />
            {/* Inner portal glow */}
            <path
              d="M -20 15 L -20 -25 C -20 -42 20 -42 20 -25 L 20 15 Z"
              fill="url(#goldPortal)"
              opacity="0.75"
              filter="url(#cyanGlow)"
            />
            {/* Portal energy bars */}
            <line x1="-12" y1="-5" x2="12" y2="-5" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
            <line x1="-14" y1="-18" x2="14" y2="-18" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
            <line x1="-10" y1="-28" x2="10" y2="-28" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
          </g>

          {/* Interactive Landmark Pin & Label */}
          <g transform="translate(175, 520)">
            {/* Pulsing ring if active */}
            {(selectedNode?.id === 'pendahuluan' || hoveredNodeId === 'pendahuluan') && (
              <circle cx="0" cy="0" r="18" fill="none" stroke="#38bdf8" strokeWidth="2" className="animate-ping" opacity="0.75" />
            )}
            <rect
              x="-60"
              y="-14"
              width="120"
              height="28"
              rx="14"
              fill={selectedNode?.id === 'pendahuluan' ? '#0284c7' : '#071536'}
              stroke="#38bdf8"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="13"
              fontWeight="bold"
              letterSpacing="0.5"
              className="select-none"
            >
              Pendahuluan
            </text>
          </g>
        </g>

        {/* NODE 2: BENTUK PERUBAHAN (Top Left Gear & AI) */}
        <g
          id="node-bentuk-perubahan"
          className="cursor-pointer transition-all duration-300"
          onClick={() => handleNodeClick(nodes[1])}
          onMouseEnter={() => setHoveredNodeId('bentuk-perubahan')}
          onMouseLeave={() => setHoveredNodeId(null)}
          opacity={isHighlighted(nodes[1]) ? 1 : 0.4}
        >
          {/* Spotlight Circle */}
          <ellipse
            cx="300"
            cy="270"
            rx="40"
            ry="20"
            fill="#6366f1"
            opacity={selectedNode?.id === 'bentuk-perubahan' || hoveredNodeId === 'bentuk-perubahan' ? 0.45 : 0.15}
            filter="url(#cyanGlow)"
          />

          {/* Floating Futuristic Gear / Tech Icon (Matching Reference) */}
          <g transform="translate(300, 240)">
            {/* Halo pulse */}
            <circle cx="0" cy="0" r="26" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" filter="url(#cyanGlow)" />
            {/* Gear teeth */}
            <g className="animate-[spin_10s_linear_infinite]">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect
                  key={angle}
                  x="-3"
                  y="-18"
                  width="6"
                  height="6"
                  rx="1"
                  fill="#c7d2fe"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="14" fill="#312e81" stroke="#a5b4fc" strokeWidth="2" />
              <circle cx="0" cy="0" r="6" fill="#818cf8" />
            </g>
          </g>

          {/* Label Card */}
          <g transform="translate(300, 195)">
            {(selectedNode?.id === 'bentuk-perubahan' || hoveredNodeId === 'bentuk-perubahan') && (
              <circle cx="0" cy="0" r="18" fill="none" stroke="#818cf8" strokeWidth="2" className="animate-ping" opacity="0.75" />
            )}
            <rect
              x="-68"
              y="-14"
              width="136"
              height="28"
              rx="14"
              fill={selectedNode?.id === 'bentuk-perubahan' ? '#4f46e5' : '#0a1033'}
              stroke="#818cf8"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="13"
              fontWeight="bold"
              letterSpacing="0.3"
            >
              Bentuk Perubahan
            </text>
          </g>
        </g>

        {/* NODE 3: TANTANGAN ERA 5.0 (Center & Lower Maze Obstacle) */}
        <g
          id="node-tantangan-era-5"
          className="cursor-pointer transition-all duration-300"
          onClick={() => handleNodeClick(nodes[2])}
          onMouseEnter={() => setHoveredNodeId('tantangan-era-5')}
          onMouseLeave={() => setHoveredNodeId(null)}
          opacity={isHighlighted(nodes[2]) ? 1 : 0.4}
        >
          {/* Spotlight Circle on Lower Maze */}
          <ellipse
            cx="490"
            cy="480"
            rx="55"
            ry="25"
            fill="#d97706"
            opacity={selectedNode?.id === 'tantangan-era-5' || hoveredNodeId === 'tantangan-era-5' ? 0.4 : 0.15}
            filter="url(#cyanGlow)"
          />

          {/* Upper Pin / Icon */}
          <g transform="translate(480, 240)">
            <circle cx="0" cy="0" r="22" fill="#451a03" stroke="#f59e0b" strokeWidth="2.5" filter="url(#cyanGlow)" />
            {/* Warning triangle icon */}
            <polygon points="0,-11 11,9 -11,9" fill="#f59e0b" />
            <circle cx="0" cy="5" r="1.5" fill="#000000" />
            <line x1="0" y1="-4" x2="0" y2="1" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Upper Label Card */}
          <g transform="translate(480, 200)">
            <rect
              x="-66"
              y="-13"
              width="132"
              height="26"
              rx="13"
              fill={selectedNode?.id === 'tantangan-era-5' ? '#d97706' : '#1f1505'}
              stroke="#f59e0b"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            <text
              x="0"
              y="4.5"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="12.5"
              fontWeight="bold"
            >
              Tantangan Era 5.0
            </text>
          </g>

          {/* Bottom Label (Matching reference slide which has "Tantangan Era 5.0" at bottom too) */}
          <g transform="translate(370, 565)">
            <rect
              x="-64"
              y="-13"
              width="128"
              height="26"
              rx="13"
              fill={selectedNode?.id === 'tantangan-era-5' ? '#d97706' : '#1f1505'}
              stroke="#f59e0b"
              strokeWidth="1.5"
              className="drop-shadow-md"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill="#fde68a"
              fontSize="12"
              fontWeight="600"
            >
              Tantangan Era 5.0
            </text>
          </g>
        </g>

        {/* NODE 4: PELUANG POSITIF (Elevated Skybridge Shortcut) */}
        <g
          id="node-peluang-positif"
          className="cursor-pointer transition-all duration-300"
          onClick={() => handleNodeClick(nodes[3])}
          onMouseEnter={() => setHoveredNodeId('peluang-positif')}
          onMouseLeave={() => setHoveredNodeId(null)}
          opacity={isHighlighted(nodes[3]) ? 1 : 0.4}
        >
          {/* Spotlight Circle on Elevated Bridge */}
          <ellipse
            cx="645"
            cy="245"
            rx="45"
            ry="22"
            fill="#06b6d4"
            opacity={selectedNode?.id === 'peluang-positif' || hoveredNodeId === 'peluang-positif' ? 0.6 : 0.25}
            filter="url(#intenseGlow)"
          />

          {/* Growth / Shortcut Icon (Ascending Arrow with Sparkles) */}
          <g transform="translate(645, 235)">
            <circle cx="0" cy="0" r="24" fill="#083344" stroke="#22d3ee" strokeWidth="2.5" filter="url(#intenseGlow)" />
            {/* Ascending Trend Line & Arrow */}
            <polyline
              points="-12,8 -4,0 2,4 12,-8"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="6,-8 12,-8 12,-2"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Label Card */}
          <g transform="translate(645, 195)">
            {(selectedNode?.id === 'peluang-positif' || hoveredNodeId === 'peluang-positif') && (
              <circle cx="0" cy="0" r="18" fill="none" stroke="#22d3ee" strokeWidth="2" className="animate-ping" opacity="0.8" />
            )}
            <rect
              x="-62"
              y="-14"
              width="124"
              height="28"
              rx="14"
              fill={selectedNode?.id === 'peluang-positif' ? '#0891b2' : '#04202c'}
              stroke="#22d3ee"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="13"
              fontWeight="bold"
            >
              Peluang Positif
            </text>
          </g>
        </g>

        {/* NODE 5: KONSELING DUDI (Far Right Radiant Exit Door) */}
        <g
          id="node-konseling-dudi"
          className="cursor-pointer transition-all duration-300"
          onClick={() => handleNodeClick(nodes[4])}
          onMouseEnter={() => setHoveredNodeId('konseling-dudi')}
          onMouseLeave={() => setHoveredNodeId(null)}
          opacity={isHighlighted(nodes[4]) ? 1 : 0.4}
        >
          {/* Golden exit radiant light */}
          <ellipse
            cx="830"
            cy="360"
            rx="50"
            ry="25"
            fill="#10b981"
            opacity={selectedNode?.id === 'konseling-dudi' || hoveredNodeId === 'konseling-dudi' ? 0.6 : 0.25}
            filter="url(#intenseGlow)"
          />

          {/* Glowing Open Door of Success (Matching Reference Door) */}
          <g transform="translate(830, 310)">
            {/* Light beam pouring out of open door */}
            <polygon
              points="0,-60 60,35 -20,35"
              fill="url(#goldPortal)"
              opacity="0.35"
              filter="url(#cyanGlow)"
            />

            {/* Door Frame */}
            <rect
              x="-18"
              y="-60"
              width="36"
              height="72"
              fill="#064e3b"
              stroke="#34d399"
              strokeWidth="3"
              filter="url(#cyanGlow)"
            />

            {/* Open Door Leaf (Isometric open angle) */}
            <polygon
              points="-18,-60 8,-48 8,24 -18,12"
              fill="#ecfdf5"
              stroke="#10b981"
              strokeWidth="2"
              opacity="0.95"
            />
            {/* Door handle */}
            <circle cx="2" cy="-12" r="2.5" fill="#f59e0b" />

            {/* Glowing doorway interior */}
            <rect x="-14" y="-56" width="28" height="64" fill="#6ee7b7" opacity="0.6" filter="url(#cyanGlow)" />
          </g>

          {/* Mentorship / Heart & Hands Icon above Door (Matching Reference) */}
          <g transform="translate(830, 215)">
            <circle cx="0" cy="0" r="22" fill="#064e3b" stroke="#34d399" strokeWidth="2.5" filter="url(#intenseGlow)" />
            {/* Heart & Hand SVG graphic */}
            <path
              d="M -6 -4 C -9 -8 -13 -4 -13 0 C -13 4 -6 9 0 12 C 6 9 13 4 13 0 C 13 -4 9 -8 6 -4 C 3 -1 -3 -1 -6 -4 Z"
              fill="#f43f5e"
              transform="scale(0.7) translate(0, -6)"
            />
            {/* Holding hands / mentor guidance */}
            <path
              d="M -9 4 C -6 7 6 7 9 4 L 7 8 L -7 8 Z"
              fill="#a7f3d0"
            />
          </g>

          {/* Label Card */}
          <g transform="translate(830, 168)">
            {(selectedNode?.id === 'konseling-dudi' || hoveredNodeId === 'konseling-dudi') && (
              <circle cx="0" cy="0" r="18" fill="none" stroke="#34d399" strokeWidth="2" className="animate-ping" opacity="0.8" />
            )}
            <rect
              x="-60"
              y="-18"
              width="120"
              height="36"
              rx="18"
              fill={selectedNode?.id === 'konseling-dudi' ? '#059669' : '#022c22'}
              stroke="#34d399"
              strokeWidth="2.5"
              className="drop-shadow-xl"
            />
            <text
              x="0"
              y="-1"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="12"
              fontWeight="bold"
            >
              Konseling
            </text>
            <text
              x="0"
              y="12"
              textAnchor="middle"
              fill="#a7f3d0"
              fontSize="11"
              fontWeight="800"
              letterSpacing="0.8"
            >
              DUDI
            </text>
          </g>
        </g>

        {/* Ambient Floating Tech Sparkles */}
        <g opacity="0.6">
          <circle cx="210" cy="180" r="2" fill="#38bdf8" className="animate-ping" />
          <circle cx="780" cy="140" r="2" fill="#34d399" className="animate-ping" />
          <circle cx="480" cy="150" r="2.5" fill="#60a5fa" />
          <circle cx="890" cy="270" r="2" fill="#fde047" />
        </g>
      </svg>

      {/* Floating Interactive Map HUD / Legend on bottom right */}
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-10 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-800/40 text-[11px] text-slate-300 shadow-lg">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>Klik titik mana saja pada labirin untuk membuka materi lengkap</span>
      </div>
    </div>
  );
};
