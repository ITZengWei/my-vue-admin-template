// import Vue from 'vue'
// import Vuex from 'vuex'


// 自动注入所有 vuex 模块
const files = require.context("./modules", false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
	modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})
