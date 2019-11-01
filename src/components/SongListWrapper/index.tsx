import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import SongItem from '@/components/SongItem'
import PlPlayallImg from 'assets/images/temp/pl-playall.png'
import './index.scss'

type IProps = {
	songList: Array<Track>,
	isCollection?: boolean,
	CollectionCount?: number,
}

export default function SongListWrapper(props: Readonly<IProps>) {
	return (
		<View className="song-list-wrapper">
			<View className="song-list-title">
				<Image src={PlPlayallImg} className="list-title-icon"></Image>
				<View className="list-title-info">
					播放全部
					<Text className="song-list-length">（共{props.songList.length}首）</Text>
				</View>
				{
					props.isCollection && <View>
						收藏（）
				</View>
				}
			</View>
			<View className="song-list-content">
				{
					props.songList.map((item, i) => {
						return (
							<SongItem
								key={item.id}
								name={item.name}
								songId={item.id}
								index={i + 1}
								creator={item.ar.reduce((pre, cur) => pre + cur.name, '')}
							/>
						)
					})
				}
			</View>
		</View>
	)
}

SongListWrapper.defaultProps = {
	songList: [],
	isCollection: false,
}