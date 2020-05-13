import Taro, { useReducer, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { format, tools } from '@/utils'
import './index.scss'

type IProps = {
  currentTime: number,
  duration: number,
  seek: (position: number) => void,
  isWaiting?: Boolean
}

const reducers = (state, action: { type: string, payload: any }) => {
  switch (action.type) {
    case 'percent':
      return {
        ...state,
        ...action.payload,
      }
    default:
      break;
  }
}

let isTouch: boolean = false;
let query;
export default function Progress(props: Readonly<IProps>) {
  useEffect(() => {
    query = Taro.createSelectorQuery().in(this.$scope)
  }, [])

  const initState = {
    currentTime: props.currentTime,
    duration: props.duration,
    percent: 0
  }
  const [state, hookDispatch] = useReducer(reducers, initState)

  useEffect(() => {
    if (!isTouch) {
      hookDispatch({
        type: 'percent',
        payload: {
          percent: props.duration === 0 ? 0 : ((props.currentTime / props.duration) * 100),
          currentTime: props.currentTime,
          duration: props.duration
        }
      })
    }
  }, [props.currentTime])

  const handleTouchStart = () => {
    isTouch = true
  }

  const handleTouchMove = e => {
    query.select('.progress-base-bar').boundingClientRect()
    query.exec(rect => {
      const touches = e.touches[0]
      let percent = (touches.clientX - rect[0].left) / rect[0].width
      let currentTime = percent * state.duration
      if (percent > 0) {
        percent = percent >= 1 ? 1 : percent
      } else {
        percent = 0
      }
      hookDispatch({
        type: 'percent',
        payload: {
          percent: percent * 100,
          currentTime,
          duration: state.duration
        }
      })
    })
  }
  const handleTouchEnd = () => {
    const { currentTime } = state
    props.seek(currentTime)
    isTouch = false
  }

  const locationClass = 'progress-current-location ' + (props.isWaiting ? 'waiting' : '')

  return (
    <View className="progress-cpt">
      <View className="progress-time">{format.minAndSec(state.currentTime)}</View>
      <View className="progress-base-bar">
        <View className="progress-current-bar" style={{ width: state.percent.toFixed(2) + '%' }}></View>
        <View className={locationClass}
          style={{ left: state.percent.toFixed(2) + '%' }}
          onTouchStart={handleTouchStart}
          onTouchMove={tools.throttle(handleTouchMove, 50)}
          onTouchEnd={handleTouchEnd}
        ></View>
      </View>
      <View className="progress-time">{format.minAndSec(state.duration)}</View>
    </View>
  )
}
