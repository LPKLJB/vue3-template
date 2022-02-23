import {
	locale,
	ElButton,
	ElMessage,
	ElNotification,
	ElMessageBox,
	ElMenu,
	ElMenuItem,
	ElSubmenu,
	ElRow,
	ElCol,
	ElBreadcrumb,
	ElBreadcrumbItem,
	ElTooltip,
	ElDropdown,
	ElDropdownMenu,
	ElDropdownItem,
	ElScrollbar,
	ElDrawer,
	ElColorPicker,
	ElSwitch,
	ElForm,
	ElFormItem,
	ElInput,
	ElCard,
	ElTree,
	ElTable,
	ElTableColumn,
	ElPagination,
	ElDialog,
	ElSelect,
	ElOption,
	ElUpload
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'

export default (app) => {
	locale(lang)
	const components = [
		locale,
		ElButton,
		ElMessage,
		ElNotification,
		ElMessageBox,
		ElMenu,
		ElMenuItem,
		ElSubmenu,
		ElRow,
		ElCol,
		ElBreadcrumb,
		ElBreadcrumbItem,
		ElTooltip,
		ElDropdown,
		ElDropdownMenu,
		ElDropdownItem,
		ElScrollbar,
		ElDrawer,
		ElColorPicker,
		ElSwitch,
		ElForm,
		ElFormItem,
		ElInput,
		ElCard,
		ElTree,
		ElTable,
		ElTableColumn,
		ElPagination,
		ElDialog,
		ElSelect,
		ElOption,
		ElUpload
	]
	components.forEach(component => {
		app.component(component.name, component)
	});
	// Vue.prototype 替换为 config.globalProperties
	// 文档说明 https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-prototype-%E6%9B%BF%E6%8D%A2%E4%B8%BA-config-globalproperties
	app.config.globalProperties.$message = ElMessage
	app.config.globalProperties.$notify = ElNotification
	app.config.globalProperties.$confirm = ElMessageBox.confirm
	app.config.globalProperties.$alert = ElMessageBox.alert
	app.config.globalProperties.$prompt = ElMessageBox.prompt

	// element-plus全局配置 
	// 说明文档：https://element-plus.gitee.io/#/zh-CN/component/quickstart#quan-ju-pei-zhi
	// 该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸 small，zIndex 设置弹框的初始 z-index（默认值：2000）。
	app.config.globalProperties.$ELEMENT = {
		size: 'medium',
		// zIndex: 2000 弹框zIndex默认值：2000
	}
}
