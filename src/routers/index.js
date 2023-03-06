import Layout from '@/layout/index.vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),

    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '/',
                    component: () => import('@/pages/home'),
                },
                // {
                //     path: '/base-pool',
                //     component: () => import('@/pages/basePool'),
                // },
                // {
                //     path: '/fomo',
                //     component: () => import('@/pages/fomo'),
                // },
            ],
        }
    ],
});

export default router;
