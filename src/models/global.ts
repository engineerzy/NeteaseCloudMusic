import Taro from '@tarojs/taro'
import { action } from '@/utils'
import * as api from 'api'

const globalModel = {
	namespace: 'globalModel',
	state: {
		headeActived: 'recommend',
		songSheet: {},
	},
	effects: {
		/**
		 * 获取歌单详情
		 */
		*getSongSheetDetail({ payload }, { call, put }) {
			const result = yield call(api.getSongSheetDetail, payload.id)
			yield put(action('modifyGlobalState', { songSheet: result.playlist }))
		},

		/**
		 * 去往歌单详情页面
		 *
		 */
		*goSongSheetPage({ payload }, { put }) {
			Taro.navigateTo({
				url: `/pages/songSheetList/index?id=${payload.id}`
			})
			yield put(action('getSongSheetDetail', { id: payload.id }))
		}
	},
	reducers: {
		modifyGlobalState(state, { payload }) {
			return {
				...state,
				...payload
			}
		},

	}
}

export default globalModel 