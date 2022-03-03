import { createStore } from "vuex";
import app from './module/app'
import tagsView from './module/tagsView'
import user from './module/user'
import getters from "./getters";
import createPersistedState from 'vuex-persistedstate'

// vuex store持久化 默认使用localstorage持久化
const persisteAppState = createPersistedState({
    storage: window.sessionStorage, // 指定storage 也可自定义
    key: 'vuex_app', // 存储名 默认都是vuex 多个模块需要指定 否则会覆盖,
    // paths: ['app'] // 针对app这个模块持久化
    // 只针对app模块下sidebar.opened状态持久化
    paths: ['app.sidebar.opened'] // 通过点连接符指定state路径

})
export default createStore({
    plugins: [
        persisteAppState
    ],
    getters,
    modules: { // 注册模块
        app,
        tagsView,
        user
    },
});