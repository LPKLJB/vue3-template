<template>
    <!-- 处理两种不同类型的滋源 -->
    <!-- 如果iconClass是带协议的图标链接 则通过style属性方式渲染-->
    <div
        v-if="isExt"
        v-bind="$attrs"
        :style="styleExternalIcon"
        class="svg-icon svg-external-icon"
    ></div>
    <!-- svg icon 通过名称使用 -->
    <svg v-else v-bind="$attrs" :class="svgClass" aria-hidden="true">
        <!-- 
			SVG中的use元素可以调用其他SVG文件的元素，<use xlink:href="#symbolId"></use>
			-->
        <use :xlink:href="iconName" />
    </svg>
</template>
<script>
import { isExternal } from "@/utils/validate";
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: "SvgIcon",
    inheritAttrs: false, // 组件上的$attrs不自动添加到组件根元素上 默认添加到组件根元素上
    props: {
        iconClass: {
            type: String,
            require: true,
        },
        className: {
            // 自定义的类名
            type: String,
            default: "",
        },
    },
    setup(props) {
        // 是否是带协议的图片链接
        const isExt = computed(() => isExternal(props.iconClass) || "");
        // 拼接成symbolId，在loader配置中指定symboldId格式 icon-图标名称
        const iconName = computed(() => `#icon-${props.iconClass}`);
        // 添加类名 props.classNmae外部传入自定义类名
        const svgClass = computed(() =>
            props.className ? `svg-icon ${props.className}` : "svg-icon"
        );
        // 如给iconClass是带协议的图标链接，则通过style css属性方式渲染
        const styleExternalIcon = computed(() => ({
            mask: `url(${props.iconClass}) no-repeat 50% 50%`,
            "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`,
        }));
        return {
            isExt,
            iconName,
            svgClass,
            styleExternalIcon,
        };
    },
});
</script>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>
