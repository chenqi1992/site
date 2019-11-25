<template>
    <div class="task-detail">
        <div class="task-top">
            <div class="title">任务描述</div>
            <div class="project-header header-bg">
                <div class="bus-header--input">
                    考试任务：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="businessValue"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="bus-header--input">
                    考试名称：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="businessValue"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div v-if="editORview">
                    <el-button v-show="!btnshow" @click="btnshow = true" size="medium" type="primary">编辑</el-button>
                    <div v-show="btnshow">
                        <el-button size="medium" v-show="btnshowcancle" @click="btnshow = false">取消</el-button>
                        <el-button size="medium" type="primary" @click="handleSub('ruleForm')">保存</el-button>
                    </div>
                </div>
            </div>
            <el-button size="medium" type="primary" class="relevance">关联试卷</el-button>
        </div>
        <div class="task-bottom">
            <div class="title">参与人员</div>
            <div class="task-index">
                <div class="project-header header-bg">
                    <div class="bus-header--input">
                        姓名：
                        <el-input
                            size="medium"
                            class="search-input short"
                            v-model="taskBindPersonPageListParams.userName"
                            placeholder="请输入"
                            clearable>
                        </el-input>
                    </div>
                    <div class="bus-header--input">
                        职位：
                        <el-select size="medium" v-model="taskBindPersonPageListParams.userType" placeholder="请选择">
                            <el-option
                            v-for="item in userTypeArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="bus-header--input">
                        所属项目：
                        <el-input
                            size="medium"
                            class="search-input"
                            v-model="taskBindPersonPageListParams.projectName"
                            placeholder="请输入"
                            clearable>
                        </el-input>
                    </div>
                    <div class="bus-header--input">
                        所属班组：
                        <el-input
                            size="medium"
                            class="search-input"
                            v-model="taskBindPersonPageListParams.workName"
                            placeholder="请输入"
                            clearable>
                        </el-input>
                    </div>
                    <div>
                        <el-button size="medium" type="primary">搜 索</el-button>
                    </div>
                </div>
                <div class="business-add">
                    <el-button size="medium" type="primary" @click="handleAddExam">保存</el-button>
                </div>
                <div class="all-data">共搜索到 922 条数据</div>
                <div class="table-title">
                    <img class="el-icon-info" src="../../../assets/businessManage/！@2x.png" alt="">
                    <span>已选择<i>4</i>人</span>
                    <div class="clear">清空</div>
                </div>
                <div class="business-table">   
                    <el-table
                        ref="multipleTable"
                        :data="taskBindPersonPageListData"
                        :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="userId"
                        label="员工ID"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="userPost"
                        label="职位"
                       >
                            <template slot-scope="scope">
                                <div v-if="scope.row.userPost === 'MANAGER'">项目负责人</div>
                                <div v-if="scope.row.userPost === 'MASTER'">项目经理</div>
                                <div v-if="scope.row.userPost === 'DEPUTY'">项目协管</div>
                                <div v-if="scope.row.userPost === 'LEADER'">班组组长</div>
                                <div v-if="scope.row.userPost === 'WORKER'">员工</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="手机号码"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="projectName"
                        label="归属项目"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="workName"
                        label="归属班组"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="serveStatus"
                        label="在职状态"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="joinTime"
                        label="入职时间"
                        >
                        </el-table-column>
                    </el-table>
                    <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiTaskBindPersonPageList"></elPages>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { taskBindPersonPageList } from "@/api/common.js";
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
            btnshowcancle: false,
            taskBindPersonPageListParams: {
                companyId: 10008,
                pageIndex: 0,
                pageSize: 0,
                projectName: "string",
                taskId: 0,
                userName: "string",
                userType: "MANAGER(\"项目负责人\"),    MASTER(\"项目经理\"),     DEPUTY(\"项目协管\"),     LEADER(\"班组组长\"),     WORKER(\"员工\")",
                workName: "string"
            },
            taskBindPersonPageListData: [],
            userTypeArr: [{
                value: 'MANAGER',
                label: '项目负责人'
                }, {
                value: 'MASTER',
                label: '项目经理'
                },
                {
                    value: 'DEPUTY',
                    label: '项目协管'
                },
                {
                    value: 'LEADER',
                    label: '班组组长'
                },
                {
                    value: 'WORKER',
                    label: '员工'
                }
            ],
            pagebox: {
                totalrows: 10,
                currentpage: 1,
                pageSize: 10
            },
        }
    },
    created() {
        if(this.$route.path.indexOf('addExam') > 0) {
            this.editORview = true
            this.btnshow = true
        } else if(this.$route.path.indexOf('addStudy') > 0) {
            this.editORview = true
            this.btnshow = true
        } else if(this.$route.path.indexOf('detail') > 0) {
            this.editORview = true
            this.btnshowcancle = true
        } else {
            this.editORview = false
        }
    },
    mounted() {

    },
    methods: {
        ApiTaskBindPersonPageList() {
            //题库列表
            taskBindPersonPageList(this.taskBindPersonPageListParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.taskBindPersonPageListData = res.data.data.list
                }
            })
        },
    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .task-detail {
        padding: 24px 30px;
        .task-top {
            .title {
                padding-bottom: 10px;
                font-size: 18px;
            }
            .project-header {
                display: flex;
                .bus-header--input {
                    margin-right: 24px;
                    .el-input {
                        width: 224px;
                    }
                }
            }
            .relevance {
                margin: 20px 0;
            }
        }
        .task-bottom {
            margin-top: 30px;
            .title {
                padding-bottom: 10px;
                font-size: 18px;
            }
            .task-index {
                .project-header {
                    display: flex;
                    .bus-header--input {
                        margin-right: 10px;
                        .el-input {
                            width: 200px;
                        }
                        .short {
                            width: 120px;
                        }
                    }
                }
                .business-add {
                    padding: 10px 0;
                }
                .business-table {
                    .table-title {
                        display: flex;
                        align-items: center;
                        height: 40px;
                        padding: 0 16px;
                        background:rgba(230,247,255,1);
                        border-radius:4px;
                        border:1px solid rgba(186,231,255,1);
                    }
                }
            }
        }
    }
</style>
