import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/router', () => ({ default: { push: vi.fn() } }))
import router from '@/router'
import NoProfileInfoCTAComponent from '../NoProfileInfoCTAComponent.vue'

describe('NoProfileInfoCTAComponent', () => {
  it('pushes onboarding route on click', async () => {
    const wrapper = mount(NoProfileInfoCTAComponent)
    await wrapper.find('button').trigger('click')
    expect((router as any).push).toHaveBeenCalledWith({ name: 'Onboarding' })
  })
})
