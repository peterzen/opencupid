import { prisma } from '../lib/prisma'
import { Profile, ProfileImage, ProfileTag, Prisma } from '@prisma/client'
import { Tag } from '@prisma/client'
import { OwnerProfile, OwnerProfileSchema, PublicProfile, PublicProfileSchema, UpdatedProfileFragment, UpdatedProfileFragmentSchema, UpdateProfilePayload } from '@zod/profile.schema'

// Define types for service return values
export type ProfileWithImages = Profile & {
  profileImages: ProfileImage[]
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
    console.log(`Fetching profile with ID: ${profileId}`)
    return prisma.profile.findUnique({
      where: { id: profileId },
      include: {
        user: false,
        profileImages: {
          orderBy: { position: 'asc' },
        },
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
        profileImages: {
          orderBy: { position: 'asc' },
        },
        tags: {
          include: {
            tag: true,
          }
        }
      }
    })
  }

  async updateProfile(userId: string, data: UpdateProfilePayload): Promise<UpdatedProfileFragment> {
    // 1) pull out the tags array
    const { tags, ...rest } = data;

    // interactive $transaction callback
    const updated = await prisma.$transaction(async (tx) => {
      // 1) Update all scalar fields
      const profile = await tx.profile.update({
        where: { userId },
        data: rest,
      });

      const profileId = profile.id;

      // 2) Delete _all_ existing tag links for this profile
      await tx.profileTag.deleteMany({
        where: { profileId },
      });

      // 3) Re-create only the tags the user sent
      if (tags && tags.length > 0) {
        await tx.profileTag.createMany({
          data: tags.map((tagId) => ({ profileId, tagId })),
          skipDuplicates: true,
        });
      }
      return profile;
    })

    return UpdatedProfileFragmentSchema.parse(updated)
  }


  public async addProfileImage(profile: ProfileComplete, imageId: string): Promise<{
    profileImages: ProfileImage[];
  }> {
    return prisma.profile.update({
      where: {
        id: profile.id
      },
      data: {
        profileImages: { connect: { id: imageId } },
      },
      select: {
        profileImages: true,
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
        { cityName: { contains: query, mode: 'insensitive' } }
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
        profileImages: true,
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

  /**
    * Attach a tag to a profile.
    */
  public async addTagToProfile(profileId: string, tagId: string): Promise<ProfileTag> {
    return prisma.profileTag.create({
      data: { profileId, tagId },
    });
  }

  /**
   * Remove a tag from a profile.
   */
  public async removeTagFromProfile(profileId: string, tagId: string): Promise<ProfileTag> {
    return prisma.profileTag.delete({
      where: { profileId_tagId: { profileId, tagId } },
    });
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
        introSocial: '',
      }
    })
  }


}