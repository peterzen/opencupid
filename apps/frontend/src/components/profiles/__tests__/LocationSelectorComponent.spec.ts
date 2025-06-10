import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('vue-multiselect', () => ({ default: { template: '<div />' } }))
vi.mock('@/lib/countries', () => ({ getCountryOptions: () => [{ label: 'USA', value: 'US' }] }))
vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (k: string) => k }) }))

import LocationSelectorComponent from '../LocationSelectorComponent.vue'

describe('LocationSelectorComponent', () => {
  it('emits updates when fields change', async () => {
    const wrapper = mount(LocationSelectorComponent, {
      props: { modelValue: { country: '', cityName: '' } as any },
      global: { stubs: { FormKit: true } }
    })
    ;(wrapper.vm as any).country = { label: 'USA', value: 'US' }
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    ;(wrapper.vm as any).cityName = 'NYC'
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')!.length).toBe(2)
  })
})
