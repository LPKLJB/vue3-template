<template>
    <div class="sidebar_wrapper">
        <logo :collapse="isCollapse" />
        <scroll-panel>
            <el-menu
                class="sidebar_container_menu"
                mode="vertical"
                :default-active="activeMenu"
                :background-color="scssVariables.menuBg"
                :text-color="scssVariables.menuText"
                :active-text-color="scssVariables.menuActiveText"
                :collapse="isCollapse"
                :collapse-transition="true"
            >
                <SidebarItem
                    v-for="route in menuRoutes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </scroll-panel>
    </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
// 导入scss变量在组件中使用
import variables from "@/style/variable.scss";
// 组件封装
import SidebarItem from "./SidebarItem.vue";
// 导入路由表
import { routes } from "@/router";
import { useStore } from "vuex";
import Logo from "./Logo.vue";
import ScrollPanel from "@/components/ScrollPanel.vue";

export default defineComponent({
    name: "Sidebar",
    components: {
        SidebarItem,
        Logo,
        ScrollPanel,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
        const activeMenu = computed(() => {
            const { path } = route;
            return path;
        });
        // 展开变量
        const isCollapse = computed(() => !store.getters.sidebar.opened);
        // scss变量
        const scssVariables = computed(() => variables);

        // 渲染路由
        const menuRoutes = computed(() => routes);

        return {
            isCollapse,
            scssVariables,
            activeMenu,
            menuRoutes,
        };
    },
});
</script>
<style lang="scss" scoped>
.sidebar_wrapper {
    .sidebar_container_menu {
        height: calc(100vh - 50px);
    }
}
</style>
