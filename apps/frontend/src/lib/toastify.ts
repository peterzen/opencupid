import { toast } from 'vue3-toastify'
import { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const theme = document.documentElement.getAttribute('data-bs-theme')

export const defaultOptions = {
  autoClose: 3000,
  position: toast.POSITION.TOP_RIGHT,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
  theme: theme,
} as ToastContainerOptions

export type ToastType = 'default' | 'info' | 'success' | 'warning' | 'error'

export interface ToastMessage {
  type: ToastType
  message: string
  options?: ToastContainerOptions
}

export function showToast(message: ToastMessage) {
  const { type, message: msg, options } = message
  const toastOptions = { ...defaultOptions, ...options }
  switch (type) {
    case 'info':
      toast.info(msg, toastOptions)
      break
    case 'success':
      toast.success(msg, toastOptions)
      break
    case 'warning':
      toast.warning(msg, toastOptions)
      break
    case 'error':
      toast.error(msg, toastOptions)
      break
    default:
      toast(msg, toastOptions)
  }
}
