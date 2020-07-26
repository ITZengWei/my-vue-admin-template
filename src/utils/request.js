import axios from 'axios'

import { message } from 'antd'

import store from '@/store'
import { exitLogin } from "@/actions/loginAction"

let baseURL = ''

switch (process.env.NODE_ENV) {
	case 'development' :
		/* 测试环境 */
		baseURL = 'http://localhost:3077'
		break
	default :
		/* 真实环境 */
		baseURL = 'http://api_b_e.smalllb.top'
}


export const service = axios.create({
	baseURL,
	headers: {
		Authorization: 'Bearer ' + window.localStorage.getItem('blog_nest_admin_token'),
	}
})

/* 不需要拦截的请求 比如 login */
const service1 = axios.create({
	baseURL,
})

/* 自定义 code 集合 */
const CUSTOM_CODE_MAP = {
	SUCCESS: 0,
	ERROR: 1
}

/* HTTP 状态码 code 集合 */
const HTTP_CODE_MAP = {
	400: "请求错误",
	401: "未授权，请登录",
	403: "拒绝访问",
	404: "请求地址出错",
	405: "不允许的请求方法",
	408: "请求超时",
	500: "服务未实现",
	502: "网关错误",
	503: "服务不可用",
	504: "网关超时"
}

/* 全局设置 token */
service.interceptors.request.use(config => {
	/* 普通用户token */
	config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('blog_nest_admin_token')
	return config


}/*, err => {
	alert('登录超时')
	return Promise.(err)
}*/)

let responseStatus = [200, 201]
/* 处理响应信息，拦截器 */
service.interceptors.response.use(response => {
	if (responseStatus.includes(response.status)) {
		return response.data
	} else {
		/* 错误拦截 */
		message.error('网络异常请稍后')
	}

}, error => {
	// window.error = error
	let { response } = error
	if (response) {
		/* 服务器有返回结果 */
		/* 状态码处理 */
		const errorMsg = HTTP_CODE_MAP[response.status]

		// 如果有自定义状态码
		if (errorMsg) {
			error.message = message
		}


		return Promise.reject(error)

	} else {
		/* 服务器没有返回结果 */
		/* 两种情况 无服务器崩了 或者 断网了 */
		if (!window.navigator.onLine) {
			// 断网处理
			return Promise.reject({ code: 404, msg: '似乎没有网络了' })
		}
		return Promise.reject(error)
	}
})

/* 封装 正常 请求 */
export const fetch = (url, sendParams, method = 'post') => {
	method = method.toLowerCase()
	return new Promise((resolve, reject) => {
		service[method](url, sendParams)
			.then(res => {
				res = res || {}
				console.log(res)
				if (res.code === 200) {
					resolve(res)
				} else if (res.code === 400 || res.code === 401) {
					store.dispatch(exitLogin())
					reject(res.msg)
				} else {
					message.error(res.msg)
					reject(res.msg)
				}
			})
			.catch(e => {
				let { code, msg } = e
				// window.e = e
				if (code === 401) {
					store.dispatch(exitLogin())
				}
				/* 错误拦截 */
				reject(e.msg)
			})
	})
}
/* 不需要 拦截 的请求 */
export const fetchCopy = (url, sendParams, method = 'POST') => {
	method = method.toLowerCase()
	return new Promise((resolve, reject) => {

		service1[method](url, sendParams)
			.then(res => {
				console.log(res, '===')
				let { code, msg, data } = res.data
				if (code === 200) {
					resolve(res.data)
				} else {
					reject(msg)
				}
			})
			.catch(e => {
				let { code, msg } = e

				/* 错误拦截 */
				reject(e.msg)
			})
	})
}






