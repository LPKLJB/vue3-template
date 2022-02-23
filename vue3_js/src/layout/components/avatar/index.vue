<template>
    <el-dropdown class="avatar_container">
        <div class="avatar_wrapper">
            <img :src="avatar" class="user_avatar" />
            <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <router-link to="/">
                    <el-dropdown-item>首页</el-dropdown-item></router-link
                >
                <el-dropdown-item divided @click="logout">
                    <span style="display: block">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script>
import avatar from "@/assets/logo.png";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    setup() {
        const logout = () => {
            alert("我退出了!");
        };
        return {
            logout,
            avatar,
        };
    },
});
</script>
<style lang="scss" scoped>
.avatar_container {
    .avatar_wrapper {
        margin-top: 5px;
        margin-left: 20px;
        .user_avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            cursor: pointer;
        }

        .el-icon-caret-bottom {
            cursor: pointer;
            font-size: 12px;
        }
    }
}
</style>
