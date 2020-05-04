<template>
    <div class="home-index">
        <div class="topbar">
            <div class="login">登录</div>
            <div class="register">注册</div>
            <div class="mini">小程序</div>
            <div class="app">APP</div>
        </div>
        <div class="banner">
            <el-carousel height="400px" arrow="never">
                <el-carousel-item class="slide-01"><img :src="require('@/assets/home/banner_01.jpg')" alt=""></el-carousel-item>
                <el-carousel-item class="slide-02"><img :src="require('@/assets/home/banner_02.png')" alt="'在线纠纷调解_'+saasconfig.easywebsitename"></el-carousel-item>
                <el-carousel-item class="slide-03"><img :src="require('@/assets/home/banner_03.jpg')" alt="'矛盾纠纷多元化解平台_'+saasconfig.easywebsitename"></el-carousel-item>
            </el-carousel>
            <div class="login">
                <h2>登录</h2>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item prop="mobilePhone">
                        <el-input maxlength="11" v-model="ruleForm.mobilePhone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="btn" @click="handleLogin('ruleForm')">登录</el-button>
                <div class="find-password" @click="findpwd">找回密码</div>
            </div>
        </div>
        <div class="content">原型产品待定</div>
        <div class="footer">
            <div class="footer-nav">
                <div class="nav-left">
                    <div>用户中心</div>
                    <ul>
                        <li><a href="/help.html#/question?key=3&keypath=3-1&num=3-1-1">如何申请调解</a></li>
                        <li><a href="/help.html#/question?key=3&keypath=3-2&num=3-2-1">如何快速咨询</a></li>
                        <li><a href="/help.html#/question?key=3&keypath=3-4&num=3-4-1">如何查看结果</a></li>
                        <li><a href="/meeting.html#/invite" target="_blank">调解中心</a></li>
                    </ul>
                </div>
                <div class="nav-left">
                    <div>平台服务</div>
                    <ul>
                        <li><a href="/mediation.html">纠纷调解</a></li>
                        <li><a href="/advice.html">法律咨询</a></li>
                        <li><a href>诉讼服务</a></li>
                    </ul>
                </div>
                <div class="nav-left">
                    <div>关于我们</div>
                    <ul>
                        <li><a href="/site-map.html">网站地图</a></li>
                        <li><a href="/agreement-register.html">服务协议</a></li>
                        <li><span>客服电话：</span><span></span></li>
                        <li><a></a></li>
                    </ul>
                </div>
                <div class="nav-right">
                    <span class="code">
                        <img src="require('@/publicResource/saas/' + saasconfig.imgpath + '/img/Lcode.png')" alt="'APP_'+saasconfig.easywebsitename">
                        <p>APP</p>
                    </span>
                    <span class="code code-left">
                        <img src="require('@/publicResource/saas/' + saasconfig.imgpath + '/img/qrcode.png')" alt="'小程序_'+saasconfig.easywebsitename">
                        <p>小程序</p>
                    </span>
                </div>
            </div>
            <div class="footer-info">
                <div class="row clearfix">
                    <div class="left">
                        <span></span>
                        <a href="saasconfig.footer.beiancodelink" class="beian" target="_blank">
                            <!-- <img src="@/module/index/assets/common/beian.png" alt="'备案_'+saasconfig.easywebsitename"/>  -->
                        </a>
                    </div>
                    <div class="right">
                        &copy; 版权所有
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userLoginByMobile } from "@/api/common.js";
import { ERR_OK } from "@/api/reConfig.js";
import {setStore, getStore, removeStore, setStoreSession, getStoreSession} from '@/utils/utils.js'
export default {
    components: {

    },
    props: {

    },
    data() {
        return {
            ruleForm: {
                loginType: "WORK_USER_LOGIN_TYPE",
                mobilePhone: "", //18046286389
                password: "",   //88888888
            },
            rules: {
                mobilePhone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    created() {

    },
    mounted() {
    },
    methods: {
        findpwd() {
            this.$router.push({path: './findpwd'})
        },
        handleLogin(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    userLoginByMobile(this.ruleForm).then((res) =>{
                        if (res.data.code === ERR_OK) {
                            let data = res.data.data;
                            setStoreSession('haslogin', 'yes');
                            setStore('authToken', data.authToken);
                            setStore('refreshToken', data.refreshToken);
                            setStore('loginInfouser', data.loginInfo);
                            let isProjectManage = false
                            data.loginInfo.userRoles.forEach(item=> {
                                if(item.roleCode === 'PROJECT_MANAGE' || item.roleCode === 'ORG_MANAGE') {
                                    isProjectManage = true
                                }
                            });
                            isProjectManage ? this.$router.push({path: './projectIndex'}) : this.$router.push({path: './businessManage'})
                        }
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss">
    .home-index {
        .topbar {
            display: flex;
            justify-content: flex-end;
            background-color: #ececec;
            height: 30px;
            line-height: 30px;
            div {
                padding: 0 10px;
            }
        }
        .banner {
            position: relative;
            .login {
                position: absolute;
                right: 100px;
                top: 50px;
                width: 260px;
                height: 270px;
                padding: 20px;
                z-index: 100;
                border-radius: 5px;
                background-color: #fff;
                h2 {
                    font-size: 22px;
                    text-align: center;
                }
                .demo-ruleForm {
                    .el-form-item {
                        margin: 30px 0;
                    }
                }
                .btn {
                    width: 100%;
                    background: linear-gradient(90deg,#297de0,#1a60b1);
                    display: block;
                    border-radius: 3px;
                    font-size: 18px;
                    color: #fff;
                }
                .find-password {
                    padding: 10px 0;
                    font-size: 14px;
                    color: #1e6ecc;
                    cursor: pointer;
                }
            }
        }
        .content {
            height: 600px;
            text-align: center;
            line-height: 600px;
            font-size: 30px;
        }
        .footer {
            background-color: #212529;
            .footer-nav {
                font-size: 0;
                margin: 0 auto;
                width: 1100px;
                height: 200px;
                padding-top: 30px;
                .nav-left {
                    color: #fff;
                    width: 160px;
                    float: left;
                    div {
                        font-size: 16px;
                        line-height: 38px;
                        text-align: left;
                    }
                    li {
                        font-size: 12px;
                        line-height: 28px;
                        text-align: left;
                        a {
                            color: #fff;
                        }
                    }
                }
                .nav-right {
                    float: right;
                    width: 310px;
                    padding-top: 10px;
                    font-size: 12px;
                    .code {
                        display: inline-block;
                    }
                    .code-left {
                        margin-left: 30px;
                        &.active{
                            float: right;
                        }
                    }
                    img {
                        display: block;
                        width: 135px;
                        height: 135px;
                        border-radius: 4px;
                    }
                    p {
                        text-align: center;
                        font-size: 12px;
                        color: #fff;
                        padding-top: 15px;
                    }
                }
            }
            .footer-info {
                background-color: #0f0f10;
                color: #fff;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                a {
                    color: #fff;
                }
                span {
                    padding-right: 15px;
                }
                .beian {
                    position: relative;
                    padding-left: 28px;
                    img {
                        position: absolute;
                        left: 8px;
                        top: -2px;
                    }
                }
            }
        }
        .home {
            .lawsuit-third {
                height: 600px;
                background: #fff;
                position: relative;
                &.jslawsuitThird{
                    height: 550px;
                }
                img {
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                }
                .action-btn {
                    position: relative;
                    z-index: 10;
                    width: 110px;
                    height: 36px;
                    line-height: 36px;
                    margin: 0 auto;
                    // background-color: $primary;
                    border-radius: 4px;
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                    cursor: pointer;
                    &:hover {
                        // background: $gradient-primary;
                        // box-shadow: $box-shadow-primary;
                        color: #fff;
                    }
                }
            }
            .box-h {
                text-align: center;
                position: relative;
                z-index: 10;
                padding: 60px 0 57px;
            }
            .h5tit {
                font-size: 24px;
                color: #333;
            }
            .pdesc {
                padding-top: 15px;
                font-size: 14px;
                color: #999;
            }
            .line {
                span {
                    display: inline-block;
                    background-color: #fff;
                    width: 70px;
                    height: 2px;
                }
                .orange {
                    // background-color: $secondary;
                }
                .blue {
                    // background-color: $primary;
                }
            }
            .banner {
                width: 100%;
                position: relative;
                z-index: 5;
                .el-carousel {
                    position: relative;
                    img {
                        position: absolute;
                        left: 50%;
                        width: 1920px;
                        display: block;
                        margin-left: -960px;
                    }
                    // .slide-01 {
                    // 	background: url(./img/banner_01.jpg) no-repeat center center;
                    // 	background-size: cover;
                    // }
                    // .slide-02 {
                    // 	background: url(./img/banner_02.png) no-repeat center center;
                    // 	background-size: cover;
                    // }
                    // .slide-03 {
                    // 	background: url(./img/banner_03.jpg) no-repeat center center;
                    // 	background-size: cover;
                    // }
                }
                .el-carousel__indicator.is-active button {
                    // background-color: $secondary;
                }
                .el-carousel__indicators {
                    bottom: 5px;
                }
                .banner-action {
                    position: absolute;
                    right: 70px;
                    top: 70px;
                    width: 300px;
                    height: 260px;
                    background-color: #fff;
                    border-radius: 5px;
                    z-index: 10;
                    .loginout {
                        font-size: 14px;
                        text-align: center;
                        a {
                            // color: $primary;
                        }
                    }
                    .usercenter {
                        width: 248px;
                        height: 40px;
                        line-height: 40px;
                        border-radius: 4px;
                        margin: 24px auto;
                        // background: $gradient-primary;
                        a {
                            color: #fff;
                            text-align: center;
                            font-size: 18px;
                            display: block;
                        }
                    }
                    .welcome-login {
                        font-size: 16px;
                        color: #666;
                        text-align: center;
                    }
                    img {
                        display: block;
                        width: 80px;
                        height: 80px;
                        margin: 20px auto;
                        border-radius: 100px;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>
