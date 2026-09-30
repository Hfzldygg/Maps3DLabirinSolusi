import React, { useState } from 'react';
import { DIAGRAM_SECTIONS, DiagramItem, DiagramSection } from '../data/diagramData';
import { DiagramIcon } from './DiagramIcon';
import { soundFX } from '../utils/soundEffects';
import { 
  Wifi, 
  ArrowRight, 
  ArrowDown, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  CheckCircle2,
  Info
} from 'lucide-react';

interface FullInfographicDiagramProps {
  onSelectItem: (item: DiagramItem) => void;
  onSelectIntro: () => void;
}

export const FullInfographicDiagram: React.FC<FullInfographicDiagramProps> = ({
  onSelectItem,
  onSelectIntro,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const handleItemClick = (item: DiagramItem) => {
    soundFX.playNodeClick();
    onSelectItem(item);
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.1, 1.3));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.1, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Zoom and Helper Control Bar */}
      <div className="w-full max-w-7xl px-4 py-2 flex items-center justify-between text-xs text-slate-400 mb-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-300">
            Diagram Interaktif: Klik icon atau kartu mana saja untuk melihat keterangan lengkap & mendengarkan audio!
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-700">
          <button
            onClick={handleZoomOut}
            className="p-1 hover:text-white transition-colors"
            title="Perkecil Diagram"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={handleZoomIn}
            className="p-1 hover:text-white transition-colors"
            title="Perbesar Diagram"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 hover:text-white transition-colors ml-1 border-l border-slate-700 pl-1.5"
            title="Reset Ukuran"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Diagram Canvas (Styled exactly with clean light paper look as in user's image) */}
      <div 
        className="w-full max-w-7xl overflow-x-auto p-4 sm:p-8 rounded-3xl bg-[#fdfdfd] border-4 border-slate-200/80 shadow-2xl transition-transform duration-200"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
      >
        <div className="min-w-[1060px] space-y-6 text-slate-800">
          
          {/* ======================================================== */}
          {/* ROW 1: PENDAHULUAN | HERO CLUSTER | FAKTOR PENDORONG     */}
          {/* ======================================================== */}
          <div className="grid grid-cols-12 gap-4 items-center">
            
            {/* 1. PENDAHULUAN (Left Capsule Card) */}
            <div 
              onClick={() => {
                soundFX.playSoftTick();
                onSelectIntro();
              }}
              className="col-span-3 bg-purple-50/90 border-2 border-purple-400 rounded-3xl p-4 shadow-sm relative group cursor-pointer hover:shadow-md hover:border-purple-600 transition-all"
            >
              {/* Top Capsule Badge */}
              <div className="absolute -top-3.5 left-6 bg-purple-600 text-white font-extrabold text-xs px-3.5 py-0.5 rounded-full shadow-sm tracking-wide">
                1. Pendahuluan
              </div>
              <p className="text-[11.5px] leading-relaxed text-slate-700 font-medium pt-1">
                Perkembangan teknologi digital telah mengubah cara manusia bekerja, berkomunikasi, mengelola pekerjaan, dan mengembangkan karier. Teknologi tidak hanya digunakan sebagai alat bantu, tetapi juga menjadi bagian penting dalam proses kerja sehari-hari. Perubahan ini menciptakan berbagai peluang bagi pekerja, sekaligus menghadirkan tantangan yang membutuhkan kemampuan beradaptasi.
              </p>
              <div className="mt-2 flex items-center justify-between text-[10px] text-purple-700 font-bold">
                <span>Klik untuk ulasan mendalam</span>
                <Info className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Connecting curve arrow from 1 to Center */}
            <div className="col-span-1 flex justify-center items-center text-purple-400">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="transform">
                <path d="M4 12 Q 20 4 36 12" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points="36,12 28,7 28,17" fill="#a855f7" />
              </svg>
            </div>

            {/* CENTER HERO: Laptop + Cloud Title + Smartphone */}
            <div className="col-span-4 flex items-center justify-center gap-2">
              {/* Laptop Graphic */}
              <div className="relative shrink-0 flex flex-col items-center">
                {/* WiFi waves above laptop */}
                <div className="flex gap-0.5 text-sky-500 mb-0.5 animate-pulse">
                  <Wifi className="w-4 h-4" />
                </div>
                {/* Laptop body */}
                <div className="w-16 h-12 bg-sky-200 border-2 border-sky-400 rounded-t-md flex items-center justify-center p-1 shadow-sm">
                  <div className="w-full h-full bg-sky-500 rounded flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                    </div>
                  </div>
                </div>
                <div className="w-20 h-1.5 bg-slate-400 rounded-b-sm shadow-sm" />
              </div>

              {/* Cloud Title Container */}
              <div className="relative px-5 py-3 text-center bg-white border-2 border-sky-200 rounded-full shadow-sm flex flex-col items-center justify-center">
                {/* Subtle cloud bumps using CSS */}
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                  Dunia Kerja dalam<br />Genggaman Teknologi
                </h2>
                <p className="text-[10px] text-slate-500 italic mt-0.5 font-medium">
                  Adaptasi hari ini, peluang esok nanti
                </p>
              </div>

              {/* Connecting arrow */}
              <div className="text-sky-500">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Smartphone Graphic */}
              <div className="relative shrink-0 w-9 h-16 bg-slate-900 rounded-xl p-1 border-2 border-sky-400 shadow-sm flex flex-col justify-between items-center">
                <div className="w-2.5 h-0.5 bg-slate-600 rounded-full mt-0.5" />
                {/* Screen with cloud upload icon */}
                <div className="w-full flex-1 bg-sky-500 rounded flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-sky-600">
                    <DiagramIcon name="cloud-upload" size={12} className="w-3 h-3" />
                  </div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full border border-slate-600 mb-0.5" />
              </div>
            </div>

            {/* Connecting arrow to Faktor Pendorong */}
            <div className="col-span-1 flex justify-center items-center text-sky-500">
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* FAKTOR PENDORONG PERUBAHAN (Right Box) */}
            <div className="col-span-3 bg-sky-50/90 border-2 border-sky-300 rounded-3xl p-3.5 shadow-sm relative">
              {/* Header Badge */}
              <div className="absolute -top-3 left-6 bg-sky-500 text-white font-extrabold text-[11px] px-3 py-0.5 rounded-full shadow-sm tracking-wide">
                Faktor Pendorong Perubahan
              </div>

              {/* 4 Interactive Icons in a row */}
              <div className="grid grid-cols-4 gap-1.5 pt-2">
                {DIAGRAM_SECTIONS.faktorPendorong.items?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                    className="flex flex-col items-center text-center group cursor-pointer p-1 rounded-xl hover:bg-sky-100/80 transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-sky-200 text-sky-800 flex items-center justify-center border border-sky-300 shadow-sm group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all">
                      <DiagramIcon name={item.iconType} size={18} className="w-4 h-4" />
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-700 leading-tight mt-1 group-hover:text-sky-900">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* ROW 2: 2. BENTUK PERUBAHAN -> 3. PELUANG -> 4. TANTANGAN */}
          {/* ======================================================== */}
          <div className="grid grid-cols-12 gap-3 items-stretch">
            
            {/* 2. BENTUK PERUBAHAN (Yellow Section with 5 sub-cards) */}
            <div className="col-span-6 bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-3.5 shadow-sm relative flex flex-col justify-between">
              {/* Header Badge */}
              <div className="absolute -top-3.5 left-8 bg-amber-500 text-white font-extrabold text-xs px-4 py-0.5 rounded-full shadow-sm">
                2. Bentuk Perubahan
              </div>

              {/* Sub-cards Container with connecting tree line */}
              <div className="pt-2">
                {/* Horizontal branch line */}
                <div className="w-11/12 mx-auto h-0.5 bg-amber-300 mb-2 mt-1" />

                <div className="grid grid-cols-5 gap-2">
                  {DIAGRAM_SECTIONS.bentukPerubahan.items?.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => handleItemClick(card)}
                      className="bg-amber-100/80 hover:bg-amber-200/90 border border-amber-300 rounded-2xl p-2 flex flex-col items-center text-center cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-full bg-sky-200 text-sky-800 flex items-center justify-center border border-sky-300 shadow-sm mb-1 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                        <DiagramIcon name={card.iconType} size={20} className="w-5 h-5" />
                      </div>

                      {/* Title */}
                      <h4 className="font-extrabold text-[11px] text-slate-900 leading-tight mb-1.5 h-6 flex items-center justify-center">
                        {card.title}
                      </h4>

                      {/* Bullet points */}
                      <div className="w-full text-left text-[9.5px] text-slate-700 space-y-0.5 font-medium leading-tight">
                        {card.bulletPoints?.map((bp, idx) => (
                          <div key={idx} className="flex items-start gap-1">
                            <span className="text-amber-600 font-bold">•</span>
                            <span className="truncate">{bp}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Thick Green Arrow Connector */}
            <div className="col-span-1 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-pulse">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* 3. PELUANG BAGI PEKERJA (Green Section with 6 items) */}
            <div className="col-span-2.5 bg-emerald-50/70 border-2 border-emerald-400 rounded-3xl p-3 shadow-sm relative flex flex-col justify-between">
              {/* Header Badge */}
              <div className="absolute -top-3.5 left-6 bg-emerald-600 text-white font-extrabold text-xs px-3 py-0.5 rounded-full shadow-sm">
                3. Peluang bagi Pekerja
              </div>

              <div className="pt-2 space-y-1.5">
                {DIAGRAM_SECTIONS.peluangPekerja.items?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="w-full text-left p-1.5 rounded-xl hover:bg-emerald-100/90 border border-transparent hover:border-emerald-300 flex items-center gap-2 cursor-pointer transition-all group"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <DiagramIcon name={item.iconType} size={14} className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 leading-tight group-hover:text-emerald-950">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Thick Red Arrow Connector */}
            <div className="col-span-0.5 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md animate-pulse">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* 4. TANTANGAN BAGI PEKERJA (Pink/Red Section with 6 items) */}
            <div className="col-span-2 bg-rose-50/70 border-2 border-rose-400 rounded-3xl p-3 shadow-sm relative flex flex-col justify-between">
              {/* Header Badge */}
              <div className="absolute -top-3.5 left-4 bg-rose-600 text-white font-extrabold text-xs px-3 py-0.5 rounded-full shadow-sm">
                4. Tantangan bagi Pekerja
              </div>

              <div className="pt-2 space-y-1.5">
                {DIAGRAM_SECTIONS.tantanganPekerja.items?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="w-full text-left p-1.5 rounded-xl hover:bg-rose-100/90 border border-transparent hover:border-rose-300 flex items-center gap-2 cursor-pointer transition-all group"
                  >
                    <div className="w-7 h-7 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center shrink-0 border border-rose-300 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                      <DiagramIcon name={item.iconType} size={14} className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 leading-tight group-hover:text-rose-950">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* CONNECTOR DIRECTLY DOWN TO KONSELING DUDI                 */}
          {/* Alur langsung: Peluang & Tantangan langsung bermuara ke Konseling */}
          {/* ======================================================== */}
          <div className="flex items-center justify-center gap-4 my-3">
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-300 shadow-xs text-xs font-semibold">
              <span>Alur Peluang</span>
              <ArrowDown className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
            </div>

            <div className="flex items-center gap-2 text-sky-700 bg-sky-50 px-4 py-1.5 rounded-full border border-sky-300 shadow-sm text-xs font-bold">
              <span>Solusi Terarah Tanpa Beban Berlebih</span>
              <ArrowDown className="w-4 h-4 text-sky-600 animate-bounce" />
            </div>

            <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-300 shadow-xs text-xs font-semibold">
              <ArrowDown className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
              <span>Alur Tantangan</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* ROW 3: 5. KONSELING DUNIA USAHA DAN INDUSTRI (DUDI)       */}
          {/* ======================================================== */}
          <div className="bg-sky-50/80 border-2 border-sky-400 rounded-3xl p-3.5 shadow-sm relative">
            {/* Header Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sky-600 text-white font-extrabold text-xs px-6 py-0.5 rounded-full shadow-sm">
              5. Konseling Dunia Usaha dan Industri (DUDI)
            </div>

            <div className="grid grid-cols-6 gap-2.5 pt-2">
              {DIAGRAM_SECTIONS.konselingDudi.items?.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="bg-white/95 hover:bg-sky-100/70 border border-sky-300 rounded-2xl p-2.5 flex flex-col items-center text-center cursor-pointer transition-all hover:scale-105 hover:shadow-md group justify-between"
                >
                  <div className="w-10 h-10 rounded-full bg-sky-200 text-sky-800 flex items-center justify-center border border-sky-300 mb-1.5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <DiagramIcon name={item.iconType} size={20} className="w-5 h-5" />
                  </div>

                  <div>
                    <h5 className="font-extrabold text-[11px] text-slate-900 leading-tight">
                      {item.title}
                    </h5>
                    <p className="text-[9.5px] text-slate-600 leading-tight mt-1 line-clamp-2">
                      {item.shortDesc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* CONNECTOR LINE DOWN TO HASIL AKHIR                        */}
          {/* ======================================================== */}
          <div className="flex justify-center -my-2">
            <div className="flex items-center text-pink-600">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* ======================================================== */}
          {/* ROW 4: 6. HASIL AKHIR                                    */}
          {/* ======================================================== */}
          <div className="flex justify-center">
            <div 
              onClick={() => {
                const item = DIAGRAM_SECTIONS.hasilAkhir.items?.[0];
                if (item) handleItemClick(item);
              }}
              className="bg-pink-100/90 border-2 border-pink-400 rounded-full px-8 py-3.5 shadow-md relative group cursor-pointer hover:bg-pink-200 hover:shadow-lg transition-all flex items-center gap-4 max-w-3xl"
            >
              {/* Header Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-700 text-white font-extrabold text-xs px-6 py-0.5 rounded-full shadow-sm">
                6. Hasil Akhir
              </div>

              {/* Target Bullseye Icon */}
              <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shrink-0 border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                <DiagramIcon name="target" size={26} className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-black text-sm text-slate-900 tracking-wide uppercase">
                  PEKERJA YANG LEBIH SIAP MENGHADAPI PERUBAHAN
                </h3>
                <p className="text-[11px] text-slate-700 font-medium leading-relaxed mt-0.5">
                  Dengan dukungan konseling yang tepat, pekerja dapat memanfaatkan peluang, menghadapi tantangan, dan terus berkembang di era digital.
                </p>
              </div>

              <div className="text-pink-600 font-bold text-xs shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Detail</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
