import SvgIcon from '@/components/SvgIcon/index.vue'

// 使用require.context 加载./svg目录下所有svg文件
const req = require.context('./svg', false, /\.svg$/)
// 导入./svg/下所有.svg文件
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
export default (app) => {
	app.component('svg-icon', SvgIcon)
}
