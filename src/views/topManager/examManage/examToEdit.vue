<template>
    <div class="examto-edit">
        <div class="project-header header-bg">
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
                试题类型：
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
            <template v-if="addType === 0">
                <div class="editTitle">编辑试题</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="试题类型" prop="region">
                        <el-radio-group v-model="ruleForm.questionType">
                            <el-radio label="0">单选</el-radio>
                            <el-radio label="1">多选</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="问题内容" prop="examQuestion">
                        <el-input :rows="4" type="textarea" v-model="ruleForm.examQuestion"></el-input>
                    </el-form-item>
                    <el-form-item label="问题解析" prop="questionAnalysis">
                        <el-input :rows="4" type="textarea" v-model="ruleForm.questionAnalysis"></el-input>
                    </el-form-item>
                    <!-- <div v-for="(item, index) in selectOneQuestionData.option" :key="index"> -->
                        <!-- <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="线上品牌商赞助">
                                <el-input>111</el-input>
                                <div>删除</div>
                            </el-radio>
                            <el-radio label="线上品牌商赞助">
                                <el-input>111</el-input>
                                <div>删除</div>
                            </el-radio>
                        </el-radio-group> -->
                    <el-checkbox-group 
                        v-model="checkedChoice"
                        :min="1"
                        :max="2">
                        <el-checkbox v-for="item in selectOneQuestionData.option" :label="item" :key="item">
                            <div>选项{{item.choice}}</div>
                            <el-input>{{item.choiceValueText}}</el-input>
                        </el-checkbox>
                    </el-checkbox-group>
                    <!-- </div> -->
                </el-form>
            </template>
            <template v-if="addType === 1">
                <div class="editTitle">编辑学习材料</div>
                <div class="edit-study">
                    <div class="edit-study--radio">
                        <div class="title">材料类型</div>
                        <el-radio-group v-model="radio">
                            <el-radio :label="3">备选项</el-radio>
                            <el-radio :label="6">备选项</el-radio>
                            <el-radio :label="9">备选项</el-radio>
                        </el-radio-group>
                    </div>
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" icon="el-icon-upload2">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">支持文件格式：.jpg .png .txt .docx .pdf ，单个文件不能超过500kb</div>
                    </el-upload>
                </div>
            </template>
        </div>
        <div class="saveButton" v-if="addType !== 3">
            <el-button size="medium" type="primary" v-if="addType === 0 || addType === 2" @click="handleSaveQuestions">保存试题</el-button>
            <el-button size="medium" type="primary" v-if="addType === 1 || addType === 2" @click="handleSaveQuestions">保存材料</el-button>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { selectOneQuestion, addQuestion, editQuestion } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            addType: '',
            selectOneQuestionParams: {
                id: this.$route.params.id
            },
            selectOneQuestionData: {},
            checkedChoice: [],
            radio: '',
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
        if(this.$route.path.indexOf('addExam') > 0) {
            this.addType = 0
        } else if (this.$route.path.indexOf('addStudy') > 0) {
            this.addType = 1
        } else if (this.$route.path.indexOf('detail') > 0) {
            this.addType = 2
        } else {
            this.addType = 3
        }
    },
    mounted() {

    },
    methods: {
        ApiSelectOneQuestion() {
            //试题详情
            selectOneQuestion(this.selectOneQuestionParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selectOneQuestionData = res.data
                    this.ruleForm = res.data
                }
            })
        },
        handleSaveQuestions() {
            if(this.addType === 2) {
                editQuestion(this.selectOneQuestionParams).then((res) =>{
                    if (res.data.code === ERR_OK) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                })
            } else if(this.addType === 3) {
                addQuestion(this.selectOneQuestionParams).then((res) =>{
                    if (res.data.code === ERR_OK) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                })
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
            .edit-study {
                padding: 20px;
                .edit-study--radio {
                    display: flex;
                    align-items: center;
                    padding-bottom: 40px;
                    .title {
                        padding-right: 10px;
                    }
                }
            }
        }
        .saveButton {
            width: 40%;
            padding: 20px 0;
            text-align: center;
        }
    }
</style>
