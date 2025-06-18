import type { OwnerProfile, PublicProfile } from "./profile.dto"


export function ownerToPublicProfile(profile: OwnerProfile|null): PublicProfile|null {
  if(!profile) return null
  // const { location, ...rest } = profile

  return {
    ...profile,
    conversation: null, // or keep if present
  }
}


