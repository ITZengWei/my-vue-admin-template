/*
* @Author 陌琼先森
* @Date 2020-7-26 0:19
* @LastEditTime 2020-7-26 0:19
* @Description Vue 全局 过滤器
* @FilePath \my-vue-admin-template\src\directives
* */


const GlobalFilter = {
	/* 自动获取焦点 */
	padStart(text) {
		return String(text).padStart(2, '0')
	}
}

export default {
	install(Vue) {
		Object.keys(GlobalFilter).forEach(key => {
			Vue.filter(key, GlobalFilter[key])
		})
	}
}