
import type {
  Conversation,
  ConversationParticipant,
  Profile,
  ProfileImage,
  ProfileTag,
  Tag
} from "../generated";



// Define types for service return values
export type ProfileWithImages = Profile & {
  profileImages: ProfileImage[]
}

export type ProfileWithTags = Profile & {
  tags: (ProfileTag & { tag: Tag })[]
}

export type ProfileWithConversation = Profile & {
  conversationParticipants: (ConversationParticipant & {
    conversation: Conversation
  })[]
}

export type ProfileComplete = ProfileWithImages & ProfileWithTags & ProfileWithConversation

export type OwnerProfileComplete = ProfileWithImages & ProfileWithTags
export interface ProfileImages {
  profileImages: { url: string | null }[];
}