import Taro, { Component, Config} from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import dva from './dva'
import models from './models'
// import '@tarojs/async-await'
import './app.scss'
import './assets/font/iconfont.css';


const dvaApp = dva.createApp({
	initialState: {},
	models
  })

const store = dvaApp.getStore()
class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
	  'pages/index/index',
	  'pages/my/index',
	  'pages/find/index',
	  'pages/yun/index',
	  'pages/play/index',
	  'pages/songSheetList/index'
	],
	tabBar: {
		color: '#333333',
		selectedColor: '#d02b1e',
		list: [
			{
				text: '发现',
				pagePath: 'pages/index/index',
				iconPath: 'assets/images/icon/index.png',
				selectedIconPath: 'assets/images/icon/index.png'
			},
			{
				text: '我的',
				pagePath: 'pages/find/index',
				iconPath: 'assets/images/icon/my.png',
				selectedIconPath: 'assets/images/icon/my.png'
			},
			{
				text: '账号',
				pagePath: 'pages/yun/index',
				iconPath: 'assets/images/icon/acct.png',
				selectedIconPath: 'assets/images/icon/acct.png'
			}
		]
	},
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
		<Provider store={store}>
			<Index />
		</Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
