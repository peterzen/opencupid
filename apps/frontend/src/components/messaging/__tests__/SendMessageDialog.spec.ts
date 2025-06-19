import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (k: string) => k }) }))

import SendMessageDialog from '../SendMessageDialog.vue'

describe('SendMessageDialog', () => {
  it('renders dialog text', () => {
    const wrapper = mount(SendMessageDialog)
    expect(wrapper.text()).toContain('messaging.send_message_heading')
  })
})
