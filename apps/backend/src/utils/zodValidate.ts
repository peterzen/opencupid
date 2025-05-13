import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodSchema, z } from 'zod'

export function validateBody<T extends ZodSchema<any>>(schema: T, req: FastifyRequest, reply: FastifyReply) {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    reply.status(400).send({ error: result.error.flatten() })
    return null
  }
  return result.data
}
