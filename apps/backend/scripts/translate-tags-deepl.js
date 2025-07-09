import { PrismaClient } from '@prisma/client'
import * as deepl from 'deepl-node';

const prisma = new PrismaClient()

// Parse credentials JSON from env
const authKey = process.env.DEEPL_API_KEY
const deeplClient = new deepl.DeepLClient(authKey);

const TARGET_LOCALES = ['fr', 'de', 'hu', 'es', 'fr', 'it', 'pt-PT', 'sk', 'pl', 'ro', 'nl']

const dryRun = false // Toggle this

async function translateText(text, target) {
  const translated = await deeplClient.translateText(text, 'en', target)
  return translated.text
}

async function main() {
  const tags = await prisma.tag.findMany({
    include: { translations: true },
  })

  let count = 0

  for (const tag of tags) {
    const existing = new Set(tag.translations.map(t => t.locale))

    for (const longLocale of TARGET_LOCALES) {

      const locale = longLocale.slice(0,2) // Use only the first two characters for locale
      if (existing.has(locale)) continue

      try {
        const translated = await translateText(tag.name, longLocale)

        if (dryRun) {
          console.log(`Would translate "${tag.name}" → [${locale}] "${translated}"`)
        } else {
          await prisma.tagTranslation.upsert({
            where: {
              tagId_locale: {
                tagId: tag.id,
                locale: locale,
              },
            },
            update: {
              tagId: tag.id,
              locale,
              name: translated,
            },
            create: {
              tagId: tag.id,
              locale,
              name: translated,
            },
          })
          console.log(`✔ Translated "${tag.name}" → [${locale}] "${translated}"`)
        }

        count++
      } catch (err) {
        console.error(`❌ Failed to translate "${tag.name}" to [${locale}]:`, err)
      }
    }
      await sleep(1000); // Wait for 1 second
  }

  console.log(dryRun
    ? `🔎 Dry run complete. Would create ${count} translations.`
    : `✅ Created ${count} translations.`)
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
