<template>
    <div class="exam-index">
        <div class="project-header header-bg">
            <div class="bus-header--input">
                试题类型：
                <el-select size="medium" v-model="selQuestionPageListParams.questionType" placeholder="请选择试题类型">
                    <el-option label="单选" value="0"></el-option>
                    <el-option label="多选" value="1"></el-option>
                    <el-option label="学习资料" value="2"></el-option>
                </el-select>
            </div>
            <div class="bus-header--input">
                题目名称：
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="selQuestionPageListParams.questionName"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div>
            <div class="bus-header--input">
                题目编号：
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="selQuestionPageListParams.questionId"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div>
            <div class="serach">
                <el-button size="medium" type="primary" @click="handleSearch">搜 索</el-button>
                <el-button size="medium" type="primary" v-if="relevance" @click="handleSave">保 存</el-button>
            </div>
        </div>
        <div class="business-add" v-if="!relevance">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAddExam">新增试题</el-button>
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAddStudy">新增学习材料</el-button>
        </div>
        <!-- <div>列表共XXX题，已选择关联XXX题</div> -->
        <div class="business-table">   
             <el-table
                ref="multipleTable"
                :data="selQuestionPageListData"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                label="序号"
                width="100"
                align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(pagebox.pageIndex - 1) * pagebox.pageSize + 1}} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                prop="id"
                label="题目编号"
                width="130"
                align="center">
                </el-table-column> -->
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
                    v-if="!relevance"
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
                    v-if="relevance"
                    type="selection"
                    width="155">
                </el-table-column>
            </el-table>
            <elPages v-if="pagebox" :pagebox="pagebox" :Api="relevance ? ApiSelExamQuestionPageList : ApiSelQuestionPageList"></elPages>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { selQuestionPageList, selExamQuestionPageList, examBindQuestions } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {
        elPages
    },
    props: {

    },
    data() {
        return {
            relevance: '',   //是否试卷过来关联试题
            selQuestionPageListParams: {
                companyId: 0,
                questionName: null,
                questionId: null,
                questionType: null,
            },
            selQuestionPageListData: [],
            multipleSelection: [],
            questionSorceList: [],
            pagebox: {
                totalrows: 0,
                pageIndex: 1,
                pageSize: 10
            },
        }
    },
    created() {
        this.relevance = this.$route.query.relevance
        this.relevance ? this.ApiSelExamQuestionPageList() : this.ApiSelQuestionPageList()
    },
    mounted() {

    },
    methods: {
        ApiSelExamQuestionPageList() {
            //关联的试题列表
            selExamQuestionPageList(Object.assign(this.selQuestionPageListParams, {examInfoId: this.relevance}, this.pagebox)).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selQuestionPageListData = res.data.data.list
                    this.pagebox.totalrows = res.data.data.totalRows
                }
            })
        },
        ApiSelQuestionPageList() {
            //不关联的试题列表
            selQuestionPageList(Object.assign(this.selQuestionPageListParams, this.pagebox)).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selQuestionPageListData = res.data.data.list
                    this.pagebox.totalrows = res.data.data.totalRows
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
            if(row.questionType === '0') {
                this.$router.push({path: `/examManageToEdit/editExam/${row.id}`})
            } else if(row.questionType === '1') {
                this.$router.push({path: `/examManageToEdit/editExam/${row.id}`})
            } else if(row.questionType === '2') {
                this.$router.push({path: `/examManageToEdit/editStudy/${row.id}`})
            }
        },
        handleModify(row) {
            if(row.questionType === '0') {
                this.$router.push({path: `/examManageToEdit/detail/editExam/${row.id}`})
            } else if(row.questionType === '1') {
                this.$router.push({path: `/examManageToEdit/detail/editExam/${row.id}`})
            } else if(row.questionType === '2') {
                this.$router.push({path: `/examManageToEdit/detail/editStudy/${row.id}`})
            }
        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val
            this.questionSorceList = []
            val.forEach(element => {
                this.questionSorceList.push({questionId: element.id, sorce: 100})
            });
        },
        handleSave() {
            if (this.multipleSelection.length > 0) {
                examBindQuestions({
                    examId: this.relevance,
                    questionSorceList: this.questionSorceList
                }).then((res) =>{
                    if (res.data.code === ERR_OK) {
                        this.$message({
                            message: '关联成功',
                            type: 'success'
                        });
                    } else {
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .exam-index {
        padding: 24px 30px;
        .project-header {
            justify-content: space-between;
            .bus-header--input {
                margin-right: 12px;
                .el-input {
                    width: 200px;
                }
            }
            .serach {
                display: flex;
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
