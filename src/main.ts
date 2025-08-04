import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '/src/assets/scss/reset.scss'
import '/src/assets/scss/fonts.scss'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
