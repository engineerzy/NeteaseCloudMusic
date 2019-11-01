import request from '../server'

/**
 *查询接口
 *
 * @param {string} keywords
 * @returns
 */
export const musicSearch = (keywords: string) => {
	return request({
		url: '/search',
		method: 'GET',
		params: {
			keywords,
		}
	})
}