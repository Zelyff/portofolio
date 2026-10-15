## Ikhtisar NusaSkBlocker

NusaSkBlocker adalah plugin utilitas Paper/Spigot berkinerja tinggi untuk Minecraft 1.21.4+ yang menyediakan sistem supresi mekanik AuraSkills berbasis dunia (*per-world suppression*) secara deterministik, granular, dan **100% non-destruktif**.

Dirancang untuk server RPG dan Minigames yang membutuhkan penonaktifan AuraSkills di area tertentu (seperti Dungeon, Arena PvP, atau Spawn) tanpa pernah mengubah, mereset, atau menghapus progres database pemain.

## Arsitektur Dual-Layer & Fitur Kunci

- **100% Non-Destructive Hard Suppression**: Level, XP, dan stat di database AuraSkills tidak pernah dimodifikasi. Stat hanya ditarik sementara saat pemain berada di dunia nonaktif dan dipulihkan seketika saat keluar.
- **Dual-Layer Integration**:
  1. *Primary (High Performance Reflection)*: Menginjeksi langsung ke internal `BukkitWorldManager.disabledWorlds` (`ConcurrentHashSet`) dan memanggil `StatManager.reloadAllTraits` tanpa lag.
  2. *Secondary (Event-Protection Fallback)*: Intersepsi ketat via Bukkit API (`XpGainEvent`, `ManaAbilityActivateEvent`, `LootDropEvent`, `CustomRegenEvent`) dan pembersihan langsung `AttributeModifier`.
- **Kontrol Fitur Granular**: Supresi independen per-fitur (`xp`, `stats`, `abilities`, `actionbar`). Anda dapat mematikan perolehan XP namun tetap membiarkan stat HP aktif di arena duel.
- **Decoupled Action Bar HUD Forwarder**: Menampilkan HUD HP & Mana via `ActionBarBridge` mandiri walau stat pemain sedang disupresi di dungeon.
- **Safe Config Migration (v2)**: Memigrasikan struktur konfigurasi secara otomatis tanpa menimpa nilai kustom pengguna, lengkap dengan cadangan otomatis di `backups/`.

## Perintah & Izin

| Perintah | Deskripsi | Izin |
| --- | --- | --- |
| `/nskb reload` | Memuat ulang konfigurasi dan sinkronisasi aturan dunia | `nusaskblocker.admin` |
| `/nskb status` | Menampilkan ringkasan status plugin dan mode integrasi | `nusaskblocker.admin` |
| `/nskb debug [player]` | Menampilkan diagnostik refleksi internal dan modifier pemain | `nusaskblocker.admin` |
| `/nskb world <nama\|pattern> enable` | Mengubah status dunia/pola menjadi aktif (ENABLED) | `nusaskblocker.admin` |
| `/nskb world <nama\|pattern> disable` | Mengubah status dunia/pola menjadi nonaktif (DISABLED) | `nusaskblocker.admin` |
| `/nskb check [player]` | Memeriksa status supresi dan hak bypass pemain | `nusaskblocker.admin` |

## Akses & Status Proyek

NusaSkBlocker telah lulus 21 unit test otomatis dan terpasang di AlamNusa. Source code bersifat privat dan dikembangkan khusus untuk arsitektur server AlamNusa.
