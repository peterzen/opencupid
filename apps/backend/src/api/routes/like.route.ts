import { FastifyPluginAsync } from 'fastify'

import { rateLimitConfig, sendError } from '../helpers'
import { LikeService } from '@/services/like.service'
import z from 'zod'
import type { LikeEdgeResponse, LikeEdgesResponse } from '@zod/apiResponse.dto'

// Route params for ID lookups
const TargetLookupParamsSchema = z.object({
  targetId: z.string().cuid(),
})

const likeRoutes: FastifyPluginAsync = async fastify => {

  const likeService = LikeService.getInstance()

  fastify.post<{ Params: { targetId: string } }>('/like', {
    onRequest: [fastify.authenticate],
    // rate limiter
    config: {
      ...rateLimitConfig(fastify, '5 minute', 5),
    },
  }, async (req, reply) => {

    const { targetId } = TargetLookupParamsSchema.parse(req.params)
    const myId = req.session.profileId

    try {
      const edge = await likeService.like(myId, targetId)
      const response: LikeEdgeResponse = { success: true, edge }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to like profile')
    }
  })

  // DELETE /like/:targetId
  fastify.delete<{ Params: { targetId: string } }>('/:targetId', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '1 minute', 10),
  }, async (req, reply) => {
    const { targetId } = TargetLookupParamsSchema.parse(req.params)
    const myId = req.session.profileId

    try {
      await likeService.unlike(myId, targetId)
      return reply.code(200).send({ success: true })
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to unlike profile')
    }
  })

  // GET /like/received
  fastify.get('/received', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '5 minute', 10),
  }, async (req, reply) => {
    const myId = req.session.profileId

    try {
      const edges = await likeService.getLikesReceived(myId)
      const response: LikeEdgesResponse = { success: true, edges }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to fetch received likes')
    }
  })

  // GET /like/sent
  fastify.get('/sent', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '5 minute', 10),
  }, async (req, reply) => {
    const myId = req.session.profileId

    try {
      const edges = await likeService.getLikesSent(myId)
      const response: LikeEdgesResponse = { success: true, edges }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to fetch sent likes')
    }
  })

  // GET /like/matches
  fastify.get('/matches', {
    onRequest: [fastify.authenticate],
    config: rateLimitConfig(fastify, '5 minute', 10),
  }, async (req, reply) => {
    const myId = req.session.profileId

    try {
      const edges = await likeService.getMatches(myId)
      const response: LikeEdgesResponse = { success: true, edges }
      return reply.code(200).send(response)
    } catch (err) {
      fastify.log.error(err)
      return sendError(reply, 500, 'Failed to fetch matches')
    }
  })
}

export default likeRoutes