import { prisma } from '../lib/prisma'
import { Profile, ProfileImage, ProfileTag, Prisma } from '@prisma/client'
import { Tag } from '@prisma/client'

// Define types for service return values
export type ProfileWithImages = Profile & {
  profileImage: ProfileImage | null
  otherImages: ProfileImage[]
}

export type ProfileWithTags = Profile & {
  tags: (ProfileTag & { tag: Tag })[]
}

export type ProfileComplete = ProfileWithImages & ProfileWithTags

export class ProfileService {
  private static instance: ProfileService

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService()
    }
    return ProfileService.instance
  }

  async getProfileById(profileId: string): Promise<ProfileComplete | null> {
    return prisma.profile.findUnique({
      where: { id: profileId },
      include: {
        user: false,
        profileImage: true,
        otherImages: true,
        tags: {
          include: {
            tag: true
          }
        }
      }
    })
  }

  async getProfileByUserId(userId: string): Promise<ProfileComplete | null> {
    return prisma.profile.findUnique({
      where: { userId },
      include: {
        profileImage: true,
        otherImages: true,
        tags: {
          include: {
            tag: true,
          }
        }
      }
    })
  }




  async updateProfile(userId: string, data: Prisma.ProfileUpdateInput): Promise<Profile> {
    return prisma.profile.update({
      where: { userId: userId },
      data
    })
  }



  async setProfileImage(userId: string, imageId: string): Promise<Profile> {
    return prisma.profile.update({
      where: { userId },
      data: {
        otherImages: {
          connect: { id: imageId }
        }
      }
    })
  }

  public async addImageToProfile(userId: string, imageId: string): Promise<Profile> {
    return prisma.profile.update({
      where: { userId },
      data: {
        otherImages: {
          connect: { id: imageId }
        }
      }
    })
  }

  async addProfileTag(profileId: string, tagId: string): Promise<ProfileTag> {
    return prisma.profileTag.create({
      data: {
        profile: {
          connect: { id: profileId }
        },
        tag: {
          connect: { id: tagId }
        }
      }
    })
  }

  async removeProfileTag(profileId: string, tagId: string): Promise<void> {
    await prisma.profileTag.deleteMany({
      where: {
        profileId,
        tagId
      }
    })
  }

  // async getAllProfiles(options?: {
  //   active?: boolean,
  //   includeImages?: boolean,
  //   includeTags?: boolean,
  //   limit?: number,
  //   offset?: number
  // }): Promise<ProfileComplete[]> {
  //   return prisma.profile.findMany({
  //     where: options?.active !== undefined ? { isActive: options.active } : undefined,
  //     include: {
  //       profileImage: options?.includeImages !== false,
  //       otherImages: options?.includeImages !== false,
  //       tags: options?.includeTags !== false
  //     },
  //     take: options?.limit,
  //     skip: options?.offset
  //   })
  // }

  async searchProfiles(searchOptions: {
    query?: string,
    tags?: string[],
    active?: boolean,
    limit?: number,
    offset?: number
  }): Promise<ProfileComplete[]> {
    const { query, tags, active, limit, offset } = searchOptions

    // Build where clause dynamically
    const where: Prisma.ProfileWhereInput = {}

    if (active !== undefined) {
      where.isActive = active
    }

    if (query) {
      where.OR = [
        { publicName: { contains: query, mode: 'insensitive' } },
        { city: { contains: query, mode: 'insensitive' } }
      ]
    }

    if (tags && tags.length > 0) {
      where.tags = {
        some: {
          tagId: { in: tags }
        }
      }
    }

    return prisma.profile.findMany({
      where,
      include: {
        profileImage: true,
        otherImages: true,
        tags: {
          include: {
            tag: true
          }
        }
      },
      take: limit,
      skip: offset
    })
  }


  async initializeProfiles(userId: string): Promise<Profile> {
    const profile = await prisma.profile.findUnique({
      where: { userId }
    })

    if (profile) {
      return profile
    }

    return prisma.profile.create({
      data: {
        userId,
        publicName: '',
        introSocial: ''
      }
    })
  }
}