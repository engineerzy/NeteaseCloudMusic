import Taro, { useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import useVedioContext from './hooks'
import PlayFiringPinPng from 'assets/images/aag.png'
import DiscPng from 'assets/images/temp/play.png'
import NextPng from 'assets/images/ajb.png'
import PrevPng from 'assets/images/ajh.png'
import PlayPng from 'assets/images/ajd.png'
import PausePng from 'assets/images/ajf.png'
import ShufflePng from 'assets/images/temp/cm2_icn_shuffle@2x.png'
import LoopPng from 'assets/images/temp/cm2_icn_loop@2x.png'
import OnePng from 'assets/images/temp/cm2_icn_one@2x.png'
import OrderListPng from 'assets/images/temp/cm2_icn_list@2x.png'
import { action } from '@/utils'
import { PlayProgress, Popup } from '@/components/index'
import './index.scss'

// 播放模式icon
const patternImgs = { shuffle: ShufflePng, loop: LoopPng, one: OnePng }

type IAction = {
    type: string,
    payload?: any
}

interface IProps {
    playModel: {
        musicIds: MusicsDetail,
        currentMusic: any,
        currentPattern: string
    }
    dispatch: (action: IAction) => Promise<any>
}

const VedioContext = Taro.createInnerAudioContext()

function Play(props: IProps) {
    const { currentMusic, currentPattern } = props.playModel
    // 初始化歌曲进度条，监听歌曲播放动作
    const [state, stateDispatch] = useVedioContext(VedioContext, props)
    // 触发获取歌曲详情
    useEffect(() => {
        async function initPlayData() {
            await props.dispatch(action('playModel/initPlayList'))
            await props.dispatch(action('playModel/getSongUrl', { id: this.$router.params.id }))
        }
        initPlayData.call(this);
    }, [this.$router.params.id])

    // 更改播放状态
    function changPlayStatus() {
        if (state.playStatus) {
            VedioContext.pause()
        } else {
            VedioContext.play()
        }
        stateDispatch({
            type: 'playStatus',
            payload: !state.playStatus
        })
    }

    // 拼接歌曲作者名字
    function getMusicAuthor(ar) {
        if (ar.length === 0) {
            return '群星'
        } else if (ar.length === 1) {
            return ar[0].name
        } else {
            return ar.map(e => e.name).join('/')
        }
    }

    // 更改播放模式
    function changePlayMode() {
        props.dispatch(action('playModel/modifyPlayPattern'))
    }

    const playBtnImg = state.playStatus ? PlayPng : PausePng
    const firpinClasses = 'play-bg-firpin ' + (state.playStatus ? 'active' : '')
    const coverClasses = 'play-bg-cover ' + (state.playStatus ? '' : 'pause')
    const currentPlayPatternPng = patternImgs[currentPattern]
    return (
        <View className="fx-play-page">
            <Image src={currentMusic.picUrl} className="fx-play-page_bg"></Image>
            <View className="fx-play-page-content">
                <View className="play-music-info">
                    <View className="play-music-name">{currentMusic.name}</View>
                    <View className="play-music-author">{currentMusic.ar && getMusicAuthor(currentMusic.ar)}</View>
                </View>
                <View className="play-bg-wrapper">
                    <View className="play-bg-ripple"></View>
                    <Image src={PlayFiringPinPng} className={firpinClasses}></Image>
                    <Image src={DiscPng} className="play-bg-disc"></Image>
                    <Image src={currentMusic.picUrl} className={coverClasses}></Image>
                </View>
                <View className="music-tool-bar">
                    {/* <Popup renderTitle={
            <View>hahaha</View>
          }>

          </Popup> */}
                </View>
                <View className="play-progress-bar">
                    <PlayProgress
                        currentTime={state.currentTime}
                        duration={state.duration}
                        seek={position => VedioContext.seek(position)}
                    />
                </View>
                <View className="play-tool-bar">
                    <View className="play-way" onClick={changePlayMode}>
                        <Image src={currentPlayPatternPng} className="play-tool-icon"></Image>
                    </View>
                    <View className="play-main-control">
                        <Image
                            src={PrevPng}
                            className="prev-song play-tool-icon"></Image>
                        <Image
                            src={playBtnImg}
                            className="play-status"
                            onClick={changPlayStatus}>
                        </Image>
                        <Image src={NextPng} className="next-song play-tool-icon"></Image>
                    </View>
                    <View className="stay-play-list">
                        <Image src={OrderListPng} className="play-tool-icon"></Image>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default connect(({ playModel }) => ({ playModel }))(Play)

