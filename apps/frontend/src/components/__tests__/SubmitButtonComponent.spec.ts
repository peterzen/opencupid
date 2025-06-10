import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SubmitButtonComponent from '../SubmitButtonComponent.vue'

describe('SubmitButtonComponent', () => {
  it('shows loading text when isLoading', () => {
    const wrapper = mount(SubmitButtonComponent, { props: { isLoading: true } })
    expect(wrapper.find('button').text()).toContain('Working...')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('shows Save when not loading', () => {
    const wrapper = mount(SubmitButtonComponent, { props: { isLoading: false } })
    expect(wrapper.find('button').text()).toBe('Save')
  })
})
