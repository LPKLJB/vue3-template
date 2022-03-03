// import { login } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
const state = {
    token: ''
}
const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    }
}
const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            // 调用login接口
            if (username.trim() == 'admin' && password == 123456) {
                const token = `${username}${password}`
                commit('SET_TOKEN', token);
                setToken(token) // localStorage中保存token
                resolve(true)
            } else {
                reject(false)
            }
        })
    },
    logOut({ commit, dispatch }) {
        return new Promise(resolve => {
            // 清空store里token
            commit('SET_TOKEN', '')
                // 清空localStorage里的token
            removeToken()
                // 清除所有tag views 派发的是全局action 需要 root: true 
            dispatch('tagsView/delAllViews', null, { root: true })
            resolve()
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            // 清空store里token
            commit('SET_TOKEN', '')
                // 清空localStorage里的token
            removeToken()
            resolve()
        })
    }
}
const user = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default user