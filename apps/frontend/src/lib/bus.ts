import { type MessageInConversation } from '@zod/dto/messaging.dto'
import mitt from 'mitt'

type Events = {
  'auth:login': { token: string }
  'auth:logout': void

  'message:received': { message: MessageInConversation }
}

export const bus = mitt<Events>()
