<template>
    <div class="visitor-information">
        <div class="header">
            <h1>基本信息</h1>
            <div v-show="!btnshow">
                <el-button size="medium" @click="btnshow = true">取消</el-button>
                <el-button size="medium" type="primary" @click="handleSave">保存</el-button>
            </div>
            <el-button v-show="btnshow" size="medium" type="primary" @click="btnshow = false">编辑</el-button>
        </div>
        <div class="content">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" :disabled="btnshow">
                <el-form-item label="访客姓名：">
                    <el-input size="medium" v-model="ruleForm.visitName"></el-input>
                </el-form-item>
                <el-form-item label="审核状态：">
                    <el-select v-model="ruleForm.auditStatus" placeholder="请选择活动区域">
                        <el-option label="已通过" value="PASS"></el-option>
                        <el-option label="未通过" value="FAIL"></el-option>
                        <el-option label="待审核" value="WAIT"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="登记时间：">
                    <el-date-picker type="date" placeholder="登记时间" v-model="ruleForm.createTime"></el-date-picker>
                </el-form-item>
                <el-form-item label="到访时间：">
                    <el-date-picker type="date" placeholder="到访时间" v-model="ruleForm.visitTime"></el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <h1>访客详细名单</h1>
            <div>
                <el-table
                    ref="multipleTable"
                    :data="queryProjectVisitPersonData"
                    tooltip-effect="dark"
                    :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                    style="width: 100%"
                    >
                    <el-table-column
                    prop="visitId"
                    label="组内序号"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="userName"
                    label="姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="imageInfoOne"
                    label="照片1"
                    sortable
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="imageInfoTwo"
                    label="照片2"
                    sortable
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="imageInfoThree"
                    label="照片3"
                    sortable
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="auditStatus"
                    label="状态"
                    show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div v-if="scope.row.auditStatus === 'PASS'">已通过</div>
                            <div v-if="scope.row.auditStatus === 'FAIL'">未通过</div>
                            <div v-if="scope.row.auditStatus === 'WAIT'">待审核</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <div>
                                <el-button class="btn-action" @click="handleModify(scope.row)" type="text">修改</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <elPages></elPages>
            </div>
            <el-dialog
                class="add-staff"
                title="修改审核状态"
                :visible.sync="dialogVisible"
                width="35%"
                >
                <el-form :model="ruleFormVisit" :rules="rulesVisit" ref="ruleFormVisit" label-width="140px" class="demo-ruleForm">
                    <el-form-item label="访客名称">
                        <el-input v-model="ruleFormVisit.visitName" placeholder="请选择设备"></el-input>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="ruleForm.auditStatus" placeholder="请选择活动区域">
                            <el-option label="已通过" value="PASS"></el-option>
                            <el-option label="未通过" value="FAIL"></el-option>
                            <el-option label="待审核" value="WAIT"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="medium" type="primary" @click="handleSub('ruleFormVisit')">提 交</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { queryProjectVisitPerson, auditProjectVisitPerson, getProjectVisitInfo, editProjectVisitInfo, auditProjectVisitInfo } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {
        elPages
    },
    props: {

    },
    data() {
        return {
            dialogVisible: false,
            getProjectVisitInfoParams: {
                id: Number(this.$route.params.id)
            },
            getProjectVisitInfoData: {},
            queryProjectVisitPersonParams: {
                pageIndex: 1,
                pageSize: 10,
                // visitId: 10086
            },
            queryProjectVisitPersonData: [],
            ruleForm: {},
            ruleFormVisit: {
                visitName: '',
                auditStatus: '',
                id: ''
            },
            btnshow: false,
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
        if(this.$route.path.indexOf('detail') > 0) {
            this.btnshow = false
        } else {
            this.btnshow = true
        } 
        this.ApiGetProjectVisitInfo()
    },
    mounted() {

    },
    methods: {
        ApiGetProjectVisitInfo() {
            //访客访问信息详情
            getProjectVisitInfo(this.getProjectVisitInfoParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.getProjectVisitInfoData = res.data.data
                    this.ruleForm = res.data.data
                }
            })
        },
        ApiQueryProjectVisitPerson() {
            //访客详情访客列表
            queryProjectVisitPerson(this.queryProjectVisitPersonParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.queryProjectVisitPersonData = res.data.data
                }
            })
        },  
        handleSave() {
            //编辑
            editProjectVisitInfo(this.ruleForm).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                }
            })
        },
        handleModify(row) {
            this.dialogVisible = true
        },
        handleSub() {
            //修改审核状态
            auditProjectVisitPerson(this.ruleFormVisit).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .visitor-information {
        padding: 0 30px 24px;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            color: #000;
            font-size: 16px;
            border-bottom: 1px solid rgba(233,233,233,1);
        }
        .content {
            width: 50%;
            padding: 24px 0;
        }
    }
</style>
