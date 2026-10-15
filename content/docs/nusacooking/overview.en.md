## NusaCooking Overview

NusaCooking is a next-generation interactive 3D cooking station plugin engineered for Minecraft Paper 1.21.4+ (supporting Purpur and AdvancedSlimePaper). Built specifically for the AlamNusa RPG ecosystem, it replaces legacy scripting systems with a high-performance, native Java 21 architecture.

Rather than relying on static vanilla blocks or resource-heavy armor stands, NusaCooking leverages modern Minecraft 1.21 Display Entities: `ItemDisplay` for smooth transform rotations and Mojang `Interaction` entities for precise hitboxes without tick lag.

## Key Features

- **3D Interactive Cooking Stations**: Powered by high-speed Display Entities with 3D spatial audio, gradual steam particles, and an 8-frame boiling broth animation.
- **Deterministic Finite State Machine (FSM)**: Exploit-proof station states transitioning through IDLE, PREPARING, COOKING, READY TO COLLECT, and BURNT.
- **Star Quality & Nutrition System**: 1 to 5 star ratings computed from ingredient quality and minigame precision, coupled with Paper FoodComponent mechanics (Food Level, Saturation, and custom potion effects).
- **Interactive Minigames (QTE)**: Dynamic Quick-Time Events including Stirring, Flipping, and Chopping with action bar sweetspots.
- **Zero-Loss Persistence**: Byte array snapshot serialization via Bukkit PersistentDataContainer (PDC). Prepared ingredients and burn countdowns remain intact across server restarts.
- **Universal Item Bridge**: Seamless support for Nexo 3D items, MMOItems, MythicMobs, CustomModelData, and vanilla materials.
- **Claim Protection & Co-op**: Automated hooks for GriefPrevention, WorldGuard, and RedProtect, enabling collaborative cooking inside shared land claims.

## Commands & Permissions

| Command | Description | Permission |
| --- | --- | --- |
| `/cooking help` | Display available cooking commands | `nusacooking.use` |
| `/cooking book` | Open the interactive recipe book GUI | `nusacooking.use` |
| `/cooking reload` | Reload configuration files and recipe databases | `nusacooking.admin` |
| `/cooking give <player> <station/food> [amount]` | Grant station items or finished food items to a player | `nusacooking.admin` |

## Project Status & Access

This project is fully completed and production-hardened for AlamNusa. The source code is private and proprietary to the AlamNusa community server.
