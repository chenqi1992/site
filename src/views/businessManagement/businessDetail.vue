<template>
    <div class="business-detail">
        <div class="detail-header">
            <span>企业基本信息</span>
            <div v-if="editORview">
                <el-button v-show="!btnshow" size="medium" @click="btnshow = true" type="primary">编辑</el-button>
                <div v-show="btnshow">
                    <el-button size="medium" v-show="btnshowcancle" @click="btnshow = false" plain>取消</el-button>
                    <el-button size="medium" type="primary" @click="handleSubBusiness('ruleForm')">保存</el-button>
                </div>
            </div>
        </div>
        <div class="detail-form">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" :disabled="!btnshow" label-width="150px" class="smsConfig-ruleForm">
                <div class="form">
                    <el-form-item prop="name" label="公司名称：">
                        <el-input size="medium" v-model="ruleForm.name" placeholder="请输入公司名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="socialCreditCode" label="社会统一信用编码：">
                        <el-input size="medium" v-model="ruleForm.socialCreditCode" placeholder="请输入社会统一信用编码"></el-input>
                    </el-form-item>
                </div>
                <div class="form">
                    <el-form-item prop="contactName" label="联系人姓名：">
                        <el-input size="medium" v-model="ruleForm.contactName" placeholder="请输入联系人姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="contactPhone" label="联系人手机：">
                        <el-input size="medium" v-model="ruleForm.contactPhone" placeholder="请输入联系人手机"></el-input>
                    </el-form-item>
                </div>
                <div class="form">
                    <el-form-item label="法定代表人姓名：">
                        <el-input size="medium" v-model="ruleForm.legalPersonName" placeholder="请输入法定代表人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码：">
                        <el-input size="medium" v-model="ruleForm.legalPersonIdCard" placeholder="请输入身份证号码"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="detail-img">
            <div class="item">
                <div>营业执照</div>
                <div v-if="editORview" class="detail-upload">
                    <el-upload
                        :limit='5'
                        :action="fileUploads.actionUrl"
                        :data="fileUploads.authToken"
                        :accept="fileUploads.acceptType"
                        list-type="picture-card"
                        :on-error="handleUploadError"
                        :before-upload="(file)=>{ return beforeAvatarUpload('imgUrl', file)}"
                        :on-success="(response, file, fileList)=>{ return handleAvatarSuccess('imgUrl', response, file, fileList)}"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <!-- <template v-if="isAdd">
                    <div v-for="(item, index) in ruleForm.imgUrl" :key="index">
                        <img style="display: block; width: 40px; height:40px;" :src="item" alt="">
                    </div>
                </template> -->
            </div>
            <div class="item">
                <div>法定代表人证件</div>
                <div v-if="editORview" class="detail-upload">
                    <el-upload
                        :limit='5'
                        :action="fileUploads.actionUrl"
                        :data="fileUploads.authToken"
                        :accept="fileUploads.acceptType"
                        list-type="picture-card"
                        :on-error="handleUploadError"
                        :before-upload="(file)=>{ return beforeAvatarUpload('contactImgUr', file)}"
                        :on-success="(response, file, fileList)=>{ return handleAvatarSuccess('contactImgUr', response, file, fileList)}"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <template v-if="isAdd">
                    <div v-for="(item, index) in ruleForm.contactImgUr" :key="index">
                        <img style="display: block; width: 40px; height:40px;" :src="item" alt="">
                    </div>
                </template>
            </div>
        </div>
        <div class="detail-infobus" v-if="isAdd">
            <h1>业务信息</h1>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="项目信息" name="first">
                    <el-table
                        class="table-site"
                        ref="multipleTable"
                        :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                        :data="companyProjectName"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                        prop="id"
                        label="项目ID"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="projectName"
                        label="项目名称"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="userName"
                        label="负责人"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="项目地址"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="deviceCount"
                        label="设备数量"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="userCount"
                        label="项目员工数"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="startTime"
                        :formatter="formatterTime"
                        label="项目开始时间"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <!-- <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiQueryProjectInfo"></elPages> -->
                </el-tab-pane>
                <el-tab-pane label="员工信息" name="second">
                    <el-table
                        class="table-site"
                        ref="multipleTable"
                        :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                        :data="queryCompanyPersonData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                        prop="id"
                        label="员工ID"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="idCard"
                        label="身份证号"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="userOrigin"
                        label="籍贯"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="userType"
                        label="职业类型"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="serveStatus"
                        label="在职状态"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="createTime"
                        :formatter="formatterTime"
                        label="在职时间"
                        align="center"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiQueryProjectInfo"></elPages>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { addBackstageOrganization, searchBackstageOrganization, updateBackstageOrganization, generalToken, queryProjectInfo, queryProjectInfoByOrgId, queryCompanyPerson } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
import {setStore, getStore, dateformat} from '@/utils/utils.js'
export default {
    components: {
        elPages
    },
    props: {

    },
    data() {
        var validatePhone = (rule, value, callback) => {
            var myreg = /^1[3-9]\d{9}$/;
            if (!value) {
                callback(new Error('请输入手机号'));
            } else if(!myreg.test(value)) {
                callback(new Error('手机号格式不正确'));
            } else {
                callback();
            }
        };
        let checkorgcode = (rule, value, callback) => {
            console.log(value);
            if (!/(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(value)) {
                callback(new Error('信用代码格式错误'));
            } else if(!value) {
                callback();
            } else {
                callback();
            }
        };
        var validateId = (rule, value, callback) => {
            var myreg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            if (value) {
                if (!myreg.test(value)) {
                    callback(new Error('身份证格式不正确'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            editORview: true,
            btnshow: false,
            btnshowcancle: false,
            searchBackstageOrganizationParams: {
                orgId: this.$route.params.id
            },
            searchBackstageOrganizationData:{}, 
            ruleForm: {
                orgId: this.$route.params.id,
                name: null,
                socialCreditCode: null,
                contactName: null,
                contactPhone: null,
                legalPersonName: null,
                legalPersonIdCard: null,
                contactImgUr: [],
                imgUrl: []
            },
            rules: {
                name: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                ],
                socialCreditCode: [
                    { required: true, validator: checkorgcode, trigger: 'blur' },
                ],
                contactName: [
                    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                ],
                contactPhone: [
                    { required: true, validator: validatePhone, trigger: 'blur' },
                ],
                legalPersonIdCard: [
                    { required: true, validator: validateId, trigger: 'blur' },
                ]
            },
            fileUploads: {
                actionUrl: 'https://upload-z2.qiniup.com/',
                acceptType: '.pdf,.doc,.docx,.png,.jpg,.jpeg, .txt',
                authToken: { token: getStore('qiniuauthToken'), key: ''},
            },
            dialogImageUrl: '',
            dialogVisible: false,
            activeName: 'first',
            queryProjectInfoParams: {
                manageStatus: null,
                roleType: "ORG_MANAGE",
                oderBy: null,
                projectName: "",
                projectStatus: "",
                startTime: null,
            },
            pagebox: {
                totalrows: 0,
                pageIndex: 1,
                pageSize: 10
            },
            queryProjectInfoData: [],
            isAdd: false,
            companyProjectName: [],
            queryCompanyPersonData: []
        }
    },
    created() {
        if(this.$route.path.indexOf('detail') > 0) {
            this.editORview = true
            this.btnshowcancle = true
            this.isAdd = true
            this.ApiSearchBackstageOrganization()
        } else if (this.$route.path.indexOf('add') > 0) {
            this.editORview = true
            this.btnshow = true
            this.btnshowcancle = false
            this.isAdd = false
        } else {
            this.editORview = false
            this.isAdd = true
            this.ApiSearchBackstageOrganization()
        }
        this.ApiGeneralToken()
        this.ApiQueryProjectInfoByOrgId()
        this.ApiQueryCompanyPerson()
    },
    mounted() {

    },
    methods: {
        ApiSearchBackstageOrganization() {
            //企业详情
            searchBackstageOrganization(this.searchBackstageOrganizationParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.searchBackstageOrganizationData = res.data.data
                    let data = res.data.data
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const element = data[key]
                            if(this.ruleForm[key] !== undefined) {
                                this.ruleForm[key] = element
                            }
                        }
                    }
                    console.log(this.ruleForm.imgUrl);
                    this.ruleForm.imgUrl = this.ruleForm.imgUrl.split(',')
                    this.ruleForm.contactImgUr = this.ruleForm.contactImgUr.split(',')
                    console.log(this.ruleForm.imgUrl, this.ruleForm.contactImgUr);
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
        ApiQueryProjectInfo() {
            //项目列表
            queryProjectInfo(Object.assign(this.queryProjectInfoParams, this.pagebox)).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.queryProjectInfoData = res.data.data.list
                    this.pagebox.totalrows = res.data.data.totalRows
                }
            })
        },
        ApiQueryProjectInfoByOrgId() {
            //项目信息
            queryProjectInfoByOrgId({orgId: this.$route.params.id}).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.companyProjectName = res.data.data
                }
            })
        },
        ApiQueryCompanyPerson() {
            //员工信息
            queryCompanyPerson({orgId: this.$route.params.id,pageIndex: 1, pageSize: 10}).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.queryCompanyPersonData = res.data.data.list
                }
            })
        },
        formatterTime(row, column, cellValue, index) {
            if(cellValue === null) {
                return cellValue
            } else {
                let date = new Date(cellValue);
                let getTimeResult
                cellValue == '--' ? getTimeResult = '--' : getTimeResult = dateformat(date, 'yyyy-MM-dd hh:mm:ss')
                return getTimeResult;
            }  
        },
        handleSubBusiness(formName) {
            if(!this.btnshowcancle) {
                //新增企业
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        addBackstageOrganization(this.ruleForm).then((res) =>{
                            if (res.data.code === ERR_OK) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.$router.push({path: '../businessManage'})
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            } else {
                //编辑企业
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updateBackstageOrganization(this.ruleForm).then((res) =>{
                            if (res.data.code === ERR_OK) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                this.btnshow = false
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        },
        handleRemove(file, fileList) {
            //移除
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            //预览
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(type, file) {
            //上传前操作参数
            if(type === 'contactImgUr') {
                this.fileUploads.authToken.key = `fddbrzj${new Date().getTime()}_${file.name}`;
            } else {
                this.fileUploads.authToken.key = `yingyezhizhao${new Date().getTime()}_${file.name}`;
            }
        },
        handleUploadError(err, file, fileList) {
            //出错提示
            this.$message({
                message: "上传出错，请重试！",
                type: "error",
                center: true
            });
        },
        handleAvatarSuccess(type, res, file, fileList) {
            //上传成功
            if(type === 'contactImgUr') {
                this.ruleForm.contactImgUr = []
                fileList.map(item=>{
                    this.ruleForm.contactImgUr.push(`https://devhaogongdi.shilongmaoyi.com/${item.response.key}`)
                })
                // this.ruleForm.contactImgUr = JSON.stringify(this.ruleForm.contactImgUr)
                this.ruleForm.contactImgUr = String(this.ruleForm.contactImgUr.join(","))
            } else {
                this.ruleForm.imgUrl = []
                fileList.map(item=>{
                    this.ruleForm.imgUrl.push(`https://devhaogongdi.shilongmaoyi.com/${item.response.key}`)
                })
                // this.ruleForm.imgUrl = JSON.stringify(this.ruleForm.imgUrl)
                this.ruleForm.imgUrl = String(this.ruleForm.imgUrl.join(","))
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>

<style lang="scss">
    .business-detail {
        padding: 0 20px 20px;
        background-color: #ffffff;
        .detail-header {
            display: flex;
            height: 50px;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #E9E9E9;
        }
        .detail-form {
            padding: 24px 0;
            .el-form {
                .form {
                    display: flex;
                    .el-form-item {
                        margin-right: 90px;
                    }
                    // .el-form-item:nth-child(1) {
                    //     .el-form-item__label {
                    //         width: 100px!important;
                    //     }
                    //     .el-form-item__content {
                    //         margin-left: 100px!important;
                    //     }
                    // }
                }
                .el-form-item {
                    width: 40%;
                }
            }
        }
        .detail-img {
            display: flex;
            .item {
                width: 100%;
            }
        }
        .detail-upload {
            padding: 0 0 32px 0;
        }
        .detail-infobus {
            h1 {
                padding: 15px 0;
            }
        }
    }
</style>
