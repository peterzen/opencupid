import { FastifyPluginAsync } from "fastify"

// --- Helper to send uniform error responses ---
export function sendError(
  reply: FastifyPluginAsync['prototype']['reply'],
  statusCode: number,
  message: string,
  fieldErrors?: Record<string, string[]>
) {
  const payload: any = { success: false, message }
  if (fieldErrors) payload.fieldErrors = fieldErrors
  return reply.code(statusCode).send(payload)
}

export function sendUnauthorizedError(
  reply: FastifyPluginAsync['prototype']['reply'],
  message: string = 'Unauthorized'
) {
  return sendError(reply, 401, message)
}