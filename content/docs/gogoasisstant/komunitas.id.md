## Konteks Komunitas AlamNusa

GogoAsisstant dirancang bukan sekadar bot tanya-jawab biasa, melainkan asisten komunitas yang hidup dan memahami kultur gamer AlamNusa:

- **Bahasa Alami & Anti-Kaku**: Memahami bahasa santai, singkatan komunitas, dan istilah teknis Minecraft tanpa menjawab dengan gaya ensiklopedia kaku.
- **Sambungan Percakapan Mulus**: Menghindari pengulangan kalimat pembuka robotik saat menyambung jawaban panjang.
- **Panel Sumber Interaktif**: Memberikan tombol sitasi dokumen panduan dengan link terverifikasi agar pemain dapat memverifikasi keakuratan informasi.

## Alur Persetujuan Wiki Admin (`/wiki`)

Untuk menjaga akurasi informasi gameplay server, Gogo dilengkapi modul crowdsourced wiki dengan kontrol ketat:

1. Admin atau staf mengajukan draft panduan baru via Discord Modal.
2. Draft masuk ke antrean *Pending Review*.
3. Saat disetujui melalui tombol interaktif `[Setujui & Simpan ke Wiki]`, draft dikompilasi menjadi dokumen markdown dan diindeks ke dalam memori pencarian AI seketika.

## Notifikasi Kesenjangan Materi (Owner Gap Notification)

Jika ada pertanyaan spesifik tentang server yang belum memiliki dokumentasi di database (`retrievedKnowledge == 0`), bot secara cerdas mengirimkan **Direct Message (DM) ke Owner** server, lengkap dengan konteks pertanyaan pemain sehingga tim pengelola dapat segera melengkapi panduan terkait.
