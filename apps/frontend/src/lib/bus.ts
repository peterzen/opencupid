import { type MessageDTO } from '@zod/messaging/messaging.dto'
import mitt from 'mitt'

type Events = {
  'auth:login': { token: string }
  'auth:logout': void

  'message:received': { message: MessageDTO }
}

export const bus = mitt<Events>()
