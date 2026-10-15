## Interaction Lifecycle & Cooking Flow

The cooking system in NusaCooking is driven by a deterministic Finite State Machine (FSM) controlling every phase of player interaction with physical 3D cooking stations:

1. **IDLE (Station Ready)**: The cooking station rests in the world. Right-clicking opens the interactive Recipe Book GUI, showing ingredient requirements and current bag availability.
2. **PREPARING (Ingredient Assembly)**: Once a recipe is selected, players insert ingredients sequentially via right-click. Sneak + right-click safely cancels the session and refunds all placed items.
3. **COOKING (Active Cooking & QTE)**: When all ingredients are assembled, cooking initiates. Broth boil animations and steam particles activate. If minigames are enabled, players engage in timing QTEs (such as stirring when the bar reaches the sweetspot).
4. **READY TO COLLECT (Cooked Food)**: The dish finishes and emits sparkle particles. Players left-click the station to collect their hot meal.
5. **BURNT (Overcooked State)**: If the dish is left uncollected past the `burn-timer` deadline, it turns burnt and must be cleared out before starting a new cooking session.

## Minigame Mechanics (QTE)

- **Stir Minigame**: Challenges timing accuracy as an action bar indicator moves across a green sweetspot target.
- **Flip & Chop Minigames**: Modular mechanics designed for grill stations and cutting boards.
- **Star Calculations**: Successful sweetspot hits boost the output score up to a maximum 5-star quality rating.

## Data Safety & Land Claim Protection

- **PDC Snapshot Persistence**: Station data updates are serialized into Bukkit PersistentDataContainer (PDC) byte arrays, safeguarding ingredients against unexpected restarts.
- **Multi-Plugin Claim Hook**: Seamlessly integrates with GriefPrevention, WorldGuard, and RedProtect to prevent unauthorized access in protected regions.
