import App from './App.vue'
import router from './router'
import store from './store'

/* 引入 Element UI */
import ELEMENT from './element-ui'
Vue.use(ELEMENT)

/* 引入第三方插件 */
import Vendors from './vendors'
Vue.use(Vendors)

/* 挂载全局自定义指令 */
import GlobalUseDirective from './directives'
Vue.use(GlobalUseDirective)

/* 挂载全局过滤器 */
import GlobalFilter from './filters'
Vue.use(GlobalFilter)

/* 导入全局组件 */
import GlobalComponent from './components'
Vue.use(GlobalComponent)

/* 为 Vue 配置公共原型方法 */
import Public from './utils/public'
Vue.use(Public)

/* 全局引入样式 */
import './styles/index.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
