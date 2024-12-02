<template>
    <div v-if="userStore.userInfo.avatar && !isImageError" tabindex="0" :role="btn ? 'button' : ''"
        class="avatar bg-transparent" :class="{ 'btn btn-sm btn-circle': btn }">
        <div class="w-full rounded-full">
            <img :src="userStore.userInfo?.avatar" @error="errorImg" />
        </div>
    </div>

    <div v-else tabindex="0" :role="btn ? 'button' : ''" class="avatar placeholder bg-transparent"
        :class="{ 'btn btn-sm btn-circle': btn }">
        <div class="bg-neutral text-neutral-content w-full rounded-full">
            <span>{{ userStore.userName[0] }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store'

defineProps(['btn'])

const userStore = useUserStore()

let isImageError = ref(false)
function errorImg() {
    console.log('errorImg');

    isImageError.value = true
}

</script>

<style scoped></style>