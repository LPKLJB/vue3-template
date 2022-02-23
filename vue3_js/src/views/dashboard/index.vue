<template>
    <div>
        <h1>我是配置面板</h1>
        <svg-icon icon-class="bug"></svg-icon>
        <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
        <svg-icon
            icon-class="404"
            class-name="custom-class"
            @click="sayHi"
        ></svg-icon>
    </div>
</template>
<script>
import { defineComponent ,getCurrentInstance } from 'vue';
export default defineComponent({
    name: "Dashboard",
    setup() {
        const { proxy } = getCurrentInstance()
        const sayHi = () => {
            // alert("hi");
            proxy.$message.error('djkwbdwkqbdiqwidhwbdhwbeh')
        };
        return {
            sayHi,
        };
    },
})
</script>

<style lang="scss">
.custom-class {
    font-size: 200px;
    color: green;
}
</style>
