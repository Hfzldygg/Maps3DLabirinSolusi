export interface MazeNode {
  id: string;
  stepNumber: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: 'Gerbang Awal' | 'Disrupsi & Perubahan' | 'Jalan Berliku & Rintangan' | 'Jalur Pintas Solusi' | 'Tujuan Sukses';
  pathType: 'entry' | 'winding' | 'shortcut' | 'destination';
  summary: string;
  fullDescription: string;
  keyPoints: {
    title: string;
    description: string;
    metric?: string;
  }[];
  realWorldExample: {
    title: string;
    caseStudy: string;
    impact: string;
  };
  actionableTips: string[];
  reflectionQuestion: string;
  color: {
    primary: string;
    glow: string;
    border: string;
    bgBadge: string;
  };
  speechScript: string;
  // Positioning percentage on the map (0-100)
  mapCoords: {
    x: number;
    y: number;
    elevation?: number;
  };
}

export const MAZE_NODES: MazeNode[] = [
  {
    id: 'pendahuluan',
    stepNumber: '01',
    title: 'Pendahuluan: Gerbang Disrupsi',
    shortTitle: 'Pendahuluan',
    subtitle: 'Titik awal perjalanan di era transformasi teknologi yang tak terelakkan',
    category: 'Gerbang Awal',
    pathType: 'entry',
    summary: 'Pintu masuk menuju realitas baru dunia kerja di mana otomasi, kecerdasan buatan, dan Society 5.0 menuntut kesiapan adaptasi setiap individu.',
    fullDescription: 'Dunia kerja saat ini tidak lagi linier seperti beberapa dekade lalu. Memasuki era Society 5.0 dan Revolusi Industri 4.0, setiap pencari kerja, mahasiswa, dan profesional berdiri di ambang gerbang labirin yang penuh ketidakpastian. Teknologi bukan lagi sekadar alat bantu, melainkan katalisator yang merevolusi cara industri beroperasi. Memahami titik awal ini adalah kunci agar tidak terjebak dalam disorientasi karier.',
    keyPoints: [
      {
        title: 'Pergeseran Paradigma',
        description: 'Transisi dari kerja manual administratif ke kolaborasi manusia dan sistem kecerdasan buatan.',
        metric: '85M+ pekerjaan global terdiversifikasi'
      },
      {
        title: 'Kompleksitas Labirin',
        description: 'Banyak lulusan merasa tersesat karena kurikulum konvensional belum sepenuhnya sinkron dengan kebutuhan dinamis pasar.',
        metric: '72% pelamar butuh upskilling'
      },
      {
        title: 'Pentingnya Kesadaran Diri',
        description: 'Memulai dari mengenali minat, kekuatan unik diri, serta kesiapan mental menghadapi dinamika kerja yang cepat.',
        metric: 'Mindset adaptif adalah modal utama'
      }
    ],
    realWorldExample: {
      title: 'Kisah Lulusan Baru di Sektor Administrasi',
      caseStudy: 'Budi, sarjana administrasi bisnis yang terbiasa dengan pembukuan manual, mendapati bahwa 80% tugas pencatatan di perusahaan incarannya telah diotomatisasi oleh software ERP berbasis AI.',
      impact: 'Menyadari bahwa pintu masuk dunia kerja modern membutuhkan literasi data dan pemahaman sistem digital, bukan sekadar hafalan manual.'
    },
    actionableTips: [
      'Lakukan audit keterampilan pribadi (Skill Inventory Audit) secara berkala.',
      'Ikuti perkembangan tren industri target melalui publikasi resmi dan forum profesional.',
      'Tanamkan growth mindset: siap belajar kembali (re-learn) dan melupakan cara lama yang usang (un-learn).'
    ],
    reflectionQuestion: 'Apakah keterampilan yang Anda miliki saat ini sudah relevan dengan kebutuhan industri digital 3–5 tahun ke depan?',
    color: {
      primary: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.4)',
      border: 'border-sky-400',
      bgBadge: 'bg-sky-500/20 text-sky-300'
    },
    speechScript: 'Tahap pertama adalah Pendahuluan. Ini merupakan gerbang masuk menuju kompleksitas dunia kerja era Society 5.0. Di titik ini, kita menyadari bahwa teknologi telah merombak lanskap industri, dan setiap individu dituntut memiliki kesadaran adaptif untuk memulai navigasi karier.',
    mapCoords: { x: 14, y: 76, elevation: 1 }
  },
  {
    id: 'bentuk-perubahan',
    stepNumber: '02',
    title: 'Bentuk Perubahan: Transformasi Digital',
    shortTitle: 'Bentuk Perubahan',
    subtitle: 'Dinamika pergeseran model kerja, otomatisasi AI, dan tuntutan fleksibilitas baru',
    category: 'Disrupsi & Perubahan',
    pathType: 'winding',
    summary: 'Identifikasi wujud nyata transformasi industri: kerja jarak jauh, sistem cerdas, ekonomi gig, dan integrasi big data dalam operasional harian.',
    fullDescription: 'Di persimpangan pertama labirin, kita menyaksikan perubahan bentuk secara masif. Pekerjaan repetitif digantikan oleh algoritma, sementara pekerjaan bernilai tambah tinggi menuntut keahlian analitis, empati manusia, dan kreativitas yang tidak bisa ditiru mesin. Pola kerja pun bermutasi dari jam kantor kaku menjadi ekosistem fleksibel tanpa batasan geografis.',
    keyPoints: [
      {
        title: 'Otomatisasi & AI Generatif',
        description: 'Penggunaan kecerdasan buatan untuk pembuatan konten, analisis prediksi, coding asistif, dan otomasi alur kerja rutin.',
        metric: '40% efisiensi waktu kerja'
      },
      {
        title: 'Model Kerja Fleksibel & Hybrid',
        description: 'Kombinasi kerja WFH, asynchronous communication, dan kolaborasi tim lintas negara.',
        metric: '68% profesional pilih hybrid'
      },
      {
        title: 'Permintaan Keterampilan Baru',
        description: 'Tuntutan mendesak pada critical thinking, computational thinking, data storytelling, dan kecerdasan emosional.',
        metric: 'Top 5 skill paling dicari DUDI'
      }
    ],
    realWorldExample: {
      title: 'Transformasi Industri Perbankan & Layanan Finansial',
      caseStudy: 'Bank-bank besar menutup puluhan kantor cabang fisik dan mengalihkan customer service ke chatbot AI serta banking app, sementara kebutuhan tenaga data engineer dan cyber security meningkat 300%.',
      impact: 'Pekerja lini depan harus beralih peran menjadi financial consultant strategis atau product specialist teknologi.'
    },
    actionableTips: [
      'Pelajari cara memanfaatkan AI tools (prompt engineering, tools otomasi) untuk melipatgandakan produktivitas Anda.',
      'Kembangkan portofolio digital yang dapat diakses secara publik (GitHub, LinkedIn, personal website).',
      'Latih kemampuan komunikasi asinkron yang efektif, ringkas, dan jelas.'
    ],
    reflectionQuestion: 'Sejauh mana Anda menggunakan kecerdasan buatan dalam mempermudah tugas sehari-hari Anda saat ini?',
    color: {
      primary: '#818cf8',
      glow: 'rgba(129, 140, 248, 0.4)',
      border: 'border-indigo-400',
      bgBadge: 'bg-indigo-500/20 text-indigo-300'
    },
    speechScript: 'Tahap kedua adalah Bentuk Perubahan. Di sini kita melihat bagaimana teknologi mentransformasi cara kita bekerja: otomatisasi proses, adopsi AI, hingga pola kerja hybrid dan fleksibel. Mereka yang memahami bentuk perubahan ini dapat mengantisipasi langkah berikutnya.',
    mapCoords: { x: 30, y: 38, elevation: 1 }
  },
  {
    id: 'tantangan-era-5',
    stepNumber: '03',
    title: 'Tantangan Era 5.0: Lorong Berliku & Jebakan',
    shortTitle: 'Tantangan Era 5.0',
    subtitle: 'Rintangan disrupsi, kesenjangan keahlian, dan risiko kebingungan arah karier',
    category: 'Jalan Berliku & Rintangan',
    pathType: 'winding',
    summary: 'Metafora lorong berliku dan jalan buntu: VUCA, kesenjangan antara teori akademis dengan kebutuhan industri riil, serta kelelahan mental digital.',
    fullDescription: 'Dalam labirin kerja, lorong ini adalah zona di mana banyak orang tersesat. Tanpa bimbingan yang tepat, pencari kerja terjebak dalam siklus melamar ratusan kali tanpa panggilan, mengalami kelelahan mental (burnout), atau mengejar keterampilan yang sudah usang. Fenomena mismatch atau kesenjangan kompetensi menjadi dinding pembatas yang menjebak mereka dalam lorong buntu.',
    keyPoints: [
      {
        title: 'Skill Gap (Kesenjangan Keterampilan)',
        description: 'Kesenjangan antara apa yang diajarkan di institusi pendidikan formal dengan kecepatan evolusi kebutuhan industri nyata.',
        metric: '60% fresh graduate alami mismatch'
      },
      {
        title: 'Kompetisi Global Tanpa Batas',
        description: 'Persaingan kerja kini berskala internasional karena perusahaan global dapat merekrut talenta dari belahan dunia mana pun.',
        metric: 'Rasio pelamar per posisi naik 5x'
      },
      {
        title: 'Disorientasi & Kelelahan Mental',
        description: 'Tekanan over-information, sindrom imposter, dan stres akibat ketidakpastian jalur karier yang terus berubah.',
        metric: 'Tantangan psikologis no. 1 era digital'
      }
    ],
    realWorldExample: {
      title: 'Jebakan Lamaran Massal Tanpa Diferensiasi',
      caseStudy: 'Seorang pencari kerja mengirimkan 500 CV seragam menggunakan fitur "Easy Apply" di platform karir dan tidak pernah mendapat panggilan wawancara karena tersaring oleh sistem ATS (Applicant Tracking System).',
      impact: 'Menghabiskan waktu berbulan-bulan di lorong buntu tanpa pernah mengevaluasi relevansi skill dan strategi penargetan lowongan.'
    },
    actionableTips: [
      'Hentikan mengirim lamaran massal generik; kustomisasi lamaran sesuai kriteria industri spesifik.',
      'Petakan kesenjangan skill diri dengan membandingkan kualifikasi lowongan impian terhadap profil saat ini.',
      'Kelola kesehatan mental dan hindari membandingkan diri secara toksik di media sosial profesional.'
    ],
    reflectionQuestion: 'Apa rintangan terbesar yang sedang Anda rasakan saat mencoba menembus dunia industri modern?',
    color: {
      primary: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.4)',
      border: 'border-amber-400',
      bgBadge: 'bg-amber-500/20 text-amber-300'
    },
    speechScript: 'Tahap ketiga adalah Tantangan Era 5.0. Ini adalah lorong berliku dan jalan buntu dalam labirin. Kesenjangan keterampilan, kompetisi ketat, dan kebingungan arah karier sering membuat para pencari kerja terhenti di sini.',
    mapCoords: { x: 48, y: 72, elevation: 1 }
  },
  {
    id: 'peluang-positif',
    stepNumber: '04',
    title: 'Peluang Positif: Jalur Pintas Terang',
    shortTitle: 'Peluang Positif',
    subtitle: 'Jembatan layang bercahaya yang melompati lorong berliku menuju masa depan cerah',
    category: 'Jalur Pintas Solusi',
    pathType: 'shortcut',
    summary: 'Jembatan elevasi bercahaya: kemunculan profesi baru, akses belajar tak terbatas, demokratisasi wirausaha digital, dan akselerasi karir.',
    fullDescription: 'Inilah jalur pintas yang membelah labirin dari atas! Teknologi bukan hanya membawa tantangan, tetapi juga menciptakan samudra peluang baru yang belum pernah ada sebelumnya. Melalui peningkatan keahlian (upskilling), sertifikasi kredibel, dan pemanfaatan ekosistem digital, seseorang dapat melompati rintangan konvensional dan melesat lebih cepat menuju puncak karier.',
    keyPoints: [
      {
        title: 'Kemunculan Profesi Masa Depan',
        description: 'Munculnya pekerjaan bergaji tinggi seperti AI Prompt Engineer, Data Scientist, Cloud Architect, dan UX Strategist.',
        metric: '97M pekerjaan baru tercipta'
      },
      {
        title: 'Demokratisasi Pengetahuan',
        description: 'Akses gratis dan terjangkau ke kursus kelas dunia dari universitas dan perusahaan global ternama.',
        metric: 'Belajar mandiri kapan saja & di mana saja'
      },
      {
        title: 'Wirausaha Digital & Freelancing Global',
        description: 'Kemampuan menjual keahlian atau produk langsung ke pasar global dalam mata uang asing dari meja kerja rumah.',
        metric: 'Akses ke klien di 190+ negara'
      }
    ],
    realWorldExample: {
      title: 'Akselerasi Karir Lewat Portofolio Terfokus',
      caseStudy: 'Siti, mahasiswa vokasi yang mempelajari machine learning dan prompt engineering secara otodidak, membangun mini-project AI untuk UMKM lokal. Portofolio tersebut menarik perhatian startup fintech multinasional.',
      impact: 'Ia langsung direkrut sebelum wisuda dengan posisi Junior AI Specialist, melompati jalur antrean lamaran kerja biasa.'
    },
    actionableTips: [
      'Fokus pada 1–2 keahlian bernilai tinggi (high-income skills) yang sedang sangat dicari industri.',
      'Bangun proyek nyata (proof of work) daripada sekadar mengoleksi sertifikat kehadiran seminar.',
      'Manfaatkan jejaring profesional untuk berinteraksi dengan praktisi industri aktif.'
    ],
    reflectionQuestion: 'Peluang baru apa di bidang Anda yang belum dimanfaatkan oleh mayoritas teman sebaya Anda?',
    color: {
      primary: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.5)',
      border: 'border-cyan-400',
      bgBadge: 'bg-cyan-500/20 text-cyan-300'
    },
    speechScript: 'Tahap keempat adalah Peluang Positif. Ini merupakan jalur pintas melayang yang terang di atas labirin. Dengan menguasai keterampilan masa depan dan membangun portofolio riil, Anda dapat melompati jalan berliku dan melesat maju.',
    mapCoords: { x: 65, y: 42, elevation: 2 }
  },
  {
    id: 'konseling-dudi',
    stepNumber: '05',
    title: 'Konseling DUDI: Pintu Gerbang Kesuksesan',
    shortTitle: 'Konseling DUDI',
    subtitle: 'Kemitraan strategis Dunia Usaha & Industri sebagai kompas penunjuk jalan akhir',
    category: 'Tujuan Sukses',
    pathType: 'destination',
    summary: 'Pintu keluar bercahaya emas: sinergi bimbingan karier terstruktur, pemagangan bersertifikat, dan link-and-match dengan industri nyata.',
    fullDescription: 'Tujuan akhir dari labirin ini bukanlah sekadar keluar, melainkan melangkah mantap melalui pintu gerbang kesuksesan bersama DUDI (Dunia Usaha dan Dunia Industri). Konseling karier profesional, program magang industri berstandar, serta mentoring dari praktisi senior adalah kompas definitif yang menjamin talenta muda tidak hanya mendapatkan pekerjaan, melainkan membangun karier yang bermakna dan berkelanjutan.',
    keyPoints: [
      {
        title: 'Program Link & Match Nyata',
        description: 'Penyelarasan kurikulum pendidikan dengan standar kompetensi kerja terkini yang digunakan langsung oleh industri.',
        metric: '90%+ serapan kerja magang terakreditasi'
      },
      {
        title: 'Bimbingan Karier & Mentorship Ahli',
        description: 'Konseling one-on-one untuk membedah potensi, simulasi wawancara kerja, dan perencanaan jalur karier jangka panjang.',
        metric: 'Meningkatkan rasa percaya diri hingga 3x lipat'
      },
      {
        title: 'Sertifikasi Kompetensi Industri Terpercaya',
        description: 'Validasi resmi keahlian yang diakui oleh asosiasi profesi dan regulator ketenagakerjaan nasional maupun internasional.',
        metric: 'Nilai tawar profesional lebih tinggi'
      }
    ],
    realWorldExample: {
      title: 'Program Sinergi Vokasi & Konsorsium Industri',
      caseStudy: 'Sebuah institusi pendidikan menjalin kemitraan erat dengan 15 perusahaan teknologi. Mahasiswa mengikuti program konseling karier intensif sejak semester 4 dan magang selama 6 bulan di proyek riil.',
      impact: '94% peserta langsung dikontrak kerja penuh bahkan sebelum ijazah formal mereka diterbitkan.'
    },
    actionableTips: [
      'Aktif mencari dan memanfaatkan layanan bimbingan konseling karier di kampus atau lembaga tepercaya.',
      'Ikuti program magang resmi bersertifikat (Certified Internship) yang melibatkan proyek industri riil.',
      'Jadikan mentor industri sebagai penasihat dalam mengambil keputusan karier krusial.'
    ],
    reflectionQuestion: 'Sudahkah Anda berkonsultasi dengan mentor atau konselor karier untuk memvalidasi rencana masa depan Anda?',
    color: {
      primary: '#34d399',
      glow: 'rgba(52, 211, 153, 0.4)',
      border: 'border-emerald-400',
      bgBadge: 'bg-emerald-500/20 text-emerald-300'
    },
    speechScript: 'Tahap kelima adalah Konseling DUDI. Pintu gerbang bercahaya terang di ujung labirin. Melalui kolaborasi dengan Dunia Usaha dan Dunia Industri, bimbingan karier terarah, serta magang bersertifikat, kita berhasil menuntaskan labirin dan meraih kesuksesan karier yang berkelanjutan.',
    mapCoords: { x: 86, y: 35, elevation: 1 }
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    targetNodeId: string;
    scoreDescription: string;
  }[];
}

export const CAREER_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Bagaimana perasaan Anda saat memikirkan masa depan dunia kerja dengan kemajuan pesat AI saat ini?',
    options: [
      {
        text: 'Masih merasa bingung dan belum tahu harus mulai belajar dari mana.',
        targetNodeId: 'pendahuluan',
        scoreDescription: 'Anda berada di gerbang awal (Pendahuluan). Membangun kesadaran diri adalah langkah pertama.'
      },
      {
        text: 'Sadar akan perubahan dan mulai mengamati tools AI yang populer.',
        targetNodeId: 'bentuk-perubahan',
        scoreDescription: 'Anda sedang memetakan Bentuk Perubahan. Lanjutkan eksplorasi teknologi baru!'
      },
      {
        text: 'Sering merasa cemas karena banyak lowongan mensyaratkan pengalaman yang sulit dipenuhi.',
        targetNodeId: 'tantangan-era-5',
        scoreDescription: 'Anda sedang menghadapi Tantangan Era 5.0. Jangan putus asa, ada jalur pintas untuk Anda.'
      },
      {
        text: 'Sangat antusias memanfaatkan AI dan aktif membangun portofolio keahlian baru.',
        targetNodeId: 'peluang-positif',
        scoreDescription: 'Anda sudah berada di Jalur Pintas Peluang Positif! Pertahankan momentum ini.'
      }
    ]
  },
  {
    id: 2,
    question: 'Apa langkah paling dominan yang Anda lakukan saat ini untuk mempersiapkan karier?',
    options: [
      {
        text: 'Membaca artikel dan mencari tahu profesi apa saja yang tren.',
        targetNodeId: 'pendahuluan',
        scoreDescription: 'Tahap eksplorasi awal yang bagus untuk memperluas cakrawala.'
      },
      {
        text: 'Mengirimkan lamaran ke berbagai platform lowongan kerja konvensional.',
        targetNodeId: 'tantangan-era-5',
        scoreDescription: 'Hati-hati terjebak di lorong berliku lamaran massal tanpa diferensiasi.'
      },
      {
        text: 'Mengerjakan proyek nyata, studi kasus, atau freelance mandiri.',
        targetNodeId: 'peluang-positif',
        scoreDescription: 'Langkah cerdas melewati rintangan dengan portofolio riil.'
      },
      {
        text: 'Mengikuti program magang industri dan berdiskusi intensif dengan mentor karier.',
        targetNodeId: 'konseling-dudi',
        scoreDescription: 'Hebat! Anda berada di koridor Konseling DUDI yang membuka gerbang kesuksesan.'
      }
    ]
  },
  {
    id: 3,
    question: 'Jika menghadapi kebuntuan dalam mencari karier impian, kepada siapa Anda meminta saran?',
    options: [
      {
        text: 'Belum pernah meminta saran, memikirkannya sendiri dalam hati.',
        targetNodeId: 'pendahuluan',
        scoreDescription: 'Waktunya keluar dari kesendirian dan mencari bimbingan terarah.'
      },
      {
        text: 'Curhat ke teman sebaya yang kondisinya serupa.',
        targetNodeId: 'tantangan-era-5',
        scoreDescription: 'Teman baik untuk dukungan emosi, namun Anda membutuhkan mentor berpengalaman.'
      },
      {
        text: 'Mencari tutorial online, podcast pakar industri, dan buku pengembangan diri.',
        targetNodeId: 'peluang-positif',
        scoreDescription: 'Mental pembelajar mandiri yang baik menuju jalur akselerasi.'
      },
      {
        text: 'Berkonsultasi dengan konselor karier, dosen pembimbing, atau praktisi industri langsung.',
        targetNodeId: 'konseling-dudi',
        scoreDescription: 'Tepat sasaran! Konseling DUDI memangkas waktu Anda tersesat di labirin.'
      }
    ]
  }
];
