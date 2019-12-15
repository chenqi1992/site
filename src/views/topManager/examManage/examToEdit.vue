<template>
    <div class="examto-edit">
        <div class="project-header header-bg">
            <div class="bus-header--input">
                题目名称：
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="searchParams.questionName"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div>
            <div class="bus-header--input">
                试题类型：
                <el-select v-model="searchParams.questionType" placeholder="请选择试题类型">
                    <el-option label="单选" value="0"></el-option>
                    <el-option label="多选" value="1"></el-option>
                    <el-option label="学习资料" value="2"></el-option>
                </el-select>
            </div>
            <el-button size="medium" type="primary">搜 索</el-button>
        </div>
        <div class="edit-exam"> 
            <template v-if="addType === 0">
                <div class="editTitle">编辑试题</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :disabled="isEdit" label-width="80px" class="demo-ruleForm">
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
                    <template v-if="ruleForm.questionType === '0'">
                        <el-radio-group class="el-radio-par" v-model="ruleForm.resource">
                            <el-radio class="el-radio-flex" v-for="(item, index) in ruleForm.options" :label="item.id" :key="item.id">
                                <div class="check-box">
                                    <div>选项{{item.choice}}</div>
                                    <i class="el-icon-delete" @click="handleDelete(index, item.id, item.questionId)"></i>
                                </div>
                                <el-input v-model="item.choiceValueText"></el-input>
                            </el-radio>
                        </el-radio-group>
                    </template>
                    <template v-else>
                        <el-checkbox-group 
                            v-model="checkedChoice"
                            :min="0"
                            :max="200">
                            <el-checkbox v-for="(item, index) in ruleForm.options" :label="item.id" :key="item.id">
                                <div class="check-box">
                                    <div>选项{{index+1}}:{{item.choice}}</div>
                                    <i class="el-icon-delete" @click="handleDelete(index, item.id, item.questionId)"></i>
                                </div>
                                <el-input v-model="item.choiceValueText"></el-input>
                            </el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-form>
                <el-row class="add">
                    <el-button plain icon="el-icon-plus" v-if="!isEdit" @click="handleAdditem">添加选项</el-button>
                </el-row>
            </template>
            <template v-if="addType === 1">
                <div class="editTitle">编辑学习材料</div>
                <div class="edit-study">
                    <div class="edit-study--radio">
                        <div class="title">材料类型</div>
                        <el-radio-group v-model="fileListRadio">
                            <el-radio label="PDF/Word">PDF/Word文档</el-radio>
                            <el-radio label="otherVedio">第三方视频资源</el-radio>
                        </el-radio-group>
                    </div>
                    <el-upload
                        class="upload-demo"
                        :action="fileUploads.actionUrl"
                        :data="fileUploads.authToken"
                        :accept="fileUploads.acceptType"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess"
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
        <div class="saveButton">
            <el-button size="medium" type="primary" v-if="btnType === 0 && !isEdit" @click="handleSaveQuestions">保存试题</el-button>
            <el-button size="medium" type="primary" v-if="btnType === 1 && !isEdit" @click="handleSaveMaterial">保存材料</el-button>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { selectOneQuestion, addQuestion, editQuestion, delQuestionOption, generalToken } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
import {setStore, getStore} from '@/utils/utils.js'
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            searchParams: {
                questionType: null,
                questionName: null
            },
            addType: '',
            btnType: '',
            selectOneQuestionParams: {
                id: this.$route.params.id
            },
            selectOneQuestionData: {},
            checkedChoice: [],
            fileListRadio: 'PDF/Word',
            fileList: [],
            ruleForm: {
                classId: 0,
                companyId: 0,
                correctAnswer: "string",
                examQuestion: "string",
                examQuestionText: "string",
                name: "string",
                options: [
                    {
                        choice: "string",
                        choiceValue: "string",
                        choiceValueText: "string",
                        companyId: "string",
                        correct: false
                    }
                ],
                questionAnalysis: "string",
                questionType: "0"
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            },
            fileUploads: {
                actionUrl: 'https://upload-z2.qiniup.com/',
                acceptType: '.pdf,.doc,.docx,.png,.jpg,.jpeg, .txt',
                authToken: { token: getStore('qiniuauthToken'), key: ''},
            },
            isEdit: false
        }
    },
    created() {
        //是新增，考试材料，考试题目
        if(this.$route.path.indexOf('addExam') > 0 || this.$route.path.indexOf('editExam') > 0) {
            this.addType = 0
        } else if (this.$route.path.indexOf('addStudy') > 0 || this.$route.path.indexOf('editStudy') > 0) {
            this.addType = 1
        }
        //是否可编辑
        if((this.$route.path.indexOf('detail/editExam') > 0 || this.$route.path.indexOf('addExam') > 0) || (this.$route.path.indexOf('detail/editStudy') > 0 || this.$route.path.indexOf('addStudy') > 0)) {
            if(this.$route.path.indexOf('detail/editExam') > 0) {
                this.ApiSelectOneQuestion()
            }
            this.isEdit = false
        } else {
            this.isEdit = true
        }
        //显示何种类型按钮
        if(this.$route.path.indexOf('Exam') > 0) {
            this.btnType = 0
        } else if(this.$route.path.indexOf('Study') > 0) {
            this.btnType = 1
            this.ApiGeneralToken()
        }
    },
    mounted() {
    },
    methods: {
        ApiSelectOneQuestion() {
            //试题详情
            selectOneQuestion(this.selectOneQuestionParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selectOneQuestionData = res.data.data
                    this.ruleForm = res.data.data
                    console.log(this.ruleForm);
                }
            })
        },
        ApiGeneralToken() {
            //七牛上传
            generalToken().then((res) =>{
                if (res.data.code === ERR_OK) {
                    setStore('qiniuauthToken', res.data.data);
                }
            })
        },
        handleSaveQuestions() {
            //保存试题
            if(this.$route.path.indexOf('detail/editExam') > 0) {
                editQuestion(this.ruleForm).then((res) =>{
                    if (res.data.code === ERR_OK) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.$router.push({path: '/examManageIndex'})
                    }
                })
            } else if(this.$route.path.indexOf('addExam') > 0) {
                addQuestion(this.ruleForm).then((res) =>{
                    if (res.data.code === ERR_OK) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$router.push({path: '/examManageIndex'})
                    }
                })
            }
        },
        handleSaveMaterial() {
            //保存材料
            addQuestion(this.ruleForm).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.ApiSelectOneQuestion()
                }
            })
        },
        handleDelete(index, id, questionId) {
            if(questionId) {
                delQuestionOption({
                    optionId: id,
                    questionId: questionId
                }).then((res) =>{
                    if (res.data.code === ERR_OK) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
            } else {
                this.ruleForm.options.splice(index, 1)
            }
        },
        handleAdditem() {
            this.ruleForm.options.push({
                choice: null,
                choiceValue: null,
                choiceValueText: null,
                companyId: null,
                correct: true,
                createTime: null,
                createUser: null,
                id: null,
                questionId: null,
                remark: null,
                status: null,
                updateTime: null,
                updateUser: null,
                version: 0
            })
        },
        beforeAvatarUpload(file) {
            //上传前操作参数
            console.log(file);
            this.fileUploads.authToken.key = `xuexiziliao_${file.name}`;
        },
        handleAvatarSuccess(res, file, fileList) {
            //上传成功
            this.ruleForm.examQuestionText = []
            fileList.map(item=>{
                this.ruleForm.examQuestionText.push({name: this.fileListRadio, url: `devhaogongdi.shilongmaoyi.com/${item.response.key}`})
            })
            console.log(this.ruleForm.examQuestionText);
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
                .el-checkbox {
                    width: 100%;
                    text-align: right;
                    .el-checkbox__label {
                        width: 90%;
                    }
                }
                .el-checkbox + .el-checkbox, .el-radio + .el-radio {
                    margin-left: 0;
                }
                .el-radio-par {
                    width: 100%;
                    text-align: right;
                }
                .el-radio-flex, .el-radio__label {
                    display: inline-table;
                    width: 90%;
                }
                .check-box {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                }
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
            .add {
                padding: 24px 0;
                text-align: center;
            }
        }
        .saveButton {
            width: 40%;
            padding: 20px 0;
            text-align: center;
        }
    }
</style>
