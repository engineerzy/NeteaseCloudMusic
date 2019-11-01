
import Taro, { useReducer } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import SongSheetPoster from '@/components/SongSheet'
import SongListWrapper from '@/components/SongListWrapper'
import ArrowRight from '@/components/ArrowRight'
import { connect } from '@tarojs/redux'
import './index.scss'


type IProps = {
	songList: any,
	songSheet: SongSheet
}

const SongSheetList = (props: Readonly<IProps>) => {
	const { playCount, coverImgUrl, id, description, name, creator, tracks } = props.songSheet
	return (
		<View className="fx-songsheetlist-page clearfix" >
			<Image className="fx-songsheetlist-page_bg" src={coverImgUrl}></Image>
			<View className="fx-songsheetlist-page_wrapper">
				<View className="songsheetlist-page-header clearfix">
					<View className="songsheet-wrapper">
						<SongSheetPoster
							playCount={playCount}
							backgroundUrl={coverImgUrl}
							songId={id}
						/>
					</View>
					<View className="songsheet-description">
						<View className="songsheet-description-title">{name}</View>
						<ArrowRight> 
							<View className="songsheet-description-creator">
								<Image src={creator.avatarUrl} className="creator-avator-img"></Image>
								<Text className="creator-avator-name">{creator.nickname}</Text>
							</View>
						</ArrowRight>
						<ArrowRight>
							<View className="songsheet-description-info">{description}</View>
						</ArrowRight>
					</View>
				</View>
				<SongListWrapper 
					songList={tracks}
				/>
			</View>
		</View>
	)
}

export default connect(({ songList, globalModel: { songSheet } }) => ({ songList, songSheet }))(SongSheetList)

SongSheetList.config = {
	navigationBarTitleText: '歌单详情'
}
