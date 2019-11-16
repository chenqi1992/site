<template>
    <div class="examto-edit">
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
            <el-button size="medium" type="primary">搜 索</el-button>
        </div>
        <div class="edit-exam"> 
            <div class="editTitle">编辑试题</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="试题类型" prop="region">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="问题内容" prop="desc">
                    <el-input :rows="4" type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="问题解析" prop="desc">
                    <el-input :rows="4" type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <div>
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="线上品牌商赞助">
                            <el-input>111</el-input>
                            <div>删除</div>
                        </el-radio>
                        <el-radio label="线上品牌商赞助">
                            <el-input>111</el-input>
                            <div>删除</div>
                        </el-radio>
                    </el-radio-group>
                </div>
            </el-form>
        </div>
        <div class ="saveButton">
            <el-button size="medium" type="primary" @click="handleSaveQuestions">保存试题</el-button>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { selDevicePageListexam, addQuestion } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        handleSaveQuestions() {
            addQuestion(this.selDevicePageListexamParams).then((res) =>{
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
    .examto-edit {
        padding: 24px 30px;
        .project-header {
            .bus-header--input {
                margin-right: 24px;
                .el-input {
                    width: 224px;
                }
            }
        }
        .edit-exam {
            width: 40%;
            margin-top: 20px;
            border:1px solid rgba(0,0,0,0.07);
            .editTitle {
                height: 42px;
                line-height: 42px;
                padding: 0 20px;
                background: #f7f7f7;
            }
            .demo-ruleForm {
                padding: 10px;
            }
        }
        .saveButton {
            .saveButton {
                display: flex;
                align-items: center;

            }
        }
    }
</style>
