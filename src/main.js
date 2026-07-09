import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { initHearts } from './utils/hearts.js'

const vuetify = createVuetify({
  components,
  directives,
  icons: { defaultSet: 'mdi' },
  defaults: {
    VCard: { variant: 'tonal' },
  },
})

const app = createApp(App)
app.config.warnHandler = () => {}
app.use(vuetify).mount('#app')
initHearts()
