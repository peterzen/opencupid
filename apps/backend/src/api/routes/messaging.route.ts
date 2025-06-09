import type WebSocket from 'ws'
import { FastifyPluginAsync } from 'fastify'
import { sendError } from '../helpers'
import { MessageService } from '@/services/messaging.service'
import { z } from 'zod'
import { mapConversationParticipantToSummary, mapMessageToMessageInConversation } from '../messaging.mappers'

// Route params for ID lookups
const IdLookupParamsSchema = z.object({
  id: z.string().cuid(),
})

const SendMessageBodySchema = z.object({
  content: z.string().min(1)
})


export function broadcastToProfile(
  fastify: any,
  recipientProfileId: string,
  payload: Record<string, any>
) {

  const sockets = fastify.connections?.get(recipientProfileId)
  if (!sockets || sockets.size === 0) {
    fastify.log.warn(`No active WebSocket connections for recipient ${recipientProfileId}`)
    return
  }
  sockets.forEach((socket: WebSocket) => {
    if (socket?.readyState === socket.OPEN) {
      socket.send(JSON.stringify(payload))
    }
  })
}

const messageRoutes: FastifyPluginAsync = async (fastify) => {

  const messageService = MessageService.getInstance()

  fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const profileId = req.session.profileId
    if (!profileId) return sendError(reply, 404, 'Profile not found.')

    const id = IdLookupParamsSchema.safeParse(req.params)
    if (!id.success) return sendError(reply, 404, 'Conversation not found')

    try {
      const raw = await messageService.listMessagesForConversation(id.data.id)
      const messages = raw.map(m => mapMessageToMessageInConversation(m, profileId))

      return reply.code(200).send({ success: true, messages })
    } catch (error) {
      fastify.log.error(error)
      return sendError(reply, 500, 'Failed to fetch conversations')
    }
  })


  fastify.get('/conversations', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const profileId = req.session.profileId
    if (!profileId) return sendError(reply, 404, 'Profile not found.')

    try {
      const raw = await messageService.listConversationsForProfile(profileId)
      const conversations = raw.map(p =>
        mapConversationParticipantToSummary(p, profileId)
      )
      return reply.code(200).send({ success: true, conversations })
    } catch (error) {
      fastify.log.error(error)
      return sendError(reply, 500, 'Failed to fetch conversations')
    }
  })

  fastify.post('/conversations/:id/mark-read', { onRequest: [fastify.authenticate] }, async (req, res) => {
    const profileId = req.session.profileId
    if (!profileId) return sendError(res, 401, 'Profile not found.')

    const id = IdLookupParamsSchema.safeParse(req.params)
    if (!id.success) return sendError(res, 404, 'Conversation not found')

    await messageService.markConversationRead(profileId, id.data.id)
    res.send({ success: true })
  })


  /**
   * Send a message to a conversation.  If the conversation between the specified recipient, and 
   * the sender ID does not exist, it will be created.
   * @param :id - recipient profile ID
   */
  fastify.post('/conversations/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const senderProfileId = req.session.profileId
    if (!senderProfileId) return sendError(reply, 401, 'Sender ID not found.')

    const id = IdLookupParamsSchema.safeParse(req.params)
    if (!id.success) return sendError(reply, 404, 'Recipient ID not found')
    const recipientProfileId = id.data.id

    const parsed = SendMessageBodySchema.safeParse(req.body)
    if (!parsed.success) return sendError(reply, 400, 'Invalid message body')

    const { content } = parsed.data
    const { conversation: updatedConvo, message } = await messageService.sendOrStartConversation(senderProfileId, recipientProfileId, content)
    if (!updatedConvo) return sendError(reply, 404, 'Conversation not found or could not be created')

    reply.code(200).send({
      success: true,
      conversation: mapConversationParticipantToSummary(updatedConvo, senderProfileId),
      message: mapMessageToMessageInConversation(message, senderProfileId)
    })

    // Broadcast the new message to the recipient's WebSocket connections
    broadcastToProfile(fastify, recipientProfileId, {
      type: 'new_message',
      payload: {
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        conversationId: message.conversationId,
        createdAt: message.createdAt,
      }
    })
  })
}

export default messageRoutes
