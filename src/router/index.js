import Vue from 'vue'
import Router from 'vue-router'
import Before from '@/components/eleCom/before.vue'
import After from '@/components/eleCom/after.vue'
import ComHistory from '@/components/eleCom/history.vue'
import Control from '@/components/eleCom/control.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Before',
            component: Before
        },
        {
            path: '/after',
            name: 'After',
            component: After
        },
        {
            path: '/history/:openId',
            name: 'ComHistory',
            component: ComHistory
        },
        {
            path: '/control',
            name: 'Control',
            component: Control
        }
    ]
})
