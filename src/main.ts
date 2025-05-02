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
