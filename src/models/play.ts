import Taro from '@tarojs/taro'
import { action } from '@/utils'
import * as api from 'api'

enum PlayPatterns { loop, one, shuffle }
export default {
	namespace: 'playModel',
	state: {
		currentMusic: {},
		musicIds: {},
		playPatterns: PlayPatterns,
		currentPattern: 'loop',
		hasBeenUsedIndex: [],
	},
	effects: {
		/**
		 * 初始化播放列表详情
		 */
		*initPlayList({ }, { select, put }) {
			const tracks = yield select(state => state.globalModel.songSheet.tracks)
			yield put.resolve(action('getStayMusicDetails', { ids: tracks.reduce((pre, cur) => pre.concat(cur.id), []).join(',') }))
		},
		/**
		 * 获取当前播放歌曲url
		 */
		*getSongUrl({ payload }, { call, put, select }) {
			const { success, message } = yield call(api.checkSong, payload.id)
			if (success) {
				let currentMusic, currentDetail;
				const { musicIds } = yield select(state => state.playModel)
				currentMusic = yield call(api.getSongUrl, payload.id)
				currentDetail = musicIds.songs.find(e => +e.id === +payload.id)
				currentMusic = {
					...currentMusic.data[0],
					...currentDetail.al,
					ar: currentDetail.ar,
					index:  musicIds.songs.findIndex(e => +e.id === +payload.id)
				}

				yield put(action('modifyState', { musicIds, currentMusic }))
			} else {
				Taro.showToast({
					title: message,
					icon: 'none',
					duration: 1600
				})
			}
		},

		/**
		 *
		 * 获取全量待播放歌曲详情
		 */
		*getStayMusicDetails({ payload }, { call, put }) {
			const musicIds = yield call(api.getMusicDetail, payload.ids)
			yield put(action('modifyState', { musicIds }))
		},

		/**
		 *更改当前播放歌曲
		 *
		 */
		*changeCurrentMusic({ payload }, { select, put }) {
			const { currentMusic, musicIds, currentPattern } = yield select(state => state.playModel)
			const modeFun = {
				'loop': () => {
					if (payload.direction === 'next') {
						return currentMusic.index >= (musicIds.songs.length - 1) ? 0 : (currentMusic.index + 1);
					} else {
						return currentMusic.index === 0 ? (musicIds.songs.length - 1) : (currentMusic.index - 1);
					}
				},
				'one': () => {
					return currentMusic.index
				},
				'shuffle': () => {
					return Math.ceil(Math.random() * (musicIds.songs.length - 1))
				}
			}

			let index: number = modeFun[currentPattern]()
			yield put(action('getSongUrl', { id: musicIds.songs[index].id }))
		}
	},
	reducers: {
		modifyState(state, { payload }) {
			return {
				...state,
				...payload
			}
		},
		modifyPlayPattern(state) {
			const { currentPattern } = state
			const index = state.playPatterns[currentPattern]
			const key = state.playPatterns[+index + 1]
			return {
				...state,
				currentPattern: key ? key : state.playPatterns['0']
			}
		}
	}
}
