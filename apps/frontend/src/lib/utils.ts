


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