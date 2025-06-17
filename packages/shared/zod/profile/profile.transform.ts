import { OwnerProfile, PublicProfile } from "./profile.dto"


export function ownerToPublicProfile(profile: OwnerProfile): PublicProfile {
  // const { location, ...rest } = profile

  return {
    ...profile,
    conversation: null, // or keep if present
  }
}