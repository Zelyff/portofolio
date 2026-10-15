## Ikhtisar NusaInv

NusaInv adalah plugin inventory aksesori dan equipment RPG enterprise untuk server Minecraft Paper 1.21.4+. Dibuat untuk menghadirkan manajemen perlengkapan pemain yang mulus, plugin ini terintegrasi penuh dengan ekosistem **MMOItems** dan **MythicLib** dengan jaminan **Zero Data Loss**.

Sistem penyimpanan data dirancang khusus untuk mengatasi kerentanan arsitektur YAML klasik Minecraft melalui transaksi aman (*transaction-safe*), snapshot defensif, dan penulisan asinkron berantai.

## Arsitektur & Keunggulan

- **Zero Data Loss Storage Engine**: Menggunakan snapshot byte array yang immutable di memori utama sebelum penulisan disk asinkron, antrean tunggal berseri (menghilangkan race condition), write-ahead journaling (`.pending.yml` -> `ATOMIC_MOVE`), dan isolasi status `FAILED` agar data rusak tidak pernah tertimpa data kosong.
- **Hook Native MMOItems & MythicLib**: Kalkulasi stat instan, set bonus, passive abilities, dan auto-revisi template saat item direforge atau kehilangan durability.
- **Multi-Provider Visual Resolver**: Mendukung native Data Component `item_model` Minecraft 1.21.2+, Nexo, ItemsAdder, Oraxen, MMOItems, hingga CustomModelData integer klasik.
- **Smart Offhand Restrictor**: Mencegah senjata berat/dua tangan (pedang, tombak, tongkat sihir, busur) dipindahkan ke tangan kiri (offhand) tanpa mengganggu item vanilla seperti Shield atau Totem.
- **Stash & Recovery Engine**: Menyimpan item berlebih yang tertinggal akibat inventaris penuh, pencabutan izin slot, atau koneksi terputus ke antrean pemulihan `/equipment recover`.

## Daftar Perintah & Hak Akses

| Perintah | Alias | Izin | Deskripsi |
| --- | --- | --- | --- |
| `/equipment` | `/eq`, `/equip` | `nusainv.use` | Membuka antarmuka menu aksesori RPG |
| `/equipment recover` | — | `nusainv.use` | Membuka antarmuka pemulihan item stash/overflow |
| `/equipment reload` | — | `nusainv.reload` | Validasi skema dan hot-reload konfigurasi tanpa restart |
| `/equipment debug [player]` | — | `nusainv.debug` | Menampilkan diagnostik storage, watcher, dan modifiers |
| `/equipment sync <player>` | — | `nusainv.admin` | Memaksa sinkronisasi stat MMOItems dan verifikasi offhand |

## Akses & Status Proyek

Proyek ini telah lulus 36/36 unit test otomatis dan aktif digunakan sebagai sistem internal di ekosistem server AlamNusa. Source code bersifat privat khusus untuk AlamNusa.
