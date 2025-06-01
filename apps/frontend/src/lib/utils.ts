


export function applyTheme(theme: string) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light')
  }
}


export function applySystemTheme() {
  // Check if user prefers dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  // Apply theme based on system preference
  applyTheme(prefersDark ? 'dark' : 'light')

  // Listen for changes in system color scheme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    applyTheme(e.matches ? 'dark' : 'light')
  })
}


// regexes for form validation
export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const phoneRegex = /^\+[1-9]\d{10,14}$/ // E.164 style: +4320 1234567 or 06201234567
export const otpRegex = /^\d{6}$/

