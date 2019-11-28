<template>
    <div class="user-manage">
        <div class="user-header">
            <div class="left">
                <div class="bus-header--input">
                    角色类型：
                    <el-select size="medium" v-model="listBackstageUserParams.roleType" placeholder="请选择">
                        <el-option
                        v-for="item in roleArr"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </div>
                <div class="bus-header--input">
                    账户状态：
                    <el-select size="medium" v-model="listBackstageUserParams.status" placeholder="请选择">
                        <el-option
                        v-for="item in statusArr"
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
                <el-button size="medium" type="primary" @click="handleSearch">查询</el-button>
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
            align="center">
            </el-table-column>
            <el-table-column
            prop="orgName"
            label="所属企业"
            align="center">
            </el-table-column>
            <el-table-column
            prop="roleName"
            label="角色名称"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="status"
            label="账号状态"
            align="center"
            >
                <template slot-scope="scope">
                    <div v-if="scope.row.status === '0'">使用中</div>
                    <div v-if="scope.row.status === '1'">已停用</div>
                </template>
            </el-table-column>
            <el-table-column
            prop="createTime"
            :formatter="formatime"
            label="创建时间"
            align="center"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <div>
                        <el-button class="btn-action" @click="handleView(scope.row)" type="text">查看</el-button>
                        <el-button class="btn-action" @click="handleEdit(scope.row)" type="text">编辑</el-button>
                        <el-button class="btn-action" @click="handleDisable(scope.row, 0)" type="text" v-if="scope.row.status === '1'">启用</el-button>
                        <el-button class="btn-action" @click="handleDisable(scope.row, 1)" type="text" v-if="scope.row.status === '0'">停用</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiListBackstageUser"></elPages>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import {relative, roleType} from "@/common/js/mixins.js";
import { listBackstageUser, updateBackstageUserStatus } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {
        elPages
    },
    props: {

    },
    mixins: [relative, roleType],
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
            statusArr: [{
                value: '1',
                label: '已停用'
                }, {
                value: '0',
                label: '使用中'
            }],
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
        this.ApiListBackstageUser()
    },
    methods: {
        ApiListBackstageUser() {
            //工作人员列表
            listBackstageUser(this.listBackstageUserParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.listBackstageUserData = res.data.data.list
                } else {
                    this.$message.error(res.data.message);
                }
            })
        },
        handleAddcount() {
            this.$router.push({path: './userManageDetail/add'})
        },
        handleView(row) {
            this.$router.push({path: `./userManageDetail/${row.userId}`})
        },
        handleEdit(row) {
            this.$router.push({path: `./userManageDetail/detail/${row.userId}`})
        },
        handleSearch() {
            this.ApiListBackstageUser()
        },
        handleDisable(row, type) {
            let open = {
                status: type,
                userId: row.userId
            }
            updateBackstageUserStatus(open).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.ApiListBackstageUser()
                    this.$message({
                        message: type=='1' ? '已关闭': '已开启',
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
