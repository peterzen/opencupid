import { type MessageInConversation } from '@zod/dto/messaging.schema'
import mitt from 'mitt'

type Events = {
  'auth:login': { token: string }
  'auth:logout': void

  'message:received': { message: MessageInConversation }
}

export const bus = mitt<Events>()
