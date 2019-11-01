import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

function Popup (props) {
	return (
		<View className="popup-cpt">
			<View className="popup-mask"></View>
			<View className="popup-wrapper">
				<View className="popup-content">
					{ props.renderTitle }
				</View>
			</View>
		</View>
	)
}

export default Popup
