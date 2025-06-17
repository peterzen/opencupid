<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { type PublicProfile } from '@zod/profile/profile.dto'

import GenderSymbol from '@/components/profiles/display/GenderSymbol.vue'

import ImageCarousel from './ImageCarousel.vue'
import ActionButtons from './ActionButtons.vue'
import LanguageList from '../display/LanguageList.vue'
import TagList from '../display/TagList.vue'
import LocationLabel from '../display/LocationLabel.vue'
import DatingIcon from '../display/DatingIcon.vue'
import { useDatingFields } from '../composables/useDatingFields'

const { t } = useI18n()

const props = defineProps<{
  profile: PublicProfile
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'intent:conversation:open', conversationId: string): void
}>()

const { age, relationshipStatus, pronouns, hasKids } = useDatingFields(props.profile, t)
</script>

<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 position-relative user-select-none">
        <div class="overflow-hidden rounded">
          <ImageCarousel :profile />
        </div>

        <div class="icons">
          <DatingIcon :profile />
        </div>

        <div class="action-buttons">
          <ActionButtons
            :profile
            @intent:conversation:open="
              conversationId => emit('intent:conversation:open', conversationId)
            "
          />
        </div>

        <div class="d-flex flex-row align-items-center mt-2">
          <div class="flex-grow-1">
            <span class="fw-bolder fs-2"> {{ props.profile.publicName }}</span>
          </div>
          <div v-if="props.profile.isDatingActive" class="text-muted">
            <span class="me-1">{{ age }}</span>
            <span class="me-1">
              <GenderSymbol v-if="props.profile.gender" :gender="props.profile.gender" />
            </span>

            <span v-if="props.profile.pronouns && pronouns">{{ pronouns }}</span>
          </div>
        </div>
        <div class="mb-2 text-muted">
          <LocationLabel :profile />
        </div>

        <div class="mb-3">
          <div class="d-inline-block">
            <TagList :profile />
          </div>

          <div class="d-inline-block">
            <LanguageList :languages="profile.languages" />
          </div>
        </div>
        <div class="mb-3">
          {{ props.profile.introSocial }}
        </div>

        <div v-if="props.profile.isDatingActive">
          <hr />
          <div class="dating-basics mb-3">
            <div class="mb-3">
              {{ props.profile.introDating }}
            </div>

            <ul class="list-unstyled mb-2 d-flex flex-wrap align-items-center">
              <li v-if="props.profile.relationship" class="me-2">
                <span class="badge text-bg-dating">{{ relationshipStatus }}</span>
              </li>
              <li v-if="props.profile.hasKids" class="me-2">
                <span class="badge text-bg-dating">{{ hasKids }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icons {
  position: absolute;
  top: 0.5rem;
  right: 1.5rem;
  z-index: 10;
}

.action-buttons {
  position: absolute;
  /* top: 10px; */
  /* bottom:2rem; */
  margin-top: -3rem;
  right: 1rem;
  z-index: 10;
  /* background-color: rgba(255, 255, 255, 0.8); */
}
</style>
