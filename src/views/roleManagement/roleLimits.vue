<template>
    <div class="role-limits">
        <div class="role-header">
            <div>权限基本信息</div>
            <template v-if="editORview">
                <div v-show="!btnShow">
                    <el-button size="medium" @click="btnShow = true" type="primary">编辑</el-button>
                </div>
                <div v-show="btnShow">
                    <el-button size="medium" v-show="btnshowcancle" @click="btnShow = false" plain>取消</el-button>
                    <el-button size="medium" type="primary" @click="handleSub('roleForm')">保存</el-button>
                </div>    
            </template>
        </div>
        <div class="role-form">
            <el-form :model="roleForm" status-icon :rules="rules" ref="roleForm" :disabled="!btnShow" label-width="100px">
                <el-form-item prop="roleName" label="角色名称：">
                    <el-input size="medium" v-model="roleForm.roleName" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item prop="roleCode" label="角色代码：">
                    <el-input size="medium" v-model="roleForm.roleCode" placeholder="请输入角色代码" :disabled="type === 'detail'"></el-input>
                </el-form-item>
                <el-form-item prop="roleType" label="角色类型：">
                    <el-select size="medium" v-model="roleForm.roleType" placeholder="请输入角色类型">
                        <el-option
                            v-for="item in roleArr"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注信息：">
                    <el-input size="medium" v-model="roleForm.remark" placeholder="请输入备注信息"></el-input>
                </el-form-item>
                <el-form-item class="rolemenu-box is-required" label="角色权限：">
                    <div class="rolemenu" v-for="(item, index) in rolemenu" :key="index">
                        <div class="parent-name">{{item.parent.menuName}}</div>
                        <el-checkbox-group @change="handleChangemenu(roleForm.roleAuth[index], index)" v-model="roleForm.roleAuth[index]">
                            <el-checkbox
                                v-for="(role, ri) in item.child"
                                :key="ri"
                                :disabled="isshowdetail"
                                :label="role.id">{{role.menuName}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="menutips" v-show="menutips">请至少选择一个权限</div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {roleType} from "@/common/js/mixins.js";
import { searchRole, addRole, updateRole, listMenuInfoToRole } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
export default {
    components: {

    },
    props: {

    },
    mixins: [roleType],
    data() {
        return {
            btnShow: false,
            editORview: true,
            btnshowcancle: false,
            type: '',
            isshowdetail: false,
            menutips: false,
            rolemenu: [],
            rolecheck: [],
            parentcheck: [],
            searchRoleParams: {
                roleCode: this.$route.params.id,
                // roleTypeEnum: ""
            },
            searchRoleData: {},
            roleForm: {
                roleName: '测试1',
                roleCode: 'test',
                roleType: 'test',
                remark: '',
                roleAuth: []
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
            ruleForm: {
                type: ''
            }
        }
    },
    created() {
        if(this.$route.path.indexOf('detail') > 0) {
            this.editORview = true
            this.btnShow = false
            this.btnshowcancle = true
            this.type = 'detail'
        } else if(this.$route.path.indexOf('add') > 0) {
            this.editORview = true
            this.btnShow = true
            this.btnshowcancle = false
            this.type = 'add'
        } else {
            this.editORview = false
            this.btnShow = false
        }
        this.ApiListMenuInfoToRole()
    },
    mounted() {
        
    },
    methods: {
        ApiSearchRole() {
            //查询角色信息
            searchRole(this.searchRoleParams).then((res) =>{
                if (res.data.code === ERR_OK) {
                    this.searchRoleData = res.data.data
                    let data = res.data.data
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const element = data[key]
                            if(this.roleForm[key] !== undefined) {
                                this.roleForm[key] = element
                            }
                        }
                    }
                    let roleauth = res.data.data.roleAuth;
                    this.roleForm.roleAuth = this.rolecheck;
                    if (roleauth) {
                        // 赋值权限
                        let arrauth = roleauth.split(',');
                        console.log(this.rolemenu);
                        for (let j = 0, jl = this.rolemenu.length; j < jl; j++) {
                            console.log(this.rolemenu[j].child.length);
                            for (let c = 0, cl = this.rolemenu[j].child.length; c < cl; c++) {
                                for (let i = 0, l = arrauth.length; i < l; i++) {
                                    if (this.rolemenu[j].child[c].id === parseInt(arrauth[i])) {
                                        this.roleForm.roleAuth[j].push(parseInt(arrauth[i]));
                                        if (!~this.parentcheck.indexOf(this.rolemenu[j].parent.id)) {
                                            this.parentcheck.push(this.rolemenu[j].parent.id);
                                            console.log(this.parentcheck);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        },
        ApiAddRole() {
            //新增
            addRole(this.roleForm).then((res) =>{
                if(res.data.code == 1000){
                    this.$message({
                        type: 'success',
                        message: '添加角色成功'
                    });
                    this.$router.push({
                        path: '/roleManage'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        ApiUpdateRole() {
            //更新
            updateRole(this.roleForm).then((res) =>{
                if(res.data.code == 1000){
                    this.$message({
                        type: 'success',
                        message: '修改角色成功'
                    });
                    this.$router.push({
                        path: '/roleManage'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            })
        },
        ApiListMenuInfoToRole() {
            //获取角色权限
            listMenuInfoToRole().then((res) =>{
                if (res.data.code === 1000) {
                    let data = res.data.data;
                    let menulist = [];
                    for (let i = 0, l = data.length; i< l; i++) {
                        let obj = {
                            parent: '',
                            child: []
                        };
                        if (data[i].parentId === 0) {
                            obj.parent = data[i];
                            menulist.push(obj);
                            this.rolecheck.push([]);
                        }
                    }
                    for (let i = 0, l = data.length; i< l; i++) {
                        for (let j = 0, jl = menulist.length; j < jl; j++) {
                            if (data[i].parentId === menulist[j].parent.id) {
                                menulist[j].child.push(data[i]);
                            }
                        }
                    }
                    this.rolemenu = menulist;
                    if (this.rolecode !== 'add') {
                        this.ApiSearchRole();
                    } else {
                        this.roleForm.roleAuth = this.rolecheck;
                    }
                }
            })
        },
        handleChangemenu(value, index) {
            console.log(this.roleForm.roleAuth);
            let parentid = this.rolemenu[index].parent.id;
            if (value.length > 0) {
                this.menutips = false;
                if (!~this.parentcheck.indexOf(parentid)) {
                    this.parentcheck.push(parentid);
                }
            } else {
                let delindex = this.parentcheck.indexOf(parentid);
                this.parentcheck.splice(delindex,1);
            }

        },
        handleSub(formName) {
            let valitemp = true;
            console.log(formName);
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    valitemp = false;
                    return false;
                }
            });
            console.log(this.parentcheck);
            if (this.parentcheck.length <= 0) {
                this.menutips = true;
                valitemp = false;
            }
            console.log(valitemp);
            if (valitemp) {
                let roleauthall = '';
                for (let i = 0, l = this.roleForm.roleAuth.length; i < l; i++) {
                    roleauthall += this.roleForm.roleAuth[i].join(',');
                    if (this.roleForm.roleAuth[i].length !== 0) {
                        roleauthall += ',';
                    }
                }
                roleauthall += this.parentcheck.join(',');
                this.roleForm.roleAuth = roleauthall
                if(this.type === 'add') {
                    this.ApiAddRole()
                } else if(this.type === 'detail') {
                    this.ApiUpdateRole()
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .role-limits {
        .role-header {
            display: flex;
            padding: 12px 32px;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #E9E9E9;
        }
        .role-form {
            padding: 24px 20px;
            .el-form {
                .el-input {
                    width: 224px;
                }
                .rolemenu-box {
                    .menutips {
                        color: #e90a0a;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
