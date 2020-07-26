/*
* @Author 陌琼先森
* @Date 2020-7-26 0:19
* @LastEditTime 2020-7-26 0:19
* @Description Vue 配置原型上的方法
* @FilePath \my-vue-admin-template\src\utils\public.js
* */

/* 导入 Tool 方法 */
import * as Tool from './tools'

/* 导入所有的 Api 接口方法 */
import Api from '../api'


export default {
	install(Vue) {
		/* 项目接口 */
		Vue.prototype.$Api = Api

		/* 挂载 Tool 到 Public 示例 */
		Vue.prototype.$Tool = Tool

		/* 获取全局的 宽高 */
		const { width, height } = Tool.getClientView()
		Vue.prototype.$width = width
		Vue.prototype.$height = height

	}
}