<template>
    <div class="attendance-timeset">
        <div class="business-header">
            <div class="left">
                <div class="bus-header--input">
                    项目名称：
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
            <el-button size="medium" type="primary">搜 索</el-button>
        </div>
        <div class="business-table">   
             <el-table
                ref="multipleTable"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                label="规则名称"
                width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="上班最早"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="上班最晚"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="下班最早"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="下班最晚"
                show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="班次最低工时"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="班次记量(天)"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="中间多打"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                prop="address"
                label="应用项目"
                show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" @click="handleView(scope.row)" type="text">修改</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- <el-pagination
            class="el-pagebox"
            background
            layout="prev, pager, next"
            :total="pagebox.totalrows"
            :current-page.sync="pagebox.currentpage"
            @current-change="handleChangepage"
            >
        </el-pagination> -->
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
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
            multipleSelection: [],
            pagebox: {
                totalrows: 10,
                currentpage: 1,
                pageSize: 10
            },
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        handleView() {
            this.$router.push({path: './equipmentManage'})
        },
        handleModify(row) {
            this.$router.push({path: `./equipmentDetail/${row.id}`})
        },
        handleSwitch() {

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
    .attendance-timeset {
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
        .el-pagebox {
            text-align: right;
        }
    }
</style>