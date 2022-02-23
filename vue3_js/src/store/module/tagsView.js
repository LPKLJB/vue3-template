const mutations = {
	// 添加可显示tags view
	ADD_VISITED_VIEW(state, view) {
		// 去重
		if (state.visitedViews.some(v => v.path === view.path)) return
		state.visitedViews.push(Object.assign({}, view, {
			title: view.meta.title || 'tag-name'
		}))
	},
	// 如果路由meta.noCache没有 默认或为false代表进行缓存，为true不缓存
	// 默认缓存所有路由
	ADD_CACHED_VIEW(state, view) {
		// 只有路由有name才可缓存集合keep-alive inludes使用
		if (state.cachedViews.includes(view.name)) return
		if (!view.meta.noCache) {
			state.cachedViews.push(view.name)
		}
	},
	// 删除tag
	DEL_VISITED_VIEW(state, view) {
		const i = state.visitedViews.indexOf(view)
		if (i > -1) {
			state.visitedViews.splice(i, 1)
		}
	},

	// 可删除指定的一个view缓存
	DEL_CACHED_VIEW(state, view) {
		const index = state.cachedViews.indexOf(view.name)
		index > -1 && state.cachedViews.splice(index, 1)
	},
	// 清空可显示列表
	DEL_ALL_VISITED_VIEWS(state) {
		// 对于affix为true的路由 tag view 是不能删除的
		const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
		state.visitedViews = affixTags
	},
	// 清空缓存列表
	DEL_ALL_CACHED_VIEWS(state) {
		state.cachedViews = []
	},
	// 删除标签导航其他可显示tag 除了 affix为true 以及当前右键选中的view
	DEL_OTHERS_VISITED_VIEWS(state, view) {
		state.visitedViews = state.visitedViews.filter(tag => tag.meta.affix || (tag.path === view.path))
	},
	// 删除缓存列表里其他tag 除了当前右键选中的view
	DEL_OTHERS_CACHED_VIEWS(state, view) {
		state.cachedViews = state.cachedViews.filter(name => name !== view.name)
	}
}
const actions = {
	// 添加tags view
	addView({ dispatch }, view) {
		dispatch('addVisitedView', view)
		// 添加tag时也要判断该tag是否需要缓存
		dispatch('addCachedView', view)
	},
	// 添加可显示的tags view 添加前commit里需要进行去重过滤
	addVisitedView({ commit }, view) {
		commit('ADD_VISITED_VIEW', view)
	},
	// 添加可缓存的标签tag
	addCachedView({ commit }, view) {
		commit('ADD_CACHED_VIEW', view)
	},
	// 删除tags view
	delView({ dispatch }, view) {
		return new Promise(resolve => {
			// 删除对应显示的路由tag
			dispatch('delVisitedView', view)
			// 删除对应缓存的路由
			dispatch('delCachedView', view)
			resolve(null)
		})
	},
	// 从可显示的集合中 删除tags view
	delVisitedView({ commit }, view) {
		commit('DEL_VISITED_VIEW', view)
	},
	// 从缓存列表删除指定tag view
	delCachedView({ commit }, view) {
		return new Promise(resolve => {
			commit('DEL_CACHED_VIEW', view)
			resolve(null)
		})
	},
	// 清空 可显示列表 和 缓存列表
	delAllView({ dispatch }) {
		return new Promise(resolve => {
			// 删除显示的路由tag
			dispatch('delAllVisitedView')
			// 删除缓存的路由
			dispatch('delAllCachedViews')
			resolve(null)
		})
	},
	// 清空可显示列表
	delAllVisitedView({ commit }) {
		commit('DEL_ALL_VISITED_VIEWS')
	},
	// 清空缓存列表
	delAllCachedViews({ commit }) {
		commit('DEL_ALL_CACHED_VIEWS')
	},
	// 关闭其他tag
	delOthersViews({ dispatch }, view) {
		dispatch('delOthersVisitedViews', view)
		dispatch('delOthersCachedViews', view)
	},
	// 关闭其他可显示tag
	delOthersVisitedViews({ commit }, view) {
		commit('DEL_OTHERS_VISITED_VIEWS', view)
	},
	// 关闭其他缓存tag
	delOthersCachedViews({ commit }, view) {
		commit('DEL_OTHERS_CACHED_VIEWS', view)
	}
}
const tagsView = {
	namespaced: true,
	state: {
		// 存放当前的tags views集合
		visitedViews: [],
		// 根据路由name缓存集合
		cachedViews: []
	},
	mutations,
	actions
}
export default tagsView
