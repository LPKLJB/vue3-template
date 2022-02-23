// 定义mutation
const mutations = {
	TOGGLE_SIDEBAR(state) {
		state.sidebar.opened = !state.sidebar.opened
	}
}

// 定义action
const actions = {
	toggleSidebar({ commit }) { // 切换sidebar 收缩状态
		commit('TOGGLE_SIDEBAR')
	}
}

// 定义module
const app = {
	// 获取state就要 store.state.app.sidebar (store.state.模块名.状态)
	namespaced: true,
	state: {
		sidebar: { // 定义sidebar相关状态
			opened: true // 菜单导航展开时true 收缩时false 
		}
	},
	mutations,
	actions
}
export default app
