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
            <el-form :model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" :disabled="!btnshow" label-width="150px">
                <div class="form1">
                    <h1>基本信息</h1>
                    <div class="detail1">
                        <el-form-item prop="userName" label="姓名：">
                            <el-input size="medium" v-model="ruleForm1.userName"></el-input>
                        </el-form-item>
                        <el-form-item prop="mobilePhone" label="手机号：">
                            <el-input size="medium" v-model="ruleForm1.mobilePhone"></el-input>
                        </el-form-item>
                    </div>
                    <div class="detail2">
                        <el-form-item label="身份证号：">
                            <el-input size="medium" v-model="ruleForm1.idCard"></el-input>
                        </el-form-item>
                        <el-form-item label="籍贯：">
                            <el-input size="medium" v-model="ruleForm1.native"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div class="form2">
                <div class="add">
                    <h1>平台角色</h1>
                    <el-button size="medium" type="primary" v-if="editORview" @click="handleAddrole">添加</el-button>
                </div>
                <el-form :model="item" v-for="(item, index) in ruleForm2" :key="index" status-icon :rules="rules" ref="ruleForm2" :disabled="!btnshow" label-width="150px">
                    <div class="detail1">
                        <el-form-item label="角色类型：" prop="roleType">
                            <el-select size="medium" v-model="item.roleType" placeholder="请选择">
                                <el-option
                                v-for="item in roleArr"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="角色名称：" prop="roleName">
                            <el-input size="medium" v-model="item.roleName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属企业：" prop="owned">
                            <el-input size="medium" v-model="item.owned"></el-input>
                        </el-form-item>
                        <el-button class="delete-btn" type="primary" size="medium" v-show="index != 0 && editORview" icon="el-icon-delete" @click="handleDelplatform(index)">删除</el-button>               
                    </div>
                </el-form>
            </div>
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
import { getStore } from '@/utils/utils.js'
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
            ruleForm1: {
                userName: '',
                mobilePhone: '',
                idCard: '',
                native: '',
                userId: JSON.parse(getStore('loginInfouser')).userInfo.userId
            },
            ruleForm2: [{
                roleType: '',
                roleName: '',
                owned: '',
            }],
            rules: {
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                mobilePhone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' }
                ],
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ],
                roleCode: [
                    { required: true, message: '请输入角色代码', trigger: 'blur' }
                ],
                roleType: [
                    { required: true, message: '请输入角色类型', trigger: 'change' }
                ],
                owned: [
                    { required: true, message: '请输入所属企业', trigger: 'change' }
                ],
            },
            listBackstageOrganizationParams: {
                orgName: "",
                pageIndex: 1,
                pageSize: 10,
                typeCode: ""
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
            let valiflag = true;
            this.$refs['ruleForm1'].validate((valid) => {
                if (!valid) {
                    valiflag = false;
                    return false;
                }
            });
            this.ruleForm2.map((item, index)=>{
                this.$refs['ruleForm2'][index].validate((valid) => {
                    if (!valid) {
                        valiflag = false;
                        return false;
                    }
                });
            })
            if (this.btnshowcancle && valiflag) {
                updateBackstageUser(Object.assign(this.ruleForm1, {userRoleRelation: this.ruleForm2})).then((res) => {
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
                if(valiflag) {
                    insertBackstageUser(Object.assign(this.ruleForm1, {userRoleRelation: this.ruleForm2})).then((res) => {
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
        },
        handleAddrole() {
            let ruleForm2child = {
                roleType: '',
                roleName: '',
                owned: '',
            };
            this.ruleForm2.push(ruleForm2child);
        },
        handleDelplatform(index) {
            this.ruleForm2.splice(index, 1);
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
                    .delete-btn {
                        height: 40px;
                        margin-left: 50px;
                    }
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
