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
                <div class="detail-upload">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </div>
            <div class="item">
                <div>法定代表人证件</div>
                <div class="detail-upload">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </div>
        </div>
        <div class="detail-infobus">
            <h1>业务信息</h1>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="项目信息" name="first">
                    <el-table
                        class="table-site"
                        ref="multipleTable"
                        :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                        label="项目ID"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="项目名称"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="负责人"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="项目地址"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="设备数"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="项目员工数"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="开始打卡时间"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="最后打卡时间"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <elPages></elPages>
                </el-tab-pane>
                <el-tab-pane label="员工信息" name="second">
                    <elPages></elPages>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { addBackstageOrganization, searchBackstageOrganization, updateBackstageOrganization, generalToken } from "@/api/common.js";
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
            searchBackstageOrganizationParams: {},
            searchBackstageOrganizationData:{}, 
            ruleForm: {
                name: '',
                code: '',
                contactName: '',
                contactPhone: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请输入社会统一信用编码', trigger: 'blur' },
                ],
                contactName: [
                    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                ],
                contactPhone: [
                    { required: true, message: '请输入联系人手机', trigger: 'blur' },
                ],
            },
            dialogImageUrl: '',
            dialogVisible: false,
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
        if(this.$route.path.indexOf('detail') > 0) {
            this.editORview = true
            this.btnshowcancle = true
            this.ApiSearchBackstageOrganization()
        } else if (this.$route.path.indexOf('add') > 0) {
            this.editORview = true
            this.btnshow = true
            this.btnshowcancle = false
        } else {
            this.editORview = false
            this.ApiSearchBackstageOrganization()
        }
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
                }
            })
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
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
