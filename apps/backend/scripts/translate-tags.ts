import { PrismaClient } from '@prisma/client';
import { v2 as Translate } from '@google-cloud/translate';

const prisma = new PrismaClient();
const translate = new Translate.Translate();

const TARGET_LOCALES = ['fr', 'de', 'hu', 'es'];
const dryRun = false; // Toggle this

async function translateText(text: string, target: string): Promise<string> {
  const [translated] = await translate.translate(text, target);
  return translated;
}

async function main() {
  const tags = await prisma.tag.findMany({
    include: { translations: true },
  });

  let count = 0;

  for (const tag of tags) {
    const existing = new Set(tag.translations.map(t => t.locale));

    for (const locale of TARGET_LOCALES) {
      if (existing.has(locale)) continue;

      try {
        const translated = await translateText(tag.name, locale);

        if (dryRun) {
          console.log(`Would translate "${tag.name}" → [${locale}] "${translated}"`);
        } else {
          await prisma.tagTranslation.create({
            data: {
              tagId: tag.id,
              locale,
              name: translated,
            },
          });
          console.log(`✔ Translated "${tag.name}" → [${locale}] "${translated}"`);
        }

        count++;
      } catch (err) {
        console.error(`❌ Failed to translate "${tag.name}" to [${locale}]:`, err);
      }
    }
  }

  console.log(dryRun
    ? `🔎 Dry run complete. Would create ${count} translations.`
    : `✅ Created ${count} translations.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
