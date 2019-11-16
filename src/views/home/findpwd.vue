<template>
    <div class="find-pwds">
        <div class="simple-header shadow">
            <div class="row clearfix">
                <a href="/home.html"><img class="logo" src="require('@/publicResource/saas/' + saasconfig.imgpath + '/img/logo.png')" alt="'logo_'+saasconfig.easywebsitename"/></a>
                <span class="head-tit">找回密码</span>
                <p class="login"><a href @click.prevent="back()">返回登录></a></p>
            </div>
        </div>
        <div class="find-pwd shadow">
            <div class="lb-tab clearfix" :class="{secondon: onindex === 1}">
                <span v-for="(item, index) in tabtype" :key="index">{{item}}</span>
            </div>
            <div v-if="onindex === 0">
                <div class="input-item">
                    <input type="text" v-model="firstform.phonenum" maxlength="11" name="phone" @focus="clear('phonenum')"  placeholder="请输入手机号" autocomplete="false"/>
                    <p>{{firstvalidate.phonenum}}</p>
                </div>
                <div class="input-item">
                    <input type="text" v-model="firstform.code" name="code" @focus="clear('code')" placeholder="请输入验证码" autocomplete="false"/>
                    <div class="img-code" id="imgcode"></div>
                    <p>{{firstvalidate.code}}</p>
                </div>
                <div class="input-item">
                    <input type="text" v-model="firstform.notecode" name="notecode" @focus="clear('notecode')" placeholder="请输入短信验证码" autocomplete="false"/>
                    <span class="send-code" @click="getcode">获取短信验证码</span>
                    <p>{{firstvalidate.notecode}}</p>
                </div>
            </div>
            <div v-else>
                <div class="input-item">
                    <input type="password" v-model="secondform.pwd" maxlength="16" name="pwd" @focus="clear('pwd')"  placeholder="请输入8~16位数字和字母大小写组合的密码" autocomplete="false"/>
                    <p>{{secondvalidate.pwd}}</p>
                </div>
                <div class="input-item">
                    <input type="password" v-model="secondform.surepwd" maxlength="16" name="surepwd" @focus="clear('surepwd')"  placeholder="请再次输入新密码" autocomplete="false"/>
                    <p>{{secondvalidate.surepwd}}</p>
                </div>
            </div>
            <div class="btn-findpwd" v-show="onindex === 0"><a href="javascript:;" @click="gosecond">下一步</a></div>
            <div class="btn-findpwd" v-show="onindex === 1"><a href="javascript:;" @click="gosecond">确定</a></div>
            <div class="res-error" :class="{hideanimate: showreserror}">{{reserror}}</div>
        </div>
        <copyright></copyright>
    </div>
</template>

<script>
    import { GVerify } from '@/utils/gVerify.js'
    import copyright from '@/components/copyright.vue'
    import {getSMSCode, resetUserPassWordValidate, resetUserPassWord} from '@/api/common.js'
    // import JsEncrypt from 'jsencrypt'
    import {setStore} from '@/utils/utils.js'
    export default {
        data() {
            return {
                gverify: '',
                usertype: '',
                reserror: '',
                isstaff: false,
                showreserror: false,
                onindex: 0,
                tabtype: ['01 验证手机号', '02 重置密码'],
                firstform: {
                    phonenum: '',
                    code: '',
                    notecode: ''
                },
                firstvalidate: {
                    phonenum: '',
                    code: '',
                    notecode: ''
                },
                secondform: {
                    pwd: '',
                    surepwd: ''
                },
                secondvalidate: {
                    pwd: '',
                    surepwd: ''
                }
            }
        },
        mounted() {
            this.usertype = this.$route.query.type;
            this.gverify = new GVerify("imgcode");
            if (this.$route.query.type === 'staff') {
                this.isstaff = true;
            }
        },
        methods: {
            // 校验图形验证码
            checkgraphidentify() {
                let res = this.gverify.validate(this.firstform.code);
                if( res ){
                    return true;
                } 
                return false;
            },
            checkpwd() {
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(this.secondform.pwd )) {
                    this.secondvalidate.pwd = '请输入8~16位数字和字母大小写组合的密码';
                    return false
                }
                return true;
            },
            checksurepwd() {
                if (!this.secondform.surepwd.trim()) {
                    this.secondvalidate.surepwd = '请再次输入新密码';
                    return false
                } else if (this.secondform.surepwd !== this.secondform.pwd) {
                    this.secondvalidate.surepwd = '两次输入密码不一致';
                    return false;
                }
                return true;
            },
            resetUserPassword(options) {
                let dosecond = true;
                if (this.onindex === 0) {
                    if (!this.checkphone()) {
                        dosecond = false;
                    }
                    if (!this.checkcode()) {
                        dosecond = false;
                    }
                    if (!this.checkcode('note')) {
                        dosecond = false;
                    }
                    if (!dosecond) {
                        return;
                    }
                    resetUserPassWordValidate({
                        mobilePhone: this.firstform.phonenum,
                        validateCode: this.firstform.notecode
                    }).then((res) => {
                        if (res.data.code === 1000) {
                            this.onindex = 1;
                        } else {
                            this.reserror = res.data.message;
                            this.showreserror = true;
                            setTimeout(()=>{
                                this.showreserror = false;
                            }, 2000)
                        }
                    }, (err) => {

                    });
                } else {
                    if (!this.checkpwd()) {
                        dosecond = false;
                    }
                    if (!this.checksurepwd()) {
                        dosecond = false;
                    }
                    if (!dosecond) {
                        return;
                    }
                    resetUserPassWord(options).then((res) => {
                        if (res.data.code === 1000) {
                            this.$message({
                                message: '密码重置成功, 3秒后跳转到登录页',
                                type: 'success'
                            });
                            let redicturl = '/useraction/login';
                            if (this.usertype === 'staff') {
                                setStore('loginCurrTab', 1);
                            }
                            setTimeout(() => {
                                this.$router.push({
                                    path: redicturl
                                });
                            }, 3000);
                        } else {
                            this.reserror = res.data.message;
                            this.showreserror = true;
                            setTimeout(()=>{
                                this.showreserror = false;
                            }, 2000)
                        }
                    }, (err) => {

                    });
                    
                }
            },
            gosecond() {
                getPublicKey().then((res) => {
                    if (res.data.code === 1000) {
                        let publicKey = res.data.data
                        let encryptor = new JSEncrypt();
                        encryptor.setPublicKey(publicKey)
                        let rsaPassWord = encryptor.encrypt(this.secondform.pwd)
                        let params = {
                            mobilePhone: this.firstform.phonenum,
                            validateCode:  this.firstform.notecode,
                            password:rsaPassWord,
                            publicKey:publicKey,
                        };
                        if (this.isstaff) {
                            params.personTypeEnum = 'STAFF';
                        }
                        this.resetUserPassword(params)
                    }

                },erro=>{

                })
            },
            checkphone() {
                if (!this.firstform.phonenum.trim() ) {
                    this.firstvalidate.phonenum = '请输入手机号';
                    return false
                }
                if (!/^1[3-9]\d{9}$/.test(this.firstform.phonenum.trim())) {
                    this.firstvalidate.phonenum = '手机号格式错误';
                    return false
                }
                return true;
            },
            checkcode(type) {
                if (type === 'note') {
                    if (!this.firstform.notecode.trim()) {
                        this.firstvalidate.notecode = '请输入短信验证码';
                        return false
                    }
                } else {
                    if (!this.firstform.code.trim()) {
                        this.firstvalidate.code = '请输入图形验证码';
                        return false
                    } else if (!this.checkgraphidentify()) {
                        this.firstvalidate.code = '图形验证码错误';
                        return false
                    }
                }
                return true;
            },
            clear(type) {
                if (~type.indexOf('pwd')) {
                    this.secondvalidate[type] = '';
                } else {
                    this.firstvalidate[type] = '';
                }
            },
            getcode(e) {
                let docode = true;
                let target = e.target || e.srcElement;
                if (~target.className.indexOf('dis')) {
                    return;
                }
                if (!this.checkphone()) {
                    docode = false;
                }
                if (!this.checkcode()) {
                    docode = false;
                }
                if (!docode) {
                    return;
                }
                getSMSCode({
                    mobilePhone: this.firstform.phonenum,
                    codeType: 'SMS_RESET_PASSWORD_CODE'
                }).then((res) => {
                    if (res.data.code === 1000) {
                        let count = 59;
                        const stid = setInterval(function() {
                            target.innerText = count + 'S';
                            target.className = 'send-code dis';
                            count--;
                            if (count < 0) {
                                target.innerText = '重新发送';
                                clearInterval(stid);
                                target.className = 'send-code';
                            }
                        },
                        1000);
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }, (error) => {
                    console.log(error);
                });
            },
            back() {
                this.$router.back(-1)
            }
        },
        components: {
            'copyright': copyright,
        }
    }
</script>

<style lang="scss">
    .find-pwds {
        height: 100%;
        background-color: #f5f5f5;
        .simple-header {
            height: 80px;
            line-height: 80px;
            background-color: #fff;
            .help {
                float: right;
                font-size: 14px;
                color: #666;
                padding-left: 20px;
                margin-right: 30px;
                // background: url(../../module/index/assets/common/icon_help.png) no-repeat left center;
            }
            .organcenter {
                // background: url(../../module/index/assets/common/avatar_organer.png) no-repeat left center;
                padding-left: 40px;
                float: right;
                font-size: 14px;
                color: #888;
            }
            .logo {
                display: block;
                height: 50px;
                float: left;
                margin-top: 15px;
            }
            .home {
                float: right;
                font-size: 16px;
                color: #333;
                padding-right: 50px;
            }
            .head-tit {
                font-size: 20px;
                color: #666;
                padding-left: 25px;
                border-left: 1px solid #e3e3e3;
                margin-left: 25px;
            }
            .login {
                float: right;
                color: #333;
                font-size: 16px;
                margin-right: 120px;
                a {
                    color: #1e6ecc;
                }
            }
        }
        .find-pwd {
            width: 650px;
            margin: 45px auto 0;
            background-color: #fff;
            border-radius: 5px;
            position: relative;
            .res-error {
                width: 240px;
                height: 36px;
                line-height: 36px;
                border-radius: 4px;
                background: rgba(0, 0, 0, 0.6);
                color: #fff;
                font-size: 14px;
                text-align: center;
                position: absolute;
                left: 50%;
                top: 50%;
                margin: -20px 0 0 -120px;
                opacity: 0;
                visibility: hidden;
                &.hideanimate {
                    opacity: 1;
                    visibility: visible;
                    transition: all 0.3s;
                }
            }
            .lb-tab {
                width: 470px;
                height: 58px;
                margin: 0 auto 40px;
                padding-top: 50px;
                background: url('../../assets/home/bg_findpwd_01.png') no-repeat center bottom;
                background-size: 100%;
                &.secondon {
                    background: url('../../assets/home/bg_findpwd_02.png') no-repeat center bottom;
                    background-size: 100%;
                    span {
                        // color: $primary;
                        &:last-child {
                            color: #fff;
                        }
                    }
                }
                span {
                    color: #fff;
                    float: left;
                    line-height: 58px;
                    text-align: center;
                    width: 235px;
                    font-size: 18px;
                    padding-bottom: 10px;
                    &:last-child {
                        float: right;
                        color: #adadad;
                    }
                }
            }
            h6 {
                font-size: 20px;
                color: #333;
                text-align: center;
                padding: 25px 0 5px;
            }
            .input-item {
                width: 470px;
                margin: 0 auto;
                border: 1px solid #e6e6e6;
                background-color: #fdfcfc;
                position: relative;
                margin-bottom: 30px;
                height: 40px;
                line-height: 40px;
                border-radius: 3px;
                .send-code {
                    position: absolute;
                    right: 10px;
                    top: 0;
                    font-size: 14px;
                    color: #1e6ecc;
                    width: 100px;
                    line-height: 40px;
                    cursor: pointer;
                    text-align: center;
                    &.dis {
                        color: #999;
                        cursor: default;
                    }
                }
                .img-code {
                    position: absolute;
                    right: 2px;
                    top: 2px;
                    width: 100px;
                    height: 36px;
                    cursor: pointer;
                }
                input {
                    width: 450px;
                    height: 38px;
                    line-height: 38px;
                    font-size: 14px;
                    color: #666;
                    outline: none;
                    border: none;
                    background-color: #fdfcfc;
                    padding: 0 10px;
                    &::placeholder {
                        color: #b2b2b2;
                    }
                }
                .code {
                    width: 200px;
                }
                span {
                    color: #1e6ecc;
                    width: 80px;
                    text-align: right;
                    display: inline-block;
                    font-size: 14px;
                    cursor: pointer;
                    &.dis {
                        color: #b2b2b2;
                        cursor: default;
                    }
                }
                p {
                    position: absolute;
                    left: 0;
                    bottom: -23px;
                    background: url('../../assets/home/icon_validate_err.png') no-repeat left center;
                    padding-left: 18px;
                    color: #e90a0a;
                    font-size: 12px;
                    line-height: 15px;
                }
            }
            .btn-findpwd {
                text-align: center;
                padding: 30px 0 45px;
                a {
                    display: block;
                    width: 200px;
                    height: 49px;
                    margin: 0 auto;
                    line-height: 49px;
                    border-radius: 3px;
                    font-size: 18px;
                    color: #fff;
                    background: linear-gradient(90deg,#f2b351,#ee9919);
                    &.dis {
                        opacity: 0.6;
                        cursor: default;
                    }
                }
            }
        }
        .shadow {
            box-shadow: 0 0 10px 1px rgba(204, 204, 204, 0.3);
        }
    }
</style>
