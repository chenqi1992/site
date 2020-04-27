<template>
    <div class="equipment-manage">
        <div class="business-header">
            <div class="left">
                <div class="bus-header--input">
                    设备标识：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="selDevicePageListParams.code"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="bus-header--input">
                    功能状态：
                    <el-select size="medium" v-model="selDevicePageListParams.deviceStatus" placeholder="请选择">
                        <el-option
                        v-for="item in statusArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="bus-header--input">
                    更新时间：
                    <el-date-picker
                        size="medium"
                        v-model="businessTime"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <!-- <div class="bus-header--input">
                    归属状态：
                    <el-select size="medium" v-model="businessStatus" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div> -->
            </div>
            <div>
                <el-button size="medium" type="primary" @click="handleBtn">搜索</el-button>
            </div>
        </div>
        <el-dialog
            title="分配设备"
            :visible.sync="dialogVisible"
            width="350px"
            :before-close="handleClose">
            <el-form ref="formSub" :model="sizeForm" :rules="rules" label-width="130px" size="mini">
                <el-form-item label="设备归属企业ID" prop="companyId">
                    <el-select v-model="sizeForm.companyId" @change="handleChange" placeholder="请选择">
                        <el-option
                        v-for="item in getOrganizationListData"
                        :key="item.orgId"
                        :label="item.orgName"
                        :value="item.orgId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="设备别名" prop="name">
                    <el-input v-model="sizeForm.name"></el-input>
                </el-form-item> -->
                <el-form-item label="设备识别度" prop="discern">
                    <el-input v-model="sizeForm.discern"></el-input>
                </el-form-item>
                <!-- <el-form-item label="设备型号" prop="model">
                    <el-input v-model="sizeForm.model"></el-input>
                </el-form-item> -->
            </el-form>
            <div>
                <el-button size="medium" @click="handleClose">取消</el-button>
                <el-button size="medium" type="primary" @click="handleSub">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="openequipTitle"
            :visible.sync="dialogVisibleEquip"
            width="30%"
            :before-close="handleCloseEquip">
            <div>关闭设备，系统将不在读取该机器的数据。</div>
            <div>启用设备，系统将根据设备归属，重新配置设备预留用户信息，并定期获取设备上的数据。</div>
            <div>
                <el-button size="medium" @click="handleCloseEquip">取消</el-button>
                <el-button size="medium" type="primary" @click="handleBtn">确定</el-button>
            </div>
        </el-dialog>
        <div class="business-add">
            <div class="all-data">共搜索到 {{pagebox.totalrows}} 条数据</div>
            <div class="business-btn">
                <el-button size="medium" type="primary" @click="handleDistribution">归属分配</el-button>
                <el-button size="medium" type="primary" @click="handleUpdate">更新设备</el-button>
            </div>
        </div>
        <div class="business-table">   
            <div class="table-title">
                <img class="el-icon-info" src="../../assets/businessManage/！@2x.png" alt="">
                <span>已选择<i>{{multipleSelection.length}}</i>项</span>
                <span>设备：{{multipleSelection.length}}个</span>
                <div class="clear" @click="handleClear">清空</div>
            </div>
             <el-table
                ref="multipleTable"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                :data="selDevicePageListData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                align="center"
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                align="center"
                prop="id"
                label="设备ID"
                width="120">
                </el-table-column>
                <el-table-column
                prop="name"
                label="设备名称"
                width="120"
                align="center">
                </el-table-column>
                <el-table-column
                prop="code"
                label="关键唯一标识"
                align="center"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="companyName"
                label="归属公司"
                align="center"
                show-overflow-tooltip
                >
                </el-table-column>
                <!-- <el-table-column
                prop="deviceStatus"
                label="归属状态"
                align="center"
                show-overflow-tooltip
                >
                </el-table-column> -->
                <el-table-column
                prop="deviceStatus"
                label="功能状态"
                align="center"
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="scope.row.deviceStatus === 'INUSE'">使用中</div>
                        <div v-if="scope.row.deviceStatus === 'SPARE'">空闲</div>
                        <div v-if="scope.row.deviceStatus === 'BAD'">故障</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="bindTime"
                label="企业加入时间"
                :formatter="formatime"
                align="center"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" @click="handleView(scope.row)" type="text">查看</el-button>
                            <el-button class="btn-action" @click="handleModify(scope.row)" type="text">编辑</el-button>
                            <!-- <el-button class="btn-action" @click="handleSwitch(scope.row)" type="text">开启</el-button> -->
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiSearchWorkUserRole"></elPages>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import {relative, totalNum} from "@/common/js/mixins.js";
import { selDevicePageList, editDevice, getOrganizationList } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {
        elPages
    },
    props: {

    },
    mixins: [relative],
    data() {
        return {
            selDevicePageListParams:{
                code: null,
                updateDateStart: null,
                updateDateEnd: null,
                deviceStatus: null,
                projectId: null,
                companyId: null,
            },
            selDevicePageListData: [],
            dialogVisible: false,
            sizeForm: {
                companyId: '',
                companyName: '',
                discern: '',
                // model: null,
                name: null,
                // projectId: 0,
                // projectName: '',
                id: 0
            },
            rules: {
                discern: [
                    { required: true, message: '请输入设备识别度', trigger: 'blur' },
                ],
                companyId: [
                    { required: true, message: '请输入设备归属企业ID', trigger: 'blur' },
                ],
                model: [
                    { required: true, message: '请输入设备型号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入设备别名', trigger: 'blur' },
                ]
            },
            openequipTitle: '关闭设备提醒',
            dialogVisibleEquip: false,
            businessTime: '',
            statusArr: [{
                value: 'INUSE',
                label: '使用中'
                }, {
                value: 'SPARE',
                label: '空闲'
                }, {
                value: 'BAD',
                label: '故障'
            }],
            addtime: '',
            multipleSelection: [],
            pagebox: {
                totalrows: 0,
                pageIndex: 1,
                pageSize: 10
            },
            getOrganizationListData: [] //企业列表
        }
    },
    created() {
        this.ApiSearchWorkUserRole()
    },
    mounted() {

    },
    methods: {
        ApiSearchWorkUserRole() {
            //查询设备列表
            this.selDevicePageListParams.updateDateStart = this.businessTime ? this.businessTime[0] : ''
            this.selDevicePageListParams.updateDateEnd = this.businessTime ? this.businessTime[1] : ''
            selDevicePageList(Object.assign(this.selDevicePageListParams, this.pagebox)).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selDevicePageListData = res.data.data.list
                    this.pagebox.totalrows = res.data.data.totalRows
                }
            })
        },
        ApiGetOrganizationList() {
            //企业列表
            getOrganizationList({
                orgName: null,
                startDate: null,
                endDate: null,
                status: '',
                totalrows: 0,
                pageIndex: 1,
                pageSize: 100
            }).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.getOrganizationListData = res.data.data.list
                }
            })
        },
        handleBtn() {
            this.ApiSearchWorkUserRole()
        },
        handleClose() {
            this.dialogVisible = false
        },
        handleDistribution() {
            //归属分配
            this.dialogVisible = true
            this.ApiGetOrganizationList()
        },
        handleUpdate() {
            //更新设备
        },
        handleView(row) {
            this.$router.push({path: `./equipmentDetail/${row.id}`})
        },
        handleModify(row) {
            this.$router.push({path: `./equipmentDetail/detail/${row.id}`})
        },
        handleSwitch() {
            this.dialogVisibleEquip = true
        },
        handleCloseEquip() {
            this.dialogVisibleEquip = false
        },
        handleSub() {
            if(this.multipleSelection.length === 0) {
                this.$message({
                    type: 'error',
                    message: '请先选择一个归属设备'
                });
                return
            }
            this.$refs['formSub'].validate((valid) => {
                if (valid) {
                    editDevice(this.sizeForm).then((res) =>{
                        if (res.data.code === ERR_OK) {
                            this.$message({
                                type: 'success',
                                message: '归属成功'
                            });
                            this.ApiSearchWorkUserRole()
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
        handleSelectionChange(val) {
            this.multipleSelection = val
            this.sizeForm.id = this.multipleSelection[0].id
            this.sizeForm.discern = this.multipleSelection[0].discern
            this.sizeForm.name = this.multipleSelection[0].model
            console.log(this.multipleSelection);
        },
        handleChange(val) {
            this.getOrganizationListData.forEach(item=> {
                if(item.orgId == val) {
                    this.sizeForm.companyName = item.orgName
                }
            })
        },
        handleClear() {
            this.$refs.multipleTable.clearSelection();
        },
    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .equipment-manage {
        padding: 20px;
        background-color: #ffffff;
        .business-header {
            display: flex;
            justify-content: space-between;
            .left {
                display: flex;
                flex-wrap: wrap;
                .bus-header--input {
                    margin-right: 10px;
                    .el-input {
                        width: 224px;
                    }
                }
                .bus-header--input:nth-child(4) {
                    margin-top: 16px;
                }
            }
        }
        .business-add {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            .business-btn {

            }
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
        .el-pagebox {
            text-align: right;
        }
    }
</style>