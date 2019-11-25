<template>
    <div class="exercise-edit">
        <div class="project-header header-bg">
            <div class="left">
                <div class="bus-header--input">
                    试卷名称：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="selectOneExamData.examName"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="bus-header--input">
                    试卷编号：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="selectOneExamData.id"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="bus-header--input">
                    通过分数：
                    <el-input
                        size="medium"
                        class="search-input short"
                        v-model="selectOneExamData.passAnExamSorce"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="short">100分制</div>
                <div class="bus-header--input" v-if="addType === 2">
                    学习时长：
                    <el-input
                        size="medium"
                        class="search-input short"
                        v-model="selectOneExamData.answerTime"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="short" v-if="addType === 2">累计学习时长</div>
            </div>
            <div>
                <el-button size="medium" type="primary" @click="handleSave">保存</el-button>
            </div>
        </div>
        <div class="business-add">
            <el-button size="medium" type="primary" @click="handleRelevance">关联试题</el-button>
        </div>
        <div class="business-table">   
             <el-table
                ref="multipleTable"
                :data="selectOneExamData.questions"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                label="序号"
                >
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currentpage - 1) * pageSize + 1}} </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="examQuestionBankId"
                label="题目编号"
                >
                </el-table-column>
                <el-table-column
                prop="questionName"
                label="题目名称"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="questionType"
                label="试题类型"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.questionType === '0'">单选</div>
                        <div v-if="scope.row.questionType === '1'">多选</div>
                        <div v-if="scope.row.questionType === '2'">学习资料</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="remark"
                label="备注（题干或材料简述）"
                show-overflow-tooltip
                width="180">
                </el-table-column>
                <el-table-column
                prop="score"
                label="分值占比"
                width="180">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" @click="handleView(scope.row)" type="text">查看</el-button>
                            <el-button class="btn-action" @click="handleModify(scope.row)" type="text">删除关联</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { selectOneExam, editExam, addExam } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {
        elPages
    },
    props: {

    },
    data() {
        return {
            addType: '',
            selectOneExamParams: {
                id: 0
            },
            selectOneExamData: {},
            pagebox: {
                totalrows: 10,
                currentpage: 1,
                pageSize: 10
            },
        }
    },
    created() {
        if(this.$route.path.indexOf('addExam') > 0) {
            this.addType = 0
        } else if (this.$route.path.indexOf('addStudy') > 0) {
            this.addType = 1
        } else if (this.$route.path.indexOf('detail') > 0) {
            this.addType = 2
        } else {
            this.addType = 3
        }
        this.ApiSelectOneExam()
    },
    mounted() {

    },
    methods: {
        ApiSelectOneExam() {
            //查询单个试卷信息
            selectOneExam(this.selectOneExamParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selectOneExamData = res.data
                }
            })
        },
        handleSave() {
            if(this.addType === 2) {
                editExam({
                    answerTime: selectOneExamData.answerTime,
                    companyId: 0,
                    examName: selectOneExamData.examName,
                    examType: this.addType === 0 ? 'EXAM':'STUDY',
                    id: 0,
                    passAnExamSorce: selectOneExamData.passAnExamSorce
                }).then((res) =>{
                    if (res.data.code === ERR_OK) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                })
            } else if(this.addType === 0 || this.addType === 1){
                addExam({
                    companyId: 0,
                    examName: selectOneExamData.examName,
                    examType: this.addType === 0 ? 'EXAM':'STUDY',
                    passAnExamSorce: selectOneExamData.passAnExamSorce
                }).then((res) =>{
                    if (res.data.code === ERR_OK) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                })
            }
        },
        handleView(row) {
            this.$router.push({path: `/examManageToEdit/${row.id}`})
        },
        handleModify(row) {
            this.$router.push({path: `/examManageToEdit/detail/${row.id}`})
        },
        handleRelevance() {
            this.$router.push({path: `/examManageIndex?relevance=1`})
        }
    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .exercise-edit {
        padding: 24px 30px;
        .project-header {
            display: flex;
            justify-content: space-between;
            .left {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .bus-header--input {
                    margin: 0 10px 15px 0;
                    .el-input {
                        width: 224px;
                    }
                }
                .short {
                    height: 36px;
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
