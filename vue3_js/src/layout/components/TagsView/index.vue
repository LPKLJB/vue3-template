<template>
    <div class="tags_view_container">
        <scroll-panel>
            <div class="tags_view_wrapper">
                <!-- 一个个tag view就是router-link -->
                <router-link
                    v-for="(tag, index) in visitedTags"
                    :key="index"
                    :to="{
                        path: tag.path,
                        query: tag.query,
                        fullPath: tag.fullPath,
                    }"
                    :class="{ active: isActive(tag) }"
                    tag="span"
                    class="tags_view_item"
                >
                    <el-dropdown
                        trigger="contextmenu"
                        @command="(command) => handleTagCommand(command, tag)"
                    >
                        <span>
                            <!-- affix固定的路由tag是无法删除 -->
                            {{ tag.meta.title }}
                            <span
                                v-if="!isAffix(tag)"
                                class="el-icon-close"
                                @click.prevent.stop="closeSelectedTag(tag)"
                            ></span>
                        </span>
                        <template #dropdown>
                            <el-dropdown-item command="refresh"
                                >刷新</el-dropdown-item
                            >
                            <el-dropdown-item command="all"
                                >关闭所有</el-dropdown-item
                            >
                            <el-dropdown-item command="other"
                                >关闭其他</el-dropdown-item
                            >
                            <el-dropdown-item
                                v-if="!tag.meta || !tag.meta.affix"
                                command="self"
                                >关闭</el-dropdown-item
                            >
                        </template>
                    </el-dropdown>
                </router-link>
            </div>
        </scroll-panel>
    </div>
</template>
<script>
import { defineComponent, computed, watch, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { routes } from "@/router";
import path from "path";
import ScrollPanel from "@/components/ScrollPanel.vue";

export default defineComponent({
    name: "TagView",
    components: {
        ScrollPanel,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        // 从store中获取可以显示的tags views
        const visitedTags = computed(() => {
            return store.state.tagsView.visitedViews;
        });
        // 从路由表中过滤出要affixed tagviews
        // 通过路由表获取到所有meta中affix属性为true的
        const fillterAffixTags = (routes, basePath = "/") => {
            let tags = [];
            routes.forEach((route) => {
                if (route.meta && route.meta.affix) {
                    // 把路由路径解析成完整路径，路由可能是相对路径
                    const tagPath = path.resolve(basePath, route.path);
                    tags.push({
                        name: route.name,
                        path: tagPath,
                        fullPath: tagPath,
                        meta: { ...route.meta },
                    });
                }

                // 深度优先遍历 子路由（子路由路径可能相对于route.path父路由路径）
                if (route.children) {
                    const childTags = fillterAffixTags(
                        route.children,
                        route.path
                    );
                    if (childTags.length) {
                        tags = [...tags, ...childTags];
                    }
                }
            });
            return tags;
        };
        // 初始添加affix的tag
        const initTags = () => {
            const affixTags = fillterAffixTags(routes);
            for (const tag of affixTags) {
                if (tag.name) {
                    store.dispatch("tagsView/addVisitedView", tag);
                }
            }
        };
        // 添加tag
        const addTags = () => {
            const { name } = route;
            if (name) {
                store.dispatch("tagsView/addView", route);
            }
        };
        // 当路径发生变化的时候，追加tags view
        watch(
            () => route.path,
            () => {
                addTags();
            }
        );
        // 追加当前router到tags view
        onMounted(() => {
            initTags();
            addTags();
        });
        // 是否是当前应该激活的tag
        const isActive = (tag) => {
            return tag.path == route.path;
        };
        // 删除后tags view集合中最后一个为选中状态
        const toLastView = (visitedViews, view) => {
            // 得到集合中最后一个项tag view ,可能没有
            const lastView = visitedViews[visitedViews.length - 1];
            if (lastView) {
                router.push(lastView.fullPath);
            } else {
                // 集合中都没有tag view时
                // 如果刚刚删除的正是Dashboard 就重定向回Dashboard（首页）
                if (view.name == "Dashboard") {
                    router.replace({ path: "/redirect" + view.fullPath });
                } else {
                    // tag都没有了 删除的也不是Dashboard 只能跳转首页
                    router.push("/");
                }
            }
        };
        // 点击关闭按钮的操作
        const closeSelectedTag = (view) => {
            store.dispatch("tagsView/delView", view).then(() => {
                // 如果移除的view是当前选中状态view, 就让删除后的集合中最后一个tag view为选中态
                if (isActive(view)) {
                    toLastView(visitedTags.value, view);
                }
            });
        };
        // 是否是始终固定在tagsview上的tag
        const isAffix = (tag) => {
            return tag.meta && tag.meta.affix;
        };
        // 右键菜单
        const handleTagCommand = (command, view) => {
            switch (command) {
                case "all": // 右键删除标签导航所有tag 除了affix为true的
                    handleCloseAllTag(view);
                    break;
                case "other": // 关闭其他tag 除了affix为true的和当前右键的tag
                    handleCloseOtherTag(view);
                    break;
                case "self": // 关闭当前右键的tag affix为true的tag下拉菜单中无此项
                    closeSelectedTag(view);
                    break;
                case "refresh":
                    refreshSelectedTag(view);
                    break;
            }
        };
        // 删除所有tag 除了affix为true的
        const handleCloseAllTag = (view) => {
            store.dispatch("tagsView/delAllView").then(() => {
                // 关闭所有后 就让切换到剩下affix中最后一个tag
                toLastView(visitedTags.value, view);
            });
        };
        // 删除其他tag 除了当前右键的tag
        const handleCloseOtherTag = (view) => {
            store.dispatch("tagsView/delOthersViews", view).then(() => {
                if (!isActive(view)) {
                    // 删除其他tag后 让该view路由激活
                    router.push(view.path);
                }
            });
        };
        // 右键刷新 清空当前对应路由缓存
        const refreshSelectedTag = (view) => {
            // 刷新前 将该路由名称从缓存列表中移除
            store.dispatch("tagsView/delCachedView", view).then(() => {
                const { fullPath } = view;
                nextTick(() => {
                    router.replace("/redirect" + fullPath);
                });
            });
        };
        return {
            isActive,
            visitedTags,
            closeSelectedTag,
            isAffix,
            handleTagCommand,
        };
    },
});
</script>
<style lang="scss" scoped>
.tags_view_container {
    height: 34px;
    overflow: hidden;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags_view_wrapper {
        .tags_view_item {
            display: inline-block;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            background: #fff;
            color: #495060;
            padding: 0 8px;
            box-sizing: border-box;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            &:first-of-type {
                margin-left: 15px;
            }
            &:last-of-type {
                margin-right: 15px;
            }
            &.active {
                background-color: #42b983;
                color: #fff;
                border-color: #42b983;
                &::before {
                    position: relative;
                    display: inline-block;
                    content: "";
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    margin-right: 5px;
                    background: #fff;
                }
            }
        }
    }
}
</style>

<style lang="scss">
.tags_view_container {
    .el-icon-close {
        width: 16px;
        height: 16px;
        position: relative;
        left: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
            transform: scale(0.6);
            display: inline-block;
            vertical-align: -1px;
        }
        &:hover {
            background-color: #b4bccc;
            color: #fff;
        }
    }
}
</style>
