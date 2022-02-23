<template>
    <div>
        <svg-icon
            :icon-class="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
            @click="handleClick"
        />
    </div>
</template>
<script>
import { defineComponent, getCurrentInstance, ref, onMounted } from "vue";
import screenfull from "screenfull"; // 全屏插件

export default defineComponent({
    name: "Screenfull",
    setup() {
        const { proxy } = getCurrentInstance();
        const isFullScreen = ref(false);
        const handleClick = () => {
            if (screenfull.isEnabled) {
                // 浏览器是否允许全屏模式
                screenfull.toggle();
                return;
            }
            return proxy?.message({
                message: "you browser can not work",
                type: "warning",
            });
        };
        const change = () => {
            // 更新当前全屏状态 根据状态切换对应图标
            isFullScreen.value = screenfull.isFullscreen;
        };
        const init = () => {
            if (screenfull.isEnabled) {
                // 浏览器是否允许全屏模式
                // / 监听全屏切换状态
                screenfull.on("change", change);
            }
        };
        onMounted(() => {
            init();
        });
        return {
            isFullScreen,
            handleClick,
        };
    },
});
</script>
