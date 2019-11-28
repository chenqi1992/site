<template>
    <div class="user-managedetail">
        <div class="header">
            <div>基本资料</div>
            <div class="right" v-if="editORview">
                <el-button v-show="!btnshow" size="medium" @click="btnshow = true" type="primary">编辑</el-button>
                <div v-show="btnshow">
                    <el-button size="medium" v-show="btnshowcancle" @click="btnshow = false">取消</el-button>
                    <el-button size="medium" type="primary" @click="handleSave('ruleForm')">保存</el-button>
                </div>
            </div>
        </div>
        <div class="detail">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" :disabled="!btnshow" label-width="150px">
                <div class="form1">
                    <h1>基本信息</h1>
                    <div class="detail1">
                        <el-form-item prop="userName" label="姓名：">
                            <el-input size="medium" v-model="ruleForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item prop="mobilePhone" label="手机号：">
                            <el-input size="medium" v-model="ruleForm.mobilePhone"></el-input>
                        </el-form-item>
                    </div>
                    <div class="detail2">
                        <el-form-item label="身份证号：">
                            <el-input size="medium" v-model="ruleForm.idCard"></el-input>
                        </el-form-item>
                        <el-form-item label="籍贯：">
                            <el-input size="medium" v-model="ruleForm.native"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="form2">
                    <div class="add">
                        <h1>平台角色</h1>
                        <el-button size="medium" type="primary">添加</el-button>
                    </div>
                    <div class="detail1">
                        <!-- <el-form class="clearfix" label-position="left" ref="platform" v-for="(platform, index) in platformdata" :key="index" :rules="platformrules" :model="platform" label-width="80px"> -->
                            <el-form-item label="角色类型：" prop="roletype">
                                <el-select size="medium" v-model="ruleForm.roletype" placeholder="请选择">
                                    <el-option
                                    v-for="item in roleArr"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="角色名称：" prop="rolename">
                                <!-- <el-select v-model="platform.rolename" @change="changerolename($event, index)" :disabled="isshowdetail" class="widthauto">
                                    <el-option v-for="(item, rnindex) in platform.rolenamelist" :key="rnindex" :label="item.roleName" :value="item.roleCode"></el-option>
                                </el-select> -->
                                <el-input size="medium" v-model="ruleForm.rolename"></el-input>
                            </el-form-item>
                            <el-form-item label="所属企业：" prop="name">
                                <el-input size="medium" v-model="ruleForm.owned"></el-input>
                            </el-form-item>
                        <!-- </el-form> -->
                    </div>
                </div>
            </el-form>
            <div>从业经历</div>             
            <el-table
                :data="listBackstageOrganizationData"
                :header-cell-style="{background:'#FAFAFA',color:'#000000'}"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="序号"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="开始时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="结束时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="所属公司"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="岗位"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="contactPosition"
                    label="角色"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="日薪"
                    align="center">
                </el-table-column>
            </el-table>
            <!-- <div class="add-table">
                <i class="el-icon-circle-plus-outline">新增</i>
            </div> -->
        </div>
    </div>
</template>

<script>
import { insertBackstageUser, searchBackstageUser, updateBackstageUser, listBackstageOrganization } from "@/api/common.js";
import { roleType } from "@/common/js/mixins.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {

    },
    props: {

    },
    mixins: [roleType],
    data() {
        return {
            editORview: true,
            btnshow: false,
            btnshowcancle: false,
            searchBackstageUserParams: {
                userId: this.$route.params.id
            },
            searchBackstageUserData: {},
            ruleForm: {
                userName: '测试2',
                mobilePhone: '18605978075',
                idCard: '330781198509075398',
                native: '',
                roletype: '',
                rolename: '测试22',
                owned: '万达',
                userId: this.$route.params.id
            },
            rules: {
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                roleCode: [
                    { required: true, message: '请输入角色代码', trigger: 'blur' }
                ],
                roleType: [
                    { required: true, message: '请输入角色类型', trigger: 'blur' }
                ],
            },
            listBackstageOrganizationParams: {
                orgName: "string",
                pageIndex: 1,
                pageSize: 10,
                typeCode: "string"
            },
            listBackstageOrganizationData: [],
        }
    },
    created() {
        if(this.$route.path.indexOf('detail') > 0) {
            this.editORview = true
            this.btnshowcancle = true
            this.ApiSearchBackstageUser()
        } else if (this.$route.path.indexOf('add') > 0) {
            this.editORview = true
            this.btnshow = true
            this.btnshowcancle = false
        } else {
            this.editORview = false
            this.ApiSearchBackstageUser()
        }
    },
    mounted() {

    },
    methods: {
        ApiSearchBackstageUser() {
            //企业详情
            searchBackstageUser(this.searchBackstageUserParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.searchBackstageUserData = res.data.data
                } else {
                    this.$message.error(res.data.message);
                }
            })
        },
        ApiListBackstageOrganization() {
            //从业经历
            listBackstageOrganization(this.listBackstageOrganizationParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.listBackstageOrganizationData = res.data.data.list
                } else {
                    this.$message.error(res.data.message);
                }
            })
        },
        handleSave() {
            // this.$refs['basicform'].validate((valid, obj) => {
            //     console.log(obj);
            //     if (!valid) {
            //         valiflag = false;
            //         return false;
            //     }
            // });
            // this.$refs['basicform2'].validate((valid) => {
            //     if (!valid) {
            //         valiflag = false;
            //         return false;
            //     }
            // });
            if (this.btnshowcancle) {
                updateBackstageUser(this.ruleForm).then((res) => {
                    if (res.data.code === 1000) {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.$router.push({
                            path: '/userManage'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }, (err) => {

                });
            } else {
                insertBackstageUser(this.ruleForm).then((res) => {
                    if (res.data.code === 1000) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.$router.push({
                            path: '/userManage'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }, (err) => {

                });
            }
        }
    }
}
</script>

<style lang="scss">
    .user-managedetail {
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            font-size: 16px;
            border-bottom: 1px solid rgba(233,233,233,1);
        }
        .detail {
            padding: 0 30px 50px;
            .form1 {
                h1 {
                    padding: 20px 0;
                    font-size: 16px;
                }
                .detail1, .detail2 {
                    display: flex;
                }
            }
            .form2 {
                .add {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    h1 {
                        padding: 20px 0;
                        font-size: 16px;
                    }
                }
                .detail1 {
                    display: flex;
                }
            }
            .add-table {
                height:53px;
                text-align: center;
                line-height: 53px;
                margin: 50px auto;
                background:rgba(250,250,250,1);
                cursor: pointer;
            }
        }
    }
</style>
