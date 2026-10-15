## Konsep Slot Aksesori

NusaInv memperluas inventaris standar pemain dengan slot aksesori RPG khusus (Cincin, Kalung, Artefak, Relik, dan Sayap). Setiap slot dapat dikonfigurasi melalui `gui.yml`:

- **GUI Slot Mapping**: Setiap slot dikaitkan dengan indeks matriks inventory (0-53) dengan dukungan custom layout dari 9 hingga 54 slot.
- **Tipe Item yang Diterima**: Pembatasan tipe item yang valid menggunakan tag `accepts` (misalnya hanya menerima `RING` atau `ARTIFACT`).
- **Izin Berjenjang**: Administrator dapat mengunci slot tertentu di balik permission node khusus (`nusainv.slot.<id>`), cocok untuk sistem leveling atau privilege rank VIP.

## Smart Offhand Restrictor

Eksploitasi umum di server RPG adalah menaruh senjata stat tinggi di tangan kiri untuk menggandakan damage atau lifesteal. NusaInv mengatasi hal ini secara komprehensif:

- Memblokir tombol swap (F), hotbar number keys (0-8), drag-click, dan pemindahan shift-click untuk tipe senjata terlarang.
- Membedakan secara akurat interaksi antara inventaris asli pemain dan container/chest.
- **Auto-Reconciliation**: Saat pemain login, respawn, atau berganti world, senjata terlarang di tangan kiri otomatis dipindahkan ke tas utama atau diarahkan ke antrean stash.
- Mendukung bypass permission khusus (`nusainv.offhand.bypass`).

## Sistem Pemulihan Stash

Item aksesori pemain tidak akan pernah hilang di lantai akibat inventaris penuh. Jika pemain mencabut aksesori saat tas 100% penuh, item otomatis disimpan ke dalam penyimpanan file aman `stash/` dan dapat diklaim melalui `/equipment recover`.
