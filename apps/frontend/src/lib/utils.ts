


export function applyTheme(theme: string) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light')
  }
}


