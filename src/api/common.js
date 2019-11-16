import http from '@/server/httpServer.js'




/* 七牛云获取token */
export const generalToken = (data) => {
    return http({
        url: '/haogongdi/commons/generalToken',
        method: 'post'
    }, data)
}

/* 登录 */
export const userLoginByMobile = (data) => {
    return http({
        url: '/haogongdi/user/userLoginByMobile',
        method: 'post'
    }, data)
}
/* 刷新token */
export const refreshToken = (data) => {
    return http({
        url: '/haogongdi/user/refreshToken',
        method: 'post'
    }, data)
}

/* 获取短信验证码 */
export const getSMSCode = (data) => {
    return http({
        url: '/haogongdi/user/getSMSCode',
        method: 'post'
    }, data)
}
/* 找回密码 */
export const resetUserPassWord = (data) => {
    return http({
        url: '/haogongdi/user/resetUserPassWord',
        method: 'post'
    }, data)
}
/* 找回密码 -验证 */
export const resetUserPassWordValidate = (data) => {
    return http({
        url: '/haogongdi/user/resetUserPassWordValidate',
        method: 'post'
    }, data)
}

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
/* 新增机构详情 */
export const addBackstageOrganization = (data) => {
    return http({
        url: '/haogongdi/backstageOrganization/addBackstageOrganization',
        method: 'post'
    }, data)
}
/* 机构详情 */
export const searchBackstageOrganization = (data) => {
    return http({
        url: '/haogongdi/backstageOrganization/searchBackstageOrganization',
        method: 'post'
    }, data)
}
/* 编辑机构详情 */
export const updateBackstageOrganization = (data) => {
    return http({
        url: '/haogongdi/backstageOrganization/updateBackstageOrganization',
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
/* 查询单个设备信息 */
export const selectOneDevice = (data) => {
    return http({
        url: 'haogongdi/device/selectOneDevice',
        method: 'post'
    }, data)
}
/* 设备信息编辑 */
export const editDevice = (data) => {
    return http({
        url: 'haogongdi/device/editDevice',
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
/* 新增项目人员 */
export const addProjectPerson = (data) => {
    return http({
        url: '/haogongdi/projectPerson/addProjectPerson',
        method: 'post'
    }, data)
}
/* 编辑项目人员详情 */
export const editProjectPerson = (data) => {
    return http({
        url: '/haogongdi/projectPerson/editProjectPerson',
        method: 'post'
    }, data)
}

/* 项目设备信息列表 */
export const queryDeviceInfo = (data) => {
    return http({
        url: '/haogongdi/projectDevice/queryDeviceInfo',
        method: 'post'
    }, data)
}


/* 分页查询考题信息 */
export const selDevicePageListexam = (data) => {
    return http({
        url: '/haogongdi/exam/selDevicePageList',
        method: 'post'
    }, data)
}
/* 新增考题 */
export const addQuestion = (data) => {
    return http({
        url: '/haogongdi/exam/addQuestion',
        method: 'post'
    }, data)
}
