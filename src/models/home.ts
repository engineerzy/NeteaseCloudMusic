
import { action } from '@/utils'
import * as api from 'api'
export default {
	namespace: 'homeModel',
	state: {
		banners: [],
		recommends: [],
	},
	effects: {
		/**
		 * 初始化banner页
		 * @param param0 
		 * @param param1 
		 */
		*initBanners({}, { put, call }) {
			const { banners } = yield call(api.getBannerList)
			yield put(action('modifyState', { banners }))
		},

		/**
		 * 初始化推荐歌单
		 * @param param0 
		 * @param param1 
		 */
		*initRecommends({ }, { put, call }) {
			const { recommends } = yield call(api.getRecommends)
			yield put(action('modifyState', { recommends }))
		},
		
		/**
		 * 初始化首页接口
		 * @param param0 
		 * @param param1 
		 */
		*initIndex({ }, { put }) {
			const list: Array<{ banners: Array<Banner>, result: Array<Recommend>}> = yield Promise.all([
				api.getRecommends(),
				api.getBannerList()
			])
			const { banners, result } = { ...list[0], ...list[1] }
			yield put(action('modifyState', { banners, recommends: result }))
		},
		
	},
	reducers: {
		modifyState(state, { payload }) {
			return {
				...state,
				...payload
			}
		}
	}
}