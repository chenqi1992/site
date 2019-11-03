<template>
    <div class="salary-detail">
        <div class="project-header">
            <div class="bus-header--input">
                <div class="salary-title">基本信息</div>
                <div class="project-header">
                    <div class="project-header">
                        <div class="employee-name">姓名：</div>
                        <div class="emloyee-name"><el-input size="medium" class="name_input" placeholder="请输入"></el-input></div>
                    </div>
                    <div class="project-header">
                        <div class="employee-other">银行卡号：</div>
                        <div class="emloyee-other"><el-input size="medium" class="card_input" placeholder="请输入"></el-input></div>
                    </div>
                </div>
                <div class="project-header">
                    <div class="project-header">
                        <div class="employee-other">出勤天数：</div>
                        <div class="emloyee-other"><el-input class="attdanceDay_input" placeholder="请输入"></el-input></div>
                    </div>
                    <div class="project-header">
                        <div class="employee-other">开户银行：</div>
                        <div class="emloyee-other"><el-input class="bank_input" placeholder="请输入"></el-input></div>
                    </div>
                </div>               
                <div class="project-header">
                    <div class="project-header">
                        <div class="employee-other">工资总计：</div>
                        <div class="emloyee-other"><el-input size="medium" class="salary_input" placeholder="请输入"></el-input></div>
                    </div>
                    <div class="project-header">
                        <div class="employee-other">支行信息：</div>
                        <div class="emloyee-other"><el-input size="medium" class="branch_information_input" placeholder="请输入"></el-input></div>
                    </div>
                </div>         

                <div class="salary-title">工资详情</div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange">
                    <!-- <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column> -->
                    <el-table-column
                    label="序号"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="salaryProject"
                    label="工资项"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="unit"
                    label="单位"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="day"
                    label="天数"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="number"
                    label="人数"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="sum"
                    label="共计(元)">
                    </el-table-column>
                </el-table>
                <div class="project-header project-headers">
                    <div class="salary-finally">其他补充项</div>
                    <el-button size="medium" type="primary">添加事项</el-button> 
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <!-- <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column> -->
                    <el-table-column
                    label="序号"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="itemName"
                    label="事项名称"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="money"
                    label="金额(元)"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="itemAction"
                    label="事项"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="remark"
                    label="备注(限50字)"
                    >
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" @click="handleModify(scope.row)" type="text">编辑</el-button>
                            <el-button class="btn-action" @click="handleDelete(scope.row)" type="text">删除</el-button>
                        </div>
                    </template>
                    </el-table-column>
                </el-table>


            
                   
            
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
                salaryProject: '工资',
                sumMoney: '300.00',
                unit:'天/人',
                day:'20',
                number:'1',
                sum:'6000.00',
                itemName:"优秀员工奖励",
                money:"2000.00",
                itemAction:"增加",
                remark:"获得第二季度团队优秀员工荣誉称号，特给予奖励2000元"
                }, {
                date: '02',
                salaryProject: '岗位补贴',
                sumMoney: '200.00',
                unit:'人',
                day:'20',
                number:'1',
                sum:'400.00',
                itemName:"违规操作损坏设备",
                money:"300.00",
                itemAction:"扣减",
                remark:"违规操作损坏设备"
                }, {
                date: '03',
                salaryProject: '过节费',
                sumMoney: '20.00',
                unit:'人',
                day:'20',
                number:'1',
                sum:'400.00',
                itemName:"优秀员工奖励",
                money:"2000.00",
                itemAction:"增加",
                remark:"获得第三季度团队优秀员工荣誉称号，特给予奖励2000元"
                }, {
                date: '04',
                salaryProject: '中秋博饼',
                sumMoney: '200.00',
                unit:'人',
                day:'20',
                number:'1',
                sum:'400.00',
                itemName:"优秀员工奖励",
                money:"2000.00",
                itemAction:"增加",
                remark:"获得第四季度团队优秀员工荣誉称号，特给予奖励2000元"
                }, {
                date: '05',
                salaryProject: '加班餐补',
                sumMoney: '20.00',
                unit:'天/人',
                day:'20',
                number:'1',
                sum:'400.00',
                itemName:"违规操作损坏设备",
                money:"300.00",
                itemAction:"扣减",
                remark:"违规操作损坏设备"
                }, {
                date: '06',
                salaryProject: '体检补贴',
                sumMoney: '20.00',
                unit:'天/人',
                day:'20',
                number:'1',
                sum:'400.00',
                itemName:"违规操作损坏设备",
                money:"300.00",
                itemAction:"扣减",
                remark:"违规操作损坏设备"
                }, {
                date: '07',
                salaryProject: '高温补贴',
                sumMoney: '20.00',
                unit:'天/人',
                day:'20',
                number:'1',
                sum:'400.00',
                itemName:"优秀员工奖励",
                money:"2000.00",
                itemAction:"增加",
                remark:"获得第一季度团队优秀员工荣誉称号，特给予奖励2000元"
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
    .salary-detail {
        padding: 24px 30px;
        .project-header {
            .bus-header--input {
                width:1136px;
                height:1067px;
                background:rgba(255,255,255,1);
                border-radius:2px;
                .salary-title {
                    width:64px;
                    height:24px;
                    font-size:16px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(0,0,0,0.85);
                    line-height:24px;
                .salary-finally{
                    width:80px;
                    height:24px;
                    font-size:16px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(0,0,0,0.85);
                    line-height:24px;
                }   
                    .employee-name{
                        width:42px;
                        height:22px;
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(0,0,0,0.85);
                        line-height:22px;
                    }
                    .employee-other{
                        width:70px;
                        height:22px;
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(0,0,0,0.85);
                        line-height:22px;
                    }
                    .attendanceDay_input{
                        width:36px;
                        height:22px;
                        font-size:14px;
                        font-family:PingFang-SC-Bold,PingFang-SC;
                        font-weight:bold;
                        color:rgba(0,0,0,0.65);
                        line-height:22px;
                    }
                    .card_input{
                        width:149px;
                        height:22px;
                        font-size:14px;
                        font-family:PingFang-SC-Bold,PingFang-SC;
                        font-weight:bold;
                        color:rgba(0,0,0,0.65);
                        line-height:22px;
                    }
                    .card_input{
                        width:149px;
                        height:22px;
                        font-size:14px;
                        font-family:PingFang-SC-Bold,PingFang-SC;
                        font-weight:bold;
                        color:rgba(0,0,0,0.65);
                        line-height:22px;
                    }
                    .bank_input{
                        width:56px;
                        height:22px;
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(0,0,0,0.65);
                        line-height:22px;
                    }
                    .salary_input{
                        width:53px;
                        height:22px;
                        font-size:14px;
                        font-family:PingFang-SC-Bold,PingFang-SC;
                        font-weight:bold;
                        color:rgba(0,0,0,0.65);
                        line-height:22px;
                    }
                    .branch_information_input{
                        width:84px;
                        height:22px;
                        font-size:14px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(0,0,0,0.65);
                        line-height:22px;
                    }
                    .el-input__inner {
                        height: 32px;

                    }
                }
            }
        }
        .project-headers {
            justify-content: space-between;
            align-items: center;
        }
        .business-add {
            display: flex;
            // padding: 20px 0;
            width:88px;
            height:32px;
            background:rgba(24,144,255,1);
            border-radius:4px;
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
