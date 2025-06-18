import mitt from 'mitt'

import { type MessageDTO } from '@zod/messaging/messaging.dto'
import { type JwtPayload } from '@zod/user/user.types'

type Events = {
  'auth:login': { token: string, userInfo: JwtPayload }
  'auth:logout': void

  'message:received': { message: MessageDTO }
  'language:changed': { language: string }
}

export const bus = mitt<Events>()
