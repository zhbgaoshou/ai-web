import { defineStore } from 'pinia'
import type { IMessageRequest } from '@/types/chat'


export const useChatStore = defineStore('chat', {
    state: () => ({
        messages: [] as IMessageRequest[],
    }),
    actions: {
        addMessage(message: IMessageRequest) {
            this.messages.push(message)
        }
    },
    getters: {
        historys(state) {
            const list = state.messages.slice(-10)
            return list.map(message => {
                return {
                    id: message.id,
                    content: message.content,
                    role: message.role
                }
            })
        }
    }
})