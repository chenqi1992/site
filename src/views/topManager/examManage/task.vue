<template>
    <div class="exam-index">
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
                试卷名称：
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="businessValue"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div>
            <div><el-button size="medium" type="primary">搜 索</el-button></div>
        </div>
        <div class="business-add">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAddExam">新增考试任务</el-button>
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAddStudy">新增学习任务</el-button>
        </div>
        <div class="business-table">   
            <el-table
                ref="multipleTable"
                :data="selDevicePageListexamData"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                prop="id"
                label="序号"
                width="58">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="questionId"
                label="考试编号"
                width="129">
                </el-table-column>
                <el-table-column
                prop="name"
                label="试卷名称"
                width="120">
                </el-table-column>
                <el-table-column
                prop="questionType"
                label="考生范围"
                width="120">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" @click="handleView(scope.row)" type="text">查看</el-button>
                            <el-button class="btn-action" @click="handleModify(scope.row)" type="text">编辑</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiGetOrganizationList"></elPages>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { selTaskPageList } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            Params: {

            },
            selDevicePageListexamParams: {
                companyId: 0,
                projectId: 4,
                pageIndex: 1,
                pageSize: 10,
            },
            selDevicePageListexamData: [],
            businessValue: '',
            businessStatus: '',
            businessTime: '',
            options: [{
                value: 'TOP_NAVIGATION_BAR',
                label: '顶部导航栏'
                }, {
                value: 'BOTTOM_NAVIGATION_BAR',
                label: '底部导航栏'
            }],
            addtime: '',
            tableData: [{
                date: '01',
                id: '2899',
                name: '外墙安全手册',
                type: '单选题 ',
                remark:'安全类'
                }, {
                date: '02',
                id: '2900',
                name: '建筑风力学',
                type: '单选题 ',
                remark: '安全类'
                }, {
                date: '03',
                id: '2901',
                name: '砌墙守则安全',
                type: '单选题 ',
                remark: '安全类'
                }, {
                date: '04',
                id: '2902',
                name: '花岗岩选材指南',
                type: '单选题 ',
                remark: '安全类'
                }, {
                date: '05',
                id: '2903',
                name: '水泥倒水评估',
                type: '单选题 ',
                remark: '安全类'
                }, {
                date: '06',
                id: '2904',
                name: '人工心肺复苏',
                type: '单选题 ',
                remark: '医护类'
                }, {
                date: '07',
                id: '2905',
                name: '封顶风险手册',
                type: '单选题 ',
                remark: '安全类'
            }],
            multipleSelection: [],
            pagebox: {
                totalrows: 10,
                currentpage: 1,
                pageSize: 10
            },
        }
    },
    created() {
        // this.ApiSelDevicePageListexam()
    },
    mounted() {

    },
    methods: {
        ApiSelDevicePageListexam() {
            //题库列表
            selDevicePageListexam(this.selDevicePageListexamParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selDevicePageListexamData = res.data.data.list
                }
            })
        },
        handleAddExam() {
            this.$router.push({path: `/examManageToEdit/add`})
        },
        handleAddStudy() {
            this.$router.push({path: `/attendance`})
        },
        handleView(row) {
            this.$router.push({path: `/examManageToEdit/${row.id}`})
        },
        handleModify(row) {
            this.$router.push({path: `/examManageToEdit/detail/${row.id}`})
        }
    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .exam-index {
        padding: 24px 30px;
        .project-header {
            .bus-header--input {
                margin-right: 24px;
                .el-input {
                    width: 224px;
                }
            }
        }
        .business-add {
            display: flex;
            padding: 20px 0;
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
</style>
