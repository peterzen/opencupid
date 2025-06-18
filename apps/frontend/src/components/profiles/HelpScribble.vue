<template>
  <div class="help-scribble d-flex"  :class="`direction-${direction}`">
    <DoodleIcons :name="icons[direction] as any" class="svg-icon animate__animated animate__swing" />
    <span class="animate__animated animate__tada">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import DoodleIcons from '@/components/icons/DoodleIcons.vue'

defineProps<{
  text: string
  direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'
}>()

const icons = {
  n: 'IconArrowUp',
  s: 'IconArrowDown',
  e: 'IconArrowRight',
  w: 'IconArrowLeft',
  ne: 'IconArrowNe',
  nw: 'IconArrowNw',
  se: 'IconArrowSe',
  sw: 'IconArrowSw',
}
</script>

<style scoped>
.help-scribble {
  font-family: 'Caveat', cursive;
  font-size: 2rem;
  color: var(--bs-warning);
}

:deep(.svg-icon) {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
}

/* Cardinal directions */
.direction-n {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.direction-s {
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.direction-e {
  flex-direction: row-reverse;
  align-items: center;
}
.direction-w {
  flex-direction: row;
  align-items: center;
}

/* Diagonal directions */
.direction-ne {
  flex-direction: column;
  align-items: flex-end;
}
.direction-nw {
  flex-direction: column;
  align-items: flex-start;
}
.direction-se {
  flex-direction: column-reverse;
  align-items: flex-end;
}
.direction-sw {
  flex-direction: column-reverse;
  align-items: flex-start;
}
</style>
