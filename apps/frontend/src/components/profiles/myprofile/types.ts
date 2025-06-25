import { type ProfileScope } from "@zod/profile/profile.dto";

export type ViewState = {
  isEditable: boolean,
  previewLanguage: string,
  currentScope: ProfileScope,
  scopes: ProfileScope[],
}