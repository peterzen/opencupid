// apps/frontend/src/features/images/srcset.ts
type ImageVariant = { name: 'thumb'|'card'|'profile'|'full'; url: string }

const widthByName: Record<ImageVariant['name'], number> = {
  thumb: 150,
  card: 600,
  profile: 720,
  full: 1280,
}

export function buildSrcSet(variants: ImageVariant[]) {
  return variants
    .filter(v => widthByName[v.name] !== undefined)
    .sort((a, b) => widthByName[a.name] - widthByName[b.name])
    .map(v => `${v.url} ${widthByName[v.name]}w`)
    .join(', ')
}
