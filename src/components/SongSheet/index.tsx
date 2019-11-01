import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { IProps } from './index.type'
import playCountPng from '../../assets/images/temp/cm4_list_icn_play_time@2x.png'
import './index.scss'

export default function SongSheet(props: IProps) {
	// 播放数量转换
	const amountText = (acount: number): string => {
		const acountString = acount.toString()
		const accountLength = acountString.length.toString()
		const lengthConfig = {
			'1': () => acountString,
			'2': () => acountString,
			'3': () => acountString,
			'4': () => acountString,
			'5': () => {
				return acountString.split('').join('.').substring(0, 3) + '万'
			},
			'6': () => {
				return acountString.substring(0, 2) + '万'
			},
			'7': () => {
				return acountString.substring(0, 3) + '万'
			},
			'8': () => {
				return acountString.substring(0, 4) + '万'
			},
			'9': () => {
				return acountString.split('').join('.').substring(0, 3) + '亿'
			},
			'10': () => {
				return acountString.substring(0, 2) + '亿'
			},
			'11': () => {
				return acountString.substring(0, 3) + '亿'
			}
		}
		return lengthConfig[accountLength] ? lengthConfig[accountLength]() : ''
	}

	const { playCount, backgroundUrl,songId } = props
	return (
		<View className="songsheet-wrapper" data-songId={songId}>
			<View className="songsheet-wrapper_count" >
				<Image src={playCountPng} className="recommend-content-item_count_icon" ></Image>
				{amountText(playCount)}
			</View>
			<Image src={backgroundUrl} className="songsheet-wrapper_bg" ></Image>
		</View>
	)
}

SongSheet.defaultProps = {
	backgroundUrl: '',
	playCount: 0,
	songId: 0
}