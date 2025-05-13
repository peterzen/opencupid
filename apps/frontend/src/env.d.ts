/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // Add other environment variables you use
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}