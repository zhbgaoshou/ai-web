import { createPinia } from 'pinia'
export { useUserStore } from './modelus/user'
export { useSettingStore } from './modelus/setting'
export { useChatStore } from './modelus/chat'

export default createPinia()