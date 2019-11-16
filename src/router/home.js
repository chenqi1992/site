const App = () => import('@/layout/AppHome.vue')
const Home = () => import('@/views/home/home.vue')
const Findpwd = () => import('@/views/home/findpwd.vue')

export default {
    path: '/home',
    component: App,
    redirect: '/home',
    meta: {
        title: '首页',
        requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [{
            name: '主页',
            path: '/home',
            component: Home
        },
        {
            name: '找回密码',
            path: '/findpwd',
            component: Findpwd
        },
    ]
}