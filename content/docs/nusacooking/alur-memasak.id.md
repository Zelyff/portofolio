## Alur Interaksi & Siklus Memasak

Sistem memasak NusaCooking digerakkan oleh mesin state (FSM) deterministik yang mengendalikan setiap tahapan interaksi pemain pada stasiun masak fisik 3D:

1. **IDLE (Stasiun Siaga)**: Stasiun diletakkan di dunia game. Klik kanan membuka antarmuka buku resep (GUI) yang menampilkan bahan yang dibutuhkan dan status ketersediaan di inventaris.
2. **PREPARING (Persiapan Bahan)**: Setelah resep dipilih, pemain memasukkan bahan masakan satu per satu dengan klik kanan. Pemain dapat membatalkan dan mengambil kembali seluruh bahan dengan Sneak + Klik Kanan.
3. **COOKING (Proses Memasak & QTE)**: Ketika seluruh bahan lengkap, proses memasak dimulai. Animasi kuah mendidih dan efek uap aktif. Jika minigame diaktifkan, pemain berpartisipasi dalam QTE (misalnya mengaduk kuah pada sweetspot timing).
4. **READY TO COLLECT (Masakan Matang)**: Makanan selesai dimasak dan memancarkan efek partikel sukses. Pemain dapat mengambil hidangan matang dengan Klik Kiri.
5. **BURNT (Makanan Gosong)**: Jika pemain terlambat mengambil makanan melewati batas waktu `burn-timer`, makanan akan berubah menjadi gosong dan perlu dibersihkan sebelum stasiun dapat digunakan kembali.

## Mekanisme Minigame (QTE)

- **Stir Minigame (Aduk Kuali)**: Menguji ketepatan timing klik pemain saat indikator moving bar memasuki area sweetspot hijau pada Action Bar.
- **Flip & Chop Minigame**: Modul tambahan untuk stasiun pemanggang (Grill) dan talenan (Cutting Board).
- **Perhitungan Bintang**: Keberhasilan menekan sweetspot meningkatkan akumulasi skor hidangan hingga mencapai tier 5 Bintang.

## Keamanan Data & Proteksi Klaim

- **PDC Snapshot Persistence**: Setiap perubahan bahan pada stasiun langsung disimpan dalam NBT PersistentDataContainer entitas, sehingga crash atau restart server tidak akan menghilangkan bahan.
- **Proteksi Klaim Multi-Plugin**: Mencegah interaksi tidak sah dari pemain non-anggota pada klaim GriefPrevention, WorldGuard, maupun RedProtect.
