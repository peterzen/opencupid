import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import path from 'path';

const uploadRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Single file upload route
  fastify.post('/single', {
    handler: async (request, reply) => {
      const data = await request.file();
      
      if (!data) {
        throw new Error('No file uploaded');
      }

      // Validate file type
      if (!data.mimetype.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      const fileName = `${Date.now()}-${data.filename}`;
      const uploadDir = path.join(__dirname, '../../uploads');
      
      await pipeline(
        data.file,
        createWriteStream(path.join(uploadDir, fileName))
      );

      return { 
        message: 'File uploaded successfully',
        fileName 
      };
    }
  });

  // Multiple files upload route
  fastify.post('/upload-many', {
    handler: async (request, reply) => {
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
    }
  });
};

export default uploadRoutes;