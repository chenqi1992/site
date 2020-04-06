const App = () => import('@/layout/AppHome.vue')
const SoftAgreement = () => import('@/views/agreement/softAgreement.vue')
const PrivacyAgreement = () => import('@/views/agreement/privacyAgreement.vue')

export default {
    path: '/softAgreement',
    component: App,
    redirect: '/softAgreement',
    meta: {
        title: '用户协议',
        requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [{
            name: '用户使用服务协议',
            path: '/softAgreement',
            component: SoftAgreement
        },
        {
            name: '隐私声明',
            path: '/privacyAgreement',
            component: PrivacyAgreement
        }
    ]
}