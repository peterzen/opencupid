<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useProfileStore } from '@/store/profileStore'
import type { ProfileImages, PublicProfile } from '@zod/profile.schema'
import { useMessageStore } from '@/store/messageStore'
import type { ConversationSummary } from '@zod/messaging.schema'
import ProfileImage from '@/components/profiles/image/ProfileImage.vue'

const profileStore = useProfileStore()
const messageStore = useMessageStore()

const profiles = ref<PublicProfile[]>([])
const recipient = ref('')
const content = ref('')
const isLoading = ref(false)

async function sendMessage() {
  if (!recipient.value || !content.value) return
  await messageStore.sendMessage(recipient.value, content.value)
  console.log('Message sent:', conversations)
}

onMounted(async () => {
  isLoading.value = true
  const fetched = await profileStore.findProfiles()
  if (fetched) {
    profiles.value = fetched
  } else {
    console.error('Failed to fetch profiles')
  }

  const convos = await messageStore.fetchConversations()
  console.log('Conversations fetched:', convos)
  isLoading.value = false
})

const conversations = computed(() => messageStore.conversations)
const messages = computed(() => messageStore.messages)

// TODO refactor into ProfileImageComponent
const profileImage = computed(() => {
  return (profile: ProfileImages) => {
    return profile.profileImages.length > 0 ? profile.profileImages[0] : undefined
  }
})

async function handleSelectConvo(convo: ConversationSummary) {
  recipient.value = convo.partnerProfile.id
  await messageStore.setActiveConversation(convo.conversationId)
}
</script>

<template>
  <div class="container mt-3">
    <h2 class="mb-3">Messaging</h2>
    <!-- TODO implement left sidebar with user list. user items should be clickable  -->
    <div class="row">
      <div class="col-md-3">
        <h6>Convos</h6>
        <ul class="list-group mb-3">
          <li
            v-for="convo in conversations"
            :key="convo.conversationId"
            class="list-group-item d-flex justify-content-between align-items-center"
            @click="handleSelectConvo(convo)"
          >
            <span class="publicname">{{ convo.partnerProfile.publicName }}</span>
            <div class="thumbnail">
              <ProfileImage :profile="convo.partnerProfile" />
            </div>
          </li>
        </ul>
      </div>
      <div class="col-md-9">
        <div class="mb-2">
          <input v-model="recipient" class="form-control mb-2" placeholder="Recipient user id" />
          <div class="border p-2 mb-2" style="height: 200px; overflow-y: auto">
            <div v-for="msg in messages" :key="msg.id" class="mb-1">
              {{ msg.content }}
            </div>
          </div>
          <div class="input-group">
            <input
              v-model="content"
              class="form-control"
              placeholder="Type a message"
              @keyup.enter="sendMessage"
            />
            <button class="btn btn-primary" @click="sendMessage">Send</button>
          </div>
        </div>

        <div class="mb-4">
          <h4>Users</h4>
          <ul class="list-group">
            <li
              v-for="profile in profiles"
              :key="profile.id"
              class="list-group-item d-flex justify-content-between align-items-center"
              @click="recipient = profile.id"
            >
              <span class="publicname">{{ profile.publicName }}</span>
              <div class="thumbnail">
                <ProfileImage :profile="profile" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.thumbnail {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
}
</style>
