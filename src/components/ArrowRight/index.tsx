import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import ArrowRightPng from 'assets/images/temp/arrow-right.png'
import './index.scss'

type IProps = {
	isArrow?: boolean
	[propName: string]: any
}

function ArrowRight(props: Readonly<IProps>) {
	const { isArrow } = props
	return (
		<View className="arrow-wrapper">
			{props.children}
			{
				isArrow && <Image src={ArrowRightPng} className="arrow-right-icon"></Image>
			}
		</View>
	)
}

ArrowRight.defaultProps = {
	isArrow: true
}

export default ArrowRight

