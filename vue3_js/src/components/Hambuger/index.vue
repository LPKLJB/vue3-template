<template>
    <div
        class="hambuger_container"
        style="padding: 0 15px"
        @click="toggleClick"
    >
        <svg
            :class="{ 'is-active': isActive }"
            class="hamburger"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
        >
            <path
                d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
            />
        </svg>
    </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "Hambuger",
    props: {
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    // vue3新增 emits选项
    // 1.起到声明的作用 让你知道当前组件  会emit出去哪些事件
    // 2.可以对emit的参数进行效验 通过就可以emit出去 否则不能emit
    // 具体使用说明看文档 https://v3.cn.vuejs.org/api/options-data.html#emits
    emits: ["toggleClick"], // vue3 emits声明列表
    setup(props, { emit }) {
        const toggleClick = () => {
            emit("toggleClick");
        };
        return {
            toggleClick,
        };
    },
});
</script>

<style lang="scss" scoped>
.hambuger_container {
    float: left;
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
        background: rgba(0, 0, 0, 0.025);
    }
}
.hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
}

.hamburger.is-active {
    transform: rotate(180deg);
}
</style>
