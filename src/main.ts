import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '/src/assets/scss/reset.scss'
import '/src/assets/scss/fonts.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

const refreshKey = 'refresh-count'
const limit = 5
const interval = 10_000 // 10 sec

const now = Date.now()
let history = JSON.parse(localStorage.getItem(refreshKey) || '[]')
history = history.filter((timestamp: number) => now - timestamp < interval)
console.log(history)

if (history.length >= limit) {
  alert('Trop de rafraîchissements. Réessayez plus tard.')
  router.push('/TooManyRequests')
  // Optionnel : bloquer navigation ou rediriger
} else {
  history.push(now)
  localStorage.setItem(refreshKey, JSON.stringify(history))
}

function detectDevTools(openedCallback: () => void) {
  const threshold = 160
  const check = () => {
    const start = new Date().getTime()
    const end = new Date().getTime()
    if (end - start > threshold) {
      openedCallback()
    }
  }

  setInterval(check, 1000) // vérifie toutes les secondes
}

if (import.meta.env.PROD) {
  detectDevTools(() => {
    window.location.href = '/bloque' // change vers ta vraie page
  })
}
