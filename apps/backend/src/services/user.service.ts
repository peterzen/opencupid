import { prisma } from '../lib/prisma'
import { User, Profile, UserRole } from '@prisma/client'
import { AuthIdentifier } from '@zod/user.schema';
import otpGenerator from 'otp-generator'

// Define types for service return values
export type UserWithProfile = User & { profile: Profile | null }


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

  async otpLogin(userId: string, otp: string): Promise<{
    user: User | null,
    isNewUser: boolean
  }> {

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        loginToken: otp
      }
    })
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

  async setUserOTP(authId: AuthIdentifier, otp: string, language: string): Promise<{
    user: User,
    isNewUser: boolean
  }> {

    const authIdField = authId.email ? { email: authId.email } : { phonenumber: authId.phonenumber }
    const userExists = await prisma.user.findUnique({ where: { ...authIdField } })
    // const emailConfirmationToken = generateOTP() // enerate email confirmation token
    const tokenExpiration = getTokenExpiration()

    // user record exists
    if (userExists) {
      // Check if registration completed already or we're dealing with a new user
      const isNewUser = userExists.isRegistrationConfirmed === false
      await prisma.user.update({
        where: { id: userExists.id },
        data: {
          loginToken: otp, // Clear the reset token
          loginTokenExp: tokenExpiration, // Clear the expiration
        },
      })
      return { user: userExists, isNewUser }
    }

    const isNewUser = true
    // register email address
    const user = await prisma.user.create({
      data: {
        ...authIdField,
        loginToken: otp,
        loginTokenExp: tokenExpiration,
        language,
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

  async addRole(userId: string, role: UserRole): Promise<User | null> {
    return prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          push: role
        }
      }
    })
  }

  async removeRole(userId: string, role: UserRole): Promise<User | null> {
    const user = await this.getUserById(userId)
    const updatedRoles = user?.roles.filter(r => r !== role) || []
    return prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          set: updatedRoles
        }
      }
    })
  }


  generateOTP() {
    // Generate a 6-digit OTP
    return otpGenerator.generate(6, {
      digits: true,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false
    });
  }

}
