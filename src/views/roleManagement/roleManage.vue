<template>
    <div class="role-manage">
        <div class="role-header">
            <div class="role-header--input">
                角色类型：
                <el-select size="medium" v-model="roleValue" placeholder="请选择">
                    <el-option
                    v-for="item in roleArr"
                    :key="item.roleCode"
                    :label="item.roleName"
                    :value="item.roleCode">
                    </el-option>
                </el-select>
            </div>
            <el-button size="medium" type="primary">查询</el-button>
        </div>
        <div class="user-btn">
            <el-button size="medium" type="primary" @click="handleView('', 'add')">添加角色</el-button>
            <el-button size="medium" type="plain" @click="handleDelete()">批量删除</el-button>
        </div>
        <el-table
            class="table-site"
            ref="multipleTable"
            :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
            :data="roleTableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="角色ID"
            prop="roleCode"
            width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="roleName"
            label="角色名称"
            width="120">
            </el-table-column>
            <el-table-column
            prop="createUser"
            label="创建人"
            >
            </el-table-column>
            <el-table-column
            prop="remark"
            label="备注信息"
            >
            </el-table-column>
            <el-table-column
            prop="createTime"
            label="创建时间"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <div>
                        <el-button class="btn-action" @click="handleView(scope.row, id)" type="text">查看</el-button>
                        <el-button class="btn-action" @click="handleModify(scope.row)" type="text">编辑</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <elPages></elPages>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { searchWorkUserRole, listRole, deleteRole } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {
        elPages
    },
    props: {

    },
    data() {
        return {
            roleValue: '',
            roleArr: [],
            roleArrParams: {
                roleCode: "",
                roleTypeEnum: "MEDIATOR"
            },
            roleTableParams: {
                pageIndex: 1,
                pageSize: 10,
                roleType: "MEDIATOR",
            },
            roleDeletaParams: [],
            roleTableData: [{
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
        this.ApiSearchWorkUserRole()
    },
    mounted() {
        
    },
    methods: {
        ApiSearchWorkUserRole() {
            //查询工作人员角色
            searchWorkUserRole(this.roleArrParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.roleArr = res.data.data
                }
            })
        },
        ApiListRole() {
            //查询角色列表信息
            listRole(this.roleTableParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.roleTableData = res.data.data.list
                }
            })
        },
        handleView(row, type) {
            if(type === 'add') {
                this.$router.push({path: `./roleLimits/add`})
            } else {
                this.$router.push({path: `./roleLimits/detail/${row.roleCode}`})
            }
        },
        handleModify(row) {
            console.log(row);
            this.$router.push({path: `./roleLimits/${row.id}`})
        },
        handleDelete() {
            deleteRole(this.roleDeletaParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.ApiListRole()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error(res.data.message);
                }
            })
        },
        handleSelectionChange(val) {
            this.roleDeletaParams = []
            val.map(item=>{
                this.roleDeletaParams.push(item.roleCode)
            })
        },
    }
}
</script>

<style lang="scss">
    .role-manage {
        padding: 20px;
        background-color: #ffffff;
        .role-header {
            display: flex;
            .role-header--input {
                margin-right: 24px;
                .el-input, .el-range-editor {
                    width: 224px;
                }
            }
        }
        .user-btn {
            display: flex;
            padding: 20px 0;
        }
    }
</style>
