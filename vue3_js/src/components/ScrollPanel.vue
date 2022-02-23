<template>
    <el-scrollbar wrap-class="scroll_wrapper">
        <slot />
    </el-scrollbar>
</template>
<script>
export default {
    name: "ScrollPanel",
};
</script>
<style lang="scss">
.scroll_wrapper {
    position: relative;
    width: 100%;
    white-space: nowrap;
}
</style>
