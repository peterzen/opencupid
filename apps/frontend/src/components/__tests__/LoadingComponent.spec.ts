import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LoadingComponent from '../LoadingComponent.vue'

describe('LoadingComponent', () => {
  it('renders a spinner', () => {
    const wrapper = mount(LoadingComponent)
    expect(wrapper.find('.spinner-border').exists()).toBe(true)
  })
})
