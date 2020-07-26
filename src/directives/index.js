/*
* @Author 陌琼先森
* @Date 2020-7-26 0:19
* @LastEditTime 2020-7-26 0:19
* @Description Vue 全局 自定义指令
* @FilePath \my-vue-admin-template\src\directives\index.js
* */


const GlobalDirective = {
	/* 自动获取焦点 */
	autoFocus(el) {
		console.log(el)
	}
}

export default {
	install(Vue) {
		Object.keys(GlobalDirective).forEach(key => {
			Vue.directive(key, GlobalDirective[key])
		})
	}
}