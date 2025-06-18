import { OwnerProfile, PublicProfile } from "./profile.dto"
import { EditProfileFormSchema } from "./profile.form";


export function ownerToPublicProfile(profile: OwnerProfile|null): PublicProfile|null {
  if(!profile) return null
  // const { location, ...rest } = profile

  return {
    ...profile,
    conversation: null, // or keep if present
  }
}


