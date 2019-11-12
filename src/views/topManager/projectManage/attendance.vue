<template>
    <div class="attendance">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人主页" name="first">
                <div class="per-index">
                    <div class="personal-border">
                        <div class="project-header">
                            <div class="project-key">姓名：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.name" placeholder="邓蒋文"></el-input>
                        </div>
                        <div class="project-header">
                            <div class="project-key">身份证号：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.idCard" placeholder="3504**********13"></el-input>
                        </div>
                        <div class="project-header">
                            <div class="project-key">银行卡号：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.bankCard" placeholder="6225***********6421"></el-input>
                        </div>
                        <div class="project-header">
                            <div class="project-key">开户行：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.bankBranch" placeholder="招商银行鹭江支行"></el-input>
                        </div>
                        <div class="project-header">
                            <div class="project-key">手机号：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.phone" placeholder="15959256421"></el-input>
                        </div>
                    </div>    
                    <div class="personal-border">
                        <div class="project-header">
                            <div class="project-key">紧急联系人：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.iceName" placeholder="杨火群"></el-input>
                        </div>
                        <div class="project-header">
                            <div class="project-key">联系人关系：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.iceType" placeholder="配偶"></el-input>
                        </div>
                        <div class="project-header">
                            <div class="project-key">联系人电话：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.icePhone" placeholder="13774899930"></el-input>
                        </div>
                    </div>    
                    <div class="personal-border">
                        <div class="project-header">
                            <div class="project-key">职位：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.userPost" placeholder="项目经理"></el-input>
                        </div>
                        <div class="project-header">
                            <div class="project-key">岗位：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.userType" placeholder="项目工程部"></el-input>
                        </div>
                        <div class="project-header">
                            <div class="project-key">文化程度：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.userEducation" placeholder="大专"></el-input>
                        </div>
                        <div class="project-header">
                            <div class="project-key">籍贯：</div>
                            <el-input size="medium" class="name_input" v-model="ruleForm.userOrigin" placeholder="福建"></el-input>
                        </div>
                    </div>
                    <div class="evaluation-title">
                        <div class="project-key">评价信息：</div>
                        <div class="all-datas">获得评价10条（系统自评8条），评价平均得分3.8颗星，低于平台人均（4.5颗星），低于1颗星评价1次</div>
                    </div>
                    <div class="business-add">
                        <el-button size="medium" type="primary" @click="handleEvaluation">添加评价</el-button>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                            width="5">
                            </el-table-column>
                            <el-table-column
                            label="序号"
                            width="120">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column
                            prop="projectTime"
                            label="项目时间"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="content"
                            label="评价内容"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="attachPic"
                            label="附件图片">
                            </el-table-column>
                            <el-table-column
                            prop="commitLevel"
                            label="评价级别"
                            >
                            </el-table-column>
                            <el-table-column>
                            
                            </el-table-column>
                        </el-table>
                    </div>
                </div>    
            </el-tab-pane>
            <el-tab-pane label="考勤数据" name="second">
                <div class="project-header">
                    <div class="left">
                        <div class="bus-header--input">
                            选择时间：
                            <el-date-picker
                                size="medium"
                                v-model="businessTime"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="bus-header--input">
                            状态：
                            <el-select size="medium" v-model="businessStatus" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="bus-header--input">
                            工作日：
                            <el-input
                                size="medium"
                                class="search-input"
                                v-model="businessValue"
                                placeholder="请输入"
                                clearable>
                            </el-input>
                        </div>
                    </div>
                    <div>
                        <el-button size="medium" type="primary">查询</el-button>
                    </div>
                </div>
                <div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        label="序号"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="打卡5"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="最晚卡"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="状态"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="合同管理" name="third">
                <div class="project-header">
                    <div class="bus-header--input">
                        选择时间：
                        <el-date-picker
                            size="medium"
                            v-model="businessTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div class="bus-header--input">
                        履行状态：
                        <el-select size="medium" v-model="businessStatus" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="bus-header--input">
                        签署：
                        <el-input
                            size="medium"
                            class="search-input"
                            v-model="businessValue"
                            placeholder="请输入"
                            clearable>
                        </el-input>
                    </div>
                    <div>
                        <el-button size="medium" type="primary">查询</el-button>
                    </div>
                </div>
                <div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        label="序号"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="合同名称"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="生效时间"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="到期时间"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="文档时间"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="异常操作"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <div>
                                    <el-button class="btn-action" @click="handleModify(scope.row)" type="text">查看</el-button>
                                    <el-button class="btn-action" @click="handleDelete(scope.row)" type="text">催促上传</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="进场考试" name="fourth">
                <div class="project-header">
                    <div class="bus-header--input">
                        选择时间：
                        <el-date-picker
                            size="medium"
                            v-model="businessTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div class="bus-header--input">
                        考试状态：
                        <el-select size="medium" v-model="businessStatus" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button size="medium" type="primary">查询</el-button>
                </div>
                <div>
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        label="序号"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="考试名称"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="考试开始时间"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="考试结束时间"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="考试状态"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="考试"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <div>
                                    <el-button class="btn-action" @click="handleModify(scope.row)" type="text">查看</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { getProjectPerson } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            getProjectPersonData:{},
            ruleForm: {
                bankBranch: "黎安支行",
                bankCard: 6212264112444940000,
                bankInfo: "工商银行",
                iceName: "张三",
                icePhone: 13950050001,
                iceType: "SPOUSE(配偶),CHILD(子女), PARENT(父母),FRIEND(亲朋)",
                id: 10010,
                idCard: 350181201901010000,
                name: "李四",
                phone: 13900000000,
                userEducation: "ELEMENTARY_SCHOOL(小学)\tJUNIOR_HIGH_SCHOOL(初中)\tSENIOR_HIGH_SCHOOL(高中) TECHNICAL_SECONDARY_SCHOOL(中等专业学校) JUNIOR_COLLEGE(大学专科)\tUNDERGRADUATE(本科)\tPOSTGRADUATE(研究生)\tBACHELOR(学士)\tMASTER(硕士) DOCTOR(博士)",
                userId: 10011,
                userOrigin: "福建",
                userPost: "string",
                userType: "MANAGER(项目负责人),MASTER"
            },
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

    },
    mounted() {

    },
    methods: {
        ApiGetProjectPerson() {
            //项目人员详情
            getProjectPerson({id: 10010}).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.getProjectPersonData = res.data.data
                }
            })
        },
        handleEvaluation() {
            this.$router.push({path: `/employeeDetail`})
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>

<style lang="scss">
    .attendance {
        padding: 20px 30px;
        .el-tabs {
            .per-index {
                .personal-border {
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(233,233,233,1);
                    .project-header {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        .project-key {
                            width: 100px;
                            text-align: right;
                        }
                        .el-input {
                            width: 250px;
                        }
                    }
                }
                .evaluation-title {
                    display: flex;
                    padding: 20px 10px;
                }
            }
        }
        .el-table {
            padding-top: 20px;
        }
    }
</style>
