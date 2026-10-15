## Resolusi Pola Dunia & Wildcard

NusaSkBlocker mendukung server modern yang menggunakan sistem *SlimeWorldManager*, *AdvancedSlimePaper*, atau *Dungeon Instances*, di mana dunia dibuat dan dihapus secara dinamis saat runtime dengan pola nama seperti `dng_boss_1` atau `raid_99`.

Plugin mengevaluasi nama dunia menggunakan **Deterministic Trie Pattern Resolver** dengan urutan prioritas spesifisitas tertinggi (*longest-prefix match*):

1. **Exact Rule**: Contoh `dng_special` (Prioritas 1).
2. **Specific Wildcard**: Contoh `dng_event_*` (Prioritas 2).
3. **General Wildcard**: Contoh `dng_*` (Prioritas 3).
4. **Catch-All Wildcard**: `*` (Prioritas 4).
5. **Default State**: Fallback global jika tidak ada aturan yang cocok (`ENABLED` atau `DISABLED`).

## Pencegahan Memory Leak

Ketika sebuah dunia dungeon di-unload (`WorldUnloadEvent`), NusaSkBlocker secara otomatis membersihkan registrasi dunia dan referensi entitas dari memori. Fitur *self-healing* juga disematkan pada `PlayerJoinEvent`, `PlayerRespawnEvent`, dan `UserLoadEvent`.

## Sistem Notifikasi Anti-Spam

- **Smart Transition Guard**: Notifikasi (Chat, Action Bar Alert, Sound Effect) hanya dikirimkan ketika status efektif pemain berubah antara `ENABLED` dan `DISABLED`.
- Berpindah antar ruangan dungeon dinamis (misalnya dari `dng_room_1` ke `dng_room_2`) tidak akan pernah memicu spam notifikasi ke layar pemain.
