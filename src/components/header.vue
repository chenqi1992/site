<template>
  	<div class="header-top">
		<el-breadcrumb class="breadcrumb-title" separator="/">
			<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
    	</el-breadcrumb>
		<div class="hearder-userinfo">
			<!-- <el-tooltip content="Left Center" placement="left" effect="light">
				<img class="tip" src="../assets/question-circle-o@2x.png" alt="">
			</el-tooltip> -->
			<img class="avater" src="../assets/logo.png" alt="">
			<div class="username">{{userName}}</div>
			<div class="loginout" @click="logOut">退出</div>
		</div>
  	</div>
</template>

<script>
import { removeStore, removeStoreSession, getStoreSession, getStore } from '@/utils/utils.js'
export default {
  data() {
    return {
        userName: ''
    }
  },
  methods: {
    logOut() {
    //   loginOut().then((res) => {
        console.log('退出成功')
        removeStore('authToken');
        removeStore('refreshToken');
		removeStore('loginInfouser');
		removeStore('qiniuauthToken');
		removeStoreSession('haslogin');
        this.$router.push({path: '/home'});
    //   }, (err) => {
    //   })
    }
  },
  mounted() {
    if (getStoreSession('haslogin') == 'yes') {
      let loginInfouser = JSON.parse(getStore('loginInfouser'));
      this.userName = loginInfouser.userInfo.userName
	}
  }
}
</script>
<style lang="scss">
.el-dropdown-menu {
	.el-dropdown-menu__item {
		text-align: center;
	}
}
.header-top {
	display: flex;
	justify-content: space-between;
	height: 100%;
	padding: 0 24px;
	font-size: 16px;
	color: #333;
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
	.breadcrumb-title {
		line-height: 64px;
		font-size: 16px;
	}
  	.hearder-userinfo {
		display: flex;
		align-items: center;
		padding: 0 20px;
		color: #fff;
		.tip {
			width: 16px;
			height: 16px;
		}
		.avater {
			display: block;
			width: 30px;
			height: 30px;
			margin: 0 8px 0 20px ;
			border-radius: 100%;
		}
		.username {
			color: #000000;
		}
    .loginout {
		padding-left: 30px;
      	cursor: pointer;
		color: #666666;
    }
  }
}
</style>
