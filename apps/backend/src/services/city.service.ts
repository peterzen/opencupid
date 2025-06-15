import slugify from 'slugify'
import { prisma } from '../lib/prisma'
import { City } from '@zod/generated'
import { CreateCityInput } from '@zod/dto/city.dto'

export class CityService {
  private static instance: CityService

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): CityService {
    if (!CityService.instance) {
      CityService.instance = new CityService()
    }
    return CityService.instance
  }

  // Service functions
  public async findAll(): Promise<City[]> {
    return prisma.city.findMany({ where: { isDeleted: false } })
  }

  public async findById(id: string): Promise<City | null> {
    return prisma.city.findFirst({ where: { id, isDeleted: false } })
  }

  /**
   * Find citys whose name contains the given substring (case-insensitive).
   */
  public async search(country: string, term: string): Promise<City[]> {
    return prisma.city.findMany({
      where: {
        name: { contains: term, mode: 'insensitive' },
        country: { startsWith: country, mode: 'insensitive' },
        isDeleted: false,
        isApproved: true,
        isHidden: false,
      },
      take: 20, // limit results for performance
      orderBy: { name: 'asc' },
    })
  }

  public async create(data: CreateCityInput): Promise<City> {
    return prisma.city.create({
      data: {
        name: data.name,
        country: data.country,
        createdBy: data.createdBy,
        isApproved: true,
        isUserCreated: data.isUserCreated ?? false,
      },
    })
  }

  public async update(id: string, data: City): Promise<City> {
    const updateData: Partial<City & { slug: string }> = { ...data }
    if (data.name) {
      updateData.slug = slugify(data.name, {
        lower: true,
        strict: true,
      })
    }
    return prisma.city.update({
      where: { id },
      data: updateData,
    })
  }

  public async remove(id: string): Promise<void> {
    // soft delete
    await prisma.city.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    })
  }
}
