import { DiagramItem, DIAGRAM_SECTIONS } from './diagramData';

export interface Maze3DNode {
  id: string;
  stepSeq: number; // Global sequential number 1 to 28
  title: string;
  shortTitle: string;
  category: string;
  zone: 'pendahuluan' | 'faktor-pendorong' | 'bentuk-perubahan' | 'tantangan' | 'peluang' | 'konseling' | 'hasil-akhir';
  iconType: string;
  colorTheme: 'blue' | 'yellow' | 'green' | 'red' | 'teal' | 'pink';
  // Precise non-overlapping SVG coordinates on a 1400 x 820 canvas
  x: number;
  y: number;
  elevation: number; // 0 = ground maze, 1 = mid terrace, 2 = elevated skybridge, 3 = floating sky
  itemData: DiagramItem;
}

// 28 nodes placed in a strictly sequential, continuous chain (Kesiapan Pekerja removed as requested!)
export const MAZE_3D_NODES: Maze3DNode[] = [
  // ==============================================================
  // TAHAP 1: GERBANG AWAL & FAKTOR PENDORONG (Node 01 - 04)
  // Alur Masuk: 01 Inovasi -> 02 AI -> 03 Efisiensi -> 04 Globalisasi
  // ==============================================================
  {
    id: 'fp-inovasi',
    stepSeq: 1,
    title: 'Inovasi Teknologi',
    shortTitle: 'Inovasi Teknologi',
    category: 'Faktor Pendorong',
    zone: 'faktor-pendorong',
    iconType: 'trending-up',
    colorTheme: 'blue',
    x: 160,
    y: 190,
    elevation: 3,
    itemData: DIAGRAM_SECTIONS.faktorPendorong.items![0]
  },
  {
    id: 'fp-ai',
    stepSeq: 2,
    title: 'AI & Otomatisasi',
    shortTitle: 'AI & Otomasi',
    category: 'Faktor Pendorong',
    zone: 'faktor-pendorong',
    iconType: 'cpu',
    colorTheme: 'blue',
    x: 245,
    y: 165,
    elevation: 3,
    itemData: DIAGRAM_SECTIONS.faktorPendorong.items![1]
  },
  {
    id: 'fp-efisiensi',
    stepSeq: 3,
    title: 'Kebutuhan Efisiensi',
    shortTitle: 'Efisiensi Kerja',
    category: 'Faktor Pendorong',
    zone: 'faktor-pendorong',
    iconType: 'cloud',
    colorTheme: 'blue',
    x: 330,
    y: 175,
    elevation: 3,
    itemData: DIAGRAM_SECTIONS.faktorPendorong.items![2]
  },
  {
    id: 'fp-globalisasi',
    stepSeq: 4,
    title: 'Globalisasi & Konektivitas',
    shortTitle: 'Globalisasi',
    category: 'Faktor Pendorong',
    zone: 'faktor-pendorong',
    iconType: 'globe',
    colorTheme: 'blue',
    x: 415,
    y: 205,
    elevation: 3,
    itemData: DIAGRAM_SECTIONS.faktorPendorong.items![3]
  },

  // ==============================================================
  // TAHAP 2: BENTUK PERUBAHAN (Node 05 - 09)
  // Alur Teras: 05 Teknologi AI -> 06 Sistem Digital -> 07 Data -> 08 Pola Kerja -> 09 Komunikasi
  // ==============================================================
  {
    id: 'bp-teknologi-ai',
    stepSeq: 5,
    title: 'Teknologi & AI',
    shortTitle: 'Teknologi & AI',
    category: 'Bentuk Perubahan',
    zone: 'bentuk-perubahan',
    iconType: 'bot',
    colorTheme: 'yellow',
    x: 200,
    y: 340,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.bentukPerubahan.items![0]
  },
  {
    id: 'bp-sistem-digital',
    stepSeq: 6,
    title: 'Sistem Digital',
    shortTitle: 'Sistem Digital',
    category: 'Bentuk Perubahan',
    zone: 'bentuk-perubahan',
    iconType: 'cloud-upload',
    colorTheme: 'yellow',
    x: 280,
    y: 310,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.bentukPerubahan.items![1]
  },
  {
    id: 'bp-data',
    stepSeq: 7,
    title: 'Data & Analitik',
    shortTitle: 'Data Analitik',
    category: 'Bentuk Perubahan',
    zone: 'bentuk-perubahan',
    iconType: 'bar-chart',
    colorTheme: 'yellow',
    x: 355,
    y: 335,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.bentukPerubahan.items![2]
  },
  {
    id: 'bp-pola-kerja',
    stepSeq: 8,
    title: 'Pola Kerja (Hybrid/Remote)',
    shortTitle: 'Pola Kerja',
    category: 'Bentuk Perubahan',
    zone: 'bentuk-perubahan',
    iconType: 'home',
    colorTheme: 'yellow',
    x: 430,
    y: 370,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.bentukPerubahan.items![3]
  },
  {
    id: 'bp-komunikasi-digital',
    stepSeq: 9,
    title: 'Komunikasi Digital',
    shortTitle: 'Komunikasi',
    category: 'Bentuk Perubahan',
    zone: 'bentuk-perubahan',
    iconType: 'message-circle',
    colorTheme: 'yellow',
    x: 505,
    y: 335,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.bentukPerubahan.items![4]
  },

  // ==============================================================
  // JALUR A: PELUANG BAGI PEKERJA (JALUR PINTAS JEMBATAN LAYANG) (Node 10 - 15)
  // Alur Melayang Runtut: 10 Produktivitas -> 11 Global -> 12 Pelatihan -> 13 Profesi Baru -> 14 Kolaborasi -> 15 Fleksibilitas
  // ==============================================================
  {
    id: 'pp-produktivitas',
    stepSeq: 10,
    title: 'Meningkatkan Produktivitas',
    shortTitle: 'Produktivitas',
    category: 'Peluang Pintas',
    zone: 'peluang',
    iconType: 'rocket',
    colorTheme: 'green',
    x: 480,
    y: 190,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![0]
  },
  {
    id: 'pp-kesempatan-global',
    stepSeq: 11,
    title: 'Kesempatan Kerja Global & Freelance',
    shortTitle: 'Pasar Global',
    category: 'Peluang Pintas',
    zone: 'peluang',
    iconType: 'globe-2',
    colorTheme: 'green',
    x: 575,
    y: 205,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![1]
  },
  {
    id: 'pp-pelatihan-online',
    stepSeq: 12,
    title: 'Pengembangan Keterampilan Online',
    shortTitle: 'Pelatihan Online',
    category: 'Peluang Pintas',
    zone: 'peluang',
    iconType: 'graduation-cap',
    colorTheme: 'green',
    x: 670,
    y: 220,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![2]
  },
  {
    id: 'pp-pekerjaan-baru',
    stepSeq: 13,
    title: 'Munculnya Jenis Pekerjaan Baru',
    shortTitle: 'Pekerjaan Baru',
    category: 'Peluang Pintas',
    zone: 'peluang',
    iconType: 'briefcase',
    colorTheme: 'green',
    x: 765,
    y: 235,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![3]
  },
  {
    id: 'pp-kolaborasi-luas',
    stepSeq: 14,
    title: 'Kolaborasi Lebih Luas Tanpa Batas',
    shortTitle: 'Kolaborasi Luas',
    category: 'Peluang Pintas',
    zone: 'peluang',
    iconType: 'users',
    colorTheme: 'green',
    x: 860,
    y: 250,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![4]
  },
  {
    id: 'pp-fleksibilitas-waktu',
    stepSeq: 15,
    title: 'Fleksibilitas Waktu & Lokasi Kerja',
    shortTitle: 'Fleksibilitas',
    category: 'Peluang Pintas',
    zone: 'peluang',
    iconType: 'clock',
    colorTheme: 'green',
    x: 955,
    y: 265,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![5]
  },

  // ==============================================================
  // JALUR B: TANTANGAN BAGI PEKERJA (JALUR BERLIKU LANTAI DASAR) (Node 16 - 21)
  // Alur Berliku Runtut: 16 Adaptasi -> 17 Upskilling -> 18 Keamanan Data -> 19 Peran -> 20 Stres -> 21 Work-Life
  // ==============================================================
  {
    id: 'tp-adaptasi-teknologi',
    stepSeq: 16,
    title: 'Harus Beradaptasi Teknologi',
    shortTitle: 'Adaptasi Baru',
    category: 'Tantangan Labirin',
    zone: 'tantangan',
    iconType: 'cog',
    colorTheme: 'red',
    x: 230,
    y: 530,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![0]
  },
  {
    id: 'tp-upskilling-reskilling',
    stepSeq: 17,
    title: 'Kebutuhan Upskilling & Reskilling',
    shortTitle: 'Upskilling',
    category: 'Tantangan Labirin',
    zone: 'tantangan',
    iconType: 'book-open',
    colorTheme: 'red',
    x: 330,
    y: 590,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![1]
  },
  {
    id: 'tp-keamanan-data',
    stepSeq: 18,
    title: 'Keamanan dan Privasi Data',
    shortTitle: 'Keamanan Data',
    category: 'Tantangan Labirin',
    zone: 'tantangan',
    iconType: 'shield',
    colorTheme: 'red',
    x: 435,
    y: 540,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![2]
  },
  {
    id: 'tp-perubahan-peran',
    stepSeq: 19,
    title: 'Perubahan Peran Akibat Otomatisasi',
    shortTitle: 'Perubahan Peran',
    category: 'Tantangan Labirin',
    zone: 'tantangan',
    iconType: 'alert-triangle',
    colorTheme: 'red',
    x: 540,
    y: 595,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![3]
  },
  {
    id: 'tp-tekanan-stres',
    stepSeq: 20,
    title: 'Tekanan Psikologis & Stres',
    shortTitle: 'Tekanan Stres',
    category: 'Tantangan Labirin',
    zone: 'tantangan',
    iconType: 'brain',
    colorTheme: 'red',
    x: 645,
    y: 545,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![4]
  },
  {
    id: 'tp-batas-kerja',
    stepSeq: 21,
    title: 'Batas Kerja & Kehidupan Pribadi',
    shortTitle: 'Work-Life Balance',
    category: 'Tantangan Labirin',
    zone: 'tantangan',
    iconType: 'clock-alert',
    colorTheme: 'red',
    x: 750,
    y: 600,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![5]
  },

  // ==============================================================
  // TAHAP 4: KONSELING DUDI (PAVILIUN KANAN) (Node 22 - 27)
  // Alur Runtut: 22 Nasihat -> 23 Dukungan Emosi -> 24 Relaksasi -> 25 Penjernihan -> 26 Komunikasi -> 27 Adaptasi Industri
  // ==============================================================
  {
    id: 'kd-nasihat',
    stepSeq: 22,
    title: 'Pemberian Nasihat Karier',
    shortTitle: 'Pemberian Nasihat',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'message-square',
    colorTheme: 'teal',
    x: 990,
    y: 200,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![0]
  },
  {
    id: 'kd-dukungan-emosional',
    stepSeq: 23,
    title: 'Dukungan Emosional',
    shortTitle: 'Dukungan Emosi',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'heart-circle',
    colorTheme: 'teal',
    x: 1085,
    y: 225,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![1]
  },
  {
    id: 'kd-ketegangan',
    stepSeq: 24,
    title: 'Pengenduran Ketegangan Emosional',
    shortTitle: 'Relaksasi Stres',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'lotus',
    colorTheme: 'teal',
    x: 1010,
    y: 285,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![2]
  },
  {
    id: 'kd-penjernihan',
    stepSeq: 25,
    title: 'Penjernihan Pemikiran',
    shortTitle: 'Penjernihan',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'brain-circuit',
    colorTheme: 'teal',
    x: 1105,
    y: 310,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![3]
  },
  {
    id: 'kd-komunikasi-efektif',
    stepSeq: 26,
    title: 'Komunikasi Efektif di Tempat Kerja',
    shortTitle: 'Komunikasi',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'handshake',
    colorTheme: 'teal',
    x: 1030,
    y: 375,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![4]
  },
  {
    id: 'kd-adaptasi-perubahan',
    stepSeq: 27,
    title: 'Adaptasi Terhadap Perubahan Industri',
    shortTitle: 'Adaptasi Industri',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'sync-circle',
    colorTheme: 'teal',
    x: 1125,
    y: 400,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![5]
  },

  // ==============================================================
  // TAHAP 5: HASIL AKHIR (PUNCAK KESUKSESAN) (Node 28)
  // Alur Muara Akhir: Menuju Gerbang Terbuka Sukses
  // ==============================================================
  {
    id: 'ha-sukses',
    stepSeq: 28,
    title: 'Hasil Akhir: Pekerja Tangguh & Siap Hadapi Perubahan',
    shortTitle: 'Pekerja Tangguh Sukses',
    category: 'Hasil Akhir',
    zone: 'hasil-akhir',
    iconType: 'target',
    colorTheme: 'pink',
    x: 1220,
    y: 510,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.hasilAkhir.items![0]
  }
];
