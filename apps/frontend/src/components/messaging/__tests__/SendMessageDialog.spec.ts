import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import SendMessageDialog from '../SendMessageDialog.vue'

describe('SendMessageDialog', () => {
  it('renders dialog text', () => {
    const wrapper = mount(SendMessageDialog)
    expect(wrapper.text()).toContain('Send Message')
  })
})
