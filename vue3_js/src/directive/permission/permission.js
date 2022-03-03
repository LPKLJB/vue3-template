import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
const checkPermission = (el, binding) => {
        const { value } = binding
        const store = useStore()
            // 权限这块的数据需要权限页面去配置，实际项目中不一定需要这块，现在只是设置了指令，并没有实际的权限数据
            // 如果有需要后期再添加
            // 大致一个指令就是这样的
        const roles = computed(() => store.getters.roleNames) // 配合权限使用
        if (value && Array.isArray(value)) {
            if (value.length > 0) {
                const permissionRoles = value
                const hasPermission = roles.value.some((role) => permissionRoles.includes(role))
                if (!hasPermission) { // 指令权限缺点 移除Dom后 无法恢复
                    return el.parentNode && el.parentNode.removeChild(el)
                } else {
                    // eslint-disable-next-line
                    // 必须要有权限才行
                    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
                }
            }
        }
    }
    // 默认相当于 mounted and updated
const plugin = (el, binding) => {
    checkPermission(el, binding)
}
export default plugin