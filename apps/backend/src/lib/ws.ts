

export function broadcastToProfile(
  fastify: any,
  profileId: string,
  payload: Record<string, any>
) {
  const sockets = fastify.connections?.get(profileId)
  if (!sockets) return

  for (const socket of sockets) {
    if (socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify(payload))
    }
  }
}