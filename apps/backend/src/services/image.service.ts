import cuid from 'cuid';
import path from 'path';
import fs from 'fs';
import { SavedMultipartFile } from '@fastify/multipart';

import { prisma } from '../lib/prisma'
import { ProfileImage } from '@prisma/client';
import {
  createStorageDir,
  generateStorageDirPrefix,
  getStorageRelativePath,
  getUploadBaseDir
} from 'src/lib/media';

import { generateContentHash } from '@utils/hash';
import { ProfileImagePosition } from '@zod/profileimage.schema';


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
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Store an image uploaded by the user
   * @param userId - ID of the user uploading the image
   * @param fileUpload - The uploaded file object
   * @param captionText - Optional caption or alt text for the image
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
    return await prisma.profileImage.create({
      data: {
        userId: userId,
        mimeType: fileUpload.mimetype,
        altText: captionText,
        storagePath: storageRelPath,
        isModerated: false,
        contentHash: contentHash,
        position: -1, // last position
      }
    });
  }

  /**
   * Update an existing ProfileImage's metadata
   * @param image - The ProfileImage object with updated fields
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
   * @param userId - ID of the user who owns the image
   * @param imageId - ID of the image to delete
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
      where: { id: image.id },
    });

    // Delete the file from the filesystem
    const file = path.join(getUploadBaseDir(), image.storagePath);

    try {
      fs.unlinkSync(file);
    } catch (err) {
      console.error('Error deleting file:', err);
      return false;
    }
    return true
  }

  /**
   * Reorder images by updating their positions
   * @param userId - ID of the user whose images are being reordered
   * @param items - Array of image IDs and their new positions
   * Returns the updated images sorted by position
   */
  async reorderImages(userId: string, items: ProfileImagePosition[]) {

    const valid = await prisma.profileImage.findMany({
      where: { userId, id: { in: items.map((i) => i.id) } },
      select: { id: true },
    })

    const validIds = new Set(valid.map((v) => v.id))
    if (items.some((i) => !validIds.has(i.id))) {
      throw new Error('Invalid image ID')
    }

    // Bulk‐update positions in a single transaction
    const ops = items.map((item) =>
      prisma.profileImage.update({
        where: { id: item.id },
        data: { position: item.position },
      })
    )
    const updated = await prisma.$transaction(ops)

    // Return them sorted by position
    return updated.sort((a, b) => a.position - b.position)
  }
}
