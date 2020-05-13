import request from '../server'
/**
 *获取轮播图
 *
 * @param {('pc' | 'android' | 'iphone'| 'ipad')} [type='iphone']
 */
export const getBannerList = (type: 'pc' | 'android' | 'iphone'| 'ipad' = 'iphone') => request({
	url: '/banner',
	method: 'POST',
	data: {
		type,
	}
})
/**
 *获取推荐歌单
 *
 */
export const getRecommends = () => request({
	url: '/personalized',
	method: 'POST',
})

/**
 *获取歌单详情
 *
 * @param {*} id
 */
export const getSongSheetDetail = (id) => request({
	url: `/playlist/detail`,
	method: 'GET',
	params: {
		id,
	}
})
/**
 *检查音乐是否可用
 *
 * @param {*} id
 */
export const checkSong = id => request({
	url: '/check/music',
	method: 'GET',
	params: {
		id
	}
})
/**
 *获取歌曲url
 *
 * @param {*} id
 */
export const getSongUrl = id => request({
	url: '/song/url',
	method: 'GET',
	params: {
		id,
	}
})
/**
 *获取歌曲详情
 *
 * @param {*} ids
 */
export const getMusicDetail = ids => request({
	url: '/song/detail',
	method: 'GET',
	params: {
		ids
	}
})
