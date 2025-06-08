import { prisma } from '../lib/prisma'
import { Message } from '@prisma/client'

export class MessageService {
  private static instance: MessageService

  private constructor () {}

  public static getInstance (): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService()
    }
    return MessageService.instance
  }

  async sendMessage (senderId: string, receiverId: string, content: string): Promise<Message> {
    return prisma.message.create({
      data: { senderId, receiverId, content }
    })
  }

  async getConversation (userAId: string, userBId: string): Promise<Message[]> {
    return prisma.message.findMany({
      where: {
        OR: [
          { senderId: userAId, receiverId: userBId },
          { senderId: userBId, receiverId: userAId }
        ]
      },
      orderBy: { createdAt: 'asc' }
    })
  }
}
