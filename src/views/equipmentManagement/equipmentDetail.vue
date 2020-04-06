<template>
    <div class="equipment-detail">
        <div class="detail-header">
            <span>设备基本信息</span>
            <div v-if="editORview">
                <el-button v-show="!btnshow" size="medium" type="primary" @click="btnshow = true">编辑</el-button>
                <div v-show="btnshow">
                    <el-button size="medium" plain @click="btnshow = false">取消</el-button>
                    <el-button size="medium" type="primary" @click="handleSubSave('ruleForm')">保存</el-button>
                </div>
            </div>
        </div>
        <div class="detail-form">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="smsConfig-ruleForm">
                <div class="form">
                    <el-form-item prop="id" label="设备ID：">
                        <el-input size="medium" v-model="ruleForm.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="code" label="设备唯一标识码：">
                        <el-input size="medium" v-model="ruleForm.code" :disabled="true"></el-input>
                    </el-form-item>
                </div>
                <div class="form">
                    <el-form-item prop="name" label="设备别名：">
                        <el-input size="medium" v-model="ruleForm.name" :disabled="!btnshow"></el-input>
                    </el-form-item>
                    <el-form-item prop="companyName" label="设备归属公司：">
                        <el-select size="medium" v-model="ruleForm.companyName" @change="handleChange" placeholder="请选择" :disabled="!btnshow">
                            <el-option
                            v-for="item in companyNameOptions"
                            :key="item.orgId"
                            :label="item.orgName"
                            :value="item.orgId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="form">
                    <el-form-item label="识别度：">
                        <el-input size="medium" v-model="ruleForm.discern" :disabled="!btnshow"></el-input>
                    </el-form-item>
                    <el-form-item label="设备归属项目：">
                        <el-select size="medium" v-model="ruleForm.projectName" placeholder="请选择" :disabled="!btnshow">
                            <el-option
                            v-for="item in companyProjectName"
                            :key="item.id"
                            :label="item.projectName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="form">
                    <el-form-item prop="model" label="设备型号：">
                        <el-input  size="medium" v-model="ruleForm.model" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="设备接入时间：">
                        <el-input size="medium" v-model="ruleForm.bindTime" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="detail-infobus">
            <h1>设备业务信息</h1>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="设备预留名单" name="first">
                    <el-table
                        class="table-site"
                        ref="multipleTable"
                        :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                        :data="queryDevicePersonData"
                        tooltip-effect="dark"
                        style="width: 100%"
                       >
                        <el-table-column
                        label="预留图片"
                        align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.attendanceImg" alt="" width="40" height="40"></template>
                        </el-table-column>
                        <el-table-column
                        prop="id"
                        label="名单ID"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="idCard"
                        label="身份证信息"
                        align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="remark"
                        label="备注信息"
                        align="center"
                        >
                        </el-table-column>
                    </el-table>
                    <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiQueryDevicePerson"></elPages>
                </el-tab-pane>
                <el-tab-pane label="读取数据记录" name="second">
                    <!-- <elPages></elPages> -->
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { dateformat } from "@/utils/utils.js";
import elPages from "@/components/elPages.vue";
import { selectOneDevice, editDevice, queryDevicePerson, queryProjectInfoByOrgId } from "@/api/common.js";
import { getOrganizationList } from "@/api/common.js";
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
            selectOneDeviceData: {},
            ruleForm: {
                id: this.$route.params.id,
                code: '',
                name: '',
                companyName: '',
                deviceStatus: '',
                projectName: '',
                model: '',
                // bindTime: '',
            },
            rules: {
                id: [
                    { required: true, message: '请填写设备ID', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请填写设备唯一标识码', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请填写设备别名', trigger: 'blur' },
                ],
                companyName: [
                    { required: true, message: '请填写设备归属公司', trigger: 'blur' },
                ],
                discern: [
                    { required: true, message: '请填识别度', trigger: 'blur' },
                ],
                projectName: [
                    { required: true, message: '请填写设备归属项目', trigger: 'blur' },
                ],
                model: [
                    { required: true, message: '请填写设备型号', trigger: 'blur' },
                ],
                bindTime: [
                    { required: true, message: '请选择设备接入时间', trigger: 'blur' },
                ],
            },
            activeName: 'first',
            queryDevicePersonParams: {
                deviceId: this.$route.params.id,
            },
            queryDevicePersonData: [],
            pagebox: {
                totalrows: 0,
                pageIndex: 1,
                pageSize: 10
            },
            getOrganizationListParams: {
                orgName: null,
                startDate: null,
                endDate: null,
                status: '',
                totalrows: 0,
                pageIndex: 1,
                pageSize: 100
            },
            companyNameOptions: [],
            companyProjectName: []
        }
    },
    created() {
        if(this.$route.path.indexOf('detail') > 0) {
            this.editORview = true
        } else {
            this.editORview = false
        } 
        this.ApiSelectOneDevice()
        this.ApiQueryDevicePerson()
        this.ApiGetOrganizationList()
    },
    mounted() {

    },
    computed: {
        'ruleForm.bindTime'() {		//注意,这里设置的计算规则的命名是页面v-modal绑定的值
            console.log(this.selectOneDeviceData.bindTime);
            return dateformat(new Date(this.selectOneDeviceData.bindTime), 'yyyy-MM-dd hh:mm');
        }
    },
    methods: {
        ApiSelectOneDevice() {
            //设备详情
            selectOneDevice({id: this.$route.params.id}).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selectOneDeviceData = res.data.data
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
        ApiGetOrganizationList() {
            //企业列表
            getOrganizationList(this.getOrganizationListParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.companyNameOptions = res.data.data.list
                }
            })
        },
        ApiQueryProjectInfoByOrgId() {
            //根据企业列表获取项目
            queryProjectInfoByOrgId({orgId: this.ruleForm.companyName}).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.companyProjectName = res.data.data
                }
            })
        },
        ApiQueryDevicePerson() {
            //设备预留名单
            queryDevicePerson(Object.assign(this.queryDevicePersonParams, this.pagebox)).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.queryDevicePersonData = res.data.data.list
                    this.pagebox.totalrows = res.data.data.totalRows
                }
            })
        },
        handleChange(val) {
            this.ApiQueryProjectInfoByOrgId()
        },
        handleSubSave(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    editDevice(this.ruleForm).then((res) =>{
                        if (res.data.code === ERR_OK) {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.ApiSelectOneDevice()
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        formatDate(key) {
            return dateformat(new Date(key), 'yyyy-MM-dd hh:mm');
        }
    }
}
</script>

<style lang="scss">
    .equipment-detail {
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
                    .el-select {
                        width: 100%;
                    }
                    .el-form-item:nth-child(1) {
                        .el-form-item__label {
                            width: 100px!important;
                        }
                        .el-form-item__content {
                            margin-left: 100px!important;
                        }
                    }
                }
                .el-form-item {
                    width: 35%;
                }
            }
        }
        .detail-infobus {
            h1 {
                padding: 15px 0;
            }
        }
    }
</style>
