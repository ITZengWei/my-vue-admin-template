/*
* @Author 陌琼先森
* @Date 2020-7-26 0:19
* @LastEditTime 2020-7-26 0:19
* @Description 自定义Vue配置
* @FilePath \my-vue-admin-template\vue.config.js
* */

const path = require('path')

// 解析路径
function resolve (dir) {
	return path.join(__dirname, dir)
}

// 使用可视化打包插件 图形化打包详情
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// 代码打包之后取出console.log压缩代码
const TerserPlugin = require('terser-webpack-plugin')


// 是否为本地开发环境
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// 资源CDN地址
const cdn = [
	'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
	'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
	'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.3/vuex.min.js',
	'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/index.js',
	'https://cdn.bootcdn.net/ajax/libs/axios/0.18.0/axios.min.js'
]

// externals 导入到 webpack内部中 externals只适用于ES Module的默认导入
const externals = {
	'vue': 'Vue',
	'vue-router': 'VueRouter',
	'vuex': 'Vuex',
	'element-ui': 'ELEMENT',
	'axios': 'axios'
}


// 自定义 webpack 一些配置
module.exports = {
	// 打包资源访问的路径
	publicPath: "./",
	// 打包文件的出口
	outputDir: 'dist',
	// 放置生成的css和js和img和fonts的目录
	assetsDir: 'static',

	chainWebpack: config => {
		// 配置cdn引入
		config
			.plugin('html')
			.tap(args => {
			args[0].cdn = cdn
			return args
		})

		// 配置
		config.externals(externals)

		// 创建别名
		config.resolve.alias
			.set('@', resolve('src/'))
			.set('utils', resolve('src/utils'))
			.set('mixins', resolve('src/mixins')) // 设置混入别名


		// 展示打包图形化信息 需要 npm run build --report
		// config
		// 	.plugin('analzer')
		// 	.use(BundleAnalyzerPlugin)
		// 	.end()
	},

	configureWebpack: config => {
		// 忽略打包配置
		// config.externals = cdn.externals


		// 生产环境配置
		if (IS_PRODUCTION) {
			console.log('生产环境')
			// 代码压缩去除console.log
			config.plugins.push(
				new TerserPlugin({
					terserOptions: {
						ecma: undefined,
						warnings: false,
						parse: {},
						compress: {
							drop_console: true,
							drop_debugger: false,
							pure_funcs: ['console.log'] // 移除console
						}
					}
				})
			)
		}

	},


	// 开发服务器配置
	devServer: {
		host: 'localhost',
		overlay: true,
		port: 8088 // 启动端口号
	}
}
