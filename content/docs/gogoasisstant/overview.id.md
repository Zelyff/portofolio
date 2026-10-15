## Ikhtisar GogoAsisstant

GogoAsisstant (Gogo) adalah bot asisten Discord bertenaga kecerdasan buatan (AI) generasi terbaru yang dirancang khusus untuk mendampingi komunitas dan server Minecraft **AlamNusa Season 7**.

Dibangun dengan Node.js (>=22) dan discord.js (v14.27.0), bot ini mengombinasikan arsitektur **Retrieval-Augmented Generation (RAG)** modular, pemahaman konteks server mendalam, gaya bahasa santai khas komunitas gamer Minecraft (anti-kaku), kontrol akses berjenjang (3-tier ACL), dan kemampuan analisis gambar multimodal.

## Arsitektur AI & Fitur Utama

- **Multi-Provider AI Cascade**: Google Gemini 3.6 Flash sebagai model utama berkecepatan tinggi, didukung Gemini 3.5 Flash Lite sebagai internal fallback, dan OpenRouter sebagai cadangan lintas penyedia.
- **RAG Knowledge Engine**: Mengindeks 23 panduan resmi server (relik, aksesoris, senjata RPG Tier 1-6, enchantments, ekonomi) menggunakan BM25 dan stemming teks.
- **Dynamic Channel Indexing**: Memantau channel pengumuman resmi dan memperbarui memori AI tanpa perlu restart bot.
- **Multimodal Vision**: Mendukung analisis screenshot error crash log, inventaris tas NusaInv, dan resep custom Minecraft.
- **Anti-Robotic Tone Formatting**: Membersihkan garis pembatas Markdown kaku (`---`) dan menyajikan perbandingan komparatif mengalir layaknya sesama player gamer.

## Daftar Perintah Slash

| Perintah | Hak Akses | Deskripsi |
| --- | --- | --- |
| `/ask <pertanyaan> [gambar]` | Publik | Mengajukan pertanyaan seputar AlamNusa dengan opsional lampiran gambar |
| `/ai memory <status>` | Publik | Mengaktifkan/menonaktifkan memori percakapan jangka panjang pengguna |
| `/wiki draft` | Admin | Membuka modal interaktif untuk membuat draf panduan wiki baru |
| `/wiki list` | Admin | Menampilkan daftar seluruh draf wiki yang menunggu persetujuan |
| `/status` | Publik | Memeriksa latensi gateway Discord, memori, dan penyedia AI aktif |
| `/reload` | Admin | Memuat ulang seluruh file pengetahuan dan sinkronisasi channel |

## Akses Proyek

GogoAsisstant telah melewati 291 unit test otomatis dengan tingkat kelulusan 100%. Bot ini beroperasi secara aktif di server Discord resmi AlamNusa.
