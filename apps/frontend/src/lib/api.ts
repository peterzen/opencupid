import axios from 'axios'

const baseURL = __APP_CONFIG__?.API_BASE_URL

if (!baseURL) {
  throw new Error('API_BASE_URL is not defined in __APP_CONFIG__ and no fallback is set.')
}

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { axios }