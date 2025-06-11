import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type {
  ConversationParticipantWithExtras,
  MessageInConversation,
} from '@zod/messaging.schema'
import { Message } from '@zod/generated'

const conversationSummaryInclude = {
  conversation: {
    include: {
      participants: {
        include: {
          profile: {
            include: {
              profileImages: true,
            },
          },
        },
      },
      messages: {
        take: 1,
        orderBy: {
          createdAt: 'desc' as const, // Ensure correct type for orderBy
        },
      },
    },
  },
}
export class MessageService {
  private static instance: MessageService

  private constructor() { }

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService()
    }
    return MessageService.instance
  }

  async getConversationSummary(conversationId: string, profileId: string): Promise<ConversationParticipantWithExtras | null> {
    const participant = await prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        profileId,
      },
      include: conversationSummaryInclude,
    })

    if (!participant) return null

    return {
      ...participant,
      unreadCount: 0,
    }
  }

  async listConversationsForProfile(profileId: string) {
    const participants = await prisma.conversationParticipant.findMany({
      where: { profileId },
      include: conversationSummaryInclude,
      orderBy: {
        conversation: { updatedAt: 'desc' },
      },
    })

    // Post-process to calculate unreadCount
    // TODO optimize this further by batching message.count()
    // using a raw SQL query if performance becomes a concern.
    return await Promise.all(
      participants.map(async p => {
        const unreadCount = await prisma.message.count({
          where: {
            conversationId: p.conversationId,
            createdAt: {
              gt: p.lastReadAt || new Date(0),
            },
            senderId: {
              not: profileId, // don't count own messages
            },
          },
        })
        return {
          ...p,
          unreadCount,
        }
      })
    )
  }

  async listMessagesForConversation(conversationId: string): Promise<MessageInConversation[]> {
    return await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: {
          include: {
            profileImages: {
              where: { position: 0 }, // Get the first image (profile picture)
              select: { url: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
  }

  async markConversationRead(conversationId: string, profileId: string) {
    return prisma.conversationParticipant.update({
      where: {
        profileId_conversationId: {
          profileId, conversationId
        }
      },
      data: { lastReadAt: new Date() },
    })
  }



  // async sendMessage(profileId: string, conversationId: string, content: string) {
  //   const message = await prisma.message.create({
  //     data: {
  //       senderId: profileId,
  //       conversationId,
  //       content,
  //     },
  //   })

  //   await prisma.conversation.update({
  //     where: { id: conversationId },
  //     data: { updatedAt: new Date() },
  //   })

  //   return message
  // }

  async sendOrStartConversation(
    senderProfileId: string,
    recipientProfileId: string,
    content: string
  ): Promise<{
    conversation: ConversationParticipantWithExtras | null
    message: Message
  }> {
    const [profileAId, profileBId] = this.sortProfilePair(senderProfileId, recipientProfileId)

    const { conversationId, message } = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        let conversation = await tx.conversation.findUnique({
          where: {
            profileAId_profileBId: { profileAId, profileBId },
          },
        })

        if (conversation) {
          // existing conversation, update lastMessageAt
          await tx.conversation.update({
            where: {
              profileAId_profileBId: { profileAId, profileBId },
            },
            data: { updatedAt: new Date() },
          })

        } else {
          conversation = await tx.conversation.create({
            data: {
              profileAId,
              profileBId,
              participants: {
                create: [{ profileId: profileAId }, { profileId: profileBId }],
              },
            },
          })
        }

        const message = await tx.message.create({
          data: {
            conversationId: conversation.id,
            senderId: senderProfileId,
            content,
          },
        })


        return { conversationId: conversation.id, message }
      }
    )
    const convo = await this.getConversationSummary(conversationId, senderProfileId)
    return { conversation: convo, message }
  }

  /**
   * Sorts a pair of profile IDs in a consistent order.
   * @param a
   * @param b
   * @returns
   */
  sortProfilePair(a: string, b: string): [string, string] {
    return a < b ? [a, b] : [b, a]
  }
}
