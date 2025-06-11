export interface ApiError {
  success: false
  message: string
  fieldErrors?: Record<string, string[]>
}

export type ApiSuccess<T> = { success: true } & T
export type ApiResponse<T> = ApiSuccess<T> | ApiError

// Profile responses
import type {
  OwnerProfile,
  PublicProfile,
  UpdatedProfileFragment,
  UpdatedProfileImageFragment,
} from '@zod/profile/profile.dto'
import type { PublicTag } from '@zod/dto/tag.dto'
import type { ConversationSummary, MessageDTO, MessageInConversation } from '@zod/messaging/messaging.dto'
import type { SettingsUser, OtpSendReturn } from '@zod/user/user.dto'
import type { City } from '@zod/city/city.schema'
import { Message } from '@zod/generated'

export type GetMyProfileResponse = ApiSuccess<{ profile: OwnerProfile }>
export type GetPublicProfileResponse = ApiSuccess<{ profile: PublicProfile }>
export type GetProfilesResponse = ApiSuccess<{ profiles: PublicProfile[] }>
export type UpdateProfileResponse = ApiSuccess<{ profile: UpdatedProfileFragment }>
export type ProfileImagesResponse = ApiSuccess<{ profile: UpdatedProfileImageFragment }>

export type TagsResponse = ApiSuccess<{ tags: PublicTag[] }>
export type TagResponse = ApiSuccess<{ tag: PublicTag }>

export type MessagesResponse = ApiSuccess<{ messages: MessageDTO[] }>
export type ConversationsResponse = ApiSuccess<{ conversations: ConversationSummary[] }>
export type ConversationResponse = ApiSuccess<{ conversation: ConversationSummary }>
export type SendMessageResponse = ApiSuccess<{
  conversation: ConversationSummary
  message: MessageDTO
}>

export type UserMeResponse = ApiSuccess<{ user: SettingsUser }>
export type SendLoginLinkResponse = ApiSuccess<{ user: OtpSendReturn; status: string }>
export type OtpLoginSuccess = ApiSuccess<{ token: string }>
export interface OtpLoginFailure {
  success: false
  status: string
}
export type OtpLoginResponse = OtpLoginSuccess | OtpLoginFailure

export type CitySearchResponse = City[]
export type CaptchaChallengeResponse = ApiSuccess<any> // altcha challenge shape
