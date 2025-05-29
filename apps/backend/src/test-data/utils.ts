import { MultipartFile } from '@fastify/multipart'
import axios from 'axios'
import cuid from 'cuid'
import fs, { createReadStream } from 'fs'
import path from 'path'



/**
 * Returns true with the given probability.
 * @param probability number between 0 and 1
 */
export function randomBoolean(probability: number): boolean {
  return Math.random() < probability
}



/**
 * Downloads an image from `url` and saves it in `outputDir` with the next available numeric filename.
 * Creates the directory if missing. Returns the full path of the saved file.
 */
export async function downloadImage(
  url: string,
  outputDir: string,
): Promise<string> {
  // 1. Ensure the target directory exists

  await fs.promises.mkdir(outputDir, { recursive: true })

  // 2. Compute next index and target file path
  const index = cuid.slug()
  const filename = `${index}.jpg`
  const outputPath = path.join(outputDir, filename)

  // 3. Fetch the image as a stream
  const response = await axios.get<import('stream').Readable>(url, {
    responseType: 'stream',
  })

  // 4. Pipe the response data into a write stream
  const writer = (await import('fs')).createWriteStream(outputPath)
  response.data.pipe(writer)

  // 5. Await stream finish
  await new Promise<void>((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })

  return outputPath
}


