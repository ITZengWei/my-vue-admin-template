/* 引入布局容器组件 */
export { default as ContainerHeader } from './container/container-header'

export { default as ContainerAside } from './container/container-aside'

export { default as ContainerBody } from './container/container-body'

export { default as ContainerFooter } from './container/container-footer'



/* 配置全局组件 */
const GlobalComponents = require.context('./global', false, /.vue$/)

export default {
	install(Vue) {
		GlobalComponents
			.keys()
			.forEach(name => {
				// 遍历挂载 全局组件
				const component = GlobalComponents(name).default
				Vue.component(component.name, component)
			})
	}
}

