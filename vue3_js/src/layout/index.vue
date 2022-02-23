<template>
    <div class="app_wrapper">
        <div class="sidebar_container">
            <Sidebar />
        </div>
        <div class="main_container">
            <div class="header">
                <navbar />
                <tags-view />
            </div>
            <app-main />
        </div>
    </div>
</template>
<script>
import { defineComponent } from "vue";
import Sidebar from "./components/SideBar/index.vue";
import AppMain from "./components/AppMain.vue";
import Navbar from "./components/Navbar.vue";
import TagsView from "./components/TagsView/index.vue";
export default defineComponent({
    components: {
        Sidebar,
        AppMain,
        Navbar,
        TagsView,
    },
});
</script>
<style lang="scss" scoped>
.app_wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .main_container {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .header {
            .tags_view {
                height: 34px;
                background-color: blueviolet;
            }
        }
        .app_main {
            /* 50= navbar  50  如果有tagsview + 34  */
            min-height: calc(100vh - 84px);
        }
    }
}
</style>
