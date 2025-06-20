export type MultiselectComponent = ComponentPublicInstance<{
  activate: () => void
  deactivate: () => void
  open: () => void
}>

// await registerLocales();
export type MultiselectOption = {
  value: string
  label: string
}
