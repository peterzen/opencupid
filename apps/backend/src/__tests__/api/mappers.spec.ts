import { describe, it, expect } from 'vitest'
import { vi, describe, it, expect } from 'vitest'
import { mapProfileImagesToOwner } from '../../api/mappers'
vi.mock('@shared/config/appconfig', () => ({ appConfig: { IMAGE_URL_BASE: 'http://img' } }))

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
})
