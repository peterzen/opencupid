import { type MessageInConversation } from '@zod/messaging.schema'
import mitt from 'mitt'

type Events = {
  'auth:login': { token: string }
  'auth:logout': void

  'message:received': { message: MessageInConversation; unreadCount: number }
}

export const bus = mitt<Events>()
