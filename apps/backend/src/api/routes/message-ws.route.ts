import type WebSocket from 'ws'
import { FastifyPluginAsync } from 'fastify'
import websocket from '@fastify/websocket'

import { verifyWsToken } from '@/lib/verifyWsToken'
import { MessageService } from '@/services/message.service'

interface WsMessage {
  to: string // recipient userId
  content: string // message content
}

const messageWsRoutes: FastifyPluginAsync = async (fastify) => {

  await fastify.register(websocket)
  const messageService = MessageService.getInstance()

  fastify.decorate('connections', {} as Record<string, WebSocket>)

  fastify.get('/message', { websocket: true }, (socket: WebSocket, req) => {

    const { userId } = verifyWsToken(req, fastify.jwt) // fix req.reuqest typing

    if (!userId) {
      fastify.log.warn('WebSocket connection without userId, closing')
      socket.close()
      return
    }

    fastify.log.info(`WebSocket connection established for user ${userId}`)
    fastify.connections[userId] = socket

    socket.on('close', () => {
      fastify.log.info(`WebSocket connection closed for user ${userId}`)
      delete fastify.connections[userId]
    })

    socket.on('error', (err: any) => {
      fastify.log.error('WebSocket error', err)
    })

    socket.on('ping', () => {
      fastify.log.debug('Received ping from client')
    })

    socket.on('pong', () => {
      fastify.log.debug('Received pong from client')
    })

    socket.on('message', async (raw: any) => {
      fastify.log.info(`Received message from user ${userId}: ${raw.toString()}`)
      try {
        const data = JSON.parse(raw.toString()) as WsMessage
        if (!data.to || !data.content) return
        const msg = await messageService.sendMessage(userId, data.to, data.content)
        const receiver = fastify.connections[data.to]
        if (receiver && receiver.readyState === receiver.OPEN) {
          receiver.send(JSON.stringify({
            id: msg.id,
            from: userId,
            content: msg.content,
            createdAt: msg.createdAt
          }))
        }
      } catch (err) {
        // TODO FIXME more fine grained catch to handle JSON.parse, messageService.sendMessage errors and do more meaningful logging.
        console.error('Error processing WS message', err)
        fastify.log.error('Invalid WS message', err)
      }
    })
  })

}

export default messageWsRoutes
