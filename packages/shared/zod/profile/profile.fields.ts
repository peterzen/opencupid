

export const baseFields = {
  id: true,
} as const;

export const socialFields = {
  languages: true,
  publicName: true,
  introSocial: true,
} as const;

export const datingFields = {
  introDating: true,
  hasKids: true,
  relationship: true,
  gender: true,
  birthday: true,
  pronouns: true,
} as const;

export const datingPreferencesFields = {
  prefAgeMin: true,
  prefAgeMax: true,
  prefGender: true,
  prefKids: true,
} as const;

export const ownerFields = {
  isDatingActive: true,
  isSocialActive: true,
  isOnboarded: true,
} as const;
