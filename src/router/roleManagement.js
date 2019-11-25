const App = () => import('@/layout/AppSite.vue')
const RoleManage = () => import('@/views/roleManagement/roleManage.vue')
const RoleLimits = () => import('@/views/roleManagement/roleLimits.vue')
const UserManage = () => import('@/views/roleManagement/userManage')
const UserManagedetail = () => import('@/views/roleManagement/userManagedetail')

export default {
    path: '/roleManagement',
    component: App,
    redirect: '/roleManagement/roleManage',
    meta: {
        title: '账号管理',
        requireAuth: false, 
    },
    children: [{
            name: '账户管理/角色管理',
            path: '/roleManage',
            component: RoleManage
        },
        {
            name: '账户管理/角色管理/权限查看',
            path: '/roleLimits/:id',
            component: RoleLimits
        },
        {
            name: '账户管理/角色管理/权限查看',
            path: '/roleLimits/detail/:id',
            component: RoleLimits
        },
        {
            name: '账户管理/角色管理/权限查看',
            path: '/roleLimits/add',
            component: RoleLimits
        },
        {
            name: '账户管理/用户管理',
            path: '/userManage',
            component: UserManage
        },
        {
            name: '账户管理/用户管理/查看',
            path: '/userManageDetail/:id',
            component: UserManagedetail
        },
        {
            name: '账户管理/用户管理/查看',
            path: '/userManageDetail/detail/:id',
            component: UserManagedetail
        },
        {
            name: '账户管理/用户管理/查看',
            path: '/userManageDetail/add',
            component: UserManagedetail
        },
    ]
}