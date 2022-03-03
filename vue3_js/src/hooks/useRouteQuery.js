import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const useRouteQuery = () => {
    const route = useRoute()
    const query = route.query
    const redirect = ref('')
    const otherQuery = ref(undefined)
    const getOtherQuery = (query) => {
        return Object.keys(query || {}).filter(q => q !== 'redirect').reduce((obj, key) => {
            obj[key] = query[key]
            return obj
        }, {})
    }
    otherQuery.value = getOtherQuery(query)

    // 不使用watch(route) 原因说明：
    // 尤大回应 https://www.gitmemory.com/issue/vuejs/vue-next/2027/685247838
    // https://blog.csdn.net/weixin_47339511/article/details/117221559
    // 修复使用watch 监听route 性能开销问题
    watchEffect(() => {
        const query = route.query
        if (query) {
            redirect.value = query.redirect
            otherQuery.value = getOtherQuery(query)
        }
    })
    return {
        redirect,
        otherQuery
    }
}
export default useRouteQuery