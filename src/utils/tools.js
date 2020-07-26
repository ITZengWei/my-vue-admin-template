/*
* @Author 陌琼先森
* @Date 2020-7-26 0:19
* @LastEditTime 2020-7-26 0:19
* @Description Tool 工具方法
* @FilePath \my-vue-admin-template\src\utils\tools\index.js
* */

/**
 * 获取页面可视宽高
 * @method getClientView
 * @return {Object}
 */
export const getClientView = () => {
	return {
		width: document.documentElement.clientWidth || document.body.clientWidth, // 屏幕可用宽度
		height: document.documentElement.clientHeight || document.body.clientHeight // 屏幕可用高度
	}
}


/**
 * 添加 cookie
 * @method addCookie
 * @param {String} name 键名
 * @param {any} value 键值
 * @return {Null}
 */
export const addCookie = function (name, value, expireHours) {
	var cookieString = name + "=" + escape(value) + "; path=/";
	//判断是否设置过期时间
	if (!expireHours) {
		expireHours = 720;//30 days
	}
	if (expireHours > 0) {
		var date = new Date();
		date.setTime(date.getTime() + expireHours * 3600 * 1000);
		cookieString = cookieString + ";expires=" + date.toGMTString();
	}
	document.cookie = cookieString;
};

/**
 * 获取 cookie
 * @method getCookie
 * @param {String} name 键名
 * @return {Any || Null} 找到返回值，反之为 null
 */
export const getCookie = function (name) {
	var strcookie = document.cookie;
	var arrcookie = strcookie.split("; ");
	for (var i = 0; i < arrcookie.length; i++) {
		var arr = arrcookie[i].split("=");
		if (arr[0] == name && arr[1] != 'undefined' && arr[1] != 'null') {
			return unescape(arr[1]);
		}
	}
	return null;
};

/**
 * 删除 cookie(设置超时时间)
 * @method delCookie
 * @param {String} name 键名
 * @return {Null} 找到返回值
 */
export const delCookie = function (name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
};

/**
 * throttle 节流
 * @method throttle
 * @param {Function} handle 处理方法
 * @param {Number} delay 延迟时间
 * @return {Function} 节流方法
 */
export const throttle = (handle, delay = 0) => {
	let oldTime = 0
	return function () {
		let _self = this
		let _arg = arguments
		let nowTime = Date.now()

		if (nowTime - oldTime > delay) {
			oldTime = nowTime
			handle.apply(_self, _arg)
		}
	}
}

/**
 * debounce 防抖
 * @method debounce
 * @param {Function} handle 处理方法
 * @param {Number} delay 延迟时间
 * @return {Function} 防抖方法
 */
export const debounce = (handle, delay) => {
	let timer = null

	return function () {
		let _self = this
		let _arg = arguments
		clearTimeout(timer)
		console.log(delay)

		timer = setTimeout(() =>  {
			console.log(this, arguments)
			handle.apply(_self, _arg)
		}, delay)
	}
}



