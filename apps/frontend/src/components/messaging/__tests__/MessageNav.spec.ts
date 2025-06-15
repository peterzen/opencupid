import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/icons/DoodleIcons', () => ({
  IconArrowSingleLeft: { template: '<div class="back" @click="$emit(\'click\')" />' },
  IconMenu: { template: '<div />' }
}))
vi.mock('../profiles/image/ProfileImage.vue', () => ({ default: { template: '<div />' } }))

import MessageNav from '../MessageNav.vue'

const stubs = {
  BNavbar: true,
  BNavbarNav: true,
  BNavItem: { template: '<div><slot /></div>' },
  BNavItemDropdown: true,
  BDropdownItem: true,
  ProfileImage: true
}

describe('MessageNav', () => {
  it('emits nav:back on arrow click', async () => {
    const wrapper = mount(MessageNav, {
      props: { recipient: { publicName: 'A' } },
      global: { stubs }
    })
    ;(wrapper.vm as any).$emit('nav:back')
    expect(wrapper.emitted('nav:back')).toBeTruthy()
  })
})
