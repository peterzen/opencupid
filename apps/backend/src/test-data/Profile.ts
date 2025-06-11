import 'dotenv/config'

import { prisma } from '@/lib/prisma'
import mime from 'mime-types'
import { faker, SexType } from '@faker-js/faker'
import fs from 'fs'

import { downloadImage, randomBoolean } from './utils'
import { User, GenderType, UserRoleType } from '@zod/generated'
import { HasKids, Pronouns, RelationshipStatus } from '@prisma/client'

import { ImageGalleryService } from '../services/image.service'
import path, { basename, dirname } from 'path'
import { makeImageLocation } from '@/lib/media'
import { ProfileService } from '@/services/profile.service'
import type { OwnerProfile, ProfileComplete } from '@zod/db/profile.db'
import cuid from 'cuid'
import { appConfig } from '@shared/config/appconfig'

const imageService = ImageGalleryService.getInstance()
const profileService = ProfileService.getInstance()

const howMany = 1
const languages = ['en', 'de', 'it', 'fr', 'es', 'pt', 'hu', 'nl']

const testImagesDir = path.join(appConfig.MEDIA_UPLOAD_DIR, '/test-images')
// faker.seed(123);

export function createRandomUser() {
  const isDatingActive = randomBoolean(0.3)
  const roles = ['user'] as UserRoleType[]
  if (isDatingActive) {
    roles.push('user_dating')
  }

  return {
    email: faker.internet.email(),
    createdAt: faker.date.past(),
    lastLoginAt: faker.date.recent(),
    isRegistrationConfirmed: true,
    hasActiveProfile: true,
    isActive: true,
    roles: roles,
  }
}

export function createRandomProfile(user: User) {
  const gender = faker.person.sex() as GenderType
  const isDatingActive = user.roles.includes('user_dating')
  const baseProfile = {
    userId: user.id,
    slug: cuid.slug(),
    publicName: faker.person.firstName(),
    country: faker.location.countryCode(),
    cityName: faker.location.city(),
    introSocial: faker.person.bio() + ' ' + faker.lorem.sentences({ min: 1, max: 4 }),

    isActive: true,
    isDatingActive: isDatingActive,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }

  const datingProfile = isDatingActive
    ? {
        languages: faker.helpers.arrayElements(languages, faker.number.int({ min: 1, max: 3 })),
        work: faker.person.jobTitle(),
        introDating: faker.person.bio() + ' ' + faker.lorem.sentences({ min: 1, max: 4 }),
        birthday: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
        gender: gender,
        relationship: faker.helpers.enumValue(RelationshipStatus),
        hasKids: faker.helpers.enumValue(HasKids),
        pronouns: faker.helpers.enumValue(Pronouns),
      }
    : {}

  return {
    ...baseProfile,
    ...datingProfile,
  }
}

async function fetchTags() {
  return await prisma.tag.findMany({
    select: {
      id: true,
    },
  })
}

let tags = [] as any[]

// const storagePrefix = generateStorageDirPrefix();
// const uploadBaseDir = getUploadBaseDir();
// const uploadDir = path.join(uploadBaseDir, storagePrefix)
// createStorageDir(uploadDir);

// const imageDir = './test-data/images'

async function main() {
  tags = await fetchTags()
  const users = faker.helpers.multiple(createRandomUser, {
    count: howMany,
  })

  users.forEach(async user => {
    // Create the user in the database
    const createdUser = await prisma.user.create({
      data: user,
    })

    const profile = createRandomProfile(createdUser)

    // console.log(`Creating profile for user ${createdUser.email}...`,profile);
    // return
    // Create the profile for the user
    const createdProfile = await prisma.profile.create({
      data: {
        ...profile,
        userId: createdUser.id,
      },
    })

    console.log(`Created user  with profile ID`, createdProfile)

    // Add random tags to the profile
    const randomTags = faker.helpers.arrayElements(tags, faker.number.int({ min: 1, max: 5 }))
    for (const tag of randomTags) {
      await prisma.profileTag.create({
        data: {
          profileId: createdProfile.id,
          tagId: tag.id,
        },
      })
      console.log(`Added tag ID ${tag.id} to profile ID ${createdProfile.id}`)
    }

    const imageUrls = []

    // primary profile image
    imageUrls.push({
      url: faker.image.personPortrait({
        sex: profile.gender as SexType,
        size: 512,
      }),
      cat: 'avatar',
    })

    faker.helpers
      .multiple(
        () =>
          faker.image.urlPicsumPhotos({
            width: 1024,
            height: 768,
          }),
        {
          count: faker.number.int({ min: 1, max: 3 }),
        }
      )
      .forEach(url => {
        imageUrls.push({
          url,
          cat: 'gallery',
        })
      })

    let i = 0
    imageUrls.forEach(async img => {
      const tmpDir = path.join(testImagesDir, img.cat)
      const tmpFile = await downloadImage(img.url, tmpDir)

      console.log(`Downloaded image ${tmpFile} `)

      const f = basename(tmpFile)
      const savedDir = path.join(tmpDir, 'saved')
      await fs.promises.mkdir(savedDir, { recursive: true })
      await fs.promises.copyFile(tmpFile, path.join(savedDir, f))

      const profileImage = await imageService.storeImage(
        createdUser.id,
        tmpFile,
        faker.lorem.sentence({ min: 1, max: 2 })
      )

      try {
        console.log(`Added image ${profileImage.id} `, profileImage)

        profileService.addProfileImage(createdProfile as ProfileComplete, profileImage.id)
      } catch (err) {
        console.error(`Error adding image for user ${createdUser.email}:`, err)
      }

      await new Promise(resolve => setTimeout(resolve, 5000))
    })
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
