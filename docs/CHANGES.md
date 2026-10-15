# Perubahan Portfolio — 15 Oktober 2026

## Desain

Identitas baseline tetap digunakan: font asli, H1 ZELYFF, console Mac, jam WIB, dan urutan section utama. Background sekarang memakai lapisan cahaya, tekstur titik, dan garis kontur SVG statis yang mengikuti mode terang/gelap. Kartu AlamNusa menampilkan panel identitas, periode peran, tanggung jawab, jumlah proyek internal dari katalog, dan tautan ke karya.

Console memiliki tab Profil/Proyek dan navigasi keyboard. Komposisi proyek mendukung visual alur atau wordmark berbasis metadata. Filter, progres membaca, penanda section desktop, dan detail proyek tetap tersedia.

## Konten yang dapat berkembang

Data dipindah ke `content/projects.json`. Renderer tidak lagi mengenali slug proyek tertentu. Pilihan proyek beranda dikendalikan `featured`; arsip menampilkan semua proyek. Angka, kategori filter, daftar About, dan daftar console dihasilkan dari katalog.

Halaman baru `projects/` dan `docs/` melengkapi beranda. Metadata docs menghasilkan sidebar, urutan panduan, tombol halaman tetangga, tautan bahasa, dan portal. Markdown terpisah ID/EN menghasilkan konten statis serta indeks pencarian. Halaman lama yang dikeluarkan dari katalog dibersihkan saat generate ulang.

## Dokumentasi publik

NusaCooking, NusaInv, NusaSKBlocker, dan GogoAsisstant memiliki ikhtisar serta panduan konsep. Isi mengikuti informasi yang sudah dikonfirmasi. Referensi command, permission, konfigurasi, dan instalasi memerlukan source plugin aktual dan belum dinyatakan lengkap.

Markdown mendukung heading, paragraf, daftar, bold, inline/fenced code, tabel sederhana, serta link aman. HTML mentah di-escape. Seluruh halaman dan navigasinya dapat dibaca tanpa JavaScript; pencarian ditambahkan secara lokal ketika JavaScript tersedia.

## Mobile

Kartu pengalaman menjadi satu kolom. Sidebar dan daftar isi docs memakai elemen native `details`, tertutup awal pada layar kecil ketika JavaScript berjalan. Tidak ada drawer yang memerlukan scroll lock. Tabel dan code block mempunyai scroll sendiri; input pencarian berukuran 16px di mobile.

## Verifikasi

`scripts/check.cjs` memeriksa konten, ID/EN, ID unik, tautan/anchor lintas halaman, hitungan katalog, keamanan Markdown, dan indeks pencarian. Uji evolusi katalog menambah proyek/kategori baru serta menghapus proyek untuk menguji pembersihan output. Interaksi diuji melalui simulasi DOM.

Browser/perangkat nyata, rendering native, screen reader, Lighthouse, dan Core Web Vitals belum diuji langsung karena kontrol browser yang diperlukan tidak tersedia. CSS komponen dan responsive awal tetap utuh; pemolesan berada pada `css/polish.css` dan layout halaman baru pada `css/pages.css`.
