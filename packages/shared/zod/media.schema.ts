import { profile } from 'console';
import { z } from 'zod';

export const UploadImageSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => {
      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      return file.size <= maxSize;
    },
    { message: 'File size must be less than 5MB' }
  ).refine(
    (file) => {
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      return validTypes.includes(file.type);
    },
    { message: 'File must be JPEG, PNG, or WebP' }
  ),
});

// export type UploadImage = z.infer<typeof UploadImageSchema>;