import { prisma } from '@/lib/prisma'
import { User, UserRole, Prisma } from '@prisma/client'
import { AuthIdentifier } from '@zod/user/user.types'
import otpGenerator from 'otp-generator'

// Define types for service return values
export type UserWithProfileId = User & { profile: { id: string } | null }

function getTokenExpiration() {
  return new Date(Date.now() + 1000 * 60 * 60 * 240)
}

const userSelectInclude = {
  profile: {
    select: {
      id: true,
    },
  },
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

  async otpLogin(
    userId: string,
    otp: string
  ): Promise<{
    user: UserWithProfileId | null
    isNewUser: boolean
  }> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        loginToken: otp,
      },
      include: userSelectInclude,
    })
    if (!user) {
      return { user: null, isNewUser: false }
    }

    const isNewUser = user.isRegistrationConfirmed === false

    // Update the user's email confirmation status
    const userUpdated = await prisma.user.update({
      where: { id: user.id },
      include: userSelectInclude,
      data: {
        isRegistrationConfirmed: true,
        loginToken: null, // Clear the reset token
        loginTokenExp: null, // Clear the expiration
        lastLoginAt: new Date(), // Update the last login date
      },
    })

    return { user: userUpdated, isNewUser }
  }

  async setUserOTP(
    authId: AuthIdentifier,
    otp: string,
    language: string
  ): Promise<{
    user: User
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
      },
    })
    return { user, isNewUser }
  }

  async getUserById(userId: string, args?: object): Promise<User | UserWithProfileId | null> {
    return prisma.user.findUnique({
      where: { id: userId },
      ...args,
    })
  }

  addRole(user: User, role: UserRole): User {
    if (!user.roles.includes(role)) {
      user.roles.push(role)
    }
    return user
  }

  removeRole(user: User, role: UserRole): User {
    const index = user.roles.indexOf(role)
    if (index !== -1) {
      user.roles.splice(index, 1)
    }
    return user
  }

  async updateUser(tx: Prisma.TransactionClient, user: User): Promise<User | null> {
    return tx.user.update({
      where: { id: user.id },
      data: {
        ...user,
      },
    })
  }

  generateOTP() {
    // Generate a 6-digit OTP
    return otpGenerator.generate(6, {
      digits: true,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    })
  }
}
