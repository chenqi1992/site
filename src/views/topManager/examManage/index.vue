<template>
    <div class="exam-index">
        <div class="project-header header-bg">
            <div class="bus-header--input">
                试题类型：
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="businessValue"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div>
            <div class="bus-header--input">
                题目名称：
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="businessValue"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div>
            <div class="bus-header--input">
                题目编号：
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="businessValue"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div>
            <div>
                <el-button size="medium" type="primary" @click="handleSearch">搜 索</el-button>
                <el-button size="medium" type="primary" v-if="relevance === 1" @click="handleSearch">保 存</el-button>
            </div>
        </div>
        <div class="business-add" v-if="relevance !== 1">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAddExam">新增试题</el-button>
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAddStudy">新增学习材料</el-button>
        </div>
        <div class="business-table">   
             <el-table
                ref="multipleTable"
                :data="selQuestionPageListData"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                label="序号"
                width="100"
                align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(pagebox.currentpage - 1) * pagebox.pageSize + 1}} </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="id"
                label="题目编号"
                width="130"
                align="center">
                </el-table-column>
                <el-table-column
                prop="name"
                label="题目名称"
                align="center"
                >
                </el-table-column>
                <el-table-column
                prop="questionType"
                label="试题类型"
                width="120"
                align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.questionType === '0'">单选</div>
                        <div v-if="scope.row.questionType === '1'">多选</div>
                        <div v-if="scope.row.questionType === '2'">学习资料</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="examQuestion"
                label="备注（题干或材料简述）"
                align="center"
                >
                </el-table-column>
                <el-table-column
                    v-if="relevance !== 1"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" @click="handleView(scope.row)" type="text">查看</el-button>
                            <el-button class="btn-action" @click="handleModify(scope.row)" type="text">编辑</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="relevance === 1"
                    type="selection"
                    width="155">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { selQuestionPageList } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            relevance: '',   //关联试题
            selQuestionPageListParams: {
                // companyId: 0,
                pageIndex: 1,
                pageSize: 10,
                // projectId: 0,
            },

            selQuestionPageListData: {},
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
            pagebox: {
                totalrows: 10,
                currentpage: 1,
                pageSize: 10
            },
        }
    },
    created() {
        this.relevance = this.$route.query.relevance
        this.ApiSelQuestionPageList()
    },
    mounted() {

    },
    methods: {
        ApiSelQuestionPageList() {
            //题库列表
            selQuestionPageList(this.selQuestionPageListParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selQuestionPageListData = res.data.data.list
                }
            })
        },
        handleSearch() {
            this.ApiSelQuestionPageList()
        },
        handleAddExam() {
            this.$router.push({path: `/examManageToEdit/addExam`})
        },
        handleAddStudy() {
            this.$router.push({path: `/examManageToEdit/addStudy`})
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
    .el-table__header .el-table-column--selection .cell .el-checkbox:after {
        content: "全选";
    }
    .el-table__body .el-table-column--selection .cell .el-checkbox:after {
        content: "关联到试卷";
    }
</style>
