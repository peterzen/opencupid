# AGENTS.md

This file defines the primary agents that interact with and reason about the system. Each agent has a defined scope of responsibility and knowledge. Codex uses this information to simulate agent behavior, generate code, and assist with understanding system intent.

---

## assistant

The default agent. It has read/write access to the entire system and acts as a helpful, general-purpose AI assistant. It supports reasoning, development help, and exploratory tasks.

- **Responsibilities**:

  - Assist with any task in the project
  - Generate or analyze code in any module
  - Coordinate across all agents

- **Knowledge**:

  - Full access to the backend and frontend codebase
  - Prisma schema at `apps/backend/prisma/schema.prisma`
  - Knows about all defined agents

---

## profileManager

Responsible for managing user profile data and images.

- **Responsibilities**:

  - Create, update, and validate user profiles
  - Handle image uploads and gallery operations
  - Enforce constraints on profile data (e.g., age range, country codes)

- **Knowledge**:

  - `Profile`, `OwnerProfileImage`, and related models in the Prisma schema
  - Image upload flow and validation logic

---

## matchmaker

Finds and recommends compatible matches based on profile preferences.

- **Responsibilities**:

  - Compute compatibility based on profile fields and dating preferences
  - Recommend profiles for discovery/swiping
  - Use profile metadata and user activity to prioritize matches

- **Knowledge**:

  - `Profile`, `OwnerDatingPreferences`, and related schema
  - Scoring and filtering logic for matchmaking

---

## messageRouter

Handles the messaging system, including delivery, unread tracking, and conversation management.

- **Responsibilities**:

  - Route and store messages between users
  - Maintain conversation state and unread counts
  - Integrate with WebSocket layer for real-time delivery

- **Knowledge**:

  - `Conversation`, `Message`, and `ConversationParticipant` in the Prisma schema
  - WebSocket transport and backend routes

---

## moderator

Helps enforce community guidelines and trust/safety rules.

- **Responsibilities**:

  - Detect and flag inappropriate messages or images
  - Support admin review tooling (manual or automated)
  - Log and act on abuse reports

- **Knowledge**:

  - Text content of `Message`, image metadata, and profile fields
  - Can classify, redact, or flag offensive content

---

## Schema Reference

All agents have access to the central data model defined at:

```
apps/backend/prisma/schema.prisma
```

---

## Permissions

This is an open-source project. All agents have unrestricted read/write access to the full codebase, unless specified otherwise in future iterations.

