# 🌌 Zelyff — Developer & Server Admin Portfolio

<div align="center">

[![Live Portfolio](https://img.shields.io/badge/Live%20Demo-zelyff.github.io%2Fportofolio-6366f1?style=for-the-badge&logo=githubpages&logoColor=white)](https://zelyff.github.io/portofolio/)
[![Stack](https://img.shields.io/badge/Stack-Vanilla%20HTML5%20%7C%20CSS3%20%7C%20ES6+-f59e0b?style=for-the-badge&logo=javascript&logoColor=white)]()
[![Build & Tests](https://img.shields.io/badge/Verification-PASS%20(20%20Pages%20%7C%20795%20Refs)-10b981?style=for-the-badge&logo=checkmarx&logoColor=white)]()
[![Platform](https://img.shields.io/badge/Ecosystem-Minecraft%201.21%20%7C%20Discord%20AI-06b6d4?style=for-the-badge&logo=minecraft&logoColor=white)]()
[![License](https://img.shields.io/badge/License-MIT-3b82f6?style=for-the-badge)]()

**Portofolio resmi dan pusat dokumentasi sistem milik Zelyff.**  
*Server Administrator & Developer di AlamNusa RPG • High-Performance Systems • Zero-Dependency Architecture*

[🌐 Live Demo](https://zelyff.github.io/portofolio/) •
[👤 Profil Pengembang](#-tentang-zelyff) •
[🏛️ Arsitektur Website](#️-arsitektur-teknis-portofolio) •
[💎 Proyek Unggulan](#-proyek-unggulan-alamnusa-ecosystem) •
[📁 Struktur Repositori](#-struktur-repositori) •
[🛠️ Menjalankan & Membangun](#️-panduan-pengembangan--build) •
[🛡️ Audit Forensik](#-audit-forensik--jaminan-kualitas)

---

</div>

## 📌 Ringkasan Proyek

Repositori ini memuat kode sumber dari **website portofolio personal dan portal dokumentasi interaktif Zelyff**. 

Website ini dirancang bukan sekadar sebagai halaman etalase statis biasa, melainkan sebagai sebuah platform dokumentasi dwibahasa (**Indonesia & Inggris**) berkinerja tinggi yang ditenagai oleh *static generation engine* berbasis Node.js murni (**zero runtime dependencies**). Seluruh data proyek, dokumentasi teknis, dan visual interaktif terhubung langsung ke satu sumber kebenaran (*single source of truth*) di `content/projects.json`.

---

## 👤 Tentang Zelyff

* **Peran Utama**: Server Administrator & Systems Developer di **AlamNusa** (Komunitas & Server Minecraft MMORPG Season 7, aktif sejak Oktober 2025).
* **Filosofi Teknis**: *"Membangun, bereksperimen, dan belajar lewat sistem yang nyata."*
* **Fokus Utama**:
  * **Arsitektur Server Minecraft**: Optimasi performa Paper/Purpur 1.21.4+, pencegahan lag tick, integrasi entitas Display modern, dan mitigasi exploit inventory.
  * **Rekayasa Perangkat Lunak Java**: Pembuatan plugin kustom menggunakan Java 21, State Machine deterministik, sinkronisasi stat MMOItems/MythicLib, serta arsitektur persistensi *Zero Data Loss*.
  * **Kecerdasan Buatan (AI) & Bot Komunitas**: Pengembangan bot asisten Discord generasi baru dengan arsitektur Retrieval-Augmented Generation (RAG) multi-model (Google Gemini 3.6 Flash / 3.5 Flash Lite) dan visi multimodal.
  * **Web Development**: Web statis modern, estetika minimalist terinspirasi antarmuka GitHub, tipografi presisi, dan performa akses instan.

---

## 🏛️ Arsitektur Teknis Portofolio

Situs portofolio ini dibangun dengan filosofi **kecepatan maksimal, aksesibilitas tinggi, dan nol bloatware**:

```mermaid
flowchart LR
    A["content/projects.json<br/>(Katalog Proyek)"] --> C["scripts/sync-content.cjs<br/>(Static Sync Engine)"]
    B["content/docs/*/*.md<br/>(Markdown Dokumentasi)"] --> C
    D["js/translations.js<br/>(Kamus ID / EN)"] --> C
    
    C --> E["index.html<br/>(Beranda Portofolio)"]
    C --> F["projects/index.html<br/>(Arsip Katalog)"]
    C --> G["docs/ & docs/en/<br/>(20 Halaman Portal Panduan)"]
    C --> H["js/doc-search-data.js<br/>(Indeks Pencarian In-Memory)"]
    
    C --> I["scripts/check.cjs<br/>(Automated Forensic Audit)"]
    I --> J{"Validasi Lulus?<br/>795 Refs, 0 Duplicate IDs"}
    J -->|PASS| K["dist/<br/>(Production Artifacts)"]
```

### Keunggulan Rekayasa Web:
1. **Zero-Dependency Static Engine**: Generator dokumen dan sinkronisasi halaman bekerja menggunakan modul bawaan Node.js (`fs`, `path`, `vm`, `assert`). Tidak membutuhkan instalasi ribuan paket `node_modules` hanya untuk mengompilasi halaman.
2. **Instant Anti-FOUC Theme Switcher**: Script inisialisasi tema `js/theme.js` dieksekusi secara sinkron di tag `<head>`, menjamin tidak ada kedipan warna (*Flash of Unstyled Content*) saat berganti antara mode gelap dan terang.
3. **Pencarian Dokumentasi Client-Side Instan**: Pencarian artikel pada portal dokumentasi membaca indeks tokenized `js/doc-search-data.js` secara langsung di memori browser dengan pencocokan instan tanpa latensi API backend.
4. **Sistem Dwibahasa (ID / EN) Penuh**: Dukungan penuh bahasa Indonesia dan Inggris untuk seluruh antarmuka beranda, arsip katalog, dan 20 halaman dokumentasi teknis mendalam.
5. **Tipografi & Desain GitHub Klasik**: Mengombinasikan font modern Google Fonts (*Space Grotesk*, *Inter*, dan *JetBrains Mono*) dengan kartu status Mac Terminal interaktif yang menampilkan waktu lokal WIB secara live.
6. **Keamanan Sanitasi XSS Berlapis**: Parser Markdown kustom (`scripts/lib/markdown.cjs`) dan renderer kartu proyek menerapkan escaping karakter ketat terhadap tag `<script>`, atribut injeksi, dan skema URL berbahaya.

---

## 💎 Proyek Unggulan (AlamNusa Ecosystem)

Portofolio ini mendokumentasikan 4 sistem perangkat lunak utama yang dibangun dari kebutuhan nyata komunitas AlamNusa:

### 1. 🍳 NusaCooking — 3D Interactive Cooking Station
* **Teknologi**: Java 21, Paper 1.21.4+, Nexo 1.0.0+, JOML Transforms.
* **Deskripsi**: Sistem memasak modular RPG 3D berbasis entitas modern **Display Entities** (`ItemDisplay` & Mojang `Interaction`) tanpa lag tick dan bebas glitch blok vanilla.
* **Fitur Utama**:
  * **Finite State Machine (FSM)** deterministik 6 fase: `IDLE` ➔ `PREPARING` ➔ `COOKING` ➔ `READY_TO_COLLECT` ➔ `BURNT`.
  * **Minigame Interaktif (QTE)**: Mengaduk (*Stir*), membalik (*Flip*), dan memotong (*Chop*) dengan indikator *sweetspot* Action Bar.
  * **Sistem Bintang (1-5 Bintang) & Nutrisi**: Terintegrasi langsung dengan Paper `FoodComponent` (Food Level, Saturation, dan potion effects).
  * **Zero-Loss Persistence**: Serialisasi snapshot byte array menggunakan Bukkit `PersistentDataContainer` (PDC). Bahan dan countdown gosong tetap aman walau server restart mendadak.
  * **Proteksi Klaim & Co-op**: Kompatibel dengan GriefPrevention, WorldGuard, dan RedProtect.

---

### 2. 🗡️ NusaInv — Next-Gen RPG Equipment & Accessory System
* **Teknologi**: Java 21, Paper 1.21.4+, MMOItems 6.10+, MythicLib 1.7+.
* **Deskripsi**: Sistem inventaris aksesori RPG (Cincin, Kalung, Artefak, Relik) kelas enterprise dengan jaminan **Zero Data Loss**.
* **Fitur Utama**:
  * **Storage Engine Transaksional**: Menggunakan snapshot byte array *immutable* di memori sebelum penulisan disk, antrean *single-worker serialized queue*, dan *write-ahead journaling* (`.pending.yml` ditukar secara `ATOMIC_MOVE`).
  * **Isolasi State `FAILED`**: File playerdata yang rusak tidak akan pernah ditimpa dengan data kosong saat pemain logout.
  * **Multi-Provider Visual Resolver**: Mendukung native Minecraft 1.21.2+ `item_model` Data Components, Nexo, ItemsAdder, Oraxen, MMOItems, dan CMD klasik.
  * **Smart Offhand Restrictor**: Mencegah eksploitasi stat ganda dari senjata berat/dua tangan (Pedang, Tombak, Tongkat Sihir, Busur) di tangan kiri tanpa mengganggu perisai atau totem vanilla.
  * **Stash & Recovery Engine**: Mengalihkan aksesori yang tertinggal akibat tas penuh atau izin slot kedaluwarsa ke antrean `/equipment recover`.
  * **Pengujian**: 36/36 Unit Tests lulus 100%.

---

### 3. 🛡️ NusaSkBlocker — Per-World AuraSkills Hard Suppression
* **Teknologi**: Java 21, Paper 1.21.4+, AuraSkills 2.2.4+.
* **Deskripsi**: Utilitas supresi mekanik AuraSkills berbasis dunia (*per-world*) secara deterministik, granular, dan **100% non-destruktif**.
* **Fitur Utama**:
  * **100% Non-Destructive**: Progres level, XP, dan stat pemain di database AuraSkills **tidak pernah disentuh atau diubah**. Stat hanya ditarik sementara saat berada di dunia nonaktif.
  * **Dual-Layer Architecture**:
    1. *Primary (High Performance Reflection)*: Injeksi langsung ke internal `BukkitWorldManager.disabledWorlds` (`ConcurrentHashSet`) dan pemanggilan `StatManager.reloadAllTraits`.
    2. *Secondary (Event Fallback)*: Intersepsi ketat event Bukkit (`XpGainEvent`, `ManaAbilityActivateEvent`, `LootDropEvent`, `CustomRegenEvent`) dan pembersihan langsung `AttributeModifier`.
  * **Kontrol Fitur Granular**: Supresi independen per-fitur (`xp`, `stats`, `abilities`, `actionbar`).
  * **Decoupled Action Bar HUD Forwarder**: Jembatan `ActionBarBridge` mandiri yang tetap menampilkan HUD HP & Mana walau stat sedang diblokir di dungeon.
  * **Dukungan Dynamic Dungeons (SWM)**: Trie pattern resolver dengan pencocokan wildcard *longest-prefix* (misal `dng_*`).
  * **Anti-Spam State Guard & Safe Config Migration (v2)**.
  * **Pengujian**: 21/21 Unit Tests lulus 100%.

---

### 4. 🌿 GogoAssistant (Gogo) — Discord AI Community Assistant
* **Teknologi**: Node.js >= 22, discord.js v14.27.0, Google Gemini 3.6 Flash / 3.5 Flash Lite, OpenRouter.
* **Deskripsi**: Bot asisten AI komunitas resmi server Minecraft AlamNusa Season 7 dengan arsitektur RAG modular.
* **Fitur Utama**:
  * **Multi-Provider AI Cascade**: Model utama Gemini 3.6 Flash, siaga otomatis (*fast fallback*) ke Gemini 3.5 Flash Lite, dan cadangan lintas penyedia via OpenRouter.
  * **BM25 RAG Knowledge Retrieval**: Mengindeks 23 panduan resmi server AlamNusa dan sinkronisasi berkala channel pengumuman Discord tanpa restart bot.
  * **Gaya Bahasa Alami Gamer**: Anti-kaku, membersihkan garis pemisah markdown (`---`), menyajikan perbandingan komparatif luwes, dan memahami bahasa slang Minecraft komunitas.
  * **Alur Persetujuan Wiki Admin (`/wiki`)**: Pembuatan draf panduan via modal form Discord dan persetujuan instan satu klik via tombol interaktif.
  * **Notifikasi Kesenjangan Pengetahuan (Owner Gap Notification)**: Mengirimkan DM otomatis ke Owner server saat ada pertanyaan pemain yang belum tercakup di wiki.
  * **Visi Multimodal**: Menganalisis screenshot error crash Minecraft, tas NusaInv, dan resep custom.
  * **Pengujian**: 291/291 Unit Tests lulus 100%.

---

## 📁 Struktur Repositori

```text
portofolio/
├── .gitignore                   # Sanitasi Git (dist, cache, env, backup)
├── index.html                   # Halaman beranda portofolio utama (bilingual markup)
├── README.md                    # Dokumentasi resmi repositori ini
│
├── .project/                    # Arsip dokumentasi teknis mendalam dari 4 sistem utama
│   ├── READMEnusa sk blockker.md# Arsitektur & audit lengkap NusaSkBlocker
│   ├── READMEny NusaCooking.md  # Arsitektur & audit lengkap NusaCooking
│   ├── readmenya NusaInv.md     # Arsitektur & audit lengkap NusaInv
│   └── readmenya gogoassistant.md # Arsitektur & audit lengkap GogoAssistant
│
├── content/                     # SUMBER KONTEN UTAMA (Single Source of Truth)
│   ├── projects.json            # Katalog master proyek, status, tag, dan rute panduan
│   └── docs/                    # Berkas sumber Markdown dwibahasa
│       ├── gogoasisstant/       # overview.id.md, overview.en.md, komunitas.*.md
│       ├── nusacooking/         # overview.id.md, overview.en.md, alur-memasak.*.md
│       ├── nusainv/             # overview.id.md, overview.en.md, equipment.*.md
│       └── nusaskblocker/       # overview.id.md, overview.en.md, aturan-dunia.*.md
│
├── docs/                        # Hasil kompilasi portal dokumentasi publik
│   ├── index.html               # Portal panduan Indonesia
│   ├── en/index.html            # Portal panduan Inggris
│   ├── gogoasisstant/           # Halaman panduan ter-generate (ID & EN)
│   ├── nusacooking/
│   ├── nusainv/
│   └── nusaskblocker/
│
├── projects/                    # Halaman arsip seluruh proyek
│   └── index.html               # Katalog lengkap dengan filter dinamis
│
├── css/                         # Arsitektur CSS Vanilla Modular
│   ├── main.css                 # Token desain, variabel warna HSL, reset dasar
│   ├── components.css           # Komponen tombol, kartu status, navigasi, badge
│   ├── responsive.css           # Layout breakpoint dan drawer mobile
│   ├── polish.css               # Efek ambient, glow pencahayaan, dan grid kontur
│   └── pages.css                # Layout dokumentasi, sidebar, tabel, dan pencarian
│
├── js/                          # Arsitektur JavaScript ES6+
│   ├── theme.js                 # Anti-FOUC theme detector
│   ├── translations.js          # Kamus terjemahan antarmuka (ID & EN)
│   ├── projects.js              # Renderer kartu proyek, flow preview, & console
│   ├── main.js                  # Interaksi beranda, jam WIB, scroll & filter
│   ├── docs.js                  # Handler pencarian lokal, sidebar, & TOC
│   ├── project-data.js          # Generated window.PORTFOLIO_DATA
│   └── doc-search-data.js       # Generated window.DOC_SEARCH_INDEX
│
├── scripts/                     # Generator & Verifikasi Otomatis (Node.js 18+)
│   ├── sync-content.cjs         # Sinkronisasi konten beranda, generate 20 halaman docs
│   ├── check.cjs                # Audit statis mendalam (link, H1, XSS, translasi)
│   ├── check-evolution.cjs      # Sandbox test untuk pengujian penambahan proyek
│   ├── build.cjs                # Generator folder rilis publik (dist/)
│   ├── generated-pages.json     # Manifest halaman ter-generate
│   └── lib/
│       ├── markdown.cjs         # Parser markdown aman bersanitasi
│       └── pages.cjs            # Generator shell HTML dwibahasa
│
└── assets/                      # Aset gambar, ikon, dan vektor grafis
    ├── contours.svg             # Tekstur latar belakang garis kontur
    ├── og-image.png             # Banner Open Graph & Twitter Cards
    └── icons/                   # Favicon SVG dan ikon sistem
```

---

## 🛠️ Panduan Pengembangan & Build

Website ini siap dijalankan secara lokal tanpa perlu mengunduh package manager atau menjalankan `npm install`.

### 1. Menjalankan Situs Secara Lokal
Cukup buka berkas `index.html` langsung di browser Anda, atau gunakan ekstensi live server ringan:
```bash
# Contoh menggunakan npx serve (opsional)
npx serve .
```

### 2. Menyinkronkan Konten & Menghasilkan Halaman
Ketika Anda memperbarui `content/projects.json` atau mengedit dokumen di `content/docs/`, jalankan:
```bash
node scripts/sync-content.cjs
```
*Skrip ini akan memperbarui kartu beranda, menyinkronkan data proyek, mengompilasi 20 halaman HTML panduan (ID & EN), serta memperbarui indeks pencarian in-memory.*

### 3. Menjalankan Pengujian Forensik & Integritas
Sebelum melakukan commit atau push ke GitHub, verifikasi integritas kode dengan:
```bash
node scripts/check.cjs
```
Output yang diharapkan:
```text
PASS: 4 data-driven projects; 20 HTML pages; 795 local references; counts, ID/EN, Markdown safety and search index.
```

### 4. Menguji Evolusi Proyek Terisolasi
Untuk menguji penambahan proyek atau kategori baru tanpa memengaruhi berkas asli:
```bash
node scripts/check-evolution.cjs
```

### 5. Membangun Direktori Distribusi (`dist/`)
Untuk menghasilkan bundel rilis siap pakai ke layanan hosting dengan output folder:
```bash
node scripts/build.cjs
```
Folder `dist/` akan berisi seluruh halaman publik yang bersih dan siap diunggah.

---

## 🌐 Panduan Deployment (GitHub Pages)

### Deployment dari Root Repository
Repositori ini telah disiapkan untuk **GitHub Pages** langsung dari branch `main`:
1. Masuk ke **Settings** ➔ **Pages** pada repositori GitHub Anda.
2. Di bagian **Build and deployment**, pilih **Source**: `Deploy from a branch`.
3. Pilih branch `main` dan folder `/(root)`.
4. Simpan, dan situs Anda akan aktif di `https://zelyff.github.io/portofolio/`.

### Menggunakan Custom Domain / URL Khusus
Jika Anda mempublikasikan repositori ini di domain kustom atau URL berbeda, atur variabel lingkungan sebelum menjalankan sinkronisasi:
```bash
# Windows PowerShell
$env:PORTFOLIO_SITE_URL="https://namadomainanda.com/"
node scripts/sync-content.cjs

# Linux / macOS
PORTFOLIO_SITE_URL="https://namadomainanda.com/" node scripts/sync-content.cjs
```

---

## 🛡️ Audit Forensik & Jaminan Kualitas

Sistem portofolio ini dibangun dengan disiplin rekayasa yang ketat:

| Kriteria Audit | Status | Metodologi & Hasil |
| :--- | :---: | :--- |
| **Integritas Link Lokal** | ✅ **100% Valid** | 795 tautan internal dan anchor antarhalaman diverifikasi tanpa satu pun link rusak (*dead link*). |
| **Hirarki Heading SEO** | ✅ **100% Sesuai** | Setiap halaman tepat memiliki satu tag `<h1>` yang unik dan relevan. |
| **Pencegahan Injeksi XSS** | ✅ **Hardened** | Renderer kartu dan Markdown menolak tag `<script>`, escaping atribut, dan skema `javascript:`. |
| **Simetri Terjemahan** | ✅ **100% Sinkron** | Seluruh kunci kamus terjemahan `id` dan `en` pada `translations.js` identik secara simetris. |
| **Zero Runtime Bloat** | ✅ **0 Dependencies** | Berjalan mulus di browser modern tanpa JavaScript runtime framework eksternal. |
| **Aksesibilitas & Gerak** | ✅ **A11y Compliant** | Mendukung keyboard navigation, pembaca layar ARIA, kontras tinggi, dan `prefers-reduced-motion`. |

---

## 🤝 Kontak & Komunitas

* **Pengembang**: **Zelyff**
* **Discord**: [Buka Profil Discord (ID: 1375486504373190776)](https://discord.com/users/1375486504373190776)
* **GitHub**: [@Zelyff](https://github.com/Zelyff)
* **Server Komunitas**: AlamNusa Minecraft Server & Community

---

<div align="center">

<sub>Dikelola dengan penuh ketelitian oleh Zelyff • Masih belajar, masih membangun.</sub>

</div>
