# DOMAINS.md

This file defines the major domains of knowledge, functionality, and concern across the system. Domains help group logic, schemas, UI, and responsibilities into meaningful, modular areas that Codex can understand.

---

## profile

Handles all data and logic related to user profiles.

- **Includes**:
  - `Profile`, `OwnerProfileImage`, `OwnerDatingPreferences`
  - Profile creation and editing
  - Image upload and gallery
  - Form validation (e.g., country code, age limits)

- **UI Elements**:
  - Profile editor
  - Image gallery

---

## matchmaking

Manages compatibility and recommendations between users.

- **Includes**:
  - Matching algorithm (based on preferences, age, gender, etc.)
  - Discovery/swiping interface
  - Match score calculation

- **Data Sources**:
  - `Profile`, `OwnerDatingPreferences`
  - Historical interaction data

---

## messaging

Core logic for real-time and historical user conversations.

- **Includes**:
  - `Message`, `Conversation`, `ConversationParticipant`
  - WebSocket connection handling
  - Message delivery, storage, and unread tracking

- **UI Elements**:
  - Message list and composer
  - Unread badge counters

---

## moderation

Tools and logic for enforcing content standards.

- **Includes**:
  - Message scanning and image review
  - Admin tooling for flagging and removing content
  - Abuse report handling

- **Data Sources**:
  - `Message`, `OwnerProfileImage`, abuse reports (planned)

---

## system

Covers shared infrastructure, configuration, and utility logic.

- **Includes**:
  - Prisma schema in `apps/backend/prisma/schema.prisma`
  - Environment config, logging, auth, validation utilities
  - Static asset handling (e.g., image resizing)

- **Note**: All agents have access to this domain.

