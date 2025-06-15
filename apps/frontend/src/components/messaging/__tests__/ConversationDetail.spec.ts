import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'

const getPublicProfile = vi.fn().mockResolvedValue({ id: '2', publicName: 'Bob' })
vi.mock('@/store/profileStore', () => ({ useProfileStore: () => ({ getPublicProfile }) }))
vi.mock('@/store/messageStore', () => ({ useMessageStore: () => ({ messages: [] }) }))
vi.mock('../MessagingNav.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../SendMessage.vue', () => ({ default: { template: '<div />' } }))
vi.mock('../MessageList.vue', () => ({ default: { template: '<div />' } }))

import ConversationDetail from '../ConversationDetail.vue'

describe('ConversationDetail', () => {
  it('fetches conversation partner on mount', async () => {
    const convo = { conversationId: '1', partnerProfile: { id: '2' } }
    mount(ConversationDetail, {
      props: { conversation: convo },
      global: { stubs: { BModal: true } }
    })
    expect(getPublicProfile).toHaveBeenCalledWith('2')
  })
})
