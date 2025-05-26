import slugify from 'slugify';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const interestTags = [
  // Permaculture & Sustainable Living
  'Permaculture',
  'Regenerative Agriculture',
  'Composting',
  'Organic Gardening',
  'No-Dig Gardening',
  'Food Forests',
  'Agroforestry',
  'Aquaponics',
  'Rainwater Harvesting',
  'Natural Building',
  'Earthships',
  'Tiny Houses',
  'Off-Grid Living',
  'Solar Power',
  'Wind Energy',
  'Zero Waste',
  'DIY',
  'Seed Saving',
  'Beekeeping',
  'Fermentation',
  'Canning & Preserving',
  'Foraging',
  'Eco Villages',
  'Slow Food',
  'Local Food',
  'Farmers Markets',
  'CSA (Community Supported Agriculture)',
  'Urban Gardening',
  'Compost Toilets',
  'Bokashi Composting',
  'Greywater Systems',

  // Animals
  'Animal Rescue',
  'Wildlife Conservation',
  'Birdwatching',
  'Dog Lovers',
  'Cat Lovers',
  'Horseback Riding',
  'Herpetology',
  'Marine Life',
  'Butterfly Gardening',
  'Chicken Keeping',
  'Goat Keeping',
  'Sheep Herding',
  'Veganism',
  'Vegetarianism',
  'Pet Training',
  'Animal Tracking',
  'Animal Photography',
  'Animal Behavior',

  // Music
  'Live Music',
  'Folk Music',
  'Acoustic Guitar',
  'World Music',
  'Music Festivals',
  'Singing',
  'Drumming',
  'Handpan',
  'Ukulele',
  'Improvisation',
  'Choir',
  'Sound Healing',
  'Vinyl Records',
  'DJing',
  'Songwriting',
  'Jazz',
  'Classical Music',
  'Experimental Music',

  // Culture
  'Storytelling',
  'Folk Art',
  'Pottery',
  'Knitting',
  'Fiber Arts',
  'Street Art',
  'Photography',
  'Painting',
  'Dance',
  'Circus Arts',
  'Theatre',
  'Poetry',
  'Zines',
  'Traditional Crafts',
  'Cultural Exchange',
  'Language Learning',
  'History',

  // Travel
  'Backpacking',
  'Hitchhiking',
  'Couchsurfing',
  'Bike Touring',
  'Train Travel',
  'Slow Travel',
  'Travel Writing',
  'Adventure Travel',
  'Eco Tourism',
  'Nature Walks',
  'Volunteering Abroad',
  'Hostelling',
  'Wilderness Survival',
  'Pilgrimages',
  'Nomadic Living',
  'Geocaching'
];

async function main() {
  for (const name of interestTags) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { 
        name: name,
        slug: slugify(name, { lower: true }),
        isApproved: true,
       },
    });
  }
  console.log('Seeded interest tags!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
