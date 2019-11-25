<template>
    <div class="user-manage">
        <div class="user-header">
            <div class="left">
                <div class="bus-header--input">
                    角色类型：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="listBackstageUserParams.roleType"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="bus-header--input">
                    账户状态：
                    <el-select size="medium" v-model="listBackstageUserParams.status" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="bus-header--input">
                    请输入姓名搜索：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="listBackstageUserParams.userName"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
            </div>
            <div>
                <el-button size="medium" type="primary">查询</el-button>
            </div>
        </div>
        <div class="user-btn">
            <el-button size="medium" type="primary" @click="handleAddcount">添加账户</el-button>
            <!-- <el-button size="medium" type="primary">批量删除</el-button> -->
        </div>
        <el-table
            class="table-site"
            ref="multipleTable"
            :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
            :data="listBackstageUserData"
            tooltip-effect="dark"
            style="width: 100%"
            >
            <!-- <el-table-column
            type="selection"
            width="55">
            </el-table-column> -->
            <el-table-column
            prop="userName"
            label="姓名"
            width="120">
            </el-table-column>
            <el-table-column
            prop="orgName"
            label="所属企业"
            width="120">
            </el-table-column>
            <el-table-column
            prop="roleName"
            label="角色名称"
            >
            </el-table-column>
            <el-table-column
            prop="status"
            label="账号状态"
            >
                <template slot-scope="scope">
                    <div v-if="scope.row.status === 'PAUSE'">暂停</div>
                    <div v-if="scope.row.status === 'END'">完结</div>
                    <div v-if="scope.row.status === 'RUN'">运行</div>
                </template>
            </el-table-column>
            <el-table-column
            prop="createTime"
            :formatter="formatime"
            label="创建时间"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <div>
                        <el-button class="btn-action" @click="handleView(scope.row)" type="text">查看</el-button>
                        <el-button class="btn-action" @click="handleEdit(scope.row)" type="text">编辑</el-button>
                        <el-button class="btn-action" @click="handleDisable(scope.row)" type="text">停用</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiListBackstageUser"></elPages>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import {relative} from "@/common/js/mixins.js";
import { listBackstageUser, updateBackstageUserStatus } from "@/api/common.js";
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
            listBackstageUserParams: {
                pageIndex: 1,
                pageSize: 10,
                roleType: null,
                status: null,
                userName: null
            },
            listBackstageUserData:[],
            pagebox: {
                totalrows: 0,
                currentpage: 1,
                pageSize: 10
            },
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

    },
    mounted() {

    },
    methods: {
        ApiListBackstageUser() {
            //工作人员列表
            listBackstageUser(this.listBackstageUserParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.listBackstageUserData = res.data.data.list
                }
            })
        },
        handleAddcount() {
            this.$router.push({path: './userManageDetail/add'})
        },
        handleView(row) {
            this.$router.push({path: `./userManageDetail/${row.id}`})
        },
        handleEdit(row) {
            this.$router.push({path: `./userManageDetail/detail/${row.id}`})
        },
        handleDisable(row) {
            let open = {
                status: "0 启用，1 禁用",
                userId: 0
            }
            updateBackstageUserStatus(open).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.$message({
                        message: '已关闭',
                        type: 'success'
                    });
                } else {
                    this.$message.error(res.data.message);
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .user-manage {
        padding: 20px;
        background-color: #ffffff;
        .user-header {
            display: flex;
            justify-content: space-between;
            .left {
                display: flex;
                .bus-header--input {
                    margin-right: 24px;
                    .el-input {
                        width: 200px;
                    }
                }
            }
        }
        .user-btn {
            display: flex;
            padding: 20px 0;
        }
    }
</style>
