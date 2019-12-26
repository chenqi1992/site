<template>
    <div class="exam-index">
        <div class="project-header header-bg">
            <div class="bus-header--input">
                任务名称：
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="selTaskPageListParams.taskName"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div>
            <div><el-button size="medium" type="primary">搜 索</el-button></div>
        </div>
        <div class="business-add">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAddExam">新增考试任务</el-button>
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAddStudy">新增学习任务</el-button>
        </div>
        <div class="business-table">   
            <el-table
                ref="multipleTable"
                :data="selTaskPageListData"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                label="序号"
                align="center"
                >
                    <template slot-scope="scope">
                        <span>{{scope.$index+(pagebox.pageIndex - 1) * pagebox.pageSize + 1}} </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="taskName"
                label="任务名称"
                align="center">
                </el-table-column>
                <el-table-column
                prop="releaseStatus"
                label="是否发布"
                align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.releaseStatus === '0'">未发布</div>
                        <div v-if="scope.row.releaseStatus === '1'">已发布</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                :formatter="formatime"
                label="发布时间"
                align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" v-if="scope.row.releaseStatus === '0'" @click="handleReleaseStatus(scope.row)" type="text">发布</el-button>
                            <el-button class="btn-action" v-if="scope.row.releaseStatus === '1'" type="text">已发布</el-button>
                            <el-button class="btn-action" @click="handleEdit(scope.row)" type="text">编辑</el-button>
                            <el-button class="btn-action" v-if="scope.row.releaseStatus === '1'" @click="handleCompletion(scope.row)" type="text">完成情况</el-button>
                            <el-button class="btn-action" @click="handleView(scope.row)" type="text">查看</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiSelTaskPageList"></elPages>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import {relative} from "@/common/js/mixins.js";
import { selTaskPageList, taskRelease } from "@/api/common.js";
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
            selTaskPageListParams: {
                id: null,
                taskName: '',
                projectId: null,
            },
            selTaskPageListData: [],
            pagebox: {
                totalrows: 10,
                pageIndex: 1,
                pageSize: 10
            },
        }
    },
    created() {
        this.ApiSelTaskPageList()
    },
    mounted() {

    },
    methods: {
        ApiSelTaskPageList() {
            //任务列表
            selTaskPageList(Object.assign(this.selTaskPageListParams, this.pagebox)).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selTaskPageListData = res.data.data.list
                    this.pagebox.totalrows = res.data.data.totalRows
                }
            })
        },
        handleReleaseStatus(row) {
            //发布任务
            taskRelease({taskId: row.id}).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.$message({
                        message: '发布成功',
                        type: 'success'
                    });
                    this.ApiSelTaskPageList()
                } else {
                    this.$message.error(res.data.message);
                }
            })        
        },
        handleEdit() {
            this.$router.push({path: `/taskDetail/addExam`})
        },
        handleCompletion(row) {
            this.$router.push({path: `/examManageToEdit/${row.id}`})
        },
        handleView(row) {
            this.$router.push({path: `/examManageToEdit/detail/${row.id}`})
        }
    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .exam-index {
        padding: 24px 30px;
        .project-header {
            .bus-header--input {
                margin-right: 24px;
                .el-input {
                    width: 224px;
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
