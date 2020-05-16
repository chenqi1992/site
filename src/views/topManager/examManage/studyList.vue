<template>
    <div class="agreement-list">
        <div class="project-header header-bg">
            <div class="left">
                <div class="bus-header--input">
                    学习内容：  
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="queryExamReportParams.examName"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
                <div class="bus-header--input">
                    记录时间：
                    <el-date-picker
                        size="medium"
                        v-model="businessTime"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="bus-header--input">
                    上传人：
                    <el-input
                        size="medium"
                        class="search-input"
                        v-model="queryExamReportParams.projectName"
                        placeholder="请输入"
                        clearable>
                    </el-input>
                </div>
            </div>
            <div>
                <el-button size="medium" type="primary" @click="handleSearch">搜 索</el-button>
            </div>
        </div>
        <div class="business-table">   
            <el-table
                ref="multipleTable"
                :data="queryExamReportData"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                label="序号"
                align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(pagebox.pageIndex - 1) * pagebox.pageSize + 1}} </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="记录时间"
                :formatter="formatime"
                align="center">
                </el-table-column>
                <el-table-column
                prop="examUser"
                label="用户"
                align="center">
                </el-table-column>
                <el-table-column
                prop="examName"
                label="学习内容"
                align="center">
                </el-table-column>
                 <el-table-column
                prop="examResult"
                label="状态"
                align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" @click="handleView(scope.row)" type="text">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                title="图片"
                :visible.sync="dialogVisibleIMG"
                width="30%"
                :before-close="handleCloseIMG">
                <img v-for="(item, index) in thisIMG" :key="index" style="display: block; margin: 0 auto; width: 400px; height:400px;" :src="item" alt="">
            </el-dialog>
            <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiqueryExamReport"></elPages>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import {relative} from "@/common/js/mixins.js";
import { queryExamReport, queryExamReportImage } from "@/api/common.js";
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
            queryExamReportParams: {
                examName: "",
                projectName: "",
                startTime: "",
                endTime: ""
            },
            businessTime: '',
            queryExamReportData: [],
            pagebox: {
                totalrows: 0,
                pageIndex: 1,
                pageSize: 10
            },
            dialogVisibleIMG: false,
            thisIMG: ''
        }
    },
    created() {
        this.ApiqueryExamReport()
    },
    mounted() {

    },
    methods: {
        ApiqueryExamReport() {
            //试题列表
            this.queryExamReportParams.startTime = this.businessTime ? this.businessTime[0] : ''
            this.queryExamReportParams.endTime = this.businessTime ? this.businessTime[1] : ''
            queryExamReport(Object.assign(this.queryExamReportParams, this.pagebox)).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.queryExamReportData = res.data.data.list
                    this.pagebox.totalrows = res.data.data.totalRows
                }
            })
        },
        ApiqueryExamReportImage(id) {
            //查看图片
            queryExamReportImage({id: id}).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.dialogVisibleIMG = true
                    console.log(res.data.data);
                    this.thisIMG = JSON.parse(res.data.data.imageInfo)
                }
            })
        },
        handleSearch() {
            this.ApiqueryExamReport()
        },
        handleCloseIMG() {
            this.dialogVisibleIMG = false
        },
        handleView(row) {
            this.ApiqueryExamReportImage(row.id)
        }
    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .agreement-list {
        padding: 24px 30px;
        .project-header {
            background-color: #ffffff;
            .left {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 20px;
            }
            .bus-header--input {
                margin-right: 24px;
                margin-bottom: 20px;
                .el-input {
                    width: 224px;
                }
            }
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
