import { createWebHashHistory, createRouter } from 'vue-router'
import drawer from '@/components/drawer .vue'
import store, { useUserStore } from '@/store'
const userStore = useUserStore(store)

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: drawer,
            redirect: '/chat',
            children: [
                {
                    path: 'chat',
                    component: () => import('@/views/chat.vue'),
                    name: 'chat',
                }
            ]
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    from
    const token = userStore.token
    const userName = userStore.userName

    if (token) {
        if (userName) {
            next()
        } else {
            await userStore.getUserInfo()
            next({ ...to, replace: true })
        }
    } else {
        next()
    }

})



export default router