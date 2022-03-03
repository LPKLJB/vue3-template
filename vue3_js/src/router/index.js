import { createRouter, createWebHistory } from "vue-router";
import Layout from '@/layout/index.vue'

const asyncRoutes = [{
        path: '/documentation',
        component: Layout,
        redirect: '/documentation/index',
        children: [{
            path: 'index',
            name: 'Documentation',
            component: () =>
                import ( /*webpackChunkName: "documentation" */ '@/views/documentation/index.vue'),
            meta: {
                title: 'Documentation',
                icon: 'documentation',
                // hidden: true
                // 默认情况下没有 noCache属性 或为false 都会进行缓存 true不缓存
                noCache: true
            }
        }]
    },
    {
        path: '/guide',
        component: Layout,
        redirect: '/guide/index',
        children: [{
            path: 'index',
            name: 'Guide',
            component: () =>
                import ( /*webpackChunkName: "guide" */ '@/views/guide/index.vue'),
            meta: {
                title: 'Guide',
                icon: 'guide'
            }
        }]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/system/user',
        meta: {
            title: 'System',
            icon: 'lock',
            alwaysShow: true, // 根路由始终显示， 哪怕只有一个子元素
        },
        children: [{
                path: 'menu',
                name: 'Menu',
                component: () =>
                    import ( /*webpackChunkName: "menu" */ '@/views/system/menu.vue'),
                meta: {
                    title: 'Menu Management',
                    icon: 'el-icon-search'
                }
            },
            {
                path: 'user',
                name: 'User',
                component: () =>
                    import ( /*webpackChunkName: "user" */ '@/views/system/user.vue'),
                meta: {
                    title: 'User Management',
                    // icon: 'list'
                }
            },
            {
                path: 'role',
                name: 'Role',
                component: () =>
                    import ( /*webpackChunkName: "role" */ '@/views/system/role.vue'),
                meta: {
                    title: 'Role Management',
                    // icon: 'list'
                }
            },
            { // 外链路由
                path: '/external-link',
                component: Layout,
                children: [{
                    path: 'https://www.baidu.com/',
                    redirect: '/',
                    meta: {
                        title: 'External Link',
                        icon: 'link'
                    }
                }]
            }

        ]
    }
];
const constantRoutes = [{
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ( /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
            meta: {
                title: 'Dashboard',
                icon: '404',
                affix: true
            }
        }]
    }, {
        path: '/redirect',
        component: Layout,
        meta: {
            hidden: true
        },
        name: 'Redirect',
        children: [{ // 带参数的动态路由正则匹配
            // https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E6%95%B0
            path: '/redirect/:path(.*)', // 要匹配多级路由 应该加*号
            component: () =>
                import ('@/views/redirect/index.vue')
        }]
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('@/views/login/index.vue')
    },
]
export const routes = [
    ...constantRoutes,
    ...asyncRoutes
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;