// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 网络请求
import {
	$http
} from '@escook/request-miniprogram'

// 将按需导入的 $http 挂载到 wx 顶级对象之上，方便全局调用
// wx.$http = $http

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求开始之前做一些事情 请求拦截器
$http.beforeRequest = function(options) {
	//options 请求配置
	uni.showLoading({
		title: '数据加载中...',
	})
}
// 请求完成之后做一些事情 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}

uni.$http = $http

// 封装弹框提示信息
uni.$showMsg = function(title = "数据请求失败", duration = 1500, icon = 'none') {
	uni.showToast({
		title: title,
		duration: duration,
		icon: icon
	})
}
// 封装返回
uni.$back = function(delta = 1, duration = 1000) {
	// 拿到页面栈
		let pages = getCurrentPages();
		// 有上一级 返回
		if (pages.length > 1) {
				setTimeout(() => {
					uni.navigateBack({
						delta: delta
					})
				}, duration)
			}
		}
		Vue.config.productionTip = false

		App.mpType = 'app'

		const app = new Vue({
			...App
		})
		app.$mount()
		// #endif

		// #ifdef VUE3
		import {
			createSSRApp
		} from 'vue'
		import App from './App.vue'
		export function createApp() {
			const app = createSSRApp(App)
			return {
				app
			}
		}
		// #endif
