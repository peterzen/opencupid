import { FastifyPluginAsync } from 'fastify'
import z from 'zod'
import { rateLimitConfig, sendError } from '../helpers'
import type { InteractionEdgeCountResponse, InteractionEdgeResponse, InteractionEdgesResponse } from '@zod/apiResponse.dto'
import { DatingInteractionService } from '@/services/datingInteraction.service'
import { broadcastToProfile } from '@/utils/wsUtils'
import { WebPushService } from '@/services/webpush.service'

// Route params for ID lookups
const TargetLookupParamsSchema = z.object({
  targetId: z.string().cuid(),
})

const datingInteractionRoutes: FastifyPluginAsync = async fastify => {
  const service = DatingInteractionService.getInstance()
  const webPushService = WebPushService.getInstance()

  // POST /interactions/like/:targetId
  fastify.post<{ Params: { targetId: string } }>('/like/:targetId', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '5 minute', 5),
  }, async (req, reply) => {
    const { targetId } = TargetLookupParamsSchema.parse(req.params)
    const myId = req.session.profileId

    try {
      const edge = await service.like(myId, targetId)
      const response: InteractionEdgeResponse = { success: true, edge }
      reply.code(200).send(response)

      console.error('Edge created:', edge)
      // Broadcast the new message to the recipient's WebSocket connections
      const ok = broadcastToProfile(fastify, targetId, {
        type: edge.isMatch ? 'ws:new_match' : 'ws:new_like',
        payload: edge,
      })

      // if it's a match then send a broadcast back to the sender
      if (edge.isMatch) {
        broadcastToProfile(fastify, myId, {
          type: 'ws:new_match',
          payload: edge,
        })
      }
      // webPushService.send(edge)

    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to like profile')
    }
  })

  // DELETE /interactions/like/:targetId
  fastify.delete<{ Params: { targetId: string } }>('/like/:targetId', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '1 minute', 10),
  }, async (req, reply) => {
    const { targetId } = TargetLookupParamsSchema.parse(req.params)
    const myId = req.session.profileId

    try {
      await service.unlike(myId, targetId)
      return reply.code(200).send({ success: true })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to unlike profile')
    }
  })

  // POST /interactions/pass/:targetId
  fastify.post<{ Params: { targetId: string } }>('/pass/:targetId', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '5 minute', 5),
  }, async (req, reply) => {
    const { targetId } = TargetLookupParamsSchema.parse(req.params)
    const myId = req.session.profileId

    try {
      await service.pass(myId, targetId)
      return reply.code(200).send({ success: true })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to pass profile')
    }
  })

  // DELETE /interactions/pass/:targetId
  fastify.delete<{ Params: { targetId: string } }>('/pass/:targetId', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '1 minute', 10),
  }, async (req, reply) => {
    const { targetId } = TargetLookupParamsSchema.parse(req.params)
    const myId = req.session.profileId

    try {
      await service.unpass(myId, targetId)
      return reply.code(200).send({ success: true })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to unpass profile')
    }
  })

  // GET /interactions/received
  fastify.get('/received', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '5 minute', 10),
  }, async (req, reply) => {
    const myId = req.session.profileId

    try {
      const count = await service.getLikesReceivedCount(myId)
      const response: InteractionEdgeCountResponse = { success: true, count }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to fetch received likes')
    }
  })

  // GET /interactions/sent
  fastify.get('/sent', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '5 minute', 10),
  }, async (req, reply) => {
    const myId = req.session.profileId

    try {
      const edges = await service.getLikesSent(myId)
      const response: InteractionEdgesResponse = { success: true, edges }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to fetch sent likes')
    }
  })

  // GET /interactions/matches
  fastify.get('/matches', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '5 minute', 10),
  }, async (req, reply) => {
    const myId = req.session.profileId

    try {
      const edges = await service.getMatches(myId)
      const response: InteractionEdgesResponse = { success: true, edges }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to fetch matches')
    }
  })
}

export default datingInteractionRoutes
