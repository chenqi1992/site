<template>
    <div class="salary-index">
        <div class="project-header header-bg">
            <div class="left">
                <div class="bus-header--input">
                    所属项目：
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
                    所属班组：
                    <el-input
                        size="medium"    
                        class="search-input"
                        v-model="businessValue"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="bus-header--input">
                    姓名：
                    <el-select size="medium" v-model="businessStatus" placeholder="请输入">
                        <el-option
                        v-for="item in options"
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
                        v-model="businessTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <el-button size="medium" type="primary">按钮</el-button>
            </div>
        </div>
        <div class="business-add">
            <el-button size="medium" type="primary">发送核对</el-button>
            <div class="all-data">共搜索到 922 条数据</div>
        </div>
        <div class="business-table">   
            <div class="table-title">
                <img class="el-icon-info" src="../../../assets/businessManage/！@2x.png" alt="">
                <span>已选择 4 项</span>
                <span>总计：1000人</span>
                <span>薪资总额：20,008,090.99元</span>
                <div class="clear">清空</div>
            </div>
             <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="序号"
                width="60">
                <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="80">
                </el-table-column>
                <el-table-column
                prop="projectName"
                label="项目"
                width="180">
                </el-table-column>
                <el-table-column
                prop="projectGroup"
                label="项目组"
                width="120">
                </el-table-column>
                <el-table-column
                prop="attendanceDay"
                label="出勤天数(天)"
                width="120">
                </el-table-column>
                <el-table-column
                prop="dailySalary"
                label="日薪(元/日)"
                width="120">
                </el-table-column>
                <el-table-column
                prop="salary"
                label="薪资(元)"
                width="80">
                </el-table-column>
                <el-table-column
                prop="period"
                label="工期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="checkOrNot"
                label="是否核对"
                width="80">
                </el-table-column>
                <el-table-column
                prop="checkResult"
                label="核对结果"
                width="80">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" @click="handleModify(scope.row)" type="text">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button> -->
            </div>
        </div>
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
                date: '01',
                name: '张三寨',
                projectName: '海沧隧道1号建筑工地',
                projectGroup:'泥水工组',
                attendanceDay:'20',
                dailySalary:'300',
                salary:'3456.78',
                period:'2019-07-01至2019-07-31',
                checkOrNot:'是',
                checkResult:'已确认'
                }, {
                date: '02',
                name: 'EasonLi',
                projectName: '海沧隧道1号建筑工地',
                projectGroup:'泥水工组',
                attendanceDay:'20',
                dailySalary:'300',
                salary:'3456.78',
                period:'2019-07-01至2019-07-31',
                checkOrNot:'是',
                checkResult:'已确认'
                }, {
                date: '03',
                name: '陈四平',
                projectName: '海沧隧道1号建筑工地',
                projectGroup:'泥水工组',
                attendanceDay:'20',
                dailySalary:'300',
                salary:'3456.78',
                period:'2019-07-01至2019-07-31',
                checkOrNot:'是',
                checkResult:'已确认'
                }, {
                date: '04',
                name: '胡老六',
                projectName: '海沧隧道1号建筑工地',
                projectGroup:'泥水工组',
                attendanceDay:'20',
                dailySalary:'300',
                salary:'3456.78',
                period:'2019-07-01至2019-07-31',
                checkOrNot:'是',
                checkResult:'已确认'
                }, {
                date: '05',
                name: '黄尚',
                projectName: '海沧隧道1号建筑工地',
                projectGroup:'泥水工组',
                attendanceDay:'20',
                dailySalary:'300',
                salary:'3456.78',
                period:'2019-07-01至2019-07-31',
                checkOrNot:'是',
                checkResult:'已确认'
                }, {
                date: '06',
                name: '上官生擒',
                projectName: '海沧隧道1号建筑工地',
                projectGroup:'泥水工组',
                attendanceDay:'20',
                dailySalary:'300',
                salary:'3456.78',
                period:'2019-07-01至2019-07-31',
                checkOrNot:'是',
                checkResult:'已确认'
                }, {
                date: '07',
                name: '张三疯',
                projectName: '海沧隧道1号建筑工地',
                projectGroup:'泥水工组',
                attendanceDay:'20',
                dailySalary:'300',
                salary:'3456.78',
                period:'2019-07-01至2019-07-31',
                checkOrNot:'是',
                checkResult:'已确认'
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

    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .salary-index {
        padding: 24px 30px;
        .project-header {
            .left {
                display: flex;
                flex-wrap: wrap;
                .bus-header--input {
                    margin: 0 24px 12px 0;
                    .el-input {
                        width: 224px;
                        .el-input__inner {
                            // height: 32px;
                        }
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
