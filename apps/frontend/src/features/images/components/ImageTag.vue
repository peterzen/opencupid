<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

// import { buildSrcSet } from '@/features/images/srcset'

type Context = 'thumb' | 'card' | 'profile' | 'full'

type Variant = { size: string; url: string }

const props = defineProps({
  image: {
    type: Object as PropType<{ variants: Variant[] }>,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: '',
  },
  context: {
    type: String as PropType<Context>,
    default: 'card',
  },
})

const sizesMap: Record<string, string> = {
  thumb: '150w',
  card: '600w',
  profile: '800w',
  full: '1280w',
}

const scrSet = computed(() =>
  props.image.variants
    .filter(v => sizesMap[v.size])
    .map(v => `${v.url} ${sizesMap[v.size]}`)
    .join(', ')
)

const fallbackUrl = computed(() => props.image.variants.find(v => v.size === 'original')?.url || '')



/**
 * Bootstrap breakpoints:
 *  xs <576, sm <768, md <992, lg <1200, xl <1400, xxl ≥1400
 * Use reasonable slot widths that align to your four variants.
 */
const sizesByContext: Record<Context, string> = {
  // Thumbnail: tiny, used e.g. in avatar chips
  thumb: `
    (max-width: 575.98px) 48px,
    (max-width: 767.98px) 64px,
    (max-width: 991.98px) 96px,
    150px
  `.trim(),

  // Card grid (e.g. col-6 / col-sm-4 / col-md-3)
  // Approximate the column width per breakpoint:
  // xs: 50vw, sm: 33vw, md+: 25vw; clamp to your variant widths.
  card: `
    (max-width: 575.98px) 50vw,
    (max-width: 767.98px) 33vw,
    (max-width: 1199.98px) 25vw,
    25vw
  `.trim(),

  // Profile banner: top third of viewport width; keep it big but bounded
  // On phones assume ~100vw; on tablets/desktops assume a fixed slot ~720px;
  // on larger screens let it scale toward 1280px.
  profile: `
    (max-width: 575.98px) 100vw,
    (max-width: 991.98px) 90vw,
    (max-width: 1199.98px) 720px,
    960px
  `.trim(),

  // Fullscreen: allow large; browser will cap at 1280w variant
  full: `
    (max-width: 575.98px) 100vw,
    (max-width: 1199.98px) 90vw,
    1280px
  `.trim(),
}

const sizes = computed(() => sizesByContext[props.context])

</script>

<template>
  <picture class="profile-image">
    <source
      :srcset="scrSet"
      :sizes="sizes"
      type="image/webp"
    />
    <img :src="fallbackUrl" class="" :class="className" />
  </picture>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

</style>
