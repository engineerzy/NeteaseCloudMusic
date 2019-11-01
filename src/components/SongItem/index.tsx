import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import MorePng from 'assets/images/temp/cm2_list_btn_more@2x.png'
import './index.scss'

type IProps = {
	index: number,
	name: string,
	creator: string,
	songId: number
}


export default function SongItem (props: Readonly<IProps>) {
	const gotoPlay = id => {
		Taro.navigateTo({
			url: `/pages/play/index?id=${id}`
		})
	}
	return (
		<View className="song-item" onClick={() => gotoPlay(props.songId)}>
			<View className="song-item-index">
				{ props.index }
			</View>
			<View className="song-item-content">
				<View className="song-item-name">
					{ props.name }
				</View>
				<View className="song-item-creator">
					{ props.creator }
				</View>
			</View>
			<View className="song-item-more">
				<Image src={MorePng} className="more-function"></Image>
			</View>
		</View>
	)
}	

SongItem.defaultProps = {
	index: 1,
	name: '',
	creator: '',
}