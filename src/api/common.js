import http from '@/server/httpServer.js'

/* 字典接口 */
export const searchDictionaryInfo = (data) => {
    return http({
        url: '/haogongdi/dictionary/searchDictionaryInfo',
        method: 'post'
    }, data)
}

/* 七牛云获取token */
export const generalToken = (data) => {
    return http({
        url: '/haogongdi/commons/generalToken',
        method: 'post'
    }, data)
}

/* 获取图片imgcode */
export const getImgCode = (data) => {
    return http({
        url: '/haogongdi/user/getImgCode',
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
/* 停止企业 */
export const closeOrg = (data) => {
    return http({
        url: '/haogongdi/backstageOrganization/closeOrg',
        method: 'post'
    }, data)
}
/* 开启企业 */
export const openOrg = (data) => {
    return http({
        url: '/haogongdi/backstageOrganization/openOrg',
        method: 'post'
    }, data)
}
/* 查询机构信息列表 */
export const listBackstageOrganization = (data) => {
    return http({
        url: '/haogongdi/backstageOrganization/listBackstageOrganization',
        method: 'post'
    }, data)
}


/* 新增设备信息 */
export const addDevice = (data) => {
    return http({
        url: '/haogongdi/device/addDevice',
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
        url: '/haogongdi/device/selectOneDevice',
        method: 'post'
    }, data)
}
/* 设备信息编辑 */
export const editDevice = (data) => {
    return http({
        url: '/haogongdi/device/editDevice',
        method: 'post'
    }, data)
}
/* 设备预留名单 */
export const queryDevicePerson = (data) => {
    return http({
        url: '/haogongdi/devicePerson/queryDevicePerson',
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



/* 查询工作人员列表 */
export const listBackstageUser = (data) => {
    return http({
        url: '/haogongdi/backstageUser/listBackstageUser',
        method: 'post'
    }, data)
}
/* 添加工作人员 */
export const insertBackstageUser = (data) => {
    return http({
        url: '/haogongdi/backstageUser/insertBackstageUser',
        method: 'post'
    }, data)
}
/* 查询工作人员详情 */
export const searchBackstageUser = (data) => {
    return http({
        url: '/haogongdi/backstageUser/searchBackstageUser',
        method: 'post'
    }, data)
}
/* 修改工作人员详情 */
export const updateBackstageUser = (data) => {
    return http({
        url: '/haogongdi/backstageUser/updateBackstageUser',
        method: 'post'
    }, data)
}
/* 更新工作人员状态 */
export const updateBackstageUserStatus = (data) => {
    return http({
        url: '/haogongdi/backstageUser/updateBackstageUserStatus',
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



/* 新增访问人员 */
export const addProjectVisitPerson = (data) => {
    return http({
        url: '/haogongdi/projectVisitPerson/addProjectVisitPerson',
        method: 'post'
    }, data)
}
/* 审核访问人员 */
export const auditProjectVisitPerson = (data) => {
    return http({
        url: '/haogongdi/projectVisitPerson/auditProjectVisitPerson',
        method: 'post'
    }, data)
}
/* 编辑访问人员 */
export const editProjectVisitPerson = (data) => {
    return http({
        url: '/haogongdi/projectVisitPerson/editProjectVisitPerson',
        method: 'post'
    }, data)
}
/* 项目访问人员详情 */
export const getProjectVisitPerson = (data) => {
    return http({
        url: '/haogongdi/projectVisitPerson/getProjectVisitPerson',
        method: 'post'
    }, data)
}
/* 项目访问人员列表 */
export const queryProjectVisitPerson = (data) => {
    return http({
        url: '/haogongdi/projectVisitPerson/queryProjectVisitPerson',
        method: 'post'
    }, data)
}


/* 新增访问信息 */
export const addProjectVisitInfo = (data) => {
    return http({
        url: '/haogongdi/projectVisitInfo/addProjectVisitInfo',
        method: 'post'
    }, data)
}
/* 审核访问信息 */
export const auditProjectVisitInfo = (data) => {
    return http({
        url: '/haogongdi/projectVisitInfo/auditProjectVisitInfo',
        method: 'post'
    }, data)
}
/* 访问信息列表 */
export const queryProjectVisitInfo = (data) => {
    return http({
        url: '/haogongdi/projectVisitInfo/queryProjectVisitInfo',
        method: 'post'
    }, data)
}
/* 编辑访问信息 */
export const editProjectVisitInfo = (data) => {
    return http({
        url: '/haogongdi/projectVisitInfo/editProjectVisitInfo',
        method: 'post'
    }, data)
}
/* 访问信息详情 */
export const getProjectVisitInfo = (data) => {
    return http({
        url: '/haogongdi/projectVisitInfo/getProjectVisitInfo',
        method: 'post'
    }, data)
}


/* 分页查询试卷信息 */
export const selExamPageList = (data) => {
    return http({
        url: '/haogongdi/exam/selExamPageList',
        method: 'post'
    }, data)
}
/* 查询单个试卷信息 */
export const selectOneExam = (data) => {
    return http({
        url: '/haogongdi/exam/selectOneExam',
        method: 'post'
    }, data)
}
/* 试卷信息编辑 */
export const editExam = (data) => {
    return http({
        url: '/haogongdi/exam/editExam',
        method: 'post'
    }, data)
}
/* 新增试卷 */
export const addExam = (data) => {
    return http({
        url: '/haogongdi/exam/addExam',
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
/* 分页查询考题信息 */
export const selQuestionPageList = (data) => {
    return http({
        url: '/haogongdi/exam/selQuestionPageList',
        method: 'post'
    }, data)
}
/* 单个查询考题信息 */
export const selectOneQuestion = (data) => {
    return http({
        url: '/haogongdi/exam/selectOneQuestion',
        method: 'post'
    }, data)
}
/* 单个查询考题编辑 */
export const editQuestion = (data) => {
    return http({
        url: '/haogongdi/exam/editQuestion',
        method: 'post'
    }, data)
}




/* 分页查询任务信息 */
export const selTaskPageList = (data) => {
    return http({
        url: '/haogongdi/task/selTaskPageList',
        method: 'post'
    }, data)
}
/* 新增任务 */
export const addTask = (data) => {
    return http({
        url: '/haogongdi/task/addTask',
        method: 'post'
    }, data)
}
/* 任务信息编辑 */
export const editTask = (data) => {
    return http({
        url: '/haogongdi/task/editTask',
        method: 'post'
    }, data)
}
/* 查询单个任务信息 */
export const selectOneTask = (data) => {
    return http({
        url: '/haogongdi/task/selectOneTask',
        method: 'post'
    }, data)
}
/* 分页查询用于绑定任务的用户列表信息 */
export const taskBindPersonPageList = (data) => {
    return http({
        url: '/haogongdi/task/taskBindPersonPageList',
        method: 'post'
    }, data)
}
