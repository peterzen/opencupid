import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { setActivePinia, createPinia } from 'pinia'

const sendMessage = vi.fn().mockResolvedValue({})
const initiateConversation = vi.fn().mockResolvedValue({})
vi.mock('../../composables/useMessaging', () => ({
  useMessaging: () => ({
    sendMessage,
    initiateConversation,
    isSending: ref(false),
    isSent: ref(false),
    errorMsg: ref('')
  })
}))

const setMessageDraft = vi.fn()
const getMessageDraft = vi.fn().mockReturnValue('')
vi.mock('@/store/localStore', () => ({ useLocalStore: () => ({ setMessageDraft, getMessageDraft }) }))
vi.mock('@/components/profiles/display/TagList.vue', () => ({ default: { template: '<div />' } }))
vi.mock('@/components/profiles/display/LanguageList.vue', () => ({ default: { template: '<div />' } }))

import SendMessage from '../SendMessage.vue'

describe('SendMessage', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('sends message using provided conversationId', async () => {
    const wrapper = mount(SendMessage, {
      props: { recipientProfile: { id: '1', languages: [], tags: [] }, conversationId: 'abc' },
      global: { stubs: { BFormGroup: true, BFormTextarea: true } }
    })
    ;(wrapper.vm as any).content = 'hi'
    await (wrapper.vm as any).handleSendMessage()
    expect(sendMessage).toHaveBeenCalledWith('abc', 'hi')
    expect(setMessageDraft).toHaveBeenCalledWith('1', '')
  })

  it('initiates conversation when no conversationId', async () => {
    const wrapper = mount(SendMessage, {
      props: { recipientProfile: { id: '1', languages: [], tags: [] }, conversationId: null },
      global: { stubs: { BFormGroup: true, BFormTextarea: true } }
    })
    ;(wrapper.vm as any).content = 'hello'
    await (wrapper.vm as any).handleSendMessage()
    expect(initiateConversation).toHaveBeenCalled()
  })
})
