<template>
    <div class="role-manage">
        <div class="role-header">
            <div class="role-header--input">
                角色类型：
                <el-select size="medium" v-model="roleTableParams.roleType" placeholder="请选择">
                    <el-option
                    v-for="item in roleArr"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </div>
            <el-button size="medium" type="primary" @click="handleSearch">查询</el-button>
        </div>
        <div class="user-btn">
            <el-button size="medium" type="primary" @click="handleView('', 'add')">添加角色</el-button>
            <!-- <el-button size="medium" type="plain" @click="handleDelete()">批量删除</el-button> -->
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
            width="55"
            align="center">
            </el-table-column>
            <el-table-column
            label="角色ID"
            prop="roleCode"
            width="120"
            align="center">
            <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
            prop="roleName"
            label="角色名称"
            width="120"
            align="center">
            </el-table-column>
            <el-table-column
            prop="createUser"
            label="创建人"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="remark"
            label="备注信息"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="createTime"
            label="创建时间"
            :formatter="formatime"
            align="center"
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
        <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiListRole"></elPages>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import {relative, roleType} from "@/common/js/mixins.js";
import { searchDictionaryInfo, searchWorkUserRole, listRole, deleteRole } from "@/api/common.js";
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
            roleValue: '',
            roleArrParams: {
                roleCode: "",
                roleTypeEnum: "MEDIATOR"
            },
            roleTableParams: {
                pageIndex: 1,
                pageSize: 10,
                roleType: null,
            },
            roleDeletaParams: [],
            roleTableData: [],
            pagebox: {
                totalrows: 0,
                pageIndex: 1,
                pageSize: 10
            },
        }
    },
    created() {
        // this.ApiSearchWorkUserRole()
        this.ApiListRole()
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
                    this.pagebox.totalrows = res.data.data.totalRows
                }
            })
        },
        handleView(row, type) {
            if(type === 'add') {
                this.$router.push({path: `./roleLimits/add`})
            } else {
                this.$router.push({path: `./roleLimits/${row.id}`})
            }
        },
        handleModify(row) {
            this.$router.push({path: `./roleLimits/detail/${row.roleCode}`})
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
        handleSearch() {
            this.ApiListRole()
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
