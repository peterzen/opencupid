import type WebSocket from 'ws'
import { FastifyPluginAsync } from 'fastify'
import { sendError } from '../helpers'
import { MessageService } from '@/services/messaging.service'
import { z } from 'zod'
import {
  mapConversationParticipantToSummary,
  mapMessageDTO,
  mapMessageForMessageList,
} from '../messaging.mappers'
import type {
  MessagesResponse,
  ConversationsResponse,
  ConversationResponse,
  SendMessageResponse,
} from '@shared/dto/apiResponse.dto'
import { profile } from 'console'

// Route params for ID lookups
const IdLookupParamsSchema = z.object({
  id: z.string().cuid(),
})

const SendMessageBodySchema = z.object({
  content: z.string().min(1),
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

const messageRoutes: FastifyPluginAsync = async fastify => {
  const messageService = MessageService.getInstance()

  fastify.get('/:id', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const profileId = req.session.profileId
    if (!profileId) return sendError(reply, 404, 'Profile not found.')

    const id = IdLookupParamsSchema.safeParse(req.params)
    if (!id.success) return sendError(reply, 404, 'Conversation not found')
    const conversationId = id.data.id

    try {
      const raw = await messageService.listMessagesForConversation(conversationId)

      const messages = raw.map(m => mapMessageForMessageList(m, profileId))
      const response: MessagesResponse = { success: true, messages }
      return reply.code(200).send(response)

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
      const conversations = raw.map(p => mapConversationParticipantToSummary(p, profileId))
      const response: ConversationsResponse = { success: true, conversations }
      return reply.code(200).send(response)
    } catch (error) {
      fastify.log.error(error)
      return sendError(reply, 500, 'Failed to fetch conversations')
    }
  })


  fastify.post('/conversations/:id/mark-read', { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const profileId = req.session.profileId
    if (!profileId) return sendError(reply, 401, 'Profile not found.')

    const id = IdLookupParamsSchema.safeParse(req.params)
    if (!id.success) return sendError(reply, 404, 'Conversation not found')
    const conversationId = id.data.id

    try {

      await messageService.markConversationRead(conversationId, profileId)
      const updated = await messageService.getConversationSummary(conversationId, profileId)
      if (!updated) return sendError(reply, 404, 'Conversation not found')

      const response: ConversationResponse = {
        success: true,
        conversation: mapConversationParticipantToSummary(updated, profileId),
      }
      return reply.code(200).send(response)

    } catch (error) {
      fastify.log.error(error)
      return sendError(reply, 500, 'Failed to mark conversation as read')
    }
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
    const { conversation: updatedConvo, message } = await messageService.sendOrStartConversation(
      senderProfileId,
      recipientProfileId,
      content
    )
    if (!updatedConvo)
      return sendError(reply, 404, 'Conversation not found or could not be created')

    const messageDTO = mapMessageDTO(message, updatedConvo)

    const response: SendMessageResponse = {
      success: true,
      conversation: mapConversationParticipantToSummary(updatedConvo, senderProfileId),
      message: mapMessageForMessageList(messageDTO, senderProfileId),
    }

    reply.code(200).send(response)

    // Broadcast the new message to the recipient's WebSocket connections
    broadcastToProfile(fastify, recipientProfileId, {
      type: 'new_message',
      payload: messageDTO,
    })
  })
}

export default messageRoutes
