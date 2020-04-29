<template>
    <div class="project-index">
        <div class="project-header">
            <div class="left">
                <div class="bus-header--input">
                    项目名称：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="queryProjectInfoParams.projectName"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="bus-header--input">
                    项目状态：
                    <el-select size="medium" v-model="queryProjectInfoParams.projectStatus" placeholder="请选择">
                        <el-option
                        v-for="item in projectStatusArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="bus-header--input">
                    开始时间：
                    <el-date-picker
                        size="medium"
                        v-model="queryProjectInfoParams.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择日期"
                    >
                    </el-date-picker>
                </div>
                <div class="bus-header--input">
                    管理状态：
                    <el-select size="medium" v-model="queryProjectInfoParams.manageStatus" placeholder="请选择">
                        <el-option
                        v-for="item in manageStatusArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <el-button size="medium" type="primary" @click="handleBtn">搜索</el-button>
            </div>
        </div>
        <div class="business-add">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAddPro">添加项目</el-button>
            <div class="all-data">共搜索到 {{pagebox.totalrows}} 条数据</div>
        </div>
        <div class="business-table">   
            <div class="table-title">
                <img class="el-icon-info" src="../../../assets/businessManage/！@2x.png" alt="">
                <span>已选择<i>{{multipleSelection.length}}</i>项</span>
                <span>总计：{{totalNum.orgPersonNumber}}人</span>
                <span>设备：{{totalNum.orgDeviceNumber}}个</span>
                <span>项目：{{totalNum.orgProjectNumber}}个</span>
                <div class="clear" @click="handleClear">清空</div>
            </div>
             <el-table
                ref="multipleTable"
                :data="queryProjectInfoData"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="companyName"
                label="企业名称"
                align="center">
                </el-table-column>
                <el-table-column
                prop="id"
                label="项目ID"
                width="80"
                align="center">
                </el-table-column>
                <el-table-column
                prop="projectName"
                label="项目名称"
                width="120"
                align="center">
                </el-table-column>
                <el-table-column
                prop="userCount"
                label="项目规模（人）"
                align="center"
                sortable
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="deviceCount"
                label="设备数量"
                align="center"
                width="100"
                sortable
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="项目位置"
                align="center"
                width="100"
                sortable
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="projectStatus"
                label="项目状态"
                width="80"
                align="center"
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="scope.row.projectStatus === 'PAUSE'">暂停</div>
                        <div v-if="scope.row.projectStatus === 'END'">完结</div>
                        <div v-if="scope.row.projectStatus === 'RUN'">运行</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="startTime"
                label="项目开始时间"
                :formatter="formatime"
                align="center"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" size="medium" @click="handleModify(scope.row)" type="text">查看</el-button>
                            <el-button class="btn-action" size="medium" @click="handleEdit(scope.row)" type="text">编辑</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiQueryProjectInfo"></elPages>
        </div>
        <el-dialog
            title="添加项目"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="项目名称" prop="projectName">
                    <el-input v-model="ruleForm.projectName" placeholder="请填写项目名称"></el-input>
                </el-form-item>
                <el-form-item label="项目地址" prop="address">
                    <el-input v-model="ruleForm.address" placeholder="请填写项目地址"></el-input>
                </el-form-item>
                <el-form-item label="负责人" prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="请填写负责人"></el-input>
                </el-form-item>
                <el-form-item label="负责人电话" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="请填写负责人电话"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
                <el-button size="medium" type="primary" @click="handleSubPro('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import {relative, totalNum} from "@/common/js/mixins.js";
import { getStore } from '@/utils/utils.js'
import { queryProjectInfo, addProjectInfo } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {
        elPages
    },
    props: {

    },
    mixins: [relative, totalNum],
    data() {
        return {
            dialogVisible: false,
            queryProjectInfoParams: {
                manageStatus: null,
                roleType: "PROJECT_MANAGE",
                oderBy: null,
                projectName: "",
                projectStatus: "",
                startTime: null,
            },
            ruleForm: {
                projectName: '',
                address: '',
                userName: '',
                phone: '',
                roleType: "PROJECT_MANAGE"
            },
            rules: {
                projectName: [
                    { required: true, message: '请填写公司名称', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请选择行业类别', trigger: 'blur' },
                ],
                userName: [
                    { required: true, message: '请填写联系人', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请选择所在区域', trigger: 'blur' },
                ],
            },
            projectStatusArr: [{
                value: 'END',
                label: '完结'
            },{
                value: 'RUN',
                label: '运行'
            },{
                value: 'PAUSE',
                label: '暂停'
            }],
            manageStatusArr: [{
                value: 'MASTER',
                label: '主管'
            },{
                value: 'DEPUTY',
                label: '协管'
            }],
            queryProjectInfoData: [],
            multipleSelection: [],
            pagebox: {
                totalrows: 0,
                pageIndex: 1,
                pageSize: 10
            },
        }
    },
    created() {
        this.ApiQueryProjectInfo()
    },
    mounted() {
        
    },
    methods: {
        ApiQueryProjectInfo() {
            //项目列表
            const loginInfouser = JSON.parse(getStore('loginInfouser'))
            let coArr = []
            loginInfouser.userRoles.forEach(item=>{
                if(item.roleType === 'PROJECT_MANAGE') {
                    coArr.push(0)
                }
                if(item.roleType === 'ORG_MANAGE') {
                    coArr.push(1)
                    
                }
            })
            let roleTypesum = coArr.reduce(function(prev,cur,index,array){
                return prev + cur
            })      //判断多角色时只有PROJECT_MANAGE传PROJECT_MANAGE，PROJECT_MANAGE和ORG_MANAGE同时存在传ORG_MANAGE
            roleTypesum === 0 ? this.queryProjectInfoParams.roleType = 'PROJECT_MANAGE':this.queryProjectInfoParams.roleType = 'ORG_MANAGE'
        
            queryProjectInfo(Object.assign(this.queryProjectInfoParams, this.pagebox)).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.queryProjectInfoData = res.data.data.list
                    this.pagebox.totalrows = res.data.data.totalRows
                }
            })
        },
        handleSelectionChange(val) {
            this.roleDeletaParams = []
            val.map(item=>{
                this.roleDeletaParams.push(item.roleCode)
            })
        },
        handleBtn() {
            this.ApiQueryProjectInfo()
        },
        handleAddPro() {
            this.dialogVisible = true
        },
        handleSubPro(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addProjectInfo(this.ruleForm).then((res) =>{
                        if (res.data.code === ERR_OK) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.dialogVisible = false
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        handleModify(row) {
            this.$router.push({path: `/projectIndexOr/detail/${row.id}`})
        },
        handleEdit(row) {
            this.$router.push({path: `/projectIndexOr/${row.id}`})
        }
    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .project-index {
        padding: 24px 30px;
        .project-header {
            display: flex;
            .left {
                display: flex;
                flex-wrap: wrap;
                .bus-header--input {
                    margin: 0 24px 20px 0;
                    .el-input {
                        width: 240px;
                    }
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
