import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

const BListGroup = { template: '<div><slot /></div>' }
const BListGroupItem = { template: '<div @click="$emit(\'click\')"><slot /></div>' }
const ProfileThumbnail = { template: '<div />' }

import ConversationSummaries from '../ConversationSummaries.vue'

describe('ConversationSummaries', () => {
  it('emits convo:select when item clicked', async () => {
    const convos = [
      { conversationId: '1', partnerProfile: { publicName: 'Alice' } },
      { conversationId: '2', partnerProfile: { publicName: 'Bob' } }
    ]
    const wrapper = mount(ConversationSummaries, {
      props: { conversations: convos, activeConversation: null },
      global: { stubs: { BListGroup, BListGroupItem, ProfileThumbnail } }
    })
    await wrapper.findComponent(BListGroupItem).trigger('click')
    expect(wrapper.emitted('convo:select')![0][0]).toEqual(convos[0])
  })
})
