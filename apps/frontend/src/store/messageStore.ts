import { defineStore } from 'pinia'
import { useWebSocket } from '@vueuse/core'

import { api } from '@/lib/api'
import { bus } from '@/lib/bus'

import type { ConversationSummary, MessageInConversation } from '@zod/dto/messaging.schema'
import type {
  MessagesResponse,
  ConversationsResponse,
  ConversationResponse,
  SendMessageResponse,
} from '@shared/dto/apiResponse.dto'



export const useMessageStore = defineStore('message', {
  state: () => ({
    conversations: [] as ConversationSummary[],
    messages: [] as MessageInConversation[],
    activeConversation: null as ConversationSummary | null,
    hasUnreadMessages: false,
    unreadCount: 0,
    socket: null as any, // TODO find out why UseWebSocketReturn<any> gives TS errors
  }),

  actions: {
    connectWebSocket(token: string) {
      const url = `${__APP_CONFIG__.WS_BASE_URL}/message?token=${token}`

      const socket = useWebSocket(url, {
        immediate: true,
        autoReconnect: true,
        // heartbeat: {
        //   message: JSON.stringify({ type: 'ping' }),
        //   interval: 10000,
        //   pongTimeout: 10000,
        // },
      })
      this.socket = socket

      socket.ws.value?.addEventListener('message', this.wsMessageHandler)

      socket.ws.value?.addEventListener('close', event => {
        console.warn('WS closed. Reconnecting in 5s...')
        setTimeout(() => this.connectWebSocket(token), 5000)
      })

      console.log('WebSocket connected:', socket.ws.value)
    },

    disconnectWebSocket() {
      if (this.socket.ws) {
        this.socket.ws.close()
        this.socket = null
        console.log('Disconnecting WebSocket...')
      }
    },

    // Update a conversation in the list
    updateConvo(convo: ConversationSummary) {
      const index = this.conversations.findIndex(c => c.conversationId === convo.conversationId)
      if (index !== -1) {
        this.conversations[index] = convo
      } else {
        this.conversations.unshift(convo)
      }
    },

    // Check last read timestamp against last message and update unread flag
    updateUnreadFlag() {
      this.hasUnreadMessages = this.conversations.some(c => {
        const lastMessage = c.lastMessage?.createdAt || new Date(0) // Fallback to epoch if no last message
        return c.lastReadAt ? c.lastReadAt < lastMessage : true
      })
    },

    wsMessageHandler(event: MessageEvent) {
      const data = JSON.parse(event.data)
      // console.log('WebSocket message received:', data)
      if (data.type === 'new_message') {
        const message: MessageInConversation = data.payload
        // Update conversation summary (and bump it to top)
        const convoIndex = this.conversations.findIndex(c => c.conversationId === message.conversationId)

        if (convoIndex !== -1) {
          const [convo] = this.conversations.splice(convoIndex, 1)
          // Update last message and unread count
          const updatedConvo: ConversationSummary = {
            ...convo,
            lastMessage: message,
            unreadCount: convo.unreadCount + 1, // Increment unread count
          }
          this.conversations.unshift(updatedConvo)
        }
        this.updateUnreadFlag()

        // If this is the active conversation, append to visible messages
        if (this.activeConversation?.conversationId === message.conversationId) {
          this.messages.push(message)
        } else {
          this.unreadCount++
          bus.emit('message:received', { message })
        }
      }
    },

    async fetchMessagesForConversation(conversationId: string): Promise<MessageInConversation[]> {
      try {
        console.log('Fetching messages for conversation:', conversationId)
        const res = await api.get<MessagesResponse>(`/messages/${conversationId}`)
        console.log('Fetched messages:', res.data)
        if (res.data.success) {
          this.messages = res.data.messages
          return res.data.messages
        }
      } catch (error: any) {
        console.error('Failed to fetch messages:', error)
        this.messages = []
      }
      return []
    },

    async fetchConversations(): Promise<ConversationSummary[]> {
      try {
        const res = await api.get<ConversationsResponse>('/messages/conversations')
        if (res.data.success) {
          this.conversations = res.data.conversations
          this.updateUnreadFlag()
        }
      } catch (error: any) {
        console.error('Failed to fetch conversations:', error)
        this.conversations = []
      }
      return this.conversations
    },

    // async fetchUnreadCount() {
    //   const res = await api.get('/messages/conversations/unread-count')
    //   if (res.data.success) {
    //     this.unreadCount = res.data.count
    //   }
    // },

    async markAsRead(convoId: string) {
      try {
        const updateConvo = await api.post<ConversationResponse>(`/messages/conversations/${convoId}/mark-read`)
        if (updateConvo.data.success) {
          const updatedConvo: ConversationSummary = updateConvo.data.conversation
          this.updateConvo(updatedConvo)
          this.updateUnreadFlag()
        }
      } catch (error: any) {
        console.error('Failed to mark conversation as read:', error)
      }
      // await this.fetchUnreadCount()
    },

    async sendMessage(
      recipientProfileId: string,
      content: string
    ): Promise<ConversationSummary | null> {
      try {
        const res = await api.post<SendMessageResponse>(`/messages/conversations/${recipientProfileId}`, { content })

        if (res.data.success) {
          const { conversation, message } = res.data
          // Move conversation to top, remove any old instance
          this.conversations = [
            conversation,
            ...this.conversations.filter(c => c.conversationId !== conversation.conversationId),
          ]
          if (this.activeConversation?.conversationId === conversation.conversationId) {
            this.messages.push(message)
          }
          return res.data.conversation
        }
      } catch (error) {
        console.error('Failed to send message:', error)
      }
      return null
    },

    async setActiveConversation(convo: ConversationSummary | null) {
      this.activeConversation = convo
      if (this.activeConversation) {
        await this.fetchMessagesForConversation(this.activeConversation.conversationId)
      }
    },
  },
})

bus.on('auth:login', ({ token }) => {
  useMessageStore().connectWebSocket(token)
})

bus.on('auth:logout', () => {
  useMessageStore().disconnectWebSocket()
})
