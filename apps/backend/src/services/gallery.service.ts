import cuid from 'cuid';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';

import { prisma } from '../lib/prisma'
import { MultipartFile } from '@fastify/multipart';
import { ProfileImage } from '@prisma/client';
import { createStorageDir, generateStorageDirPrefix, getStorageRelativePath, getUploadBaseDir } from 'src/lib/media';


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

  async storeImage(userId: string, fileUpload: MultipartFile) {
    // Validate file type
    if (!fileUpload.mimetype.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Generate a CUID for the ProfileImage
    const filename = cuid();
    const storagePrefix = generateStorageDirPrefix();
    const uploadBaseDir = getUploadBaseDir();
    const uploadDir = path.join(uploadBaseDir, storagePrefix)
    createStorageDir(uploadDir);

    const fileExtension = path.extname(fileUpload.filename);
    const storageRelPath = getStorageRelativePath(storagePrefix, filename, fileExtension);
    const fullPath = path.join(uploadBaseDir, storageRelPath);

    // Save the file
    await pipeline(
      fileUpload.file,
      createWriteStream(fullPath)
    );

    // Create a new ProfileImage record
    const profileImage = await this.createImage({
      userId: userId,
      mimeType: fileUpload.mimetype,
      storagePath: storageRelPath,
    })
    console.log('Created ProfileImage:', profileImage);
    return profileImage;
  }

  /**
   * Create a new ProfileImage record
   */
  async createImage(data: {
    userId: string;
    mimeType: string;
    storagePath: string;
    altText?: string;
  }): Promise<ProfileImage> {
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
        mimeType: image.mimeType,
        storagePath: image.storagePath,
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
}
