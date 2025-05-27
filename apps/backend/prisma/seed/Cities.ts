// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import cities from 'all-the-cities'
// import type {} from '@types/all-the-cities'
const prisma = new PrismaClient()

async function main() {
  const toUpsert = cities.map(c => ({
    id: c.cityId,
    name: c.name,
    country: c.country,
    lat: c.loc.coordinates[1],
    lon: c.loc.coordinates[0],
  }))

  // Upsert all in batches
  for (let i = 0; i < toUpsert.length; i += 1000) {
    const batch = toUpsert.slice(i, i + 1000)
    await Promise.all(batch.map(city =>
      prisma.city.upsert({
        where: { id: city.id },
        update: {},
        create: city
      })
    ))
  }
  console.log(`Seeded ${toUpsert.length} cities!`)
}

main()
  .catch(e => { throw e })
  .finally(() => prisma.$disconnect())
