<template>
    <div class="welfare-config">
        <el-button size="medium" class="project-button" type="primary">添加新福利</el-button>
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
            prop="welfareName"
            label="福利名称"
            width="80">
            </el-table-column>
            <el-table-column
            prop="sumMoney"
            label="金额(元)"
            width="120">
            </el-table-column>
            <el-table-column
            prop="unit"
            label="单位"
            width="120">
            </el-table-column>
            <el-table-column
            prop="result"
            label="工资生成时勾选"
            >
            </el-table-column>
            <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
                <div>
                    <el-button class="btn-action" @click="handleModify(scope.row)" type="text">编辑</el-button>
                </div>
            </template>
            </el-table-column>
        </el-table>
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
                welfareName: '高温补贴',
                sumMoney: '10.00',
                unit:'天/人',
                result:'是'
                }, {
                date: '02',
                welfareName: '饭补',
                sumMoney: '10.00',
                unit:'天/人',
                result:'是'
                }, {
                date: '03',
                welfareName: '过节费',
                sumMoney: '300.00',
                unit:'人',
                result:'是'
                }, {
                date: '04',
                welfareName: '高温补贴',
                sumMoney: '10.00',
                unit:'天/人',
                result:'是'
                }, {
                date: '05',
                welfareName: '高温补贴',
                sumMoney: '10.00',
                unit:'天/人',
                result:'是'
                }, {
                date: '06',
                welfareName: '高温补贴',
                sumMoney: '10.00',
                unit:'天/人',
                result:'是'
                }, {
                date: '07',
                welfareName: '高温补贴',
                sumMoney: '10.00',
                unit:'天/人',
                result:'是'
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
    .welfare-config {
        padding: 24px 30px;
        .project-button{
        display: flex;    
        }
    }
</style>
