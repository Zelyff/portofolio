## NusaSkBlocker Overview

NusaSkBlocker is a high-performance Paper/Spigot utility plugin for Minecraft 1.21.4+ providing deterministic, granular, and **100% non-destructive per-world AuraSkills suppression**.

Engineered for MMORPG servers and minigames requiring selective suppression of AuraSkills mechanics in specific dimensions (such as Dungeons, PvP Arenas, or Spawn areas) without ever modifying, resetting, or purging player database progression.

## Dual-Layer Architecture & Highlights

- **100% Non-Destructive Hard Suppression**: Player levels, XP, and attributes within the AuraSkills database are untouched. Stats are withdrawn temporarily while residing in a disabled world and restored immediately upon exit.
- **Dual-Layer Integration**:
  1. *Primary (High-Performance Reflection)*: Directly injects into internal `BukkitWorldManager.disabledWorlds` (`ConcurrentHashSet`) and triggers `StatManager.reloadAllTraits` with zero tick overhead.
  2. *Secondary (Event-Protection Fallback)*: Intercepts Bukkit API events (`XpGainEvent`, `ManaAbilityActivateEvent`, `LootDropEvent`, `CustomRegenEvent`) and purges `AttributeModifier` directly if reflection is constrained.
- **Granular Feature Controls**: Independent suppression flags per feature (`xp`, `stats`, `abilities`, `actionbar`). You can suppress XP gain in an arena while keeping HP stats active for balanced combat.
- **Decoupled Action Bar HUD Forwarder**: Dedicated `ActionBarBridge` continuously renders player HP and Mana on the action bar even when attributes are suppressed.
- **Safe Config Migration (v2)**: Automatically upgrades configuration structures without overwriting custom administrator values, maintaining timestamped backups in `backups/`.

## Commands & Permissions

| Command | Description | Permission |
| --- | --- | --- |
| `/nskb reload` | Reload configuration and resynchronize all world rules | `nusaskblocker.admin` |
| `/nskb status` | Display plugin status summary and active integration tier | `nusaskblocker.admin` |
| `/nskb debug [player]` | Show deep reflection diagnostics and player attribute modifiers | `nusaskblocker.admin` |
| `/nskb world <name\|pattern> enable` | Sets a world or pattern to ENABLED | `nusaskblocker.admin` |
| `/nskb world <name\|pattern> disable` | Sets a world or pattern to DISABLED | `nusaskblocker.admin` |
| `/nskb check [player]` | Check suppression status and bypass permissions for a player | `nusaskblocker.admin` |

## Project Status & Access

NusaSkBlocker has passed 21 unit tests and operates in production on AlamNusa. The source code is private and proprietary to AlamNusa.
