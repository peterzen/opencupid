import cuid from 'cuid';
import path from 'path';
import { createHash } from 'crypto';
import { Transform } from 'stream';
import fs from 'fs';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { MultipartFile, SavedMultipartFile } from '@fastify/multipart';

import { prisma } from '../lib/prisma'
import { ProfileImage } from '@prisma/client';
import {
  createStorageDir,
  generateStorageDirPrefix,
  getStorageRelativePath,
  getUploadBaseDir
} from 'src/lib/media';

import {
  ownerProfileImageSchema,
  OwnerProfileImageSchema,
  PublicProfileImageSchema,
  publicProfileImageSchema,
  type CreateProfileImageSchema
} from '@zod/media.schema';
import env from 'src/env';
import { generateContentHash } from '@utils/hash';


export class ImageGalleryService {
  private static instance: ImageGalleryService;

  /**
   * Private constructor to prevent direct instantiation
   */
  private constructor() { }

  /**
   * Get singleton instance
   */
  public static getInstance(): ImageGalleryService {
    if (!ImageGalleryService.instance) {
      ImageGalleryService.instance = new ImageGalleryService();
    }
    return ImageGalleryService.instance;
  }

  /**
   * Get a single image by ID for the authenticated user
   */
  async getImage(id: string, userId: string): Promise<ProfileImage | null> {
    return prisma.profileImage.findFirst({ where: { id, userId } });
  }

  /**
   * List all images for a given user, most recent first
   */
  async listImages(userId: string): Promise<ProfileImage[]> {
    return prisma.profileImage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Store an image uploaded by the user
   * Returns the created ProfileImage record
   */
  async storeImage(userId: string, fileUpload: SavedMultipartFile, captionText: string): Promise<ProfileImage> {

    // Generate a CUID for the ProfileImage
    const filename = cuid();
    const storagePrefix = generateStorageDirPrefix();
    const uploadBaseDir = getUploadBaseDir();
    const uploadDir = path.join(uploadBaseDir, storagePrefix)
    createStorageDir(uploadDir);

    const fileExtension = path.extname(fileUpload.filename);
    const storageRelPath = getStorageRelativePath(storagePrefix, filename, fileExtension);
    const fullPath = path.join(uploadBaseDir, storageRelPath);

    // Move the uploaded temp file to the final location
    await fs.promises.rename(fileUpload.filepath, fullPath);

    // compute the content hash of the file
    const contentHash = await generateContentHash(fullPath)

    // Create a new ProfileImage record
    return await this.createImage({
      userId: userId,
      mimeType: fileUpload.mimetype,
      altText: captionText,
      storagePath: storageRelPath,
      isModerated: false,
      contentHash: contentHash
    })
  }

  /**
   * Create a new ProfileImage record
   */
  async createImage(data: CreateProfileImageSchema): Promise<ProfileImage> {
    return prisma.profileImage.create({ data });
  }

  /**
   * Update an existing ProfileImage's metadata
   * Returns number of records updated (0 or 1)
   */
  async updateImage(image: ProfileImage): Promise<ProfileImage> {
    return prisma.profileImage.update({
      where: { id: image.id },
      data: {
        altText: image.altText,
      }
    });
  }

  /**
   * Delete a ProfileImage record
   * Returns true if successful, false if not
   */
  async deleteImage(userId: string, imageId: string): Promise<boolean> {

    const image = await prisma.profileImage.findUnique({
      where: { id: imageId, userId },
    });
    if (!image) {
      console.error('Image not found or does not belong to user');
      return false;
    }
    const result = await prisma.profileImage.delete({
      where: { id: image.id }
    });
    console.log('Deleted ProfileImage record:', result);

    // Delete the file from the filesystem
    const file = path.join(getUploadBaseDir(), image.storagePath);

    try {
      fs.unlinkSync(file);
      console.log('File deleted:', file);
    } catch (err) {
      console.error('Error deleting file:', err);
      return false;
    }
    return true
  }

  /**
   * Constructs the public URL for the image
   */
  getImageUrl(image: ProfileImage): string {
    const urlBase = env.IMAGE_URL_BASE
    return `${urlBase}/${image.storagePath}`;
  }

  /**
   * Add the public URL to the image object and sanitize it
   * by removing any non-public fields
   */
  toPublicProfileImage(image: ProfileImage): PublicProfileImageSchema {
    image.url = this.getImageUrl(image);
    return publicProfileImageSchema.parse(image)
  }

  /**
   * Add the public URL to the image object and sanitize it
   * by removing fields that are not accessible to the owner
   */
  toOwnerProfileImage(image: ProfileImage): OwnerProfileImageSchema {
    image.url = this.getImageUrl(image);
    return ownerProfileImageSchema.parse(image)
  }

}
