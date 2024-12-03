<template>
    <section class="overflow-auto flex-1">
        <div class="chat md:mx-2 my-4" v-for="history in chatStore.historys"
            :class="history.role === 'assistant' ? 'chat-start' : 'chat-end'" :key="history.id">
            <avatar class="hidden md:block chat-image avatar w-10" />
            <div class="chat-bubble">{{ history.content }}</div>
            <div class="chat-footer opacity-50">Delivered</div>
        </div>
    </section>
    <Input @send="send" />
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import Input from '@/components/input.vue';
import { useChatStore, useUserStore } from '@/store'
import type { IMessageRequest } from '@/types/chat';

import avatar from '@/components/avatar.vue';

import { fetchEventSource } from '@microsoft/fetch-event-source';

const chatStore = useChatStore();
const userStore = useUserStore();
const messageText = ref('');

const user_id = userStore.userId as number
const send = async (text: string) => {
    const userMessageData: IMessageRequest = {
        content: text,
        role: 'user',
        model: 'gpt-3.5-turbo',
        user_id,
    };

    chatStore.addMessage(userMessageData);
    userMessageData.history = chatStore.historys;
    await nextTick();

    fetchEventSource('/steam.api/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}`
        },
        body: JSON.stringify(userMessageData),
        onmessage(ev) {
            if (ev.data === 'None') return;
            messageText.value += ev.data;

        },
        onclose() {
            chatStore.addMessage({
                content: messageText.value,
                role: 'assistant',
            });
            messageText.value = '';
        },
        onerror(err) {
            console.error('Error received:', err);
        },
    });

};


</script>

<style scoped>
.chat-bubble:before {
    content: '';
    display: none;
}
</style>