// src/composables/useDevToolsBlocker.ts
export function useDevToolsBlocker(options?: { redirectUrl?: string }) {
  const blockShortcuts = (e: KeyboardEvent) => {
    console.log('Key pressed:', e.key, 'Ctrl:', e.ctrlKey, 'Meta:', e.metaKey, 'Shift:', e.shiftKey)

    const key = e.key.toUpperCase()

    // 🔒 Windows/Linux raccourcis
    if (key === 'F12') e.preventDefault()
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'K', 'M'].includes(key)) e.preventDefault()
    if (e.ctrlKey && key === 'U') e.preventDefault()

    // 🔒 macOS raccourcis
    if (e.metaKey && e.altKey && ['I', 'J', 'C'].includes(key)) {
      console.log('macOS shortcut blocked')

      e.preventDefault()
    }
    if (e.metaKey && key === 'U') e.preventDefault()

    // Redirection si demandé
    if (
      key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(key)) ||
      (e.metaKey && e.altKey && ['I', 'J', 'C'].includes(key)) ||
      (e.ctrlKey && key === 'U') ||
      (e.metaKey && key === 'U')
    ) {
      if (options?.redirectUrl) {
        window.location.href = options.redirectUrl
      }
    }
  }

  const blockContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    if (options?.redirectUrl) {
      window.location.href = options.redirectUrl
    }
  }

  const enable = () => {
    window.addEventListener('keydown', blockShortcuts)
    window.addEventListener('contextmenu', blockContextMenu)
  }

  const disable = () => {
    window.removeEventListener('keydown', blockShortcuts)
    window.removeEventListener('contextmenu', blockContextMenu)
  }

  return { enable, disable }
}
