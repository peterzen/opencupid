import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import cuid from 'cuid';
import path from 'path';
import { createStorageDir, getStorageDirPrefix, getStorageRelativePath, getUploadBaseDir } from 'src/lib/media';
import multipart from '@fastify/multipart';
import { validateBody } from '@utils/zodValidate';

import { UploadImageSchema } from '@zod/media.schema'

const uploadRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(multipart);
  // Single file upload route
  fastify.post('/upload-single/:profileId', {
    onRequest: [fastify.authenticate]
  }, async (req, reply) => {
    const { profileId } = req.params as { profileId: string }

    // const data = validateBody(UploadImageSchema, req, reply)
    // if (!data) return
    const fileUpload = await req.file();

    if (!fileUpload) {
      throw new Error('No file uploaded');
    }

    // Validate file type
    if (!fileUpload.mimetype.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Generate a CUID for the ProfileImage
    const imageId = cuid();
    const storagePrefix = getStorageDirPrefix();
    const uploadBaseDir = getUploadBaseDir();
    const uploadDir = path.join(uploadBaseDir, storagePrefix)
    createStorageDir(uploadDir);

    const fileExtension = path.extname(fileUpload.filename);
    const storageRelPath = getStorageRelativePath(storagePrefix, imageId, fileExtension);

    // Create a new ProfileImage record
    const profileImage = await fastify.prisma.profileImage.create({
      data: {
        id: imageId,
        userId: req.user.userId,
        primaryForProfile: { connect: { id: profileId } },
        mimeType: fileUpload.mimetype,
        storagePath: storageRelPath,
      }
    });
    console.log('Created ProfileImage record:', profileImage);

    // Save the file
    await pipeline(
      fileUpload.file,
      createWriteStream(path.join(uploadBaseDir, storageRelPath))
    );
    console.log('File saved to:', path.join(uploadBaseDir, storageRelPath));
    return reply.status(200).send({ success: true, profileImage: profileImage })
  })

  // Multiple files upload route
  fastify.post('/upload-many', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const files: MultipartFile[] = [];
    const uploadedFiles: string[] = [];

    for await (const part of request.parts()) {
      if (part.type === 'file') {
        files.push(part);
      }
    }

    for (const file of files) {
      if (!file.mimetype.startsWith('image/')) {
        throw new Error(`File ${file.filename} must be an image`);
      }

      const fileName = `${Date.now()}-${file.filename}`;
      const uploadDir = path.join(__dirname, '../../uploads');

      await pipeline(
        file.file,
        createWriteStream(path.join(uploadDir, fileName))
      );

      uploadedFiles.push(fileName);
    }

    return {
      message: 'Files uploaded successfully',
      fileNames: uploadedFiles
    };
  });
};

export default uploadRoutes;