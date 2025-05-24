import { prisma } from '../lib/prisma'
import { Profile, ProfileImage, ProfileTag, Prisma } from '@prisma/client'
import { Tag } from '@prisma/client'
import { ConnectionTypeType, DatingProfile } from '@zod/generated'
import { AnyProfile, ProfileScope } from '@zod/profile.schema'
import cuid from 'cuid'

// Define types for service return values
export type ProfileWithImages = Profile & {
  profileImage: ProfileImage | null
  otherImages: ProfileImage[]
}

export type ProfileWithTags = Profile & {
  tags: (ProfileTag & { tag: Tag })[]
}

export type ProfileComplete = ProfileWithImages & ProfileWithTags


export type DatingProfileWithImages = DatingProfile & {
  profileImage: ProfileImage | null
  otherImages: ProfileImage[]
}

export type DatingProfileWithTags = DatingProfile & {
  tags: (ProfileTag & { tag: Tag })[]
}

export type DatingProfileComplete = DatingProfileWithImages & DatingProfileWithTags



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

  async getAllProfilesByUserId(userId: string): Promise<{
    profile: ProfileComplete | null,
    datingProfile: DatingProfileComplete | null
  }> {
    const profile = prisma.profile.findUnique({
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
    const datingProfile = prisma.datingProfile.findUnique({
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
    return {
      profile: await profile,
      datingProfile: await datingProfile
    }
  }


  async updateProfile(userId: string, data: Prisma.ProfileUpdateInput): Promise<Profile> {
    return prisma.profile.update({
      where: { userId: userId },
      data
    })
  }

  async updateDatingProfile(userId: string, data: Prisma.DatingProfileUpdateInput): Promise<DatingProfile> {
    return prisma.datingProfile.update({
      where: { userId: userId },
      data
    })
  }

  async setProfileImage(userId: string, profileScope: ProfileScope, imageId: string): Promise<AnyProfile> {
    const update = {
      where: { userId },
      data: {
        otherImages: {
          connect: { id: imageId }
        }
      }
    }
    switch (profileScope) {
      case ProfileScope.SOCIAL:
        return prisma.profile.update(update)
      case ProfileScope.DATING:
        return prisma.datingProfile.update(update)
      default:
        throw new Error(`Invalid profile scope: ${profileScope}`)
    }
  }

  public async addImageToProfile(userId: string, profileScope: ProfileScope, imageId: string): Promise<AnyProfile> {
    const update = {
      where: { userId },
      data: {
        otherImages: {
          connect: { id: imageId }
        }
      },
      include: {
        otherImages: true
      }
    }
    switch (profileScope) {
      case ProfileScope.SOCIAL:
        return prisma.profile.update(update)
      case ProfileScope.DATING:
        return prisma.datingProfile.update(update)
      default:
        throw new Error(`Invalid profile scope: ${profileScope}`)
    }
  }

  async addProfileTag(profileId: string, profileScope: ProfileScope, tagId: number): Promise<ProfileTag> {
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

  async removeProfileTag(profileId: string, tagId: number): Promise<void> {
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
    tags?: number[],
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
        { intro: { contains: query, mode: 'insensitive' } },
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


  async initializeProfiles(userId: string, lookingFor: ConnectionTypeType[]): Promise<{
    profile: Profile,
    datingProfile: DatingProfile
  }> {
    let profile = await prisma.profile.findUnique({
      where: { userId }
    })

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          userId,
          isActive: lookingFor.includes('friend'),
          publicName: '',
          intro: ''
        }
      })
    }

    let datingProfile = await prisma.datingProfile.findUnique({
      where: { userId }
    })

    if (!datingProfile) {
      datingProfile = await prisma.datingProfile.create({
        data: {
          userId,
          isActive: lookingFor.includes('dating'),
          publicName: '',
          intro: ''
        }
      })
    }
    return {
      profile,
      datingProfile
    }
  }
}