## NusaInv Overview

NusaInv is an enterprise-grade RPG equipment and accessory inventory plugin for Minecraft Paper 1.21.4+. Designed to deliver seamless character equipment management, it hooks natively into the **MMOItems** and **MythicLib** ecosystems with proven **Zero Data Loss** reliability.

The storage engine is engineered from scratch to mitigate the vulnerabilities of classical Minecraft YAML architectures through transaction-safe operations, defensive snapshots, and serialized async writing.

## Architecture & Core Features

- **Zero Data Loss Storage Engine**: Employs immutable byte array snapshots in primary memory prior to asynchronous disk writing, single-worker serialized task queues (eliminating race conditions), write-ahead journaling (`.pending.yml` -> `ATOMIC_MOVE`), and `FAILED` state isolation preventing corrupted files from ever being overwritten with empty data.
- **Native MMOItems & MythicLib Hooks**: Instantaneous stat recalculation, set bonuses, passive abilities, and automatic template reconciliation during item reforge or durability degradation.
- **Multi-Provider Visual Resolver**: Native support for Minecraft 1.21.2+ `item_model` Data Components, Nexo, ItemsAdder, Oraxen, MMOItems, and legacy CustomModelData integers.
- **Smart Offhand Restrictor**: Blocks heavy two-handed weaponry (swords, spears, staves, bows) from being placed into the offhand slot, while fully preserving vanilla items like shields, totems, and potions.
- **Stash & Recovery Engine**: Safely reroutes overflow items—resulting from full inventories, revoked slot permissions, or sudden client disconnects—into the `/equipment recover` recovery queue.

## Commands & Permissions

| Command | Alias | Permission | Description |
| --- | --- | --- | --- |
| `/equipment` | `/eq`, `/equip` | `nusainv.use` | Opens the RPG accessory menu interface |
| `/equipment recover` | — | `nusainv.use` | Opens the stash and overflow recovery GUI |
| `/equipment reload` | — | `nusainv.reload` | Validates schema and performs zero-downtime hot reload |
| `/equipment debug [player]` | — | `nusainv.debug` | Displays diagnostic data on storage I/O and active modifiers |
| `/equipment sync <player>` | — | `nusainv.admin` | Forces MMOItems stat refresh and offhand reconciliation |

## Project Status & Access

NusaInv has passed 36/36 automated unit tests and is actively deployed as an internal system in AlamNusa. The source code is private and proprietary to AlamNusa.
