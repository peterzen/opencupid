import { ConnectionTypeType } from '@zod/generated'
import { prisma } from '../lib/prisma'
import { User, Profile, DatingProfile } from '@prisma/client'

// Define types for service return values
export type UserWithProfile = User & { profile: Profile | null }

export class UserService {
  private static instance: UserService

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  // async getUserById(userId: string): Promise<User | null> {
  //   return prisma.user.findUnique({
  //     where: { id: userId }
  //   })
  // }

  // async getUserWithProfile(userId: string): Promise<UserWithProfile | null> {
  //   return prisma.user.findUnique({
  //     where: { id: userId },
  //     include: { profile: true }
  //   })
  // }

  // async getUserProfiles(options?: { active?: boolean }): Promise<Profile[]> {
  //   return prisma.profile.findMany({
  //     where: options?.active !== undefined
  //       ? { isActive: options.active }
  //       : undefined,
  //     include: {
  //       profileImage: true,
  //       otherImages: true
  //     }
  //   })
  // }

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
