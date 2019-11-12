<template>
    <div class="project-indexor">
        <div class="project-header">
            <div>项目基本信息</div>
            <div v-if="editORview">
                <el-button v-if="!btnshow" @click="btnshow = true" size="medium" type="primary">编辑</el-button>
                <div v-if="btnshow">
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
        <div>
            <h1>业务信息</h1>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="员工信息" name="first">
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
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="idCard"
                        label="身份证号"
                        align="center"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center"
                        sortable
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
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                        <el-table-column
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
                        prop="address"
                        label="职位"
                        align="center"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="身份证号"
                        align="center"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="手机号"
                        align="center"
                        sortable
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
                <!-- <el-tab-pane label="访客信息" name="third">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        label="员工ID"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="职位"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="身份证号"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="手机号"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="籍贯"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="班组"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <div>
                                    <el-button class="btn-action" @click="handleModify(scope.row)" type="text">查看</el-button>
                                    <el-button class="btn-action" @click="handleDelete(scope.row)" type="text">编辑</el-button>
                                    <el-button class="btn-action" @click="handleDelete(scope.row)" type="text">开启</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { getProjectInfo, queryProjectPerson, editProjectInfo } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {
        elPages
    },
    props: {

    },
    data() {
        return {
            editORview: true,
            btnshow: false,
            getProjectInfoData: {},
            ruleForm: {
                projectName: '',
                address: '',
                userName: '',
                phone: '',
                id: 0,
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
            queryProjectPersonParams:{
                pageIndex: 1,
                pageSize: 10,
                projectId: this.$route.params.id,
            },
            queryProjectPersonData: [],
            activeName: 'first',
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
        }
    },
    created() {
        if(this.$route.path.indexOf('detail') > 0) {
            this.editORview = false
        } else {
            this.editORview = true
        } 
        this.ApiGetProjectInfo()
        this.ruleForm.id = this.$route.params.id

        this.ApiQueryProjectPerson()
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
        handleView() {
            this.$router.push({path: `/attendance`})
        },
        handleModify() {
            this.$router.push({path: `/projectIndexOr/detail/${row.id}`})
        },
        handleDelete() {
            this.$router.push({path: `/projectIndexOr/detail/${row.id}`})
        }
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
    }
</style>
