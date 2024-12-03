import { defineStore } from 'pinia'
import { getModelApi, toggleModelApi } from '@/api/openai'
import type { IMessageRequest } from '@/types/chat'


export const useChatStore = defineStore('chat', {
    state: () => ({
        messages: [] as IMessageRequest[],
        models: [] as any[],
    }),
    actions: {
        addMessage(message: IMessageRequest) {
            this.messages.push(message)
        },
        async getModel() {
            const res = await getModelApi()
            this.models = res
        },

        async toggleModel(model_id: number) {
            const res = await toggleModelApi(model_id)
            this.getModel()
            return res
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
        },
        activemodel: (state) => {
            return state.models.find(model => model.active)
        }
    }
})