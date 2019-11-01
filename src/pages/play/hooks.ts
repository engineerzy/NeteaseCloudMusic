import { useEffect, useReducer } from '@tarojs/taro';
import { tools } from '../../utils';

function reducers(state, action: { type: string, payload?: any }) {
	switch (action.type) {
		case 'currentTime':
			return {
				...state,
				...action.payload
			}
		case 'playStatus':
			return {
				...state,
				playStatus: action.payload
			}
		case 'waiting':
			return {
				...state,
				isWaiting: action.payload
			}
		default:
			return { ...state }
	}
}

function useVediocontext(VedioContext, props) {
	const { playModel, dispatch } = props
	const { duration, currentTime } = VedioContext
	const initState = {
		currentTime,
		duration,
		playStatus: true,
		isWaiting: true
	}

	const [state, stateDispatch] = useReducer(reducers, initState)
	useEffect(() => {
		VedioContext.src = playModel.currentMusic.url
		VedioContext.autoplay = true
		VedioContext.loop = playModel.currentPattern === 'one' ? true : false
		// 监听播放进度
		VedioContext.onTimeUpdate(tools.throttle(() => {
			stateDispatch({
				type: 'currentTime',
				payload: {
					currentTime: VedioContext.currentTime,
					duration: VedioContext.duration
				}
			})
		}, 1000))
		// 监听自然播放完成事件
		VedioContext.onEnded(tools.debounce(() => {
			dispatch({
				type: 'playModel/changeCurrentMusic',
				payload: {
					direction: 'next'
				}
			})
		}, 100));
		// 监听音频加载中事件
		VedioContext.onWaiting(tools.debounce(() => {
			stateDispatch({
				type: 'waiting',
				payload: true
			})
		}, 100));
		// 监听音频可播放事件
		VedioContext.onCanplay(tools.debounce(() => {
			stateDispatch({
				type: 'waiting',
				payload: false
			})
		}, 100));

		// 清除监听事件
		return function cleanUp () {
			VedioContext.offWaiting()
			VedioContext.offCanplay()
			VedioContext.offEnded()
			VedioContext.offTimeUpdate()
		}
	}, playModel.currentMusic.src)

	return [state, stateDispatch]
}

export default useVediocontext