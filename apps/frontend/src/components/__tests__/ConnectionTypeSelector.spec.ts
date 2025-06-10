import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (k: string) => k }) }))
vi.mock('@/assets/icons/app/cupid.svg', () => ({ default: { template: '<div />' } }))
vi.mock('@/assets/icons/app/socialize.svg', () => ({ default: { template: '<div />' } }))
const stubComponent = { template: '<div />' }
import ConnectionTypeSelector from '../ConnectionTypeSelector.vue'

describe('ConnectionTypeSelector', () => {
  it('emits events when tabs clicked', async () => {
    const wrapper = mount(ConnectionTypeSelector, {
      props: { isDatingActive: false, activeTab: 'friend' },
      global: { stubs: { IconDate: stubComponent, IconSocialize: stubComponent, ToggleSwitch: stubComponent } }
    })

    await wrapper.findAll('a').at(0)!.trigger('click')
    expect(wrapper.emitted('update:selectTab')![0]).toEqual(['friend'])

    await wrapper.findAll('a').at(1)!.trigger('click')
    expect(wrapper.emitted('update:selectTab')![1]).toEqual(['dating'])
  })
})
