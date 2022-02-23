<template>
    <div class="navbar">
        <Hambuger :is-active="sidebar.opened" @toggleClick="toggleSidebar" />
        <breadcrumb />
        <div class="right_menu">
            <Screenfull id="screenfull" class="right_menu_item hover_effect" />
            <!-- 用户头像 -->
            <Avatar />
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hambuger from "@/components/Hambuger/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import Avatar from "./avatar/index.vue";
import { useStore } from "vuex";

export default defineComponent({
    name: "Navbar",
    components: {
        Breadcrumb,
        Hambuger,
        Screenfull,
        Avatar,
    },
    setup() {
        const store = useStore();
        const toggleSidebar = () => {
            store.dispatch("app/toggleSidebar");
        };
        // 从getter中获取sidebar
        const sidebar = computed(() => store.getters.sidebar);
        return {
            toggleSidebar,
            sidebar,
        };
    },
});
</script>
<style lang="scss" scoped>
.navbar {
    display: flex;
    background: #fff;
    border-bottom: 1px solid rgba(0, 21, 41, 0.08);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .right_menu {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 15px;
    }
}
</style>
