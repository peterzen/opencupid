import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import {
  ConversationParticipantWithExtras,
  ConversationSummary,
  ConversationSummarySchema,
  MessageInConversation,
  MessageInConversationSchema,
} from '@zod/dto/messaging.schema'
import { mapProfileSummary } from './mappers'

function mapConversationMeta(c: { id: string; updatedAt: Date; createdAt: Date }) {
  return {
    id: c.id,
    updatedAt: c.updatedAt,
    createdAt: c.createdAt,
  }
}

export function mapConversationParticipantToSummary(
  p: ConversationParticipantWithExtras,
  currentProfileId: string
): ConversationSummary {
  const partner = p.conversation.participants.find(cp => cp.profileId !== currentProfileId)

  if (!partner) throw new Error('Partner profile not found in conversation')

  const lastMessage = p.conversation.messages[0] ?? null

  return {
    id: p.id,
    profileId: p.profileId,
    conversationId: p.conversationId,
    lastReadAt: p.lastReadAt,
    isMuted: p.isMuted,
    isArchived: p.isArchived,
    unreadCount: p.unreadCount,
    lastMessage: lastMessage ? {
      content: lastMessage.content,
      createdAt: lastMessage.createdAt,
      isMine: lastMessage.senderId === currentProfileId,
    } : null,
    conversation: mapConversationMeta(p.conversation),
    partnerProfile: mapProfileSummary(partner.profile),
  }
}

export function mapMessageToMessageInConversation(
  m: Prisma.MessageGetPayload<{}>,
  currentProfileId: string
): MessageInConversation {
  return {
    id: m.id,
    conversationId: m.conversationId,
    senderId: m.senderId,
    content: m.content,
    createdAt: m.createdAt,
    isMine: m.senderId === currentProfileId,
  }
}
