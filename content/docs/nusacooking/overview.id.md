## Ikhtisar NusaCooking

NusaCooking adalah plugin sistem memasak interaktif 3D generasi baru yang dibangun untuk Minecraft Paper 1.21.4+ (mendukung Purpur dan AdvancedSlimePaper). Dikembangkan khusus untuk ekosistem server RPG AlamNusa, plugin ini menggantikan sistem skrip lawas dengan arsitektur Java 21 native berkinerja tinggi.

Alih-alih menggunakan blok vanilla statis atau armor stand berat, NusaCooking memanfaatkan entitas modern Minecraft 1.21: `ItemDisplay` untuk animasi rotasi halus dan `Interaction` resmi Mojang untuk registrasi klik presisi tanpa tick lag.

## Fitur Utama

- **Stasiun Memasak 3D**: Menggunakan entitas Display Entities berkecepatan tinggi dengan audio spasial 3D, partikel uap bertahap, dan 8-frame animasi kuah mendidih.
- **Deterministic Finite State Machine (FSM)**: Transisi stasiun dikendalikan FSM anti-eksploit dari fase IDLE, PREPARING, COOKING, READY TO COLLECT, hingga BURNT.
- **Kualitas Bintang & Nutrisi**: Sistem 1-5 bintang yang dihitung dari kualitas bahan dan performa minigame, terintegrasi dengan Paper FoodComponent (Food Level, Saturation, dan potion effects).
- **Minigame Interaktif (QTE)**: Quick-Time Events seperti mengaduk (Stir), membalik (Flip), dan memotong (Chop) via action bar sweetspot.
- **Zero-Loss Persistence**: Serialisasi snapshot byte array menggunakan Bukkit PersistentDataContainer (PDC). Bahan dan timer gosong tetap aman walau server restart mendadak.
- **Universal Item Bridge**: Kompatibel dengan Nexo 3D Furniture, MMOItems, MythicMobs, CustomModelData, dan item vanilla.
- **Proteksi Klaim & Co-op**: Integrasi otomatis dengan GriefPrevention, WorldGuard, dan RedProtect serta mendukung memasak bersama sesama anggota klaim.

## Perintah & Izin

| Perintah | Deskripsi | Hak Akses |
| --- | --- | --- |
| `/cooking help` | Menampilkan panduan bantuan perintah | `nusacooking.use` |
| `/cooking book` | Membuka antarmuka buku resep interaktif | `nusacooking.use` |
| `/cooking reload` | Memuat ulang seluruh konfigurasi dan database resep | `nusacooking.admin` |
| `/cooking give <player> <station/food> [amount]` | Memberikan item stasiun atau makanan jadi ke pemain | `nusacooking.admin` |

## Status & Akses Proyek

Proyek ini telah selesai dikembangkan dan diaudit secara mendalam untuk kebutuhan produksi AlamNusa. Source code plugin berstatus privat dan didedikasikan untuk server komunitas AlamNusa.
