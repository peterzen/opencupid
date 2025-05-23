import path from 'path';
import { randomUUID } from 'crypto'
import { createHash } from 'crypto'
import fs from 'fs'

import env from '../env'

export function generateStorageDirPrefix(): string {
  // 1) Generate a unique ID
  const id = randomUUID() // e.g. "9f47a2c9-9f1c-4a2d-8b1e-1234567890ab"

  // 2) Hash the ID for even distribution
  const hash = createHash('md5').update(id).digest('hex') // 32 hex chars

  // 3) Take the first 2 chars as your bucket
  const prefix = hash.slice(0, 2) // e.g. "a3"

  return prefix
}

export function getStorageRelativePath(dirPrefix: string, imageId: string, ext: string): string {
  //    a3/9f47a2c9-9f1c-4a2d-8b1e-1234567890ab.jpg
  return path.posix.join(dirPrefix, `${imageId}${ext}`)
}

export function getUploadBaseDir(): string {
  // Get the directory where the uploads are stored
  return env.MEDIA_UPLOAD_DIR
}

export function checkUploadBaseDir(): boolean {
  // Check if the upload directory exists, and create it if it doesn't
  const uploadDir = getUploadBaseDir()
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
  // Check if the directory is writable
  try {
    fs.accessSync(uploadDir, fs.constants.W_OK)
    return true
  } catch (error) {
    return false
  }
}

export function createStorageDir(uploadDir: string) {
  // Create the storage directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
}


