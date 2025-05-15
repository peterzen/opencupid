import { toast } from 'vue3-toastify';
import { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const theme = document.documentElement.getAttribute('data-bs-theme')

export const defaultOptions = {
  autoClose: 3000,
  position: toast.POSITION.TOP_RIGHT,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
  theme: theme
} as ToastContainerOptions