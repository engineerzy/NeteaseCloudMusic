import Taro from '@tarojs/taro'
import { BASE_URL, ERROR_MSG } from '../variable'
/**
 *组建新的符合要求的Taro.request参数
 *
 * @template T
 * @param {T} options
 * @returns {T}
 */
function createOptions<T>(options: T): T {
	let defaultOptions = {
		url: '',
		method: 'GET',
		header: {},
		dataType: 'json',
		responseType: 'text',
		params: {},
		data: {},
		withCredentials: true
	}
	return { ...defaultOptions, ...options, }
}
/**
 * 序列化请求参数，拼接至url上
 * 以防部分post接口要求参数放在url中
 *
 * @param {string} url
 * @param {object} qs
 * @returns {object}
 */
function urlAddQs(url: string, qs: object): string {
	let queryString = ''
	let newUrl = url

	for (const key of Object.keys(qs)) {
		queryString += `&${key}=${qs[key]}`
	}

	let hasQuery: boolean = url.indexOf('?') !== -1
	/** 判断url中是否已有参数，如果没有参数则删除queryString第一个& **/
	if (queryString !== '' && !hasQuery) {
		queryString = queryString.substring(1)
	}
	if (!hasQuery) {
		newUrl = `${url}?${queryString}`
	}

	return newUrl
}

export default function (options: Server_Request.IRequest): any {
	let opts = createOptions(options)
	let { method, url, header, dataType, params, data } = opts
	if (params && typeof params === 'object') {
		url = urlAddQs(url, params)
	}
	url = `${BASE_URL}${url}`
	return new Promise((resolve, reject) => {
		Taro.request({
			url,
			method,
			header,
			dataType,
			data,
		}).then(res => {
			let { statusCode, data } = res
			if (data) {
				resolve(data)
			} else {
				const msg = ERROR_MSG[statusCode]
				if (msg) {
					Taro.showToast({
						title: msg,
						icon: 'error',
						duration: 2000
					})
					resolve(data)
				} else {
					resolve(data)
				}
			}

		}).catch(err => {
			reject(err)
		})
	})
}