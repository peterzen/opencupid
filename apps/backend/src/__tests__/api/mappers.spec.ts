import { vi, describe, it, expect } from 'vitest'
import { mapProfileImagesToOwner, mapToLocalizedUpserts } from '../../api/mappers/profile.mappers'
vi.mock('@/lib/appconfig', () => ({ appConfig: { IMAGE_URL_BASE: 'http://img' } }))

const image: any = {
  id: 'ckaaaaaaaaaaaaaab',
  userId: 'ckbbbbbbbbbbbbbb',
  profileId: null,
  position: 0,
  altText: '',
  storagePath: 'path/to/img',
  url: null,
  width: null,
  height: null,
  mimeType: 'image/jpeg',
  createdAt: new Date(),
  updatedAt: new Date(),
  contentHash: null,
  isModerated: false,
  isFlagged: false,
}

describe('mappers', () => {
  it('adds url to profile images', () => {
    const res = mapProfileImagesToOwner([image])
    expect(res[0]).toHaveProperty('url')
    expect(res[0].url).toMatch('http://img/path/to/img')
  })

  it('creates upsert payloads from localized data', () => {
    const upserts = mapToLocalizedUpserts('p1', {
      introSocialLocalized: { en: 'hi', fr: 'salut' },
      introDatingLocalized: { en: 'hey' },
    })
    expect(upserts).toContainEqual({ locale: 'en', updates: { introSocial: 'hi', introDating: 'hey' } })
    expect(upserts).toContainEqual({ locale: 'fr', updates: { introSocial: 'salut' } })
  })
})
