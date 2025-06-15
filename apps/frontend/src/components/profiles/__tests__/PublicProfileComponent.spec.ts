import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../display/GenderSymbol.vue', () => ({ default: { template: '<div />' } }))
vi.mock('./ImageCarousel.vue', () => ({ default: { template: '<div />' } }))
vi.mock('./ActionButtons.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../display/LanguageList.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../display/TagList.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../display/LocationLabel.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../display/DatingIcon.vue', () => ({ default: { template: '<div />' } }))
vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (k:string)=>k }) }))

import PublicProfileComponent from '../public/PublicProfileComponent.vue'

describe('PublicProfileComponent', () => {
  it('computes age from birthday', () => {
    const wrapper = mount(PublicProfileComponent, {
      props: { profile: { birthday: '2000-01-01', isDatingActive: true } as any, isLoading: false },
      global: { stubs: { BModal: true, BCarousel: true, BCarouselSlide: true, BButton: true, ProfileThumbnail: { template: '<div />' } } }
    })
    expect(wrapper.text()).toContain('25')
  })
})
