const App = () => import('@/layout/AppSite.vue')
const RoleManage = () => import('@/views/roleManagement/roleManage.vue')
const RoleLimits = () => import('@/views/roleManagement/roleLimits.vue')

export default {
    path: '/roleManagement',
    component: App,
    redirect: '',
    meta: {
        title: '账号管理',
        requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [{
            name: '账户管理/角色管理',
            path: '/roleManage',
            component: RoleManage
        },
        {
            name: '账户管理/角色管理/权限查看',
            path: '/roleLimits',
            component: RoleLimits
        },
    ]
}