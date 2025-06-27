import type { MessageDTO } from '@zod/messaging/messaging.dto'
import type { LikeEdge } from '@zod/like/like.dto'

export type WSEvents = {
  'ws:new_message': MessageDTO
  'ws:new_like': void
  'ws:new_match': LikeEdge
  'ws:app_notification': { title: string; body: string }
}