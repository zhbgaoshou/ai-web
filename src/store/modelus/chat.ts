import { defineStore } from "pinia";
import { getModelApi, toggleModelApi, getSessionApi } from "@/api/openai";
import type { IMessageRequest } from "@/types/chat";

export const useChatStore = defineStore("chat", {
  state: () => ({
    messages: [] as IMessageRequest[],
    models: [] as any[],
    sessions: [] as any[],
    pageParam: {
      page: 1,
      page_size: 10,
    },
  }),
  actions: {
    addMessage(message: IMessageRequest) {
      this.messages.push(message);
    },
    async getModel() {
      const res = await getModelApi();
      this.models = res;
    },
    async toggleModel(model_id: number) {
      const res = await toggleModelApi(model_id);
      this.getModel();
      return res;
    },
    async getSession(user_id: number) {
      const res = await getSessionApi(user_id, this.pageParam);
      this.sessions = res;
    },
  },
  getters: {
    history(state) {
      const list = state.messages.slice(-10);
      return list.map((message) => {
        return {
          id: message.id,
          content: message.content,
          role: message.role,
        };
      });
    },
    activeModel: (state) => {
      return state.models.find((model) => model.active);
    },
    activeSession: (state) => {
      return state.sessions.find((session) => session.active) || {};
    },
  },
});
