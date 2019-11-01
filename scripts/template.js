const fs = require('fs');

const dirName = process.argv[3]
const temType = process.argv[2]

const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
	console.log('文件名不能为空');
	console.log('用法：npm run tem test');
	process.exit(0);
}

// 页面模板构建(函数式组件模板)
const indexTepStateLess = `
import Taro, { useReducer } from '@tarojs/taro'
import { View } from '@tarojs/components'


export default function ${capPirName} () {
	return (
		<View>页面内容</View>
	)
}
${capPirName}.config = {
	navigationBarTitleText: '页面标题'
  }
`

// 页面模板构建
const indexTep = `
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ${capPirName}Props, ${capPirName}State } from './index.interface'
import './index.scss'

@connect(({ ${dirName} }) => ({
    ...${dirName},
}))

class ${capPirName} extends Component<${capPirName}Props,${capPirName}State > {
config:Config = {
    navigationBarTitleText: '页面标题'
}
constructor(props: ${capPirName}Props) {
    super(props)
    this.state = {}
}
componentDidMount() {
        
}

render() {
    return (
    	<View className='fx-${dirName}-wrap'>
        页面内容
    	</View>
    )
}
}
export default ${capPirName}
`

// scss 文件模板

const scssTep = `
@import "../../assets/scss/variables";
.#{$prefix} {
    &-${dirName}-wrap {
        width: 100%;
        min-height: 100Vh;
    }
}
`



// model 模板
const modelTep = `
import modelExtend from 'dva-model-extend'
import globalModel from './global'
import { action } from '@/utils'
import * as api from 'api'

export default modelExtend(globalModel,{
    namespace: '${dirName}',
	state: {
	},
        
    effects: {},
        
    reducers: {}
    
})
`

const interfaceTep = `
/**
 * ${dirName}.state 参数类型
 *
 * @export
 * @interface ${capPirName}State
 */
export interface ${capPirName}State {}

/**
 * ${dirName}.props 参数类型
 *
 * @export
 * @interface ${capPirName}Props
 */
export interface ${capPirName}Props {}
`

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`index.tsx`, temType === 'stateless' ? indexTepStateLess :indexTep); //tsx
fs.writeFileSync(`index.scss`, scssTep); // scss
fs.writeFileSync(`index.interface.ts`, interfaceTep); // interface

process.chdir(`../../models`);
fs.writeFileSync(`${dirName}.ts`, modelTep); // model
process.exit(0);


