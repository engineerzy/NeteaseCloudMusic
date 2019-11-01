import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { action } from "@/utils"
import './index.scss'

const titleList = [
	{
		title: '个性推荐',
		key: 'recommend'
	},
	{
		title: '主播电台',
		key: 'station'
	}
]
function AppHeader({dispatch, globalModel}) {
	return (
		<View className='app-header' >
			{
				titleList.map(item => {
					return (
						<View key={item.key} className="title-item" onClick={() => dispatch(action('globalModel/changeHeadActived', item.key))}>
							<Text>{item.title}</Text>
							{
								globalModel.headeActived === item.key && <Text className="title-active-bar"></Text>
							}
						</View>
					)
				})
			}
		</View>
	)
}

AppHeader.defaultProps = {
	globalModel: {},
	dispatch () {

	}
}

export default connect(({ globalModel }) => ({ globalModel }))(AppHeader)