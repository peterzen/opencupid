import { LikeEdge } from "./like/like.dto";
import { MessageDTO } from "./messaging/messaging.dto";

export type WSMessage =
  | { type: 'ws:new_message'; payload: MessageDTO }
  | { type: 'ws:new_like'; payload: LikeEdge }
  | { type: 'ws:new_match'; payload: LikeEdge }
  | { type: 'ws:app_notification'; payload: { title: string; body: string } }

export type WSEventType = WSMessage['type']