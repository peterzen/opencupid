import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

vi.mock('vue-i18n', () => ({ useI18n: () => ({ t: (k: string) => k }) }))
import SubmitButtonComponent from '../SubmitButtonComponent.vue'

describe('SubmitButtonComponent', () => {
  it('shows loading text when isLoading', () => {
    const wrapper = mount(SubmitButtonComponent, { props: { isLoading: true } })
    expect(wrapper.find('button').text()).toContain('uicomponents.submitbutton.working')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('shows Save when not loading', () => {
    const wrapper = mount(SubmitButtonComponent, { props: { isLoading: false } })
    expect(wrapper.find('button').text()).toBe('uicomponents.submitbutton.save')
  })
})
