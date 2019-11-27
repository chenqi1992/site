<template>
	<div class="left-menu">
		<div class="title"><img src="../assets/logo.png" alt="" class="logo">好工地管理系统</div>
		<el-menu :default-active="activeindex" :router="true" :unique-opened="true">
			<template v-for="(role, index) in rolemenu">
				<template v-if="role.child.length > 0"> 
					<el-submenu :key="role.parent.id" :index="index.toString()">
						<template slot="title">
							<img class="icon-title" :src="role.class" alt="">
							<span>{{role.parent.menuName}}</span>
						</template>
							<el-menu-item
								v-for="item in role.child"
								v-bind:key="item.id"
								v-bind:index="item.menuUrl"
								style="padding-left:50px"
							>
							{{item.menuName}}
							</el-menu-item>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item
						v-bind:key="role.parent.id"
						v-bind:index="role.parent.menuUrl"
					>
						<img class="icon-title" :src="role.class" alt="">
						<span>{{role.parent.menuName}}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>
<script>
import { getStore, getStoreSession } from '@/utils/utils.js'
const sloginInfo = {
	userMenuInfo: [
		{ id: 10000, parentId: 0, menuName: "消息中心", menuUrl: null },
		{ id: 10001, parentId: 10000, menuName: "查看公告", menuUrl: "/message/notice" },
		{ id: 10002, parentId: 10000, menuName: "查看通报/告知", menuUrl: "/message/inform" },
		{ id: 10003, parentId: 10000, menuName: "消息新增", menuUrl: "/message/add" },
		{ id: 10004, parentId: 10000, menuName: "消息管理", menuUrl: "/message/manage" },
		{ id: 10010, parentId: 0, menuName: "案件模块", menuUrl: null },
		{ id: 10011, parentId: 10010, menuName: "案件列表", menuUrl: "/case/list" },
		// {id: 10012, parentId: 10010, menuName: "申请司法确认", menuUrl: "/applycase/judicial/9"},
		// {id: 10013, parentId: 10010, menuName: "申请诉讼", menuUrl: "/applycase/suit/10"},
		{ id: 10014, parentId: 10010, menuName: "案情登记", menuUrl: "/case/record" },
		// {id: 10015, parentId: 10010, menuName: "案情详情", menuUrl: "/case/info/1"},
		{ id: 10016, parentId: 10010, menuName: '"随手拍"信息审核', menuUrl: "/case/caseClue" },
		{ id: 10020, parentId: 0, menuName: "视频中心", menuUrl: null },
		{ id: 10021, parentId: 10020, menuName: "我的会议", menuUrl: "/meeting/meetingList" },
		{ id: 10030, parentId: 0, menuName: "个人中心", menuUrl: null },
		{ id: 10031, parentId: 10030, menuName: "个人信息", menuUrl: "/userCenter" },
		{ id: 10040, parentId: 0, menuName: "管理中心", menuUrl: null },
		{ id: 10041, parentId: 10040, menuName: "角色权限", menuUrl: "/manage/roleManage" },
		{ id: 10042, parentId: 10040, menuName: "资源管理", menuUrl: "/manage/resourceManagement" },
		{ id: 10051, parentId: 10050, menuName: '智能咨询', menuUrl: "/links" },
]}
const menuico = { 11: require('../assets/leftmenu/企业管理@2x.png'),12: require('../assets/leftmenu/设备管理@2x.png'), 16: 'el-icon-notebook-1', 22: require('../assets/leftmenu/账户管理@2x.png'), 24: require('../assets/leftmenu/平台管理@2x.png'), 
    26: 'el-icon-setting' ,29:'el-icon-menu',31:'el-icon-pie-chart', 39: 'el-icon-share',42:'el-icon-document'}
export default {
	data() {
		return {
			activeindex: '',
			rolemenu: '',
			hasNoRead: false,
		}
	},
	watch: {
		'$route'() {
			this.rolemenu.forEach(role => {
				role.child.forEach(item => {
					if ((this.$route.path).indexOf(item.menuUrl) >= 0) {
						this.activeindex = item.menuUrl
					}
				});
			});
		}
	},
	mounted() {
		this.rolemenu = this.getmenulist();
		this.rolemenu.forEach(role => {
			role.child.forEach(item => {
				if ((this.$route.path).indexOf(item.menuUrl) >= 0) {
					this.activeindex = item.menuUrl
				}
			});
		});
	},
	methods: {
		// 获取菜单列表
		getmenulist() {
			var loginInfo = JSON.parse(getStore('loginInfo'));
			var loginInfouser = JSON.parse(getStore('loginInfouser'))
			console.log(loginInfo);
			if (!loginInfo) {
				const loginInfouser = {
				userMenuInfo: [
					{ id: 11, parentId: 0, menuName: "企业管理", menuUrl: '/businessManage' },
					{ id: 12, parentId: 0, menuName: "设备管理", menuUrl: '/equipmentManage' },
					{ id: 22, parentId: 0, menuName: "账户管理", menuUrl: null },
					{ id: 23, parentId: 22, menuName: "角色管理", menuUrl: "/roleManage" },
					{ id: 24, parentId: 22, menuName: "用户管理", menuUrl: "/userManage" },
					{ id: 24, parentId: 0, menuName: "平台管理", menuUrl: 'null' },
				]        }
				loginInfo = loginInfouser
			}
			let menulist = [];
			if (getStoreSession('haslogin') == 'yes') {
				if (loginInfo) {
					for (let i = 0, l = loginInfo.userMenuInfo.length; i < l; i++) {
						let obj = {
							parent: '',
							child: [],
							class: ''
						};
						if (loginInfo.userMenuInfo[i].parentId === 0) {
							obj.parent = loginInfo.userMenuInfo[i];
							obj.class = menuico[loginInfo.userMenuInfo[i].id]
							menulist.push(obj);
						}
					}
					for (let i = 0, l = loginInfo.userMenuInfo.length; i < l; i++) {
						for (let j = 0, jl = menulist.length; j < jl; j++) {
							if (loginInfo.userMenuInfo[i].parentId === menulist[j].parent.id) {
								menulist[j].child.push(loginInfo.userMenuInfo[i]);
							}
						}
					}
				}
			}
			return menulist;
		},
	}
}
</script>

<style lang="scss">
.left-menu {
	width: 200px;
	height: 100%;
	background-color: #242A37;
	.title {
		display: flex;
		align-items: center;
		line-height: 64px;
		color: #fff;
		background-color: #303746;
		font-size: 18px;
		color:rgba(255,255,255,0.85);
		.logo {
			padding: 0 13px 0 8px;
			width: 32px;
			height: 32px;
		}
	}
	.el-menu {
		border-right: none;
		background-color: #242A37;
	}
	.el-submenu__title {
		font-size: 14px;
		color: #fff;
	}
	.icon-title {
		width: 14px;
		height: 14px;
		margin-right: 12px;
	}
	.el-submenu__title i {
		color: #999;
	}
	.el-submenu__title:hover {
		color: #fff;
		background-color: #1890FF;
	}
	.el-submenu.is-active .el-submenu__title {
		color: #fff;
	}
	.el-submenu.is-active .el-submenu__title i {
		color: #fff;
	}
	.el-submenu.is-active .el-submenu__title .icon-edit {
		color: #fff;
		background-position: 2px -47px;
	}
	.el-menu-item {
		color: #fff;
	}
	.el-submenu .el-menu-item {
		padding: 0 20px 0 50px;
		line-height: 48px;
		height: 48px;
	}
	.el-menu-item:hover, .el-menu-item:focus {
		background-color: #1890FF;
	}
	.el-menu-item.is-active {
		color: #fff;
		background-color: #1890FF;
	}
}
</style>
