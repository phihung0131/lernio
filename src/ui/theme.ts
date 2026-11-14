export type Theme = 'auto' | 'light' | 'dark'

export function getTheme(): Theme {
  try {
    const t = localStorage.getItem('theme')
    return t === 'light' || t === 'dark' ? t : 'auto'
  } catch {
    return 'auto'
  }
}

export function applyTheme(t: Theme = getTheme()) {
  const root = document.documentElement
  if (t === 'auto') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', t)
  try {
    localStorage.setItem('theme', t)
  } catch {
    /* ignore */
  }
}
