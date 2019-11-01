/*
 * @Author: zhouyang 
 * @Date: 2019-08-22 14:20:39 
 * @Last Modified by: zhouyang
 * @Last Modified time: 2019-08-29 16:49:30
 */
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { action } from '@/utils'
import './index.scss'
import selectedLove from '../../assets/images/selected-love.png'
import selectedMusic from '../../assets/images/selected-music.png'
import playing from '../../assets/images/playing.png'
import selectedMe from '../../assets/images/selected-me.png'
import { SongSheet } from '@/components/index'

type IState = {
	classifications: Array<{
		src: string,
		name: string,
	}>,
}

type IProps = {
	homeModel: {
		banners: Array<Banner>,
		recommends: Array<Recommend>
	},
	dispatch: (action: { type: string, payload?: any }) => any
}

@connect(({ homeModel }) => ({ homeModel }))
class Index extends Component<IProps, IState> {
	config: Config = {
		navigationBarTitleText: '首页'
	}

	static options = {
		addGlobalClass: true
	}

	constructor(props) {
		super(props)
		this.state = {
			classifications: [
				{
					src: selectedLove,
					name: '每日推荐'
				},
				{
					src: selectedMusic,
					name: '歌单'
				},
				{
					src: playing,
					name: '排行榜'
				},
				{
					src: selectedMe,
					name: '电台'
				}
			]
		}
	}
	componentWillMount() {
		
	}

	async componentDidMount() {
		this.props.dispatch(action('homeModel/initIndex'))
	}

	componentWillUnmount() { }

	componentDidShow() { }

	componentDidHide() { }

	// 获取歌单详情
	getSongSheetDetail = (songId) => {
		if (!songId && songId !== 0) return;
		this.props.dispatch(action('globalModel/goSongSheetPage', { id: songId }))
	}

	render() {
		const { banners, recommends } = this.props.homeModel
		const { classifications } = this.state
		return (
			<View className='index'>
				<Swiper indicatorColor='#cccccc'
					indicatorActiveColor='#ab3319'
					autoplay
					circular
					indicatorDots>
					{
						banners.map(item => (
							<SwiperItem key={item.imageUrl} >
								<View className="swiper-item">
									<Image src={item.imageUrl} className="swiper-item-image"></Image>
								</View>
							</SwiperItem>
						))
					}
				</Swiper>
				<View className="index-classification">
					{
						classifications.map(item => {
							return (
								<View key={item.src} className="classification-item">
									<Image src={item.src} className="classification-item-image"></Image>
									<Text className="classification-item-name">{item.name}</Text>
								</View>
							)
						})
					}
				</View>
				<View className="index-recommend">
					<View className="index-recommend-line"></View>
					<View className="index-recommend-header">
						<View className="index-recommend-header_title">推荐歌单</View>
						<View className="index-recommend-header_more">歌单广场</View>
					</View>
					<View className="index-recommend-content" >
						{
							recommends.map(item => {
								return (
									<View key={item.id}
										onClick={() => this.getSongSheetDetail(item.id)}
										className="index-recommend-content-item" >
										<View className="recommend-content-item_bg-wrapper" >
											<SongSheet
												backgroundUrl={item.picUrl}
												songId={item.id}
												playCount={item.playCount}
											/>
										</View>
										<View className="recommend-content-item_name" onClick={() => this.getSongSheetDetail(item.id)}>{item.name}</View>
									</View>
								)
							})
						}
					</View>
				</View>
			</View>
		)
	}
}

export default Index
