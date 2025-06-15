# INTENTS.md

This file defines recurring user and system intents—what users or components are trying to accomplish in common workflows. Codex uses this to generate or analyze behavior based on goals rather than just implementation.

---

## createProfile

Allow a user to create a new profile with validated inputs and optional images.

- **Triggers**: Sign-up flow, onboarding
- **Involves**: `profileManager`
- **Data**: `Profile`, `OwnerProfileImage`

---

## editProfile

Allow a user to update their personal data, preferences, or images.

- **Triggers**: Profile edit screen
- **Involves**: `profileManager`
- **Validations**:
  - Age limits (e.g., 18–100)
  - ISO country code validation

---

## uploadImage

Upload and associate an image with the user's profile.

- **Triggers**: Image selection or drag-drop
- **Involves**: `profileManager`
- **Side-effects**: Creates thumbnail/preview/resized variants

---

## discoverMatches

Present potential matches for the user to browse or swipe.

- **Triggers**: Discovery screen load, swipe actions
- **Involves**: `matchmaker`
- **Data**: Profile metadata, preferences, exclusions

---

## sendMessage

Send a message within a conversation.

- **Triggers**: User submitting chat input
- **Involves**: `messageRouter`
- **Data**: `Message`, `ConversationParticipant`
- **Constraints**: Must be an active match (future)

---

## viewMessages

Retrieve messages for an active conversation and mark them as read.

- **Triggers**: Opening a chat thread
- **Involves**: `messageRouter`
- **Side-effects**: Updates `lastReadAt`, unread count

---

## moderateContent

Scan, flag, or remove inappropriate messages or images.

- **Triggers**: Auto-scan or admin action
- **Involves**: `moderator`
- **Data**: `Message`, `OwnerProfileImage`
- **Outcome**: Content flagged or removed

