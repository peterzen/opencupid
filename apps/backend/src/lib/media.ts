import path, { dirname } from 'path'
import { randomUUID } from 'crypto'
import { createHash } from 'crypto'
import fs from 'fs'

import cuid from 'cuid'
import { appConfig } from '@shared/config/appconfig'

export function uploadTmpDir() {
  return path.join(appConfig.MEDIA_UPLOAD_DIR, 'tmp')
}

export function generateStorageDirPrefix(): string {
  // 1) Generate a unique ID
  const id = randomUUID() // e.g. "9f47a2c9-9f1c-4a2d-8b1e-1234567890ab"

  // 2) Hash the ID for even distribution
  const hash = createHash('md5').update(id).digest('hex') // 32 hex chars

  // 3) Take the first 2 chars as your bucket
  const prefix = hash.slice(0, 2) // e.g. "a3"

  return prefix
}

export function getImageRoot(): string {
  // Get the directory where the uploads are stored
  return appConfig.MEDIA_UPLOAD_DIR
}

export function checkImageRoot(): boolean {
  // Check if the upload directory exists, and create it if it doesn't
  const uploadDir = getImageRoot()
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
  // Check if the directory is writable
  try {
    fs.accessSync(uploadDir, fs.constants.W_OK)
  } catch (error) {
    return false
  }
  const tmpDir = uploadTmpDir()
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true })
  }
  return true
}

type ImageLocation = {
  base: string
  relPath: string
  absPath: string
}

export async function makeImageLocation(): Promise<ImageLocation> {
  // Generate a CUID for the ProfileImage
  const base = cuid.slug()

  const imageRoot = getImageRoot()
  const storagePrefix = generateStorageDirPrefix()
  const relPath = path.posix.join(storagePrefix)
  const absPath = path.join(imageRoot, relPath)
  await fs.promises.mkdir(dirname(absPath), { recursive: true })

  return {
    base,
    relPath,
    absPath,
  }
}
