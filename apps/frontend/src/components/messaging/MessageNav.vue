<script setup lang="ts">
import { IconArrowSingleLeft, IconMenu } from '@/components/icons/DoodleIcons'
import { BNavbarNav } from 'bootstrap-vue-next'
import ProfileImage from '@/components/profiles/image/ProfileImage.vue'
import { type ProfileSummary } from '@zod/dto/profile.schema'

const props = defineProps<{
  recipient: ProfileSummary
}>()

const emit = defineEmits<{
  (e: 'nav:back'): void
  (e: 'nav:menu'): void
}>()

</script>

<template>
  <BNavbar variant="secondary" class="w-100">
    <BNavbarNav>
      <BNavItem href="#">
        <IconArrowSingleLeft class="svg-icon fs-4" @click="emit('nav:back')"/>
      </BNavItem>
    </BNavbarNav>
    <BNavbarNav :align="'center'">
      <div class="d-flex flex-column align-items-center">
        <div class="thumbnail me-2">
          <ProfileImage :profile="props.recipient" />
        </div>
        <div class="">
          <span class="d-block text-truncate fs-6">{{ props.recipient.publicName }}</span>
        </div>
      </div>
    </BNavbarNav>
    <BNavbarNav :align="'end'">
      <BNavItemDropdown right>
        <!-- Using 'button-content' slot -->
        <template #button-content>
          <IconMenu class="svg-icon fs-4" />
        </template>
        <BDropdownItem href="#">Profile</BDropdownItem>
        <BDropdownItem href="#">Sign Out</BDropdownItem>
      </BNavItemDropdown>
    </BNavbarNav>
  </BNavbar>
</template>
