import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('./composables/useEnumOptions', () => ({ useEnumOptions: () => ({
  genderOptions: () => [{ value: 'male', label: 'Male' }],
  pronounsOptions: () => [{ value: 'he', label: 'He' }]
}) }))
vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (k: string) => k }) }))

import GenderPickerComponent from '../GenderPickerComponent.vue'

describe('GenderPickerComponent', () => {
  it('emits changed when gender updates', async () => {
    const wrapper = mount(GenderPickerComponent, {
      props: { modelValue: { gender: null, pronouns: null } as any },
      global: { stubs: { FormKit: true, BButton: true, BCollapse: true } }
    })
    ;(wrapper.vm as any).gender = 'male'
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('changed')![0][0]).toEqual({ gender: 'male', pronouns: null })
  })
})
