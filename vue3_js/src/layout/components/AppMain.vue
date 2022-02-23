<template>
    <div class="app_main">
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <keep-alive :include="cachedViews">
                    <component :is="Component" :key="key" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
    name: "AppMain",
    setup() {
        const route = useRoute();
        const store = useStore();
        const key = computed(() => route.path);
        const cachedViews = computed(() => store.state.tagsView.cachedViews);
        return {
            key,
            cachedViews,
        };
    },
});
</script>

<style lang="scss" scoped>
.app_main {
    /* navbar 50px  */
    min-height: calc(100vh - 50px);
}

.fade-transform-enter-active,
.fade-transform-leave-active {
    transition: all 0.5s;
}

.fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
