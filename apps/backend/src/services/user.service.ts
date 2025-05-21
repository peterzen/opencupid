import { ConnectionTypeType } from '@zod/generated'
import { prisma } from '../lib/prisma'
import { User, Profile, DatingProfile } from '@prisma/client'
import { randomBytes } from 'crypto'

// Define types for service return values
export type UserWithProfile = User & { profile: Profile | null }


function makeLoginToken() {
  return randomBytes(32).toString('hex')
}

function getTokenExpiration() {
  return new Date(Date.now() + 1000 * 60 * 60 * 240)
}



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

  async otpLogin(token: string): Promise<{
    user: User | null,
    isNewUser: boolean
  }> {

    const user = await prisma.user.findUnique({ where: { loginToken: token } })
    if (!user) {
      return { user: null, isNewUser: false }
    }

    const isNewUser = user.isRegistrationConfirmed === false

    // Update the user's email confirmation status
    const userUpdated = await prisma.user.update({
      where: { id: user.id },
      data: {
        isRegistrationConfirmed: true,
        loginToken: null, // Clear the reset token
        loginTokenExp: null, // Clear the expiration
        lastLoginAt: new Date(), // Update the last login date
      },
    })

    return { user: userUpdated, isNewUser }
  }

  async createUserOTP(email: string, language: string): Promise<{
    user: User,
    isNewUser: boolean
  }> {

    const userExists = await prisma.user.findUnique({ where: { email } })
    const emailConfirmationToken = makeLoginToken() // enerate email confirmation token
    const tokenExpiration = getTokenExpiration() // Set token expiration to 24 hours from now

    // user record exists
    if (userExists) {
      // Check if registration completed already or we're dealing with a new user
      const isNewUser = userExists.isRegistrationConfirmed === false
      await prisma.user.update({
        where: { id: userExists.id },
        data: {
          loginToken: emailConfirmationToken, // Clear the reset token
          loginTokenExp: tokenExpiration, // Clear the expiration
        },
      })
      return { user: userExists, isNewUser }
    }

    const isNewUser = true
    // register email address
    const user = await prisma.user.create({
      data: {
        email: email,
        loginToken: emailConfirmationToken,
        loginTokenExp: tokenExpiration,
      }
    })
    return { user, isNewUser }
  }

  async getUserById(userId: string, args?: object): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: userId },
      ...args
    })
  }

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


}
