import mitt from 'mitt'
import type { JwtPayload } from '@zod/user/user.types'
import type { WSEvents } from '@/types/wsBusEvents'

type AppEvents = {
  'auth:login': { token: string, userInfo: JwtPayload }
  'auth:logout': void
  'language:changed': { language: string }
}

type Events = AppEvents & WSEvents

export const bus = mitt<Events>()
