const App = () => import('@/layout/AppSite.vue')
const AccountIndex = () => import('@/views/topManager/account/index.vue')
const ProjectIndex = () => import('@/views/topManager/projectManage/projectIndex.vue')
const ProjectIndexOr = () => import('@/views/topManager/projectManage/projectIndexOr.vue')
const ProjectDetail = () => import('@/views/topManager/projectManage/projectDetail.vue')
const Attendance = () => import('@/views/topManager/projectManage/attendance.vue')
const EmployeeDetail = () => import('@/views/topManager/projectManage/employeeDetail.vue')
const VisitorInfo = () => import('@/views/topManager/projectManage/visitorInfo.vue')
const StaffManageIndex = () => import('@/views/topManager/staffManage/index.vue')
const StaffManageTabs = () => import('@/views/topManager/staffManage/manage.vue')
const ExamManageIndex = () => import('@/views/topManager/examManage/index.vue')
const ExamManageTask = () => import('@/views/topManager/examManage/task.vue')
const taskDetail = () => import('@/views/topManager/examManage/taskDetail.vue')
const ExamManageList = () => import('@/views/topManager/examManage/examList.vue')
const ExamManageToEdit = () => import('@/views/topManager/examManage/examToEdit.vue')
const ExamManageExerEdit = () => import('@/views/topManager/examManage/exerciseEdit.vue')
const ExamManageLearning = () => import('@/views/topManager/examManage/learningEdit.vue')
const AttendanceIndex = () => import('@/views/topManager/attendanceManage/index.vue')
const AttendanceDetail = () => import('@/views/topManager/attendanceManage/attendanceDetail.vue')
const AttendanceTable = () => import('@/views/topManager/attendanceManage/attendanceTable.vue')
const AttendanceTimeset = () => import('@/views/topManager/attendanceManage/attendanceTimeset.vue')
const SalaryReconList = () => import('@/views/topManager/financeManage/salaryReconciliation.vue')
const SalaryDetail = () => import('@/views/topManager/financeManage/salaryDetails.vue')
const WelfareConfig = () => import('@/views/topManager/financeManage/welfareConfig.vue')

export default {
    path: '/accountIndex',
    component: App,
    redirect: '',
    meta: {
        title: '账户首页',
        requireAuth: false,
    },
    children: [{
            name: '账户首页',
            path: '/accountIndex',   //账户首页
            component: AccountIndex
        },
        {
            name: '项目管理',
            path: '/projectIndex', //项目管理
            component: ProjectIndex
        },
        {
            name: '项目管理',
            path: '/projectIndexOr/:id/:companyid', 
            component: ProjectIndexOr
        },
        {
            name: '项目管理',
            path: '/projectIndexOr/detail/:id/:companyid',
            component: ProjectIndexOr
        },
        {
            name: '项目管理/项目详情/设备详情',
            path: '/projectDetail',
            component: ProjectDetail
        },
        {
            name: '项目管理/项目详情/员工详情',
            path: '/attendance/:id',
            component: Attendance
        },
        {
            name: '项目管理/项目详情/员工详情',
            path: '/attendance/detail/:id',
            component: Attendance
        },
        {
            name: '项目管理/项目详情/员工评价', //评价页
            path: '/employeeDetail',
            component: EmployeeDetail
        },
        {
            name: '项目管理/项目详情/访客信息', 
            path: '/visitorInfo/detail/:id',
            component: VisitorInfo
        },
        {
            name: '项目管理/项目详情/访客信息',
            path: '/visitorInfo/:id',
            component: VisitorInfo
        },
        {
            name: '项目管理/项目详情/访客信息',
            path: '/staffManageIndex',
            component: StaffManageIndex
        },
        {
            name: '员工管理',
            path: "/StaffManage", //员工管理
            component: StaffManageTabs
        },
        {
            name: '题库列表',
            path: '/examManageIndex', //考试管理
            component: ExamManageIndex
        }, {
            name: '试题列表',
            path: '/examManageList', //试题列表
            component: ExamManageList
        }, {
            name: '交底考试/编辑试题',
            path: '/examManageToEdit/addExam', //新增编辑试题
            component: ExamManageToEdit
        }, {
            name: '交底考试/编辑试题',
            path: '/examManageToEdit/addStudy', //新增编辑学习材料
            component: ExamManageToEdit
        }, {
            name: '交底考试/编辑试题',
            path: '/examManageToEdit/:edit/:id', //查看试题
            component: ExamManageToEdit
        }, {
            name: '交底考试/编辑试题',
            path: '/examManageToEdit/detail/:edit/:id', //编辑试题
            component: ExamManageToEdit
        }, {
            name: '试卷列表/试卷习题编辑',
            path: '/exerciseEdit/addExam', //试卷习题编辑
            component: ExamManageExerEdit
        }, {
            name: '试卷列表/试卷习题编辑',
            path: '/exerciseEdit/addStudy', //试卷习题编辑
            component: ExamManageExerEdit
        }, {
            name: '试卷列表/试卷习题编辑',
            path: '/exerciseEdit/detail/edit/:id', //试卷习题编辑查看
            component: ExamManageExerEdit
        }, {
            name: '试卷列表/试卷习题编辑',
            path: '/exerciseEdit/:edit/:id', //试卷习题编辑
            component: ExamManageExerEdit
        }, {
            name: '交底考试/编辑学习材料',
            path: '/learnigEdit', //编辑学习资料
            component: ExamManageLearning
        }, {
            name: '任务列表',
            path: '/examManagetask', //任务列表
            component: ExamManageTask
        },

        {
            name: '考试任务管理',
            path: '/taskDetail/addExam', //考试任务管理
            component: taskDetail
        },
        {
            name: '学习任务管理',
            path: '/taskDetail/addStudy', //学习任务管理
            component: taskDetail
        },
        {
            name: '任务描述',
            path: '/taskDetail/:id', //任务描述
            component: taskDetail
        },
        {
            name: '任务描述',
            path: '/taskDetail/detail/:id', //任务描述
            component: taskDetail
        },
        // {
        //     name: '考试列表/学习考试列表',
        //     path: '', 
        //     component: ''
        // },
        {
            name: '考勤管理',
            path: '/attendanceIndex', //考勤管理
            component: AttendanceIndex
        }, {
            name: '考勤表详情',
            path: '/attendanceDetail', //考勤明细
            component: AttendanceDetail
        }, {
            name: '考勤对照表',
            path: '/attendanceTable', //考勤对照表
            component: AttendanceTable
        }, {
            name: '考勤时间设置',
            path: '/attendanceTimeset', //考勤时间设置
            component: AttendanceTimeset
        },
        {
            name: '工资对账',
            path: '/salaryReconciliation',//工资对账
            component: SalaryReconList
        },
        {
            name: '工资详情',
            path: '/salaryDetails',//工资详情
            component: SalaryDetail
        },
        {
            name: '福利配置',
            path:"/welfareConfig",//福利配置
            component:WelfareConfig
        },
    ]
}