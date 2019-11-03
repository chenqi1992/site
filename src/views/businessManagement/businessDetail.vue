<template>
    <div class="business-detail">
        <div class="detail-header">
            <span>企业基本信息</span>
            <el-button size="medium" type="primary">编辑</el-button>
            <div>
                <el-button size="medium" plain>取消</el-button>
                <el-button size="medium" type="primary">保存</el-button>
            </div>
        </div>
        <div class="detail-form">
            <el-form :model="smsForm" status-icon :rules="rules" ref="smsForm" label-width="150px" class="smsConfig-ruleForm">
                <div class="form">
                    <el-form-item :prop="a" label="公司名称：">
                        <el-input size="medium" v-model="a"></el-input>
                    </el-form-item>
                    <el-form-item :prop="b" label="社会统一信用编码：">
                        <el-input size="medium" v-model="b"></el-input>
                    </el-form-item>
                </div>
                <div class="form">
                    <el-form-item :prop="c" label="联系人姓名：">
                        <el-input size="medium" v-model="c"></el-input>
                    </el-form-item>
                    <el-form-item :prop="d" label="联系人手机：">
                        <el-input size="medium" v-model="d"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="detail-upload">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        <div class="detail-infobus">
            <h1>业务信息</h1>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="项目信息" name="first">
                    <el-table
                        class="table-site"
                        ref="multipleTable"
                        :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        label="项目ID"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="项目名称"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="负责人"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="项目地址"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="设备数"
                        sortable
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="项目员工数"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="开始打卡时间"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="最后打卡时间"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <elPages></elPages>
                </el-tab-pane>
                <el-tab-pane label="员工信息" name="second">
                    <elPages></elPages>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import elPages from "@/components/elPages.vue";
export default {
    components: {
        elPages
    },
    props: {

    },
    data() {
        return {
            a: '',
            b: '',
            c: '',
            d: '',
            dialogImageUrl: '',
            dialogVisible: false,
            activeName: 'second',
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

    },
    mounted() {

    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>

<style lang="scss">
    .business-detail {
        padding: 0 20px 20px;
        background-color: #ffffff;
        .detail-header {
            display: flex;
            height: 50px;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #E9E9E9;
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
        .detail-upload {
            padding: 0 0 32px 0;
        }
        .detail-infobus {
            h1 {
                padding: 15px 0;
            }
        }
    }
</style>
