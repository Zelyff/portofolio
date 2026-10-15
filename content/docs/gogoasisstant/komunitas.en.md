## AlamNusa Community Context

GogoAsisstant was designed not simply as an automated FAQ bot, but as an authentic community assistant embedded into the gamer culture of AlamNusa:

- **Natural Gamer Voice**: Comprehends gaming slang, community abbreviations, and Minecraft jargon while avoiding rigid, robotic encyclopedia tones.
- **Fluid Conversational Continuation**: Seamlessly picks up split messages without repetitive robotic pleasantries.
- **Interactive Source Panels**: Provides interactive Discord buttons linking directly to verified server guide sources.

## Interactive Admin Wiki Approval (`/wiki`)

To ensure gameplay data remains 100% accurate, Gogo features an admin-moderated wiki workflow:

1. Admins or designated staff submit new draft guides via Discord modal dialogs.
2. Drafts enter a *Pending Review* state in a private moderation channel.
3. Upon clicking the interactive `[Approve & Save to Wiki]` button, the draft compiles into official tagged Markdown and is ingested into the AI's search memory immediately.

## Owner Gap Notification

When a player asks a nuanced server question with no matching knowledge in the store (`retrievedKnowledge == 0`), Gogo automatically sends a throttled **Direct Message (DM) to the Server Owner**, alerting the administration team to gaps in documentation so the official wiki can be expanded.
