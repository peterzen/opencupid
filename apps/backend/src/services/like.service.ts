import { mapProfileSummary } from '@/api/mappers/profile.mappers'
import { profileImageInclude } from '@/db/includes/profileIncludes'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { type LikeEdge } from '@zod/like/like.dto'

function toLikeEdge(
  profile: Prisma.ProfileGetPayload<{ include: { profileImages: true } }>,
  createdAt: Date,
  isMatch: boolean
): LikeEdge {
  return {
    profile: mapProfileSummary(profile),
    isMatch,
    createdAt: createdAt.toISOString(),
  }
}

export class LikeService {
  private static instance: LikeService

  public static getInstance(): LikeService {
    if (!LikeService.instance) {
      LikeService.instance = new LikeService()
    }
    return LikeService.instance
  }
  
  private constructor() { }

  async like(fromId: string, toId: string): Promise<LikeEdge> {
    if (fromId === toId) throw new Error('Cannot like yourself')

    const like = await prisma.like.upsert({
      where: { fromId_toId: { fromId, toId } },
      update: {},
      create: { fromId, toId },
    })

    const likedProfile = await prisma.profile.findUniqueOrThrow({
      where: { id: toId },
      include: profileImageInclude(),
    })

    const isMatch = await prisma.like.findUnique({
      where: { fromId_toId: { fromId: toId, toId: fromId } },
    })

    return toLikeEdge(likedProfile, like.createdAt, !!isMatch)
  }

  async unlike(fromId: string, toId: string): Promise<void> {
    await prisma.like.deleteMany({
      where: { fromId, toId },
    })
  }

  async getLikesReceived(profileId: string): Promise<LikeEdge[]> {
    const likes = await prisma.like.findMany({
      where: { toId: profileId },
      include: {
        from: {
          include: profileImageInclude(),
        },
      },
    })

    return likes.map(like => {
      const isMatch = false // Optional: calculate mutual like if needed
      return toLikeEdge(like.from, like.createdAt, isMatch)
    })
  }

  async getLikesSent(profileId: string): Promise<LikeEdge[]> {
    const likes = await prisma.like.findMany({
      where: { fromId: profileId },
      include: {
        to: {
          include: profileImageInclude(),
        },
      },
    })

    return likes.map(like => {
      const isMatch = false // Optional: calculate mutual like if needed
      return toLikeEdge(like.to, like.createdAt, isMatch)
    })
  }

  async getMatches(profileId: string): Promise<LikeEdge[]> {
    const matches = await prisma.like.findMany({
      where: {
        fromId: profileId,
        to: {
          likesSent: {
            some: { toId: profileId },
          },
        },
      },
      include: {
        to: {
          include: profileImageInclude(),
        },
      },
    })

    return matches.map(like => toLikeEdge(like.to, like.createdAt, true))
  }
}
