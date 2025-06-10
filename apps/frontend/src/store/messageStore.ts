import { defineStore } from 'pinia'
import { useWebSocket, type UseWebSocketReturn } from '@vueuse/core'

import { api } from '@/lib/api'
import { bus } from '@/lib/bus'

import type { ConversationSummary, MessageInConversation } from '@zod/messaging.schema'

export const useMessageStore = defineStore('message', {
  state: () => ({
    conversations: [] as ConversationSummary[],
    messages: [] as MessageInConversation[],
    activeConversation: null as ConversationSummary | null,
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

      socket.ws.value?.addEventListener('message', this.messageHandler)

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

    messageHandler(event: MessageEvent) {
      const data = JSON.parse(event.data)
      console.log('WebSocket message received:', data)
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

        // If this is the active conversation, append to visible messages
        if (this.activeConversation?.conversationId === message.conversationId) {
          this.messages.push(message)
        } else {
          this.unreadCount++
          bus.emit('message:received', { message, unreadCount: this.unreadCount })
        }
      }
    },

    async fetchMessagesForConversation(conversationId: string): Promise<MessageInConversation[]> {
      try {
        console.log('Fetching messages for conversation:', conversationId)
        const res = await api.get(`/messages/${conversationId}`)
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
        const res = await api.get('/messages/conversations')
        if (res.data.success) {
          this.conversations = res.data.conversations
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

    // async markAsRead(convoId: string) {
    //   await api.post(`/messages/conversations/${convoId}/mark-read`)
    //   await this.fetchUnreadCount()
    // },

    async sendMessage(
      recipientProfileId: string,
      content: string
    ): Promise<ConversationSummary | null> {
      try {
        const res = await api.post(`/messages/conversations/${recipientProfileId}`, { content })

        if (res.data.success) {
          const { conversation, message } = res.data
          // Move conversation to top, remove any old instance
          this.conversations = [
            conversation,
            ...this.conversations.filter(c => c.conversationId !== conversation.conversationId),
          ]
          if (this.activeConversation === conversation.conversationId) {
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
      if (this.activeConversation) await this.fetchMessagesForConversation(this.activeConversation.conversationId)
    },
  },
})

bus.on('auth:login', ({ token }) => {
  useMessageStore().connectWebSocket(token)
})

bus.on('auth:logout', () => {
  useMessageStore().disconnectWebSocket()
})
