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
const menuico = { 10199: require('../assets/leftmenu/平台管理@2x.png'),
				10000: require('../assets/leftmenu/账户管理@2x.png'), 
				10196: require('../assets/leftmenu/设备管理@2x.png'), 
				10222: require('../assets/leftmenu/企业管理@2x.png'), 
				10214: require('../assets/leftmenu/交底考试@2x.png'), 
				10202: require('../assets/leftmenu/员工管理@2x.png'),
				10206:require('../assets/leftmenu/考勤管理@2x.png'),
				10201:require('../assets/leftmenu/账户中心@2x.png'),
				10200: require('../assets/leftmenu/账户首页-选中@2x.png'),
				10213:require('../assets/leftmenu/pay-circle-o@2x.png')}
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
			// var loginInfo = JSON.parse(getStore('loginInfo'));
			let loginInfo = JSON.parse(getStore('loginInfouser'))
			// console.log(loginInfo);
			// if (!loginInfo) {
			// 	const loginInfouser = {
			// 	userMenuInfo: [
			// 		{ id: 11, parentId: 0, menuName: "企业管理", menuUrl: '/businessManage' },
			// 		{ id: 12, parentId: 0, menuName: "设备管理", menuUrl: '/equipmentManage' },
			// 		{ id: 22, parentId: 0, menuName: "账户管理", menuUrl: null },
			// 		{ id: 23, parentId: 22, menuName: "角色管理", menuUrl: "/roleManage" },
			// 		{ id: 24, parentId: 22, menuName: "用户管理", menuUrl: "/userManage" },
			// 		{ id: 24, parentId: 0, menuName: "平台管理", menuUrl: 'null' },
			// 	]        }
				// loginInfo = loginInfouser
			// }
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
