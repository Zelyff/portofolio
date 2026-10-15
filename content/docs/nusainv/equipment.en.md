## Accessory Slot Concepts

NusaInv expands standard player inventories with dedicated RPG accessory slots (Rings, Necklaces, Artifacts, Relics, and Wings). Each slot is fully configurable via `gui.yml`:

- **GUI Slot Mapping**: Each slot maps to an inventory grid index (0-53) supporting customized layouts from 9 to 54 slots.
- **Accepted Item Types**: Strict category gating via the `accepts` tag (e.g., only accepting `RING` or `ARTIFACT` types).
- **Tiered Permissions**: Administrators can lock individual slots behind specific permission nodes (`nusainv.slot.<id>`), ideal for RPG progression or VIP ranks.

## Smart Offhand Restrictor

A common exploit in Minecraft RPG servers involves placing high-stat weapons into the offhand to double attack damage or passive stats. NusaInv mitigates this comprehensively:

- Blocks the swap key (F), hotbar number keys (0-8), drag clicks, and shift-clicks for restricted weapon types.
- Accurately differentiates slot interactions between player inventory and external chests/containers.
- **Auto-Reconciliation**: On player join, respawn, or world transition, prohibited weapons in the offhand are cleanly returned to the main inventory or routed to recovery stash.
- Configurable bypass permission node (`nusainv.offhand.bypass`).

## Stash & Recovery System

Accessory items never drop onto the ground due to full inventories. When unequipped while a player has a 100% full bag, items are automatically preserved in the secure `stash/` store and can be retrieved at any time via `/equipment recover`.
