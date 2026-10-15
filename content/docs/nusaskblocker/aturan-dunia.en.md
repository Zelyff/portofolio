## World Pattern Resolution & Wildcards

NusaSkBlocker is optimized for servers utilizing *SlimeWorldManager*, *AdvancedSlimePaper*, or *Dungeon Instances*, where dynamic worlds are spun up and torn down at runtime with naming patterns like `dng_boss_1` or `raid_99`.

Worlds are evaluated using a **Deterministic Trie Pattern Resolver** with longest-prefix match precedence:

1. **Exact Rule**: e.g., `dng_special` (Priority 1).
2. **Specific Wildcard**: e.g., `dng_event_*` (Priority 2).
3. **General Wildcard**: e.g., `dng_*` (Priority 3).
4. **Catch-All Wildcard**: `*` (Priority 4).
5. **Default State**: Global fallback when no patterns match (`ENABLED` or `DISABLED`).

## Memory Leak Prevention

When a dynamic dungeon world unloads (`WorldUnloadEvent`), NusaSkBlocker automatically dereferences the world and purges associated entries from memory. Self-healing lifecycle hooks are also bound to `PlayerJoinEvent`, `PlayerRespawnEvent`, and `UserLoadEvent`.

## Anti-Spam State Guard

- **Smart Transition Guard**: Notifications (Chat, Action Bar Alert, Sound Effect) are triggered exclusively when a player's effective suppression state transitions between `ENABLED` and `DISABLED`.
- Moving between adjacent dungeon rooms (e.g., `dng_room_1` to `dng_room_2`) will never trigger notification spam on player screens.
