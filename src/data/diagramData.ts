export interface DiagramItem {
  id: string;
  title: string;
  category: string;
  sectionNumber: string;
  iconType: string;
  bulletPoints?: string[];
  shortDesc?: string;
  detailedExplanation: string;
  practicalExample: string;
  actionableStep: string;
  colorTheme: 'blue' | 'yellow' | 'green' | 'red' | 'purple' | 'teal' | 'pink';
}

export interface DiagramSection {
  id: string;
  numberBadge: string;
  title: string;
  subtitle?: string;
  colorTheme: 'blue' | 'yellow' | 'green' | 'red' | 'purple' | 'teal' | 'pink';
  items?: DiagramItem[];
  introText?: string;
}

export const DIAGRAM_SECTIONS: Record<string, DiagramSection> = {
  pendahuluan: {
    id: 'pendahuluan',
    numberBadge: '1. Pendahuluan',
    title: 'Pendahuluan: Transformasi Teknologi Digital',
    colorTheme: 'purple',
    introText: 'Perkembangan teknologi digital telah mengubah cara manusia bekerja, berkomunikasi, mengelola pekerjaan, dan mengembangkan karier. Teknologi tidak hanya digunakan sebagai alat bantu, tetapi juga menjadi bagian penting dalam proses kerja sehari-hari. Perubahan ini menciptakan berbagai peluang bagi pekerja, sekaligus menghadirkan tantangan yang membutuhkan kemampuan beradaptasi.'
  },
  faktorPendorong: {
    id: 'faktor-pendorong',
    numberBadge: 'Faktor Pendorong',
    title: 'Faktor Pendorong Perubahan',
    colorTheme: 'blue',
    items: [
      {
        id: 'fp-inovasi',
        title: 'Inovasi Teknologi',
        category: 'Faktor Pendorong Perubahan',
        sectionNumber: 'Faktor Pendorong',
        iconType: 'trending-up',
        shortDesc: 'Kemajuan pesat teknologi digital dan komputasi.',
        detailedExplanation: 'Inovasi teknologi yang bergerak eksponensial (seperti AI, IoT, cloud, dan jaringan 5G) memaksa seluruh industri memperbarui cara mereka menciptakan produk dan melayani pelanggan. Perusahaan yang lambat mengadopsi inovasi akan tertinggal dari kompetisi pasar modern.',
        practicalExample: 'Perpindahan toko ritel fisik ke omnichannel e-commerce dan sistem logistik otomatis berbasis algoritma rute tercepat.',
        actionableStep: 'Selalu luangkan waktu 30 menit setiap minggu untuk mempelajari pembaruan teknologi terkini di sektor keahlian Anda.',
        colorTheme: 'blue'
      },
      {
        id: 'fp-ai',
        title: 'AI & Otomatisasi',
        category: 'Faktor Pendorong Perubahan',
        sectionNumber: 'Faktor Pendorong',
        iconType: 'cpu',
        shortDesc: 'Penerapan kecerdasan buatan dalam proses operasional.',
        detailedExplanation: 'Kecerdasan buatan mampu melakukan analisis data rumit, otomasi penulisan laporan rutin, hingga deteksi anomali dalam hitungan detik. Hal ini mendorong industri merestrukturisasi alur kerja dari manual menjadi berbasis AI.',
        practicalExample: 'Penggunaan generative AI untuk menyusun draf kode program, merancang materi pemasaran, dan melayani tiket bantuan teknis secara otomatis 24/7.',
        actionableStep: 'Pelajari prompt engineering dan integrasikan minimal 2 tools AI ke dalam pekerjaan rutin harian Anda.',
        colorTheme: 'blue'
      },
      {
        id: 'fp-efisiensi',
        title: 'Kebutuhan Efisiensi',
        category: 'Faktor Pendorong Perubahan',
        sectionNumber: 'Faktor Pendorong',
        iconType: 'cloud',
        shortDesc: 'Tuntutan penghematan biaya dan kecepatan operasional.',
        detailedExplanation: 'Persaingan pasar menuntut perusahaan memangkas biaya operasional, mempercepat time-to-market, dan mengurangi kesalahan manusia (human error) melalui standardisasi sistem digital terpusat.',
        practicalExample: 'Peralihan dari arsip dokumen kertas dan tanda tangan fisik ke cloud document management dengan verifikasi digital bersertifikat.',
        actionableStep: 'Identifikasi proses kerja Anda yang masih lambat dan cari alternatif software otomasi yang dapat mempercepatnya.',
        colorTheme: 'blue'
      },
      {
        id: 'fp-globalisasi',
        title: 'Globalisasi dan Konektivitas',
        category: 'Faktor Pendorong Perubahan',
        sectionNumber: 'Faktor Pendorong',
        iconType: 'globe',
        shortDesc: 'Pasar kerja global yang terhubung tanpa batasan geografis.',
        detailedExplanation: 'Internet berkecepatan tinggi memungkinkan kolaborasi tim lintas benua secara real-time. Perusahaan dapat mempekerjakan talenta terbaik dari belahan bumi mana pun tanpa memikirkan lokasi kantor fisik.',
        practicalExample: 'Perusahaan teknologi di Amerika Serikat mempekerjakan software engineer dan desainer grafis dari Indonesia secara remote penuh.',
        actionableStep: 'Tingkatkan kemampuan bahasa Inggris profesional dan bangun profil LinkedIn berskala internasional.',
        colorTheme: 'blue'
      }
    ]
  },
  bentukPerubahan: {
    id: 'bentuk-perubahan',
    numberBadge: '2. Bentuk Perubahan',
    title: 'Bentuk Perubahan di Dunia Kerja',
    colorTheme: 'yellow',
    items: [
      {
        id: 'bp-teknologi-ai',
        title: 'Teknologi & AI',
        category: 'Bentuk Perubahan',
        sectionNumber: '02',
        iconType: 'bot',
        bulletPoints: [
          'Kecerdasan buatan (AI)',
          'Robotika',
          'Chatbot',
          'Sistem otomatis'
        ],
        detailedExplanation: 'Integrasi teknologi kecerdasan buatan dan robotika telah mentransformasi pekerjaan administratif dan berulang. Mesin kini mampu mengenali pola, memproses bahasa alami manusia, dan menjalankan tugas mekanis dengan tingkat akurasi tinggi.',
        practicalExample: 'Customer service di industri perbankan yang kini ditangani oleh AI Chatbot cerdas yang mampu menyelesaikan 80% pertanyaan nasabah tanpa campur tangan manusia.',
        actionableStep: 'Kuasai keterampilan kolaboratif dengan AI—fokus pada keahlian analitis, empati, dan pengawasan strategis atas hasil keluaran AI.',
        colorTheme: 'yellow'
      },
      {
        id: 'bp-sistem-digital',
        title: 'Sistem Digital',
        category: 'Bentuk Perubahan',
        sectionNumber: '02',
        iconType: 'cloud-upload',
        bulletPoints: [
          'Cloud computing',
          'Database',
          'Aplikasi kerja',
          'Sistem informasi'
        ],
        detailedExplanation: 'Seluruh infrastruktur kerja berpindah dari server lokal ke komputasi awan (Cloud). Hal ini memungkinkan aksesibilitas data kapan saja, skalabilitas tak terbatas, serta integrasi antar software kerja perusahaan.',
        practicalExample: 'Penggunaan ekosistem Google Workspace, AWS Cloud, dan software ERP yang saling terhubung dalam satu dasbor terpadu.',
        actionableStep: 'Pahami dasar arsitektur data cloud dan biasakan bekerja secara terorganisir di ruang penyimpanan digital kolaboratif.',
        colorTheme: 'yellow'
      },
      {
        id: 'bp-data',
        title: 'Data',
        category: 'Bentuk Perubahan',
        sectionNumber: '02',
        iconType: 'bar-chart',
        bulletPoints: [
          'Big data',
          'Analisis data',
          'Dashboard',
          'Data-driven decision making'
        ],
        detailedExplanation: 'Keputusan bisnis tidak lagi didasarkan pada intuisi semata, melainkan didukung data akurat real-time. Kemampuan membaca, menganalisis, dan memvisualisasikan data menjadi keahlian wajib di hampir seluruh lini profesi.',
        practicalExample: 'Tim pemasaran menganalisis dashboard konversi iklan digital untuk mengalokasikan anggaran secara dinamis ke target audiens yang menghasilkan laba tertinggi.',
        actionableStep: 'Pelajari dasar-dasar visualisasi data menggunakan tools seperti Looker Studio, Tableau, atau Power BI.',
        colorTheme: 'yellow'
      },
      {
        id: 'bp-pola-kerja',
        title: 'Pola Kerja',
        category: 'Bentuk Perubahan',
        sectionNumber: '02',
        iconType: 'home',
        bulletPoints: [
          'Work from home',
          'Hybrid working',
          'Remote working',
          'Fleksibilitas kerja'
        ],
        detailedExplanation: 'Konsep kehadiran fisik di kantor 9-to-5 telah bergeser ke arah fleksibilitas berbasis pencapaian target kerja (output-based performance). Karyawan memiliki otonomi lebih besar untuk menentukan ritme kerjanya.',
        practicalExample: 'Banyak perusahaan teknologi menerapkan sistem 3 hari kerja dari kantor dan 2 hari kerja dari rumah (hybrid), atau bahkan sistem remote 100%.',
        actionableStep: 'Tingkatkan manajemen waktu mandiri dan disiplin pribadi saat bekerja tanpa pengawasan langsung di rumah.',
        colorTheme: 'yellow'
      },
      {
        id: 'bp-komunikasi-digital',
        title: 'Komunikasi Digital',
        category: 'Bentuk Perubahan',
        sectionNumber: '02',
        iconType: 'message-circle',
        bulletPoints: [
          'Email',
          'Chat/WhatsApp',
          'Video conference (Zoom/Meet)',
          'Platform kolaborasi'
        ],
        detailedExplanation: 'Pertemuan tatap muka digantikan rapat virtual dan komunikasi teks asinkron (Slack, Teams, Discord, WhatsApp). Komunikasi yang efektif kini menuntut kejelasan tulisan, etika digital, dan dokumentasi yang rapi.',
        practicalExample: 'Koordinasi proyek lintas departemen diselesaikan melalui kartu tugas di Trello/Jira dan diskusi asinkron di Slack tanpa perlu rapat panjang.',
        actionableStep: 'Biasakan menulis pesan kerja yang ringkas, terstruktur (menggunakan poin), dan menyertakan konteks lengkap.',
        colorTheme: 'yellow'
      }
    ]
  },
  peluangPekerja: {
    id: 'peluang-pekerja',
    numberBadge: '3. Peluang bagi Pekerja',
    title: 'Peluang Positif bagi Pekerja di Era Digital',
    colorTheme: 'green',
    items: [
      {
        id: 'pp-produktivitas',
        title: 'Meningkatkan produktivitas kerja',
        category: 'Peluang bagi Pekerja',
        sectionNumber: '03',
        iconType: 'rocket',
        detailedExplanation: 'Penggunaan software otomasi, template cerdas, dan alat bantu AI memungkinkan pekerja menuntaskan tugas dalam hitungan jam yang dahulu memakan waktu berhari-hari.',
        practicalExample: 'Pekerja konten dapat membuat riset artikel, merancang grafik media sosial, dan menjadwalkan publikasi dalam waktu separuh lebih cepat.',
        actionableStep: 'Automasi tugas-tugas rutin yang berulang menggunakan shortcut, script, atau integrasi aplikasi.',
        colorTheme: 'green'
      },
      {
        id: 'pp-kesempatan-global',
        title: 'Memperluas kesempatan kerja (global & freelance)',
        category: 'Peluang bagi Pekerja',
        sectionNumber: '03',
        iconType: 'globe-2',
        detailedExplanation: 'Pekerja di kota mana pun di Indonesia kini dapat melamar pekerjaan freelance atau kontrak penuh dengan perusahaan luar negeri tanpa harus meninggalkan kampung halaman.',
        practicalExample: 'Penerjemah atau web developer Indonesia yang memiliki klien dari Singapura, Australia, dan Eropa via platform Upwork atau Fiverr.',
        actionableStep: 'Buat portofolio online berbahasa Inggris dan daftar di platform freelance global tepercaya.',
        colorTheme: 'green'
      },
      {
        id: 'pp-pelatihan-online',
        title: 'Pengembangan keterampilan melalui pelatihan online',
        category: 'Peluang bagi Pekerja',
        sectionNumber: '03',
        iconType: 'graduation-cap',
        detailedExplanation: 'Akses pendidikan dan sertifikasi bergengsi kini terbuka lebar melalui platform MOOC (Coursera, Udemy, edX, Dicoding), memungkinkan siapa pun belajar langsung dari pakar dunia.',
        practicalExample: 'Lulusan non-IT berhasil beralih karir menjadi UI/UX Designer setelah menyelesaikan bootcamp online selama 6 bulan.',
        actionableStep: 'Ikuti minimal satu kursus online bersertifikasi per semester untuk memperbarui portofolio Anda.',
        colorTheme: 'green'
      },
      {
        id: 'pp-pekerjaan-baru',
        title: 'Munculnya jenis pekerjaan baru',
        category: 'Peluang bagi Pekerja',
        sectionNumber: '03',
        iconType: 'briefcase',
        detailedExplanation: 'Revolusi teknologi melahirkan berbagai profesi baru yang belum ada 10 tahun lalu: AI Prompt Engineer, Cloud Security Specialist, Data Scientist, hingga Community Manager Web3.',
        practicalExample: 'Profesi Prompt Engineer dan AI Ethics Officer kini banyak dicari oleh perusahaan rintisan dan korporasi multinasional.',
        actionableStep: 'Perhatikan lowongan kerja rintisan dan kuasai kombinasi skill unik yang jarang dimiliki orang lain.',
        colorTheme: 'green'
      },
      {
        id: 'pp-kolaborasi-luas',
        title: 'Kolaborasi lebih luas tanpa batas tempat',
        category: 'Peluang bagi Pekerja',
        sectionNumber: '03',
        iconType: 'users',
        detailedExplanation: 'Kemampuan berjejaring dan bekerja sama dengan talenta-talenta luar biasa dari berbagai negara memperkaya wawasan budaya, profesionalitas, dan jaringan kerja.',
        practicalExample: 'Proyek open-source berskala dunia yang dikembangkan bersama oleh ribuan programmer dari 50 negara berbeda.',
        actionableStep: 'Bergabunglah dalam komunitas profesional global di Discord, Reddit, atau grup LinkedIn sesuai minat keahlian Anda.',
        colorTheme: 'green'
      },
      {
        id: 'pp-fleksibilitas-waktu',
        title: 'Fleksibilitas waktu dan lokasi kerja',
        category: 'Peluang bagi Pekerja',
        sectionNumber: '03',
        iconType: 'clock',
        detailedExplanation: 'Kebebasan mengatur jam kerja produktif terbaik masing-masing individu serta fleksibilitas menjadi digital nomad yang dapat bekerja dari mana saja.',
        practicalExample: 'Pekerja remote yang dapat menyesuaikan waktu kerja di pagi hari dan beristirahat atau mengurus keluarga di siang hari sesuai ritme hidupnya.',
        actionableStep: 'Gunakan teknik time blocking atau Pomodoro untuk menjaga efisiensi kerja mandiri saat waktu kerja fleksibel.',
        colorTheme: 'green'
      }
    ]
  },
  tantanganPekerja: {
    id: 'tantangan-pekerja',
    numberBadge: '4. Tantangan bagi Pekerja',
    title: 'Tantangan & Rintangan bagi Pekerja',
    colorTheme: 'red',
    items: [
      {
        id: 'tp-adaptasi-teknologi',
        title: 'Harus beradaptasi dengan teknologi baru',
        category: 'Tantangan bagi Pekerja',
        sectionNumber: '04',
        iconType: 'cog',
        detailedExplanation: 'Siklus hidup teknologi semakin pendek; software atau sistem kerja yang dikuasai hari ini bisa jadi usang dalam waktu 2–3 tahun ke depan, menuntut pembelajaran konstan.',
        practicalExample: 'Staf keuangan yang puluhan tahun menggunakan program akuntansi desktop manual terpaksa belajar sistem cloud ERP berbasis kecerdasan buatan.',
        actionableStep: 'Tanamkan mentalitas pembelajar seumur hidup (lifelong learner) dan jangan takut mencoba software versi baru.',
        colorTheme: 'red'
      },
      {
        id: 'tp-upskilling-reskilling',
        title: 'Kebutuhan upskilling & reskilling',
        category: 'Tantangan bagi Pekerja',
        sectionNumber: '04',
        iconType: 'book-open',
        detailedExplanation: 'Pekerja dituntut untuk terus meningkatkan keahlian yang ada (upskilling) atau bahkan mempelajari keterampilan yang sama sekali baru (reskilling) agar tetap relevan di pasar kerja.',
        practicalExample: 'Desainer grafis cetak konvensional harus melakukan reskilling menjadi desainer UI/UX dan motion graphic interaktif.',
        actionableStep: 'Identifikasi 3 skill yang paling sering muncul di lowongan kerja impian Anda dan buat rencana belajar 90 hari.',
        colorTheme: 'red'
      },
      {
        id: 'tp-keamanan-data',
        title: 'Keamanan dan privasi data',
        category: 'Tantangan bagi Pekerja',
        sectionNumber: '04',
        iconType: 'shield',
        detailedExplanation: 'Maraknya serangan siber, kebocoran data, dan penipuan phishing membuat setiap pekerja harus memiliki kesadaran tinggi mengenai keamanan siber dan perlindungan privasi data pribadi/perusahaan.',
        practicalExample: 'Pekerja remote yang lalai menghubungkan laptop kantor ke WiFi publik tanpa VPN rentan menyebabkan peretasan data rahasia klien.',
        actionableStep: 'Aktifkan Two-Factor Authentication (2FA) di seluruh akun kerja dan jangan gunakan password yang sama berulang kali.',
        colorTheme: 'red'
      },
      {
        id: 'tp-perubahan-peran',
        title: 'Perubahan peran akibat otomatisasi',
        category: 'Tantangan bagi Pekerja',
        sectionNumber: '04',
        iconType: 'alert-triangle',
        detailedExplanation: 'Pergeseran drastis tanggung jawab pekerjaan: tugas-tugas administratif rutin ditiadakan, digantikan peran pengawasan analitis dan pemecahan masalah tingkat lanjut.',
        practicalExample: 'Operator input data yang tugasnya dialihkan menjadi data validator dan auditor kualitas algoritma.',
        actionableStep: 'Tingkatkan keterampilan berpikir kritis dan kemampuan komunikasi interpersonal yang tidak dapat digantikan mesin.',
        colorTheme: 'red'
      },
      {
        id: 'tp-tekanan-stres',
        title: 'Tekanan psikologis dan stres',
        category: 'Tantangan bagi Pekerja',
        sectionNumber: '04',
        iconType: 'brain',
        detailedExplanation: 'Kecemasan akan kehilangan pekerjaan digantikan AI (AI anxiety), sindrom over-information, dan beban tuntutan respons instan di era digital memicu kelelahan mental (burnout).',
        practicalExample: 'Pekerja yang merasa cemas setiap akhir pekan karena notifikasi grup chat pekerjaan yang terus berdering tanpa henti.',
        actionableStep: 'Terapkan digital detox secara berkala dan bicarakan batasan beban kerja secara terbuka dengan atasan atau konselor.',
        colorTheme: 'red'
      },
      {
        id: 'tp-batas-kerja',
        title: 'Batas kerja dan kehidupan pribadi',
        category: 'Tantangan bagi Pekerja',
        sectionNumber: '04',
        iconType: 'clock-alert',
        detailedExplanation: 'Ketika rumah menjadi kantor, batas antara jam kerja dan waktu istirahat menjadi kabur (work-life blurring), menyebabkan jam kerja molor dan waktu untuk keluarga terkorbankan.',
        practicalExample: 'Karyawan yang masih membalas email dan mengerjakan revisi laporan di tempat tidur pada pukul 23.00 malam.',
        actionableStep: 'Tentukan jam cut-off kerja yang tegas setiap sore, matikan notifikasi aplikasi kerja di luar jam dinas.',
        colorTheme: 'red'
      }
    ]
  },
  kesiapanPekerja: {
    id: 'kesiapan-pekerja',
    numberBadge: '5. Kesiapan Pekerja',
    title: '5 Pilar Kesiapan Pekerja Menghadapi Masa Depan',
    colorTheme: 'purple',
    items: [
      {
        id: 'kp-teknis',
        title: 'Keterampilan teknis (penguasaan teknologi)',
        category: 'Kesiapan Pekerja',
        sectionNumber: '05',
        iconType: 'laptop',
        shortDesc: 'Penguasaan software kerja, sistem digital, dan literasi AI.',
        detailedExplanation: 'Fondasi teknis mencakup keahlian mengoperasikan tools digital inti di bidang profesi masing-masing, pemahaman alur data, hingga pemanfaatan alat bantu AI untuk meningkatkan efisiensi.',
        practicalExample: 'Menguasai software akuntansi cloud, spreadsheet tingkat lanjut (Pivot, Power Query), dan tools analisis otomatis.',
        actionableStep: 'Ambil ujian sertifikasi teknis resmi untuk membuktikan keahlian Anda di atas kertas.',
        colorTheme: 'purple'
      },
      {
        id: 'kp-sosial',
        title: 'Keterampilan sosial (komunikasi & kerja sama)',
        category: 'Kesiapan Pekerja',
        sectionNumber: '05',
        iconType: 'users-group',
        shortDesc: 'Kolaborasi tim, empati, diplomasi, dan negosiasi.',
        detailedExplanation: 'Di era mesin pintar, kualitas kemanusiaan justru semakin bernilai. Kemampuan mendengarkan secara aktif, menyampaikan gagasan rumit dengan bahasa sederhana, dan menyelesaikan konflik tim adalah soft-skill kunci.',
        practicalExample: 'Memimpin rapat koordinasi virtual antar divisi dengan santun, menjaga motivasi tim, dan memastikan semua anggota merasa dihargai.',
        actionableStep: 'Latih active listening saat rekan kerja berbicara: dengarkan tanpa menyela dan konfirmasi kembali pemahaman Anda.',
        colorTheme: 'purple'
      },
      {
        id: 'kp-adaptasi',
        title: 'Kemampuan adaptasi (menghadapi perubahan)',
        category: 'Kesiapan Pekerja',
        sectionNumber: '05',
        iconType: 'refresh-cw',
        shortDesc: 'Kelenturan mental dan kesiapan merangkul perubahan.',
        detailedExplanation: 'Kesiapan melepaskan metode kerja lama saat sistem baru diterapkan, serta kemampuan bangkit kembali secara cepat dari kegagalan eksperimen (resiliensi).',
        practicalExample: 'Cepat menyesuaikan diri saat kantor beralih dari satu platform manajemen proyek ke platform lain tanpa mengeluh berkepanjangan.',
        actionableStep: 'Ubah mindset dari "ini terlalu sulit" menjadi "bagaimana cara tercepat saya menguasai sistem baru ini?".',
        colorTheme: 'purple'
      },
      {
        id: 'kp-kemandirian',
        title: 'Kemandirian belajar (pembelajaran berkelanjutan)',
        category: 'Kesiapan Pekerja',
        sectionNumber: '05',
        iconType: 'book',
        shortDesc: 'Rasa ingin tahu dan inisiatif belajar otodidak.',
        detailedExplanation: 'Tidak menunggu disuruh atasan atau disubsidi kantor untuk belajar hal baru. Pekerja modern yang sukses memiliki kurikulum belajar mandiri sepanjang hayat.',
        practicalExample: 'Mempelajari bahasa pemrograman baru atau software desain 3D di waktu luang melalui dokumentasi resmi dan forum pengembang.',
        actionableStep: 'Tetapkan target membaca 1 buku pengembangan diri atau menyelesaikan 1 materi tutorial per bulan.',
        colorTheme: 'purple'
      },
      {
        id: 'kp-psikologis',
        title: 'Kesiapan psikologis (mengelola stres dan tekanan kerja)',
        category: 'Kesiapan Pekerja',
        sectionNumber: '05',
        iconType: 'heart',
        shortDesc: 'Kestabilan emosi, manajemen stres, dan kesehatan mental.',
        detailedExplanation: 'Kapasitas menjaga ketenangan diri saat deadline menumpuk, mengatasi sindrom ketidakmampuan (imposter syndrome), dan menjaga keseimbangan batin di tengah lingkungan yang cepat.',
        practicalExample: 'Menerapkan teknik pernapasan dan mindfulness singkat sebelum presentasi besar kepada jajaran direksi.',
        actionableStep: 'Rutin berolahraga ringan dan luangkan waktu istirahat yang berkualitas tanpa menatap layar gadget.',
        colorTheme: 'purple'
      }
    ]
  },
  konselingDudi: {
    id: 'konseling-dudi',
    numberBadge: '5. Konseling Dunia Usaha dan Industri (DUDI)',
    title: 'Konseling Dunia Usaha dan Industri (DUDI)',
    colorTheme: 'teal',
    items: [
      {
        id: 'kd-nasihat',
        title: 'Pemberian nasihat',
        category: 'Konseling DUDI',
        sectionNumber: '06',
        iconType: 'message-square',
        shortDesc: 'Membantu pekerja menentukan langkah yang tepat.',
        detailedExplanation: 'Konselor karier bersama praktisi DUDI memberikan arahan strategis mengenai jalur pengembangan profesi, pemilihan bidang spesialisasi, dan langkah konkret menembus pasar kerja.',
        practicalExample: 'Sesi konsultasi one-on-one untuk membedah resume dan memetakan perusahaan mana yang paling cocok dengan karakter pelamar.',
        actionableStep: 'Siapkan daftar pertanyaan spesifik tentang tujuan karier Anda sebelum bertemu dengan mentor atau konselor.',
        colorTheme: 'teal'
      },
      {
        id: 'kd-dukungan-emosional',
        title: 'Dukungan emosional',
        category: 'Konseling DUDI',
        sectionNumber: '06',
        iconType: 'heart-circle',
        shortDesc: 'Memberikan ruang untuk menyampaikan perasaan dan masalah.',
        detailedExplanation: 'Menciptakan ruang aman (safe space) bagi pekerja atau siswa untuk mengekspresikan ketakutan, kebingungan, dan beban emosional yang dialami selama mencari atau menjalani pekerjaan.',
        practicalExample: 'Konseling bagi pekerja yang baru saja mengalami pemutusan hubungan kerja (PHK) untuk memulihkan kepercayaan diri mereka.',
        actionableStep: 'Jangan memendam kecemasan sendirian; ungkapkan perasaan Anda kepada konselor profesional atau orang tepercaya.',
        colorTheme: 'teal'
      },
      {
        id: 'kd-ketegangan',
        title: 'Pengenduran ketegangan emosional',
        category: 'Konseling DUDI',
        sectionNumber: '06',
        iconType: 'lotus',
        shortDesc: 'Mengurangi tekanan dan stres kerja.',
        detailedExplanation: 'Teknik-teknik de-eskalasi stres, relaksasi mental, dan manajemen krisis emosi agar pekerja dapat terhindar dari keputusasaan dan kelelahan kronis.',
        practicalExample: 'Program Employee Assistance Program (EAP) di perusahaan yang menyediakan sesi konseling psikologis gratis bagi staf yang burnout.',
        actionableStep: 'Praktikkan jeda mikron (micro-breaks) 5 menit setiap 2 jam bekerja untuk merelaksasi otot bahu dan pikiran.',
        colorTheme: 'teal'
      },
      {
        id: 'kd-penjernihan',
        title: 'Penjernihan pemikiran',
        category: 'Konseling DUDI',
        sectionNumber: '06',
        iconType: 'brain-circuit',
        shortDesc: 'Membantu melihat masalah secara lebih terarah dan objektif.',
        detailedExplanation: 'Mengurai benang kusut masalah karier dari sudut pandang netral dan rasional, membantu memisahkan asumsi keliru dari fakta objektif yang dapat diselesaikan.',
        practicalExample: 'Membantu pekerja yang merasa "mentok" untuk menyadari bahwa sebenarnya yang bermasalah hanyalah metode komunikasinya, bukan kompetensi dasarnya.',
        actionableStep: 'Tuliskan masalah Anda di atas kertas dalam 3 kolom: Fakta yang Terjadi, Asumsi/Kekhawatiran Pribadi, dan Solusi Nyata.',
        colorTheme: 'teal'
      },
      {
        id: 'kd-komunikasi-efektif',
        title: 'Komunikasi efektif',
        category: 'Konseling DUDI',
        sectionNumber: '06',
        iconType: 'handshake',
        shortDesc: 'Meningkatkan hubungan dengan rekan kerja maupun pihak lain.',
        detailedExplanation: 'Bimbingan teknik komunikasi asertif, etika diplomasi kerja, penyampaian umpan balik (feedback) yang konstruktif, serta negosiasi profesional di tempat kerja.',
        practicalExample: 'Melatih karyawan cara berdiskusi mengenai kenaikan gaji atau penyesuaian beban kerja dengan atasan tanpa menimbulkan ketegangan.',
        actionableStep: 'Gunakan teknik komunikasi "I-statement" untuk menyampaikan kendala tanpa terdengar menyalahkan orang lain.',
        colorTheme: 'teal'
      },
      {
        id: 'kd-adaptasi-perubahan',
        title: 'Adaptasi terhadap perubahan',
        category: 'Konseling DUDI',
        sectionNumber: '06',
        iconType: 'sync-circle',
        shortDesc: 'Mendampingi pekerja dalam menghadapi teknologi, sistem kerja, dan tuntutan baru.',
        detailedExplanation: 'Pendampingan berkelanjutan (change management accompaniment) saat industri menerapkan perombakan organisasi, restrukturisasi teknologi, atau SOP baru.',
        practicalExample: 'Pendampingan transisi selama 3 bulan bagi seluruh staf saat divisi merger dengan anak perusahaan teknologi baru.',
        actionableStep: 'Terima kenyataan bahwa perubahan adalah keniscayaan, dan fokuskan energi pada hal-hal yang berada di bawah kendali Anda.',
        colorTheme: 'teal'
      }
    ]
  },
  hasilAkhir: {
    id: 'hasil-akhir',
    numberBadge: '6. Hasil Akhir',
    title: 'PEKERJA YANG LEBIH SIAP MENGHADAPI PERUBAHAN',
    colorTheme: 'pink',
    introText: 'Dengan dukungan konseling yang tepat, pekerja dapat memanfaatkan peluang, menghadapi tantangan, dan terus berkembang di era digital.',
    items: [
      {
        id: 'ha-sukses',
        title: 'Pekerja Tangguh & Adaptif Era Society 5.0',
        category: 'Hasil Akhir',
        sectionNumber: '06',
        iconType: 'target',
        detailedExplanation: 'Muara dari seluruh rangkaian kesiapan, pemahaman tantangan, pemanfaatan peluang, dan pendampingan konseling DUDI adalah lahirnya pekerja masa depan yang mandiri, adaptif, kompeten secara digital, dan sehat secara mental.',
        practicalExample: 'Tenaga kerja yang mampu bersinergi harmonis dengan AI, memiliki kepuasan batin tinggi dalam bekerja, dan berdaya saing global.',
        actionableStep: 'Teruslah mengasah diri, jaga kesehatan mental, dan jadilah agen perubahan positif di lingkungan kerja Anda!',
        colorTheme: 'pink'
      }
    ]
  }
};

export const getAllDiagramItems = (): DiagramItem[] => {
  const items: DiagramItem[] = [];
  if (DIAGRAM_SECTIONS.faktorPendorong.items) items.push(...DIAGRAM_SECTIONS.faktorPendorong.items);
  if (DIAGRAM_SECTIONS.bentukPerubahan.items) items.push(...DIAGRAM_SECTIONS.bentukPerubahan.items);
  if (DIAGRAM_SECTIONS.peluangPekerja.items) items.push(...DIAGRAM_SECTIONS.peluangPekerja.items);
  if (DIAGRAM_SECTIONS.tantanganPekerja.items) items.push(...DIAGRAM_SECTIONS.tantanganPekerja.items);
  if (DIAGRAM_SECTIONS.konselingDudi.items) items.push(...DIAGRAM_SECTIONS.konselingDudi.items);
  if (DIAGRAM_SECTIONS.hasilAkhir.items) items.push(...DIAGRAM_SECTIONS.hasilAkhir.items);
  return items;
};
