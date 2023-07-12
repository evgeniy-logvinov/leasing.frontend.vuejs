import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import '~/styles/index.scss'

import App from './App.vue'
import router from './router'
import './index.scss'
// if you're using CDN, please remove this line.
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElementPlus } from '@element-plus/icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
