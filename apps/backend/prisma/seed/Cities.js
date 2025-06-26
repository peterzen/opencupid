const { PrismaClient } = require('@prisma/client')
const cities = require('all-the-cities')

const prisma = new PrismaClient()

async function main() {
  const toUpsert = cities.map(c => ({
    name: c.name,
    country: c.country,
    lat: c.loc.coordinates[1],
    lon: c.loc.coordinates[0],
    isApproved: true,
  }))

  const recordsToInsert = toUpsert.length

  // Batch insert 10 at a time
  for (let i = 0; i < recordsToInsert; i += 10) {
    const batch = toUpsert.slice(i, i + 10)
    await Promise.all(
      batch.map(city =>
        prisma.city.create({ data: city })
      )
    )
  }

  console.log(`Seeded ${recordsToInsert} cities!`)
}

main()
  .catch(e => { throw e })
  .finally(() => prisma.$disconnect())
