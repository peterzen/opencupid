// TODO: review usage; copied for both db and dto layers

import type {
  Profile,
  ProfileImage,
  ProfileTag,
  Tag
} from "../generated";



// Define types for service return values
export type ProfileWithImages = Profile & {
  profileImages: ProfileImage[]
}

export type ProfileWithTags = Profile & {
  tags: (ProfileTag & { tag: Tag })[]
}

export type ProfileComplete = ProfileWithImages & ProfileWithTags

export interface ProfileImages {
  profileImages: { url: string | null }[];
}