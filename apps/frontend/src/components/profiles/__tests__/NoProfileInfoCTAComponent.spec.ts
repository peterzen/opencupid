import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (k: string) => k }) }))

// 👇 Create a shared spy that survives across scopes
const push = vi.fn()

// 👇 Mock useRouter globally
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}))

import NoProfileInfoCTAComponent from '../NoProfileInfoCTA.vue'

describe('NoProfileInfoCTAComponent', () => {
  it('pushes onboarding route on click', async () => {
    const wrapper = mount(NoProfileInfoCTAComponent)
    await wrapper.find('button').trigger('click')
    expect(push).toHaveBeenCalledWith({ name: 'Onboarding' })
  })
})
