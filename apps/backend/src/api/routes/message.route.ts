import { FastifyPluginAsync } from 'fastify'
import websocket from '@fastify/websocket'

import { sendUnauthorizedError } from '../helpers'
import { MessageService } from '@/services/message.service'


const messageRoutes: FastifyPluginAsync = async (fastify) => {

  
  const messageService = MessageService.getInstance()

  fastify.get('/:userId', {  onRequest: [fastify.authenticate] }, (req, reply) => {

    if (!req.user.userId) return sendUnauthorizedError(reply)

    // TODO implement this this route should retrieve a conversation from the DB using getConversation

  })

}

export default messageRoutes
