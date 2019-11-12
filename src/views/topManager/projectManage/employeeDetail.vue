<template>
    <div class="employee-detail">
        <div class="employee">
            <div class="title">
                <h1>填写评价</h1>
                <span>您的评价将影响平台其他机构对该员工的使用情况，请谨慎填写</span>
            </div>
            <div class="employee-textarea">
                <el-input
                type="textarea"
                :rows="5"
                placeholder="评价内容越详细，参考意义越大"
                v-model="textarea">
                </el-input>
            </div>
        </div>
        <div class="employee">
            <div class="title">
                <h1>上传照片</h1>
            </div>
            <div class="employee-upload">
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
        </div>
        <div class="employee">
            <div class="title">
                <h1>评价星级</h1>
                <span>当您不评价时，系统默认给该员工5星好评</span>
            </div>
            <div class="employee-rate">
                <el-rate v-model="value1"></el-rate>
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
            textarea: '',
            value1: null,
            dialogImageUrl: '',
            dialogVisible: false,
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
    }
}
</script>

<style lang="scss">
    .employee-detail {
        padding: 20px 30px;
        .employee {
            .title {
                display: flex;
                align-items: center;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(233,233,233,1);
                h1 {
                    font-size: 16px;
                    padding-right: 16px;
                }
                span {
                    color:rgba(0,0,0,0.38);
                }
            }
            .employee-textarea {
                width: 470px;
                padding: 24px 0 48px;
            }
            .employee-upload {
                padding: 24px 0 48px;
            }
            .employee-rate {
                padding: 24px 0 48px;
            }
        }
    }
</style>
