const App = () => import('@/layout/AppSite.vue')
const EquipmentManage = () => import('@/views/equipmentManagement/equipmentManage.vue')
const EquipmentDetail = () => import('@/views/equipmentManagement/equipmentDetail.vue')
export default {
    path: '/equipmentManage',
    component: App,
    redirect: '',
    meta: {
        title: '设备管理',
        requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [{
            name: '设备管理',
            path: '/equipmentManage',
            component: EquipmentManage
        },
        {
            name: '设备管理/设备详情',
            path: '/equipmentDetail/:id',
            component: EquipmentDetail
        },
        {
            name: '设备管理/设备详情',
            path: '/equipmentDetail/detail/:id',
            component: EquipmentDetail
        }
    ]
}