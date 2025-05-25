import slugify from 'slugify';
import { prisma } from '../lib/prisma'
import { Tag } from "@zod/generated";
import { CreateTagInput, UpdateTagInput } from '@zod/tags.schema';



export class TagService {
  private static instance: TagService

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): TagService {
    if (!TagService.instance) {
      TagService.instance = new TagService()
    }
    return TagService.instance
  }



  // Service functions
  public async findAll(): Promise<Tag[]> {
    return prisma.tag.findMany({ where: { isDeleted: false } });
  }

  public async findById(id: string): Promise<Tag | null> {
    return prisma.tag.findFirst({ where: { id, isDeleted: false } });
  }


  /**
   * Find tags whose name contains the given substring (case-insensitive).
   */
  public async search(term: string): Promise<Tag[]> {
    return prisma.tag.findMany({
      where: {
        name: { contains: term, mode: 'insensitive' },
        isDeleted: false,
      },
      take: 20,          // limit results for performance
      orderBy: { name: 'asc' },
    });
  }

  public async create(data: CreateTagInput): Promise<Tag> {
    const slug = slugify(data.name, { lower: true, strict: true });
    return prisma.tag.create({
      data: {
        name: data.name,
        slug,
        createdBy: data.createdBy,
      },
    });
  }

  public async update(id: string, data: UpdateTagInput): Promise<Tag> {
    const updateData: Partial<UpdateTagInput & { slug: string }> = { ...data };
    if (data.name) {
      updateData.slug = slugify(data.name, {
        lower: true,
        strict: true
      });
    }
    return prisma.tag.update({
      where: { id },
      data: updateData,
    });
  }

  public async remove(id: string): Promise<void> {
    // soft delete
    await prisma.tag.update({
      where: { id },
      data: {
        isDeleted: true
      }
    });
  }
};

