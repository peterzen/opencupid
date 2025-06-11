// TODO: review usage; copied for both db and dto layers
import { Prisma } from '@prisma/client'
import { z } from 'zod'
import { ProfileSummarySchema } from './profile.schema'
import { ConversationParticipantSchema, MessageSchema } from '../generated'

export const ConversationSchema = z.object({
  id: z.string(),
  startedById: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

const conversationParticipantFields = {
  id: true,
  profileId: true,
  conversationId: true,
  lastReadAt: true,
  isMuted: true,
  isArchived: true,
} as const

export const MessageInConversationSchema = MessageSchema.pick({
  id: true,
  conversationId: true,
  senderId: true,
  content: true,
  createdAt: true,
}).extend({
  isMine: z.boolean().optional(),
})

export type MessageInConversation = z.infer<typeof MessageInConversationSchema>

export const MessageInConversationSummarySchema = MessageSchema.pick({
  content: true,
  createdAt: true,
}).extend({
  isMine: z.boolean().optional(),
})
export type MessageInConversationSummary = z.infer<typeof MessageInConversationSummarySchema>


export const ConversationSummarySchema = ConversationParticipantSchema.pick({
  id: true,
  profileId: true,
  conversationId: true,
  lastReadAt: true,
  isMuted: true,
  isArchived: true,
}).extend({
  conversation: ConversationSchema.pick({
    id: true,
    updatedAt: true,
    createdAt: true,
  }),
  partnerProfile: ProfileSummarySchema,
  unreadCount: z.number(),
  lastMessage: MessageInConversationSummarySchema.nullable(),
})

export type ConversationSummary = z.infer<typeof ConversationSummarySchema>


export type ConversationParticipantWithConversationSummary =
  Prisma.ConversationParticipantGetPayload<{
    include: {
      conversation: {
        include: {
          participants: {
            include: {
              profile: {
                include: {
                  profileImages: {
                    where: { position: number }
                  }
                }
              }
            }
          },
          messages: {
            take: 1,
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      }
    }
  }>

export type ConversationParticipantWithExtras = ConversationParticipantWithConversationSummary & {
  unreadCount: number,
}
