import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store, { useSettingStore } from './store'
useSettingStore().initSetting()

const app = createApp(App)
app.use(router).use(store)
app.mount('#app')
