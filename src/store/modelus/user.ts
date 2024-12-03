import { defineStore } from 'pinia'
import type { IUserInfo, IUserLoginResponse } from '@/types/user'
import { loginApi, getUserInfoApi, registerApi } from '@/api/user'
import { setToken, removeAllToken } from '@/utils/auth'

const initToken = localStorage.getItem('token')

export const useUserStore = defineStore('user', {
    state: () => ({
        token: initToken || '',
        refreshToken: '',
        userInfo: {} as IUserInfo,
    }),

    actions: {
        async register(data: any) {
            await registerApi(data)
        },
        async login(data: any) {
            const res: IUserLoginResponse = await loginApi(data)
            this.token = res.access_token
            this.refreshToken = res.refresh_token
            setToken(this.token, this.refreshToken)

            await this.getUserInfo()
        },
        logout() {
            this.$reset()
            removeAllToken()
            location.reload()
            console.warn('退出登录')
        },
        async getUserInfo() {
            const res = await getUserInfoApi()
            this.userInfo = res
        }
    },

    getters: {
        isLogin: state => state.token !== '',
        userName: state => state.userInfo.username || '',
        userId: state => state.userInfo.id || ''
    }
})