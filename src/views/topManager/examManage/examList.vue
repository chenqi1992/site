<template>
    <div class="examlist-list">
        <div class="project-header header-bg">
            <div class="bus-header--input">
                试卷名称：  
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="selExamPageListParams.name"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div>
            <!-- <div class="bus-header--input">
                试卷编号：
                <el-input
                    size="medium"
                    class="search-input"
                    v-model="selExamPageListParams.companyId"
                    placeholder="请输入"
                    clearable>
                </el-input>
            </div> -->
            <el-button size="medium" type="primary" @click="handleSearch">搜 索</el-button>
        </div>
        <div class="business-add">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAddexam">新增试卷</el-button>
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleStudy">新增学习材料</el-button>
        </div>
        <div class="business-table">   
            <el-table
                ref="multipleTable"
                :data="selExamPageListData"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column
                label="序号"
                width="120"
                align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(pagebox.pageIndex - 1) * pagebox.pageSize + 1}} </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="id"
                label="试卷编号"
                width="180"
                align="center">
                </el-table-column>
                <el-table-column
                prop="examName"
                label="试卷名称"
                width="320"
                align="center">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="使用场景或试题备注"
                width="350"
                align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button class="btn-action" @click="handleView(scope.row)" type="text">查看</el-button>
                            <el-button class="btn-action" @click="handleModify(scope.row)" type="text">编辑</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <elPages v-if="pagebox" :pagebox="pagebox" :Api="ApiSelExamPageList"></elPages>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
import { selExamPageList } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {
        elPages
    },
    props: {

    },
    data() {
        return {
            selExamPageListParams: {
                companyId: 0,
                pageIndex: 1,
                pageSize: 10,
                name: '',
            },
            selExamPageListData: [],
            pagebox: {
                totalrows: 0,
                pageIndex: 1,
                pageSize: 10
            },
        }
    },
    created() {
        this.ApiSelExamPageList()
    },
    mounted() {

    },
    methods: {
        ApiSelExamPageList() {
            //试题列表
            selExamPageList(this.selExamPageListParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.selExamPageListData = res.data.data.list
                    this.pagebox.totalrows = res.data.data.totalRows
                }
            })
        },
        handleSearch() {
            this.ApiSelExamPageList()
        },
        handleAddexam() {
            this.$router.push({path: './exerciseEdit/addExam'})
        },
        handleStudy() {
            this.$router.push({path: './exerciseEdit/addStudy'})
        },
        handleView(row) {
            this.$router.push({path: `/exerciseEdit/${row.id}`})
        },
        handleModify(row) {
            this.$router.push({path: `/exerciseEdit/detail/${row.id}`})
        }
    }
}
</script>

<style lang="scss">
    @import "@/common/scss/common.scss";
    .examlist-list {
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
