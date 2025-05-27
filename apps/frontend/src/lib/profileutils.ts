import { OwnerProfileImage } from "@zod/profileimage.schema"

interface ProfileImageInterface {
  id: string
}



// /**
//  * Moves the profile image to the front of the images array if it exists.
//  * @param profileImage The primary profile image
//  * @param otherImages Array of images to order
//  */
// export function orderProfileImages(profileImage: ProfileImageInterface | null, otherImages: OwnerProfileImage[]) {
//   debugger
//   if (profileImage === null || otherImages.length === 0) {
//     // If no profile image is set, just return the images as they are
//     return otherImages
//   }
//   // Order images so that the profile image is first, if it exists
//   const foundProfileImage = otherImages.find(img => img.id === profileImage?.id)
//   if (foundProfileImage) {
//     return [foundProfileImage, ...otherImages.filter(img => img.id !== profileImage.id)]
//   }
//   console.assert(foundProfileImage, 'Profile image should be in the other images array')
//   // console.log('should not find profile image in images', profileImage, otherImages)
//   return otherImages
// }