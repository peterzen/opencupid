import { JwtPayload } from '@zod/user.schema'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

const TokenQuerySchema = z.object({
  token: z.string().min(1)
})

export function verifyWsToken(req: FastifyRequest, jwt: any): JwtPayload {

  const parsed = TokenQuerySchema.safeParse(req.query)
  // console.log('Parsed token query:', parsed)
  if (!parsed.success) {
    throw new Error('Missing or malformed token')
  }

  const payload = jwt.verify(parsed.data.token)
  if (!payload?.userId) {
    throw new Error('Invalid token payload')
  }

  return payload
}
