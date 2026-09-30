import { DiagramItem, DIAGRAM_SECTIONS } from './diagramData';

export interface Maze3DNode {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  zone: 'pendahuluan' | 'faktor-pendorong' | 'bentuk-perubahan' | 'tantangan' | 'peluang' | 'kesiapan' | 'konseling' | 'hasil-akhir';
  iconType: string;
  colorTheme: 'blue' | 'yellow' | 'green' | 'red' | 'purple' | 'teal' | 'pink';
  // SVG coordinates on the 1200x750 isometric canvas
  x: number;
  y: number;
  elevation: number; // 0 = floor, 1 = mid wall/bridge, 2 = elevated skybridge, 3 = floating sky
  itemData: DiagramItem;
}

// Convert all diagram items into 3D isometric mapped nodes
export const MAZE_3D_NODES: Maze3DNode[] = [
  // ==========================================
  // ZONE 1: FAKTOR PENDORONG (Floating in the Sky above Left/Entrance)
  // ==========================================
  {
    id: 'fp-inovasi',
    title: 'Inovasi Teknologi',
    shortTitle: 'Inovasi',
    category: 'Faktor Pendorong',
    zone: 'faktor-pendorong',
    iconType: 'trending-up',
    colorTheme: 'blue',
    x: 170,
    y: 130,
    elevation: 3,
    itemData: DIAGRAM_SECTIONS.faktorPendorong.items![0]
  },
  {
    id: 'fp-ai',
    title: 'AI & Otomatisasi',
    shortTitle: 'AI & Otomasi',
    category: 'Faktor Pendorong',
    zone: 'faktor-pendorong',
    iconType: 'cpu',
    colorTheme: 'blue',
    x: 270,
    y: 110,
    elevation: 3,
    itemData: DIAGRAM_SECTIONS.faktorPendorong.items![1]
  },
  {
    id: 'fp-efisiensi',
    title: 'Kebutuhan Efisiensi',
    shortTitle: 'Efisiensi',
    category: 'Faktor Pendorong',
    zone: 'faktor-pendorong',
    iconType: 'cloud',
    colorTheme: 'blue',
    x: 370,
    y: 110,
    elevation: 3,
    itemData: DIAGRAM_SECTIONS.faktorPendorong.items![2]
  },
  {
    id: 'fp-globalisasi',
    title: 'Globalisasi & Konektivitas',
    shortTitle: 'Globalisasi',
    category: 'Faktor Pendorong',
    zone: 'faktor-pendorong',
    iconType: 'globe',
    colorTheme: 'blue',
    x: 470,
    y: 125,
    elevation: 3,
    itemData: DIAGRAM_SECTIONS.faktorPendorong.items![3]
  },

  // ==========================================
  // ZONE 2: 1. PENDAHULUAN & 2. BENTUK PERUBAHAN (Left Terrace of Maze)
  // ==========================================
  {
    id: 'bp-teknologi-ai',
    title: 'Teknologi & AI',
    shortTitle: 'Teknologi AI',
    category: 'Bentuk Perubahan',
    zone: 'bentuk-perubahan',
    iconType: 'bot',
    colorTheme: 'yellow',
    x: 230,
    y: 280,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.bentukPerubahan.items![0]
  },
  {
    id: 'bp-sistem-digital',
    title: 'Sistem Digital',
    shortTitle: 'Sistem Digital',
    category: 'Bentuk Perubahan',
    zone: 'bentuk-perubahan',
    iconType: 'cloud-upload',
    colorTheme: 'yellow',
    x: 320,
    y: 240,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.bentukPerubahan.items![1]
  },
  {
    id: 'bp-data',
    title: 'Data & Analitik',
    shortTitle: 'Data',
    category: 'Bentuk Perubahan',
    zone: 'bentuk-perubahan',
    iconType: 'bar-chart',
    colorTheme: 'yellow',
    x: 290,
    y: 335,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.bentukPerubahan.items![2]
  },
  {
    id: 'bp-pola-kerja',
    title: 'Pola Kerja (Hybrid/Remote)',
    shortTitle: 'Pola Kerja',
    category: 'Bentuk Perubahan',
    zone: 'bentuk-perubahan',
    iconType: 'home',
    colorTheme: 'yellow',
    x: 380,
    y: 300,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.bentukPerubahan.items![3]
  },
  {
    id: 'bp-komunikasi-digital',
    title: 'Komunikasi Digital',
    shortTitle: 'Komunikasi',
    category: 'Bentuk Perubahan',
    zone: 'bentuk-perubahan',
    iconType: 'message-circle',
    colorTheme: 'yellow',
    x: 440,
    y: 260,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.bentukPerubahan.items![4]
  },

  // ==========================================
  // ZONE 3: 4. TANTANGAN BAGI PEKERJA (In the Winding Maze Ground & Dead Ends)
  // ==========================================
  {
    id: 'tp-adaptasi-teknologi',
    title: 'Harus Beradaptasi Teknologi',
    shortTitle: 'Adaptasi Baru',
    category: 'Tantangan Pekerja',
    zone: 'tantangan',
    iconType: 'cog',
    colorTheme: 'red',
    x: 250,
    y: 475,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![0]
  },
  {
    id: 'tp-upskilling-reskilling',
    title: 'Kebutuhan Upskilling & Reskilling',
    shortTitle: 'Upskilling',
    category: 'Tantangan Pekerja',
    zone: 'tantangan',
    iconType: 'book-open',
    colorTheme: 'red',
    x: 345,
    y: 520,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![1]
  },
  {
    id: 'tp-keamanan-data',
    title: 'Keamanan dan Privasi Data',
    shortTitle: 'Keamanan Data',
    category: 'Tantangan Pekerja',
    zone: 'tantangan',
    iconType: 'shield',
    colorTheme: 'red',
    x: 430,
    y: 480,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![2]
  },
  {
    id: 'tp-perubahan-peran',
    title: 'Perubahan Peran Akibat Otomatisasi',
    shortTitle: 'Perubahan Peran',
    category: 'Tantangan Pekerja',
    zone: 'tantangan',
    iconType: 'alert-triangle',
    colorTheme: 'red',
    x: 520,
    y: 545,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![3]
  },
  {
    id: 'tp-tekanan-stres',
    title: 'Tekanan Psikologis & Stres',
    shortTitle: 'Tekanan & Stres',
    category: 'Tantangan Pekerja',
    zone: 'tantangan',
    iconType: 'brain',
    colorTheme: 'red',
    x: 615,
    y: 505,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![4]
  },
  {
    id: 'tp-batas-kerja',
    title: 'Batas Kerja & Kehidupan Pribadi',
    shortTitle: 'Work-Life Balance',
    category: 'Tantangan Pekerja',
    zone: 'tantangan',
    iconType: 'clock-alert',
    colorTheme: 'red',
    x: 705,
    y: 560,
    elevation: 0,
    itemData: DIAGRAM_SECTIONS.tantanganPekerja.items![5]
  },

  // ==========================================
  // ZONE 4: 3. PELUANG BAGI PEKERJA (Elevated Skybridge Shortcut Soaring Above)
  // ==========================================
  {
    id: 'pp-produktivitas',
    title: 'Meningkatkan Produktivitas Kerja',
    shortTitle: 'Produktivitas',
    category: 'Peluang Pekerja',
    zone: 'peluang',
    iconType: 'rocket',
    colorTheme: 'green',
    x: 410,
    y: 195,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![0]
  },
  {
    id: 'pp-kesempatan-global',
    title: 'Kesempatan Kerja Global & Freelance',
    shortTitle: 'Pasar Global',
    category: 'Peluang Pekerja',
    zone: 'peluang',
    iconType: 'globe-2',
    colorTheme: 'green',
    x: 500,
    y: 215,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![1]
  },
  {
    id: 'pp-pelatihan-online',
    title: 'Pengembangan Keterampilan Online',
    shortTitle: 'Pelatihan Online',
    category: 'Peluang Pekerja',
    zone: 'peluang',
    iconType: 'graduation-cap',
    colorTheme: 'green',
    x: 585,
    y: 235,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![2]
  },
  {
    id: 'pp-pekerjaan-baru',
    title: 'Munculnya Jenis Pekerjaan Baru',
    shortTitle: 'Pekerjaan Baru',
    category: 'Peluang Pekerja',
    zone: 'peluang',
    iconType: 'briefcase',
    colorTheme: 'green',
    x: 670,
    y: 255,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![3]
  },
  {
    id: 'pp-kolaborasi-luas',
    title: 'Kolaborasi Lebih Luas Tanpa Batas',
    shortTitle: 'Kolaborasi Luas',
    category: 'Peluang Pekerja',
    zone: 'peluang',
    iconType: 'users',
    colorTheme: 'green',
    x: 755,
    y: 280,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![4]
  },
  {
    id: 'pp-fleksibilitas-waktu',
    title: 'Fleksibilitas Waktu & Lokasi Kerja',
    shortTitle: 'Fleksibilitas',
    category: 'Peluang Pekerja',
    zone: 'peluang',
    iconType: 'clock',
    colorTheme: 'green',
    x: 835,
    y: 310,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.peluangPekerja.items![5]
  },

  // ==========================================
  // ZONE 5: 5. KESIAPAN PEKERJA (Central Middle Pedestal Nodes)
  // ==========================================
  {
    id: 'kp-teknis',
    title: 'Keterampilan Teknis (Penguasaan Teknologi)',
    shortTitle: 'Skill Teknis',
    category: 'Kesiapan Pekerja',
    zone: 'kesiapan',
    iconType: 'laptop',
    colorTheme: 'purple',
    x: 480,
    y: 375,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.kesiapanPekerja.items![0]
  },
  {
    id: 'kp-sosial',
    title: 'Keterampilan Sosial (Komunikasi & Kerja Sama)',
    shortTitle: 'Skill Sosial',
    category: 'Kesiapan Pekerja',
    zone: 'kesiapan',
    iconType: 'users-group',
    colorTheme: 'purple',
    x: 560,
    y: 350,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.kesiapanPekerja.items![1]
  },
  {
    id: 'kp-adaptasi',
    title: 'Kemampuan Adaptasi (Menghadapi Perubahan)',
    shortTitle: 'Daya Adaptasi',
    category: 'Kesiapan Pekerja',
    zone: 'kesiapan',
    iconType: 'refresh-cw',
    colorTheme: 'purple',
    x: 645,
    y: 380,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.kesiapanPekerja.items![2]
  },
  {
    id: 'kp-kemandirian',
    title: 'Kemandirian Belajar (Continuous Learning)',
    shortTitle: 'Belajar Mandiri',
    category: 'Kesiapan Pekerja',
    zone: 'kesiapan',
    iconType: 'book',
    colorTheme: 'purple',
    x: 725,
    y: 355,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.kesiapanPekerja.items![3]
  },
  {
    id: 'kp-psikologis',
    title: 'Kesiapan Psikologis (Kelola Stres & Mental)',
    shortTitle: 'Mental Tangguh',
    category: 'Kesiapan Pekerja',
    zone: 'kesiapan',
    iconType: 'heart',
    colorTheme: 'purple',
    x: 805,
    y: 395,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.kesiapanPekerja.items![4]
  },

  // ==========================================
  // ZONE 6: 6. KONSELING DUNIA USAHA DAN INDUSTRI (DUDI) (Right Exit Plateau)
  // ==========================================
  {
    id: 'kd-nasihat',
    title: 'Pemberian Nasihat Karier',
    shortTitle: 'Pemberian Nasihat',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'message-square',
    colorTheme: 'teal',
    x: 890,
    y: 220,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![0]
  },
  {
    id: 'kd-dukungan-emosional',
    title: 'Dukungan Emosional',
    shortTitle: 'Dukungan Emosi',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'heart-circle',
    colorTheme: 'teal',
    x: 975,
    y: 245,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![1]
  },
  {
    id: 'kd-ketegangan',
    title: 'Pengenduran Ketegangan Emosional',
    shortTitle: 'Relaksasi Stres',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'lotus',
    colorTheme: 'teal',
    x: 915,
    y: 295,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![2]
  },
  {
    id: 'kd-penjernihan',
    title: 'Penjernihan Pemikiran',
    shortTitle: 'Penjernihan',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'brain-circuit',
    colorTheme: 'teal',
    x: 1000,
    y: 320,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![3]
  },
  {
    id: 'kd-komunikasi-efektif',
    title: 'Komunikasi Efektif di Tempat Kerja',
    shortTitle: 'Komunikasi',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'handshake',
    colorTheme: 'teal',
    x: 930,
    y: 375,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![4]
  },
  {
    id: 'kd-adaptasi-perubahan',
    title: 'Adaptasi Terhadap Perubahan Industri',
    shortTitle: 'Adaptasi Industri',
    category: 'Konseling DUDI',
    zone: 'konseling',
    iconType: 'sync-circle',
    colorTheme: 'teal',
    x: 1015,
    y: 400,
    elevation: 1,
    itemData: DIAGRAM_SECTIONS.konselingDudi.items![5]
  },

  // ==========================================
  // ZONE 7: 7. HASIL AKHIR (The Golden Destination Arch on Far Right)
  // ==========================================
  {
    id: 'ha-sukses',
    title: 'Hasil Akhir: Pekerja Tangguh & Siap Hadapi Perubahan',
    shortTitle: 'Pekerja Tangguh Siap Masa Depan',
    category: 'Hasil Akhir',
    zone: 'hasil-akhir',
    iconType: 'target',
    colorTheme: 'pink',
    x: 1060,
    y: 480,
    elevation: 2,
    itemData: DIAGRAM_SECTIONS.hasilAkhir.items![0]
  }
];
