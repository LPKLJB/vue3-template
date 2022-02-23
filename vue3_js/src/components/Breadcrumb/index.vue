<template>
    <el-breadcrumb class="app_breadcrumb breadcrumb_container" separator="/">
        <el-breadcrumb-item
            v-for="(item, index) in levelList"
            :key="item.path"
            :to="{ path: '/' }"
        >
            <!-- 面包屑导航最后一个是不可点击的 因为最后一个正是当前所显示的路由 -->
            <span v-if="index == levelList.length - 1" class="no_redirect">
                {{ item.meta.title }}
            </span>
            <a v-else @click="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
import { defineComponent, ref, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { compile } from "path-to-regexp";
export default defineComponent({
    name: "Breadcrumb",
    setup() {
        const route = useRoute(); // 类似于this.$route
        const router = useRouter(); // 类似于this.$router
        const levelList = ref([]); // 导航列表 存放matched里筛选的路由记录

        // 判断是不是dashboard路由
        const isDashboard = (route) => {
            const name = route && route.name;
            if (!name) {
                return false;
            }
            return (
                name.trim().toLocaleLowerCase() ===
                "Dashboard".toLocaleLowerCase()
            );
        };
        // 获取面包屑导航
        const getBreadcrumb = () => {
            // 对匹配的路由进行过滤 过滤掉没有title属性的路由，没有title就无法作为面包屑导航
            let matched = route.matched.filter(
                (item) => item.meta && item.meta.title
            );
            // 获取第一个匹配路由记录
            const first = matched[0];
            // 如果第一个匹配到的路由记录不是dashboard 我们自己就把它放在记录数组的第一项
            // 拼接到一起
            if (!isDashboard(first)) {
                matched = [
                    {
                        path: "/dashboard",
                        meta: {
                            title: "Dashboard",
                        },
                    },
                ].concat(matched);
            }
            // route.meta.breadcrumb自定义属性 如果为false 匹配到时 将不会再面包屑导航显示该路由
            // 可在meta中配置是否在breadcrumb中显示
            levelList.value = matched.filter(
                (item) =>
                    item.meta &&
                    item.meta.title &&
                    item.meta.breadcrumb !== false
            );
        };
        // 挂在之前拿到要渲染的数据
        onBeforeMount(() => {
            getBreadcrumb();
        });
        watch(
            () => route.path,
            () => {
                getBreadcrumb();
            }
        );
        // 主要是针对 动态路由 /user/:id 进行动态参数填充
        const pathCompile = (path) => {
            const toPath = compile(path); // 类似于 path /user/:id
            const params = route.params; // { id: 10 }
            return toPath(params); // toPath({ id: 10 }) => /user/10 返回填充后的路径
        };
        // 点击面包屑导航可跳转
        const handleLink = (route) => {
            const { path, redirect } = route;
            // 如果是重定向路由 就走重定向路径
            if (redirect) {
                router.push(redirect);
                return;
            }
            router.push(pathCompile(path));
        };
        return {
            levelList,
            handleLink,
        };
    },
});
</script>
<style lang="scss" scoped>
.app_breadcrumb.el-breadcrumb {
    display: inline-block;
    /* float: left; */
    line-height: 50px;
    font-size: 14px;
    margin-left: 8px;
}

.no_redirect {
    color: #97a8be;
    cursor: text;
}
</style>

<style lang="scss">
.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-leave-active {
    position: absolute;
}

.breadcrumb-move {
    transition: all 0.5s;
}
</style>
