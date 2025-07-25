import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '/src/assets/scss/reset.scss'
import '/src/assets/scss/fonts.scss'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSplide from '@splidejs/vue-splide'

const app = createApp(App)

library.add(fas)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(VueSplide)

app.mount('#app')
