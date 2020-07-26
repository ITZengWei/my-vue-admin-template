/*
* @Author 陌琼先森
* @Date 2020-7-26 0:19
* @LastEditTime 2020-7-26 9:19
* @Description 路由配置项
* @FilePath \my-vue-admin-template\src\router\routes.js
* */

// 首页 (这里需要首屏优化，就不懒加载)
import Home from '../views/Home'

// 关于
const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue')

// 所有
const All = () => import(/* webpackChunkName: "about" */ '../views/All')

export default [
	{ path: '/', redirect: '/home' },
	{ path: '/home', name: 'Home', component: Home },
	{ path: '/about', name: 'Home', component: About },
	{ path: '*', name: 'Test', component: All }
]
