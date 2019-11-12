<template>
    <div class="staffManage-detail">
        <div class="detail-tabs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="个人主页" name="first">
                    <div></div>
                    <div class="project-header">
                        <div class="project-key">姓名：</div>
                        <div class="project-value"><el-input size="medium" class="name_input" placeholder="邓蒋文"></el-input></div>
                    </div>
                    <div class="project-header">
                        <div class="project-key">身份证号：</div>
                        <div class="project-value"><el-input size="medium" class="name_input" placeholder="3504**********13"></el-input></div>
                    </div>
                    <div class="project-header">
                        <div class="project-key">银行卡号：</div>
                        <div class="project-value"><el-input size="medium" class="name_input" placeholder="6225***********6421"></el-input></div>
                    </div>
                    <div class="project-header">
                        <div class="project-key">开户行：</div>
                        <div class="project-value"><el-input size="medium" class="name_input" placeholder="招商银行鹭江支行"></el-input></div>
                    </div>
                    <div class="project-header">
                        <div class="project-key">手机号：</div>
                        <div class="project-value"><el-input size="medium" class="name_input" placeholder="15959256421"></el-input></div>
                    </div>
                    <div class =“personal-border”>
                        <div class="project-header">
                            <div class="project-key">紧急联系人：</div>
                            <div class="project-value"><el-input size="medium" class="name_input" placeholder="杨火群"></el-input></div>
                        </div>
                        <div class="project-header">
                            <div class="project-key">联系人关系：</div>
                            <div class="project-value"><el-input size="medium" class="name_input" placeholder="配偶"></el-input></div>
                        </div>
                        <div class="project-header">
                            <div class="project-key">联系人电话：</div>
                            <div class="project-value"><el-input size="medium" class="name_input" placeholder="13774899930"></el-input></div>
                        </div>
                    </div>    
                    <div class =“personal-border”>
                        <div class="project-header">
                            <div class="project-key">职位：</div>
                            <div class="project-value"><el-input size="medium" class="name_input" placeholder="项目经理"></el-input></div>
                        </div>
                        <div class="project-header">
                            <div class="project-key">岗位：</div>
                            <div class="project-value"><el-input size="medium" class="name_input" placeholder="项目工程部"></el-input></div>
                        </div>
                        <div class="project-header">
                            <div class="project-key">文化程度：</div>
                            <div class="project-value"><el-input size="medium" class="name_input" placeholder="大专"></el-input></div>
                        </div>
                        <div class="project-header">
                            <div class="project-key">籍贯：</div>
                            <div class="project-value"><el-input size="medium" class="name_input" placeholder="福建"></el-input></div>
                        </div>
                    </div>
                    <div class="project-header">
                        <div class="project-key">评价信息：</div>
                        <div class="all-datas">获得评价10条（系统自评8条），评价平均得分3.8颗星，低于平台人均（4.5颗星），低于1颗星评价1次</div>
                    </div>
                    <div class="business-add">
                    <el-button size="medium" type="primary" >添加评价</el-button>
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                            width="5">
                            </el-table-column>
                            <el-table-column
                            label="序号"
                            width="120">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column
                            prop="projectTime"
                            label="项目时间"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="content"
                            label="评价内容"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="attachPic"
                            label="附件图片">
                            </el-table-column>
                            <el-table-column
                            prop="commitLevel"
                            label="评价级别"
                            >
                            </el-table-column>
                        
                            
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="项目信息" name="second">
                    <div class="project-header">
                        <div class="project-key">归属项目：</div>
                        <div class="project-value"><el-input size="medium" class="name_input" placeholder="厦门地铁"></el-input></div>
                    </div>
                    <div class="project-header">
                        <div class="project-key">归属班组：</div>
                        <div class="project-value"><el-input size="medium" class="name_input" placeholder="厦门地铁1部"></el-input></div>
                    </div>
                    <div class="project-header">
                        <div class="project-key">岗位：</div>
                        <div class="project-value"><el-input size="medium" class="name_input" placeholder="项目组长"></el-input></div>
                    </div>
                    <div class="project-header">
                        <div class="project-key">班组组长：</div>
                        <div class="project-value"><el-input size="medium" class="name_input" placeholder="邓将文"></el-input></div>
                    </div>
                    <div class="title">考试情况</div>
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
                        >
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="examName"
                        label="考试名称"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="startTime"
                        label="考试开始时间"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="endTime"
                        label="考试结束时间"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="status"
                        label="考试状态"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="result"
                        label="考试">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <div>
                                    <el-button class="btn-action" @click="handleModify(scope.row)" type="text">去参与</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="人事信息" name="third">
                    <div class="project-header">
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
                        <div class="bus-header--input">
                            状态：
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
                            工作日：
                            <el-select size="medium" v-model="businessStatus" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <el-button size="medium" type="primary">查询</el-button>
                    </div>
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
                        >
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="attendStartTime"
                        label="打卡日期"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="startTime01"
                        label="打卡1"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="startTime02"
                        label="打卡2"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="startTime03"
                        label="打卡3"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="startTime04"
                        label="打卡4">
                        </el-table-column>
                        <el-table-column
                        prop="startTime05"
                        label="打卡5">
                        </el-table-column>
                        <el-table-column
                        prop="startTime06"
                        label="打卡6">
                        </el-table-column>
                        <el-table-column
                        prop="finallyTime"
                        label="最晚卡">
                        </el-table-column> 
                        <el-table-column
                        prop="attendanceStatus"
                        label="状态">
                        </el-table-column> 
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="工资数据" name="fourth">
                <div class="project-header">
                        <div class="project-header">
                            工资结算方式：
                            <el-select size="medium" v-model="businessStatus" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="project-header">
                            工资金额：
                            <el-input size="medium" class="name_input" placeholder="项目工程部"></el-input>
                            <div>元/日</div>
                        </div>  
                </div>
                </el-tab-pane>
                <el-tab-pane label="合同管理" name="fiveth">
                <div class="project-header">
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
                        >
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="contractName"
                        label="合同名称"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="effectTime"
                        label="生效时间"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="dueTime"
                        label="到期时间"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="uploadTime"
                        label="文档时间"
                        >
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <div>
                                    <el-button class="btn-action" @click="handleModify(scope.row)" type="text">请上传</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                </el-tab-pane>
            </el-tabs>
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
            smsForm: {},
            rules: {},
            a: '',
            b: '',
            c: '',
            d: '',
            e: '',
            f: '',
            g: '',
            h: '',
            activeName: 'second',
            tableData: [{
            date: '01',
            examName: '安全风险守则',
            startTime: '2015-10-19 14:30',
            endTime:'2015-10-19 17:00',
            status:'未通过',
            result:'未参与',
            projectTime:'2012年左右',
            content:'巴拉巴巴拉巴拉小魔仙',
            attachPic:'无图片',
            commitLevel:'一颗星',
            attendStartTime:'2019-11-01',
            startTime05:'08:30',
            startTime06:'18:30',
            finallyTime:'18:30',
            attendanceStatus:'正常',
            contractName:'第三方签订协议合同',
            effectTime:'2015-05-09 15:30',
            dueTime:'2016-05-09 15:30',
            uploadTime:'2017-05-09 15:32'
            }, {
            date: '02',
            examName: '安全风险守则',
            startTime: '2015-10-19 14:30',
            endTime:'2015-10-19 17:00',
            status:'未通过',
            result:'未参与',
            projectTime:'2013~2015年',
            content:'巴拉巴巴拉巴拉小魔仙',
            attachPic:'无图片',
            commitLevel:'两颗星',
            attendStartTime:'2019-11-01',
            startTime05:'08:30',
            startTime06:'18:30',
            finallyTime:'18:30',
            attendanceStatus:'正常',
            contractName:'第三方签订协议合同',
            effectTime:'2015-05-09 15:30',
            dueTime:'2016-05-09 15:30',
            uploadTime:'2017-05-09 15:32'            
            }, {
            date: '03',
            examName: '安全风险守则',
            startTime: '2015-10-19 14:30',
            endTime:'2015-10-19 17:00',
            status:'未通过',
            result:'未参与',
            projectTime:'2013~2015年',
            content:'巴拉巴巴拉巴拉小魔仙',
            attachPic:'无图片',
            commitLevel:'三颗星',
            attendStartTime:'2019-11-01',
            startTime05:'08:30',
            startTime06:'18:30',
            finallyTime:'18:30',
            attendanceStatus:'正常',
            contractName:'第三方签订协议合同',
            effectTime:'2015-05-09 15:30',
            dueTime:'2016-05-09 15:30',
            uploadTime:'2017-05-09 15:32'

            }, {
            date: '04',
            examName: '安全风险守则',
            startTime: '2015-10-19 14:30',
            endTime:'2015-10-19 17:00',
            status:'未通过',
            result:'未参与',
            projectTime:'2013~2015年',            
            content:'巴拉巴巴拉巴拉小魔仙',
            attachPic:'无图片',
            commitLevel:'四颗星',
            attendStartTime:'2019-11-01',
            startTime05:'08:30',
            startTime06:'18:30',
            finallyTime:'18:30',
            attendanceStatus:'正常',
            contractName:'第三方签订协议合同',
            effectTime:'2015-05-09 15:30',
            dueTime:'2016-05-09 15:30',
            uploadTime:'2017-05-09 15:32'                        
            }, {
            date: '05',
            examName: '安全风险守则',
            startTime: '2015-10-19 14:30',
            endTime:'2015-10-19 17:00',
            status:'未通过',
            result:'未参与',
            projectTime:'2013~2015年',            
            content:'巴拉巴巴拉巴拉小魔仙',
            attachPic:'无图片',
            commitLevel:'一颗星',
            attendStartTime:'2019-11-01',
            startTime05:'08:30',
            startTime06:'18:30',
            finallyTime:'18:30',
            attendanceStatus:'正常',
            contractName:'第三方签订协议合同',
            effectTime:'2015-05-09 15:30',
            dueTime:'2016-05-09 15:30',
            uploadTime:'2017-05-09 15:32'                                    
            }, {
            date: '06',
            examName: '安全风险守则',
            startTime: '2015-10-19 14:30',
            endTime:'2015-10-19 17:00',
            status:'未通过',
            result:'未参与',
            projectTime:'2013~2015年',  
            content:'巴拉巴巴拉巴拉小魔仙',
            attachPic:'无图片',
            commitLevel:'一颗星',
            attendStartTime:'2019-11-01',
            startTime05:'08:30',
            startTime06:'18:30',
            finallyTime:'18:30',
            attendanceStatus:'正常',
            contractName:'第三方签订协议合同',
            effectTime:'2015-05-09 15:30',
            dueTime:'2016-05-09 15:30',
            uploadTime:'2017-05-09 15:32'                                    
            }, {
            date: '07',
            examName: '安全风险守则',
            startTime: '2015-10-19 14:30',
            endTime:'2015-10-19 17:00',
            status:'未通过',
            result:'未参与',
            projectTime:'2013~2015年',            
            content:'巴拉巴巴拉巴拉小魔仙',
            attachPic:'无图片',
            commitLevel:'一颗星',
            attendStartTime:'2019-11-01',
            startTime05:'08:30',
            startTime06:'18:30',
            finallyTime:'18:30',
            attendanceStatus:'正常',
            contractName:'第三方签订协议合同',
            effectTime:'2015-05-09 15:30',
            dueTime:'2016-05-09 15:30',
            uploadTime:'2017-05-09 15:32'                                    
            }],
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>

<style lang="scss">
    .staffManage-detail {
        padding: 20px;
        background-color: #ffffff;

        .detail-tabs {
            display: flex;
            width:1136px;
            height:1067px;
            background:rgba(255,255,255,1);
            border-radius:2px;
            .project-header {
                    display: flex;
                    }
                .project-key{
                    width:70px;
                    height:22px;
                    font-size:14px;
                    font-family:PingFangSC-Regular,PingFang SC;
                    font-weight:400;
                    color:rgba(0,0,0,0.85);
                    line-height:22px;
                }
                .title{
                    width:64px;
                    height:24px;
                    font-size:16px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(0,0,0,0.85);
                    line-height:24px;
                }
        }
        .detail-form {
            padding: 24px 0;
            .el-form {
                .form {
                    display: flex;
                    .el-form-item {
                        margin-right: 90px;
                    }
                    .el-form-item:nth-child(1) {
                        .el-form-item__label {
                            width: 100px!important;
                        }
                        .el-form-item__content {
                            margin-left: 100px!important;
                        }
                    }
                }
                .el-form-item {
                    width: 35%;
                }
            }
        }
        .detail-infobus {
            h1 {
                padding: 15px 0;
            }
        }
    }
</style>
