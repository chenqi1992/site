<template>
    <div class="project-indexor">
        <div class="project-header">
            <div>项目基本信息</div>
            <div v-if="editORview">
                <el-button v-show="!btnshow" @click="btnshow = true" size="medium" type="primary">编辑</el-button>
                <div v-show="btnshow">
                    <el-button size="medium" @click="handleCancle">取消</el-button>
                    <el-button size="medium" type="primary" @click="handleSub('ruleForm')">保存</el-button>
                </div>
            </div>
        </div>
        <div class="project-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :disabled="!btnshow" label-width="100px" class="demo-ruleForm">
                <div class="form1">
                    <el-form-item label="项目名称" prop="projectName">
                        <el-input v-model="ruleForm.projectName" placeholder="请填写公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="项目地址" prop="address">
                        <el-input v-model="ruleForm.address" placeholder="请选择行业类别"></el-input>
                    </el-form-item>
                </div>
                <div class="form2">
                    <el-form-item label="负责人" prop="userName">
                        <el-input v-model="ruleForm.userName" placeholder="请填写联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话" prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请选择所在区域"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="project-yewu">
            <h1>业务信息</h1>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="员工信息" name="first">
                    <div class="btn">
                        <el-button size="medium" type="primary" @click="dialogVisibleStaff = true">新增员工</el-button>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="queryProjectPersonData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                        <el-table-column
                        prop="id"
                        label="员工ID"
                        width="120"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        width="120"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="userType"
                        label="职位"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="idCard"
                        label="身份证号"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="userOrigin"
                        align="center"
                        label="籍贯"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="workName"
                        align="center"
                        label="班组"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <div>
                                    <el-button class="btn-action" @click="handleView(scope.row)" type="text">查看</el-button>
                                    <el-button class="btn-action" @click="handleModify(scope.row)" type="text">编辑</el-button>
                                    <el-button class="btn-action" @click="handleDelete(scope.row)" type="text">删除</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="设备管理" name="second">
                    <div class="btn">
                        <el-button size="medium" type="primary" @click="dialogVisibleEquip = true">添加设备</el-button>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="queryDeviceInfoData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                        <el-table-column
                        prop="id"
                        label="设备ID"
                        width="120"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="设备名称"
                        width="120"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="deviceStatus"
                        label="设备状态"
                        align="center"
                        show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div v-if="scope.row.deviceStatus === 'INUSE'">使用中</div>
                                <div v-if="scope.row.deviceStatus === 'SPARE'">空闲</div>
                                <div v-if="scope.row.deviceStatus === 'BAD'">故障</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="userCount"
                        label="设备员工数"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="visitCount"
                        label="设备访客数"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="籍贯"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="班组"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <div>
                                    <el-button class="btn-action" @click="handleModify(scope.row)" type="text">查看</el-button>
                                    <el-button class="btn-action" @click="handleDelete(scope.row)" type="text">删除</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="访客信息" name="third">
                    <div class="btn">
                        <el-button size="medium" type="primary" @click="dialogVisibleVisit = true">添加访客</el-button>
                    </div>
                    <el-table
                        ref="multipleTable"
                        :data="queryProjectVisitInfoData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                        <el-table-column
                        prop="id"
                        label="访客ID"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        label="登记时间"
                        :formatter="formatime"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="visitTime"
                        label="到访时间"
                        :formatter="formatime"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="visitName"
                        label="访客名称"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="visitPersonCount"
                        label="访客人数"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="imageInfoStatus"
                        label="是否录入人脸"
                        >
                            <template slot-scope="scope">
                                <div v-if="scope.row.auditStatus === '1'">是</div>
                                <div v-if="scope.row.auditStatus === '0'">否</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="auditStatus"
                        label="审核"
                        >
                            <template slot-scope="scope">
                                <div v-if="scope.row.auditStatus === 'PASS'">已通过</div>
                                <div v-if="scope.row.auditStatus === 'FAIL'">未通过</div>
                                <div v-if="scope.row.auditStatus === 'WAIT'">待审核</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <div>
                                    <el-button class="btn-action" @click="handleViewVisit(scope.row)" type="text">查看</el-button>
                                    <el-button class="btn-action" @click="handleModifyVisit(scope.row)" type="text">编辑</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <el-dialog
                class="add-staff"
                title="添加员工"
                :visible.sync="dialogVisibleStaff"
                width="30%"
                >
                <div class="title">
                    <h2>批量添加</h2>
                    <div class="handle">
                        <el-button size="medium" type="primary" @click="handleSubExcel('ruleFormStaff')">上传excel文档</el-button>
                        <div>下载示例文档<i class="el-icon-download"></i></div>
                    </div>
                </div>
                <h2>单个添加</h2>
                <el-form :model="ruleFormStaff" :rules="rulesStaff" ref="ruleFormStaff" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="员工姓名" prop="userName">
                        <el-input v-model="ruleFormStaff.userName" placeholder="请填写员工姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="员工手机号" prop="phone">
                        <el-input v-model="ruleFormStaff.phone" placeholder="请填写职位"></el-input>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-input v-model="ruleFormStaff.userType" placeholder="请选择职位"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="medium" @click="dialogVisibleStaff = false">取 消</el-button>
                    <el-button size="medium" type="primary" @click="handleSubStaff('ruleFormStaff')">提 交</el-button>
                </span>
            </el-dialog>
            <el-dialog
                class="add-staff"
                title="添加设备"
                :visible.sync="dialogVisibleEquip"
                width="30%"
                >
                <el-form :model="ruleFormEquip" :rules="rulesEquip" ref="ruleFormEquip" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="选择设备">
                        <el-input v-model="ruleFormEquip.userName" placeholder="请选择设备"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称" prop="phone">
                        <el-input v-model="ruleFormEquip.phone" placeholder="请填写公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="设备名称">
                        <el-input v-model="ruleFormEquip.userType" placeholder="请填写设备名称"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="medium" @click="dialogVisibleEquip = false">取 消</el-button>
                    <el-button size="medium" type="primary" @click="handleSubEquip('ruleFormEquip')">提 交</el-button>
                </span>
            </el-dialog>
            <el-dialog
                class="add-staff"
                title="添加访客"
                :visible.sync="dialogVisibleVisit"
                width="35%"
                >
                <el-form :model="ruleFormVisit" :rules="rulesVisit" ref="ruleFormVisit" label-width="140px" class="demo-ruleForm">
                    <el-form-item label="访客名称">
                        <el-input v-model="ruleFormVisit.visitName" placeholder="请选择设备"></el-input>
                    </el-form-item>
                    <el-form-item label="到访时间" required>
                        <el-date-picker
                            v-model="ruleFormVisit.visitTime"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="成员数量（人）">
                        <el-input v-model="ruleFormVisit.visitPersonCount" placeholder="请填写成员数量"></el-input>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="ruleForm.auditStatus" placeholder="请选择活动区域">
                            <el-option label="已通过" value="PASS"></el-option>
                            <el-option label="未通过" value="FAIL"></el-option>
                            <el-option label="待审核" value="WAIT"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="medium" @click="dialogVisibleVisit = false">取 消</el-button>
                    <el-button size="medium" type="primary" @click="handleSubVisit('ruleFormVisit')">提 交</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import {relative} from "@/common/js/mixins.js";
import { getProjectInfo, queryProjectPerson, editProjectInfo, addProjectPerson, queryDeviceInfo, addProjectVisitInfo, queryProjectVisitInfo } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {
        elPages
    },
    props: {

    },
    mixins: [relative],
    data() {
        return {
            editORview: true,
            btnshow: false,
            dialogVisibleStaff: false,
            dialogVisibleEquip: false,
            dialogVisibleVisit: false,
            getProjectInfoData: {},
           
            ruleForm: {
                projectName: '',
                address: '',
                userName: '',
                phone: '',
                id: this.$route.params.id,
                userId: 10086,
                roleType: "ORG_MANAGE"
            },
            rules: {
                projectName: [
                    { required: true, message: '请填写公司名称', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请选择行业类别', trigger: 'blur' },
                ],
                userName: [
                    { required: true, message: '请填写联系人', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请选择所在区域', trigger: 'blur' },
                ],
            },
            ruleFormStaff: {
                phone: '',
                projectId: this.$route.params.id,
                userName: "",
                userType: "MANAGER(项目负责人),MASTER(项目经理),DEPUTY(项目协管),LEADER(班组组长), WORKER(员工)"
            },
            rulesStaff: {
                userName: [
                    { required: true, message: '请填写员工姓名', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请填写职位', trigger: 'blur' },
                ],
            },
            ruleFormEquip: {
                phone: '',
                projectId: this.$route.params.id,
                userName: "",
                userType: "MANAGER(项目负责人),MASTER(项目经理),DEPUTY(项目协管),LEADER(班组组长), WORKER(员工)"
            },
            rulesEquip: {
                userName: [
                    { required: true, message: '请填写员工姓名', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请填写职位', trigger: 'blur' },
                ],
            },
            ruleFormVisit: {
                auditStatus: 'WAIT',
                projectId: Number(this.$route.params.id),
                visitName: null,
                visitPersonCount: null,
                visitTime: null
            },
            rulesVisit: {
                userName: [
                    { required: true, message: '请填写员工姓名', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请填写职位', trigger: 'blur' },
                ],
            },
            queryProjectPersonParams:{
                pageIndex: 1,
                pageSize: 10,
                projectId: Number(this.$route.params.id),
            },
            queryProjectPersonData: [],
            queryDeviceInfoParams:{
                pageIndex: 1,
                pageSize: 10,
                projectId: Number(this.$route.params.id),
            },
            queryDeviceInfoData: [],
            activeName: 'first',
            queryProjectVisitInfoParams: {
                pageIndex: 1,
                pageSize: 10,
                projectId: Number(this.$route.params.id),
            },
            queryProjectVisitInfoData: [],
        }
    },
    created() {
        if(this.$route.path.indexOf('detail') > 0) {
            this.editORview = false
        } else {
            this.editORview = true
        } 
        this.ApiGetProjectInfo()

        this.ApiQueryProjectPerson()
        this.ApiQueryDeviceInfo()
        this.ApiQueryProjectVisitInfo()
    },
    mounted() {

    },
    methods: {
        ApiQueryProjectPerson() {
            //项目人员列表
            queryProjectPerson(this.queryProjectPersonParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.queryProjectPersonData = res.data.data.list
                }
            })
        },
        ApiQueryDeviceInfo() {
            //项目设备信息列表
            queryDeviceInfo(this.queryDeviceInfoParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.queryDeviceInfoData = res.data.data.list
                }
            })
        },
        ApiGetProjectInfo() {
            //项目详情
            getProjectInfo({id: this.$route.params.id}).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.getProjectInfoData = res.data.data
                    let data = res.data.data
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const element = data[key]
                            if(this.ruleForm[key] !== undefined) {
                                this.ruleForm[key] = element
                            }
                        }
                    }
                }
            })
        },
        ApiQueryProjectVisitInfo() {
            //项目访客人员列表
            queryProjectVisitInfo(this.queryProjectVisitInfoParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.queryProjectVisitInfoData = res.data.data.list
                }
            })
        },
        handleCancle() {
            this.btnshow = false
        },
        handleSub(formName) {
            //编辑项目详情
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    editProjectInfo(this.ruleForm).then((res) =>{
                        if (res.data.code === ERR_OK) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleSelectionChange() {

        },
        handleView(row) {
            this.$router.push({path: `/attendance/${row.id}`})
        },
        handleModify(row) {
            this.$router.push({path: `/attendance/detail/${row.id}`})
        },
        handleDelete() {
            this.$router.push({path: `/projectIndexOr/detail/${row.id}`})
        },
        handleSubExcel() {

        },
        handleSubStaff(formName) {
            //添加员工
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addProjectPerson(this.ruleFormStaff).then((res) =>{
                        if (res.data.code === ERR_OK) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.ApiQueryProjectPerson()
                            this.dialogVisibleStaff = false
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        handleSubVisit(formName) {
            //新增访客
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addProjectVisitInfo(this.ruleFormVisit).then((res) =>{
                        if (res.data.code === ERR_OK) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        handleViewVisit(row) {
            this.$router.push({path: `/visitorInfo/${row.id}`})
        },
        handleModifyVisit() {
            this.$router.push({path: `/visitorInfo/detail/${row.id}`})
        },
    }
}
</script>

<style lang="scss">
    .project-indexor {
        padding: 0 30px 24px;
        .project-header {
            display: flex;
            padding: 15px 0;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(233,233,233,1);
        }
        .project-form {
            padding: 24px 0;
            .demo-ruleForm {
                .form1, .form2 {
                    display: flex;
                    align-items: center;
                    flex: 1;
                    .el-form-item {
                        width: 50%;
                    }
                }
            }
        }
        .project-yewu {
            .add-staff {
                .title {
                    margin-bottom: 20px;
                    .handle {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .el-icon-download {
                            cursor: pointer;
                        }
                    }
                }
                h2 {
                    padding: 10px 0;
                    font-size: 16px;
                }
            }
            .btn {
                text-align: right;
            }
        }
    }
</style>
