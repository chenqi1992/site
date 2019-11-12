import http from '@/server/httpServer.js'

/* 获取菜单列表-用于给角色管理权限 */
export const listMenuInfoToRole = (data) => {
    return http({
        url: '/haogongdi/menuInfo/listMenuInfoToRole',
        method: 'post'
    }, data)
}

/* 企业列表 */
export const getOrganizationList = (data) => {
    return http({
        url: '/haogongdi/backstageOrganization/getOrganizationList',
        method: 'post'
    }, data)
}

/* 分页查询设备信息 */
export const selDevicePageList = (data) => {
    return http({
        url: '/haogongdi/device/selDevicePageList',
        method: 'post'
    }, data)
}


/* 查询工作人员角色 */
export const searchWorkUserRole = (data) => {
    return http({
        url: '/haogongdi/role/searchWorkUserRole',
        method: 'post'
    }, data)
}

/* 查询角色列表信息 */
export const listRole = (data) => {
    return http({
        url: '/haogongdi/role/listRole',
        method: 'post'
    }, data)
}

/* 删除角色信息 */
export const deleteRole = (data) => {
    return http({
        url: '/haogongdi/role/deleteRole',
        method: 'post'
    }, data)
}

/* 查询角色信息 */
export const searchRole = (data) => {
    return http({
        url: '/haogongdi/role/searchRole',
        method: 'post'
    }, data)
}

/* 新增角色信息 */
export const addRole = (data) => {
    return http({
        url: '/haogongdi/role/addRole',
        method: 'post'
    }, data)
}

/* 修改角色信息 */
export const updateRole = (data) => {
    return http({
        url: '/haogongdi/role/updateRole',
        method: 'post'
    }, data)
}



/* 项目列表 */
export const queryProjectInfo = (data) => {
    return http({
        url: '/haogongdi/projectInfo/queryProjectInfo',
        method: 'post'
    }, data)
}
/* 添加项目 */
export const addProjectInfo = (data) => {
    return http({
        url: '/haogongdi/projectInfo/addProjectInfo',
        method: 'post'
    }, data)
}

/* 项目详情 */
export const getProjectInfo = (data) => {
    return http({
        url: '/haogongdi/projectInfo/getProjectInfo',
        method: 'post'
    }, data)
}
/* 编辑项目详情 */
export const editProjectInfo = (data) => {
    return http({
        url: '/haogongdi/projectInfo/editProjectInfo',
        method: 'post'
    }, data)
}

/* 项目人员列表 */
export const queryProjectPerson = (data) => {
    return http({
        url: '/haogongdi/projectPerson/queryProjectPerson',
        method: 'post'
    }, data)
}
/* 项目人员详情 */
export const getProjectPerson = (data) => {
    return http({
        url: '/haogongdi/projectPerson/getProjectPerson',
        method: 'post'
    }, data)
}
