import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

const show = vi.fn()
const hide = vi.fn()

vi.mock('bootstrap', () => ({ Modal: vi.fn(() => ({ show, hide })) }))

import ModalDialogComponent from '../ModalDialogComponent.vue'

describe('ModalDialogComponent', () => {
  it('calls bootstrap show/hide when open changes', async () => {
    const wrapper = mount(ModalDialogComponent, { props: { title: 'T', open: false } })
    await wrapper.setProps({ open: true })
    expect(show).toHaveBeenCalled()
    await wrapper.setProps({ open: false })
    expect(hide).toHaveBeenCalled()
  })
})
