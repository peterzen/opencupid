export interface ProfileDTO {
  id: string
  publicName: string
  intro?: string
  birthday?: string
  gender?: string
  location?: string
  hasKids?: boolean
  tags?: string[]
  status?: string
  goal?: string
}
