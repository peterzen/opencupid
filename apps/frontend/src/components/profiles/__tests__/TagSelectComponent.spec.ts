import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

const searchTags = vi.fn().mockResolvedValue([{ id: '1', name: 'vue' }])
const addUserTag = vi.fn().mockResolvedValue({ id: '2', name: 'new' })
vi.mock('@/store/tagStore', () => ({ useTagsStore: () => ({ searchTags, addUserTag }) }))
vi.mock('vue-multiselect', () => ({ default: { template: '<div />' } }))

import TagSelectComponent from '../TagSelectComponent.vue'

describe('TagSelectComponent', () => {
  it('searches and adds tags', async () => {
    const wrapper = mount(TagSelectComponent, { props: { modelValue: [] } })
    await (wrapper.vm as any).asyncFind('vue')
    expect(searchTags).toHaveBeenCalledWith('vue')
    await (wrapper.vm as any).addTag('new')
    expect(addUserTag).toHaveBeenCalledWith({ name: 'new' })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
