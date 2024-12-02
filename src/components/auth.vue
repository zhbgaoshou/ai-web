<template>
    <form data-role="login" @submit="login" v-if="tablist[0].active" class="mt-4">
        <label class="input input-bordered flex items-center my-4 gap-2 timeline-box">
            <userIcon width="18" />
            <input type="text" class="grow" placeholder="用户名" required v-model="authForm.username" />
        </label>
        <label class="input input-bordered flex items-center gap-2 timeline-box">
            <passwordIcon width="18" />
            <input type="password" class="grow" placeholder="密码" required v-model="authForm.password" />
            <kbd class="kbd kbd-sm">Enter</kbd>
        </label>

        <div class="flex gap-2">
            <button class="btn btn-primary mt-4 flex-1"><span v-if="loginLoading"
                    class="loading loading-spinner loading-sm"></span>登录
                <loginIcon width="18" />
            </button>
            <button type="button" class="btn mt-4" @click="resetForm">重新输入
                <refreshIcon width="16" />
            </button>
        </div>

    </form>

    <form data-role="login" @submit="register" v-else class="mt-4">
        <label class="input input-bordered flex items-center gap-2 timeline-box">
            <emaiIcon width="18" />
            <input type="email" class="grow" placeholder="邮箱地址" v-model="authForm.email" />
        </label>
        <label class="input input-bordered flex items-center my-4 gap-2 timeline-box">
            <userIcon width="18" />
            <input type="text" class="grow" placeholder="用户名" required v-model="authForm.username" />
        </label>
        <label class="input input-bordered flex items-center gap-2 timeline-box">
            <passwordIcon width="18" />
            <input type="password" class="grow" placeholder="密码" required v-model="authForm.password" />
            <kbd class="kbd kbd-sm">Enter</kbd>
        </label>

        <div class="flex gap-2">
            <button class="btn btn-primary mt-4 btn-accent flex-1"><span v-if="loginLoading"
                    class="loading loading-spinner loading-sm"></span>注册</button>
            <button type="button" class="btn mt-4" @click="resetForm">重新输入
                <refreshIcon width="16" />
            </button>
        </div>

    </form>
    <div class="toast toast-center" v-if="toast">
        <div class=" alert alert-success">
            <span class=" flex">
                <successIcon width="18" class="mr-2" />恭喜！！！注册成功
            </span>
        </div>
    </div>

</template>

<script setup lang="ts">
import emaiIcon from '@/assets/icons/email.svg?component'
import passwordIcon from '@/assets/icons/password.svg?component'
import userIcon from '@/assets/icons/user.svg?component'
import refreshIcon from '@/assets/icons/refresh.svg?component'
import successIcon from '@/assets/icons/success.svg?component'
import loginIcon from '@/assets/icons/login.svg?component'


import { useUserStore } from '@/store'
import { reactive, ref, watch } from 'vue'


const userStore = useUserStore()


const porps = defineProps(['tablist'])
const emit = defineEmits(['login-success', 'toggle-tab'])

const authForm = reactive({
    email: null,
    username: '萧炎',
    password: 'xiaoyan',
})
const resetForm = () => {
    authForm.email = null
    authForm.username = ''
    authForm.password = ''
}
const loginLoading = ref(false)
const login = async () => {
    loginLoading.value = true
    await userStore.login(authForm).finally(() => {
        loginLoading.value = false
    })
    emit('login-success')
}
let toast = ref(false)
const register = async () => {
    loginLoading.value = true
    await userStore.register(authForm).finally(() => {
        loginLoading.value = false
    })
    toast.value = true
    setTimeout(() => {
        toast.value = false
    }, 1000)
    emit('toggle-tab', porps.tablist[0])

}
watch(() => porps.tablist, (item: any[]) => {
    item.forEach(i => {
        if (i.text === '注册' && i.active) {
            resetForm()
        }
    })

}, { deep: true })

console.log('AUTH COMPONENT');

</script>

<style scoped></style>