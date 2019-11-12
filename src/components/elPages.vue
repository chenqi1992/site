<template>
    <div class="el-pages">
        <el-pagination
            class="el-pagebox"
            background
            layout="prev, pager, next"
            :total="pagebox.totalrows"
            :current-page.sync="pagebox.currentpage"
            :page-size="pagebox.pageSize"
            @current-change="handleChangepage"
            >
        </el-pagination>
        <!-- <el-pagination
            class="el-pagebox"
            background
            @size-change="handleSizeChange"
            @current-change="handleChangepage"
            :current-page.sync="pagebox.currentpage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination> -->
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {
        pagebox: {
            type: Object
        }
    },
    data() {
        return {
            // pagebox: {
            //     totalrows: 10,
            //     currentpage: 1,
            //     pageSize: 10
            // }
        }
    },
    created() {
        console.log(this.pagebox);
    },
    mounted() {

    },
    methods: {
        handleChangepage() {

        },
        handleSizeChange() {

        }
    }
}
</script>

<style lang="scss">
    .el-pages {
        text-align: right;
        padding: 20px 0;
        .el-pagination.is-background .el-pager li {
            border-radius: 6px;
        }
    }
</style>
