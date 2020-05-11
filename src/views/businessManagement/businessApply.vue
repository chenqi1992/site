<template>
    <div class="business-apply">
        <div class="business-header">
            <div class="bus-header--input">
                公司名称：
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="getOrganizationListParams.orgName"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div>
            <div class="bus-header--input">
                审核状态：
                <el-select size="medium" v-model="getOrganizationListParams.status" placeholder="请选择">
                    <el-option
                    v-for="item in statusArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="bus-header--input">
                申请时间：
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
            <el-button size="medium" type="primary" @click="handleSeach">搜 索</el-button>
        </div>
        <div class="business-table">   
            <!-- <div class="table-title">
                <img class="el-icon-info" src="../../assets/businessManage/！@2x.png" alt="">
                <span>已选择<i>{{multipleSelection.length}}</i>项</span>
                <span>总计：{{totalNum.orgPersonNumber}}人</span>
                <span>设备：{{totalNum.orgDeviceNumber}}个</span>
                <span>项目：{{totalNum.orgProjectNumber}}个</span>
                <div class="clear" @click="handleClear">清空</div>
            </div> -->
            <el-table
                class="table-site"
                ref="multipleTable"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                :data="queryApplyJoinProjectListData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="orgId"
                label="序号"
                width="120"
                align="center">
                </el-table-column>
                <el-table-column
                prop="userName"
                label="公司名称"
                width="120"
                align="center">
                </el-table-column>
                <el-table-column
                prop="orgPersonNumber"
                label="联系人"
                align="center"
                sortable
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="orgDeviceNumber"
                label="联系方式"
                align="center"
                sortable
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="orgProjectNumber"
                label="法人"
                align="center"
                sortable
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="status"
                label="营业执照"
                align="center"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="申请加入时间"
                :formatter="formatime"
                align="center"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <!-- <el-button class="btn-action" @click="handleView(scope.row)" type="text">同意</el-button>
                            <el-button class="btn-action" @click="handleModify(scope.row)" type="text">拒绝</el-button> -->
                            <el-button class="btn-action" v-if="scope.row.status === 1" @click="handlePass(scope.row)" type="text">同意</el-button>
                            <el-button class="btn-action" v-if="scope.row.status === 0" @click="handleDeny(scope.row)" type="text">拒绝</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiGetOrganizationList"></elPages>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import {relative, totalNum} from "@/common/js/mixins.js";
import { queryApplyJoinProjectList, applyJoinProjectDeny, applyJoinProjectPass } from "@/api/common.js";
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
            queryApplyJoinProjectListParams: {
                orgId: '',
                projectId: '',
                userId: 0
            },
            queryApplyJoinProjectListData: [],
            businessTime: '',
            statusArr: [{
                value: '',
                label: '全部'
                }, {
                value: 'PASS',
                label: '已通过'
                },
                {
                    value: 'tFAIL',
                    label: '未通过'
                },{
                    value: 'tWAIT',
                    label: '待审核'
            }],
            multipleSelection: [],
            pagebox: {
                totalrows: 0,
                pageIndex: 1,
                pageSize: 10
            },
        }
    },
    created() {
        this.ApiqueryApplyJoinProjectList()
    },
    mounted() {
    },
    methods: {
        ApiqueryApplyJoinProjectList() {
            //申请加入列表
            this.queryApplyJoinProjectListParams.startDate = this.businessTime ? this.businessTime[0] : ''
            this.queryApplyJoinProjectListParams.endDate = this.businessTime ? this.businessTime[1] : ''
            queryApplyJoinProjectList(Object.assign(this.queryApplyJoinProjectListParams, this.pagebox)).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.queryApplyJoinProjectListData = res.data.data.list
                    this.pagebox.totalrows = res.data.data.totalRows
                }
            })
        },
        handleAddBus() {
            this.$router.push({path: './businessDetail/add'})
        },
        handleView(row) {
            this.$router.push({path: `./businessDetail/${row.orgId}`})
        },
        handleModify(row) {
            this.$router.push({path: `./businessDetail/detail/${row.orgId}`})
        },
        handleSeach() {
            this.ApiqueryApplyJoinProjectList()
        },
        handlePass(row) {
            applyJoinProjectPass({id: row.id}).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.ApiqueryApplyJoinProjectList()
                }
            })
        },
        handleDeny(row) {
            applyJoinProjectDeny({id: row.id}).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.ApiqueryApplyJoinProjectList()
                }
            })
        }
    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .business-apply {
        padding: 20px;
        background-color: #ffffff;
        .business-header {
            display: flex;
            justify-content: space-between;
            .bus-header--input {
                margin-right: 24px;
                .el-input {
                    width: 224px;
                }
                .el-date-picker {
                    width: 240px;
                }
            }
        }
        .business-add {
            display: flex;
            padding: 20px 0;
        }
    }
</style>
