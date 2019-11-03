<template>
    <div class="user-manage">
        <div class="user-header">
            <div class="left">
                <div class="bus-header--input">
                    角色类型：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="businessValue"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="bus-header--input">
                    账户状态：
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
                    加入时间：
                    <el-date-picker
                        size="medium"
                        v-model="businessTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <el-button size="medium" type="primary">查询</el-button>
            </div>
        </div>
        <div class="user-btn">
            <el-button size="medium" type="primary">添加账户</el-button>
            <el-button size="medium" type="primary">批量删除</el-button>
        </div>
        <el-table
            class="table-site"
            ref="multipleTable"
            :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="姓名"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="所属企业"
            width="120">
            </el-table-column>
            <el-table-column
            prop="address"
            label="角色名称"
            >
            </el-table-column>
            <el-table-column
            prop="address"
            label="账号状态"
            >
            </el-table-column>
            <el-table-column
            prop="address"
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
        <elPages></elPages>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
export default {
    components: {
        elPages
    },
    props: {

    },
    data() {
        return {
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
        handleView() {
            this.$router.push({path: './userManagedetail/add'})
        },
        handleEdit(row) {
            this.$router.push({path: `./userManagedetail/1`})
        },
        handleDisable() {

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
