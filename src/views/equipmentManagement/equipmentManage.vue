<template>
    <div class="equipment-manage">
        <div class="business-header">
            <div class="left">
                <div class="bus-header--input">
                    设备标识：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="businessValue"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="bus-header--input">
                    功能状态：
                    <el-select size="medium" v-model="businessStatus" placeholder="请选择">
                        <el-option
                        v-for="item in options"
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
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="bus-header--input">
                    归属状态：
                    <el-select size="medium" v-model="businessStatus" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <el-button size="medium" type="primary" @click="handleBtn">按钮</el-button>
            </div>
        </div>
        <el-dialog
            title="分配设备"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                <el-form-item label="公司名称">
                    <el-input v-model="sizeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="企业ID">
                    <el-input v-model="sizeForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button size="medium" @click="handleClose">取消</el-button>
                <el-button size="medium" type="primary" @click="handleBtn">提交</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="openequipTitle"
            :visible.sync="dialogVisibleEquip"
            width="30%"
            :before-close="handleClose">
            <div>关闭设备，系统将不在读取该机器的数据。</div>
            <div>启用设备，系统将根据设备归属，重新配置设备预留用户信息，并定期获取设备上的数据。</div>
            <div>
                <el-button size="medium" @click="handleCloseEquip">取消</el-button>
                <el-button size="medium" type="primary" @click="handleBtn">确定</el-button>
            </div>
        </el-dialog>
        <div class="business-add">
            <div class="all-data">共搜索到 922 条数据</div>
            <div class="business-btn">
                <el-button size="medium" type="primary" @click="handleDistribution">归属分配</el-button>
                <el-button size="medium" type="primary" @click="handleUpdate">更新设备</el-button>
            </div>
        </div>
        <div class="business-table">   
            <div class="table-title">
                <img class="el-icon-info" src="../../assets/businessManage/！@2x.png" alt="">
                <span>已选择<i>4</i>项</span>
                <span>总计：100,000,000人</span>
                <span>设备：20,000,000个</span>
                <span>项目：20个</span>
                <div class="clear">清空</div>
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
                <template slot-scope="scope">{{ scope.row.date }}</template>
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
                prop="address"
                label="归属公司"
                align="center"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="companyId"
                label="归属状态"
                align="center"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="deviceStatus"
                label="功能状态"
                align="center"
                show-overflow-tooltip>
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
                            <el-button class="btn-action" @click="handleSwitch(scope.row)" type="text">开启</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <elPages></elPages>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { selDevicePageList } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
import {dateformat} from '@/utils/utils.js'
export default {
    components: {
        elPages
    },
    props: {

    },
    data() {
        return {
            selDevicePageListParams:{
                projectId: 4,
                companyId: null,
                pageIndex: 1,
                pageSize: 10,
            },
            selDevicePageListData: [],
            dialogVisible: false,
            sizeForm: {
                name: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ]
            },
            openequipTitle: '关闭设备提醒',
            dialogVisibleEquip: false,
            businessValue: '',
            businessStatus: '',
            businessTime: '',
            options: [{
                value: 'TOP_NAVIGATION_BAR',
                label: '顶部导航栏'
                }, {
                value: 'BOTTOM_NAVIGATION_BAR',
                label: '底部导航栏'
            }],
            addtime: '',
            multipleSelection: [],
            pagebox: {
                totalrows: 10,
                currentpage: 1,
                pageSize: 10
            },
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
            selDevicePageList(this.selDevicePageListParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selDevicePageListData = res.data.data.list
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
        formatime(row, column, cellValue, index) {
            let date = new Date(cellValue);
            let getTimeResult
            cellValue == '--' ? getTimeResult = '--' : getTimeResult = dateformat(date, 'yyyy-MM-dd hh:mm:ss')
            return getTimeResult;
        },
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
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