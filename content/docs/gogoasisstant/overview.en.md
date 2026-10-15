## GogoAsisstant Overview

GogoAsisstant (Gogo) is a next-generation AI Discord assistant bot built specifically to support the community and players of **AlamNusa Season 7** Minecraft RPG.

Constructed on Node.js (>=22) and discord.js (v14.27.0), the bot couples a modular **Retrieval-Augmented Generation (RAG)** architecture with deep server gameplay awareness, a natural gamer-friendly conversational persona, 3-tier access control (ACL), and multimodal vision capabilities.

## AI Architecture & Key Features

- **Multi-Provider AI Cascade**: Powered primarily by Google Gemini 3.6 Flash for high-speed reasoning, backed by an internal Gemini 3.5 Flash Lite fallback, and external OpenRouter multi-cloud routing.
- **RAG Knowledge Engine**: Indexes 23 official server game guides (relics, accessories, Tier 1-6 RPG weapons, enchantments, and economy) via BM25 retrieval and text stemming.
- **Dynamic Channel Indexing**: Monitors official update channels to ingest live patches into memory without downtime.
- **Multimodal Vision**: Analyzes uploaded Minecraft error logs, crash reports, NusaInv equipment layouts, and custom recipes.
- **Anti-Robotic Conversational Polish**: Actively strips rigid Markdown rules (`---`) and presents comparative gameplay explanations in an authentic, natural voice.

## Slash Commands

| Command | Access | Description |
| --- | --- | --- |
| `/ask <question> [image]` | Public | Ask questions about AlamNusa mechanics with optional screenshot attachments |
| `/ai memory <status>` | Public | Toggle persistent long-term memory for your user account |
| `/wiki draft` | Admin | Open an interactive modal form to draft a new server wiki entry |
| `/wiki list` | Admin | Display all wiki drafts currently pending review |
| `/status` | Public | Check Discord gateway latency, memory usage, and active AI providers |
| `/reload` | Admin | Instantly reload knowledge stores and sync channel data |

## Project Status & Access

GogoAsisstant has achieved 291/291 passing automated unit tests and is actively operational on the official AlamNusa Discord server.
