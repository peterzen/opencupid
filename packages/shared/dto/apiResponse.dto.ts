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
} from '@zod/dto/profile.schema'
import type { PublicTag } from '@zod/dto/tag.schema'
import type { ConversationSummary, MessageInConversation } from '@zod/dto/messaging.schema'
import type { SettingsUser, OtpSendReturn } from '@zod/user/user.dto'
import type { City } from '@zod/dto/city.schema'

export type GetMyProfileResponse = ApiSuccess<{ profile: OwnerProfile }>
export type GetPublicProfileResponse = ApiSuccess<{ profile: PublicProfile }>
export type GetProfilesResponse = ApiSuccess<{ profiles: PublicProfile[] }>
export type UpdateProfileResponse = ApiSuccess<{ profile: UpdatedProfileFragment }>
export type ProfileImagesResponse = ApiSuccess<{ profile: UpdatedProfileImageFragment }>

export type TagsResponse = ApiSuccess<{ tags: PublicTag[] }>
export type TagResponse = ApiSuccess<{ tag: PublicTag }>

export type MessagesResponse = ApiSuccess<{ messages: MessageInConversation[] }>
export type ConversationsResponse = ApiSuccess<{ conversations: ConversationSummary[] }>
export type ConversationResponse = ApiSuccess<{ conversation: ConversationSummary }>
export type SendMessageResponse = ApiSuccess<{
  conversation: ConversationSummary
  message: MessageInConversation
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
