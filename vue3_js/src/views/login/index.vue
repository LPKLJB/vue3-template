<template>
  <div class="login_container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login_form"
    >
      <div class="admin_logo">
        <img class="logo" src="../../assets/logo.png" alt="logo" />
        <h1 class="name">Vue3 Project</h1>
      </div>
      <el-form-item prop="username">
        <span class="svg_container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.username"
          ref="usernameRef"
          tabindex="1"
          placeholder="请输入用户名"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.password"
          ref="passwordRef"
          :class="{
            'no_autofill_pwd': passwordType === 'password',
          }"
          type="text"
          placeholder="请输入密码"
          autocomplete="on"
          tabindex="2"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >Login</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import useRouteQuery from '@/hooks/useRouteQuery'
export default defineComponent({
  name: "Login",
  setup() {
      const { proxy } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    const loading = ref(false);
    const loginFormRef = ref(null);
    const usernameRef = ref(null);
    const passwordRef = ref(null);
    const loginState = reactive({
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名！",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码！",
          }
        ],
      },
      passwordType: "password"
    });
    // 重定向router query处理
    const { redirect, otherQuery } = useRouteQuery()
    // 处理登录
    const handleLogin = () => {
      loginFormRef.value.validate(valid => {
          if (valid) {
              loading.value = true
              setTimeout(() => {
                store.dispatch('user/login', loginState.loginForm).then(res => {
                    if (res) {
                        router.push({
                            path: redirect.value || '/',
                            query: otherQuery.value || {}
                        })
                    }
                }).catch((val) => {
                    loading.value = false
                    if (!val) {
                        proxy.$message.error('登录信息有误!')
                    }
                })
              }, 2000);
          }
      })
    };
    // 显示密码
    const showPwd = () => {
      loginState.passwordType =
        loginState.passwordType == "password" ? "text" : "password";
    };
    // 自动获取焦点
    onMounted(() => {
      if (loginState.loginForm.username === "") {
        usernameRef.value.focus();
      } else if (loginState.loginForm.password === "") {
        passwordRef.value.focus();
      }
    });
    return {
      loading,
      loginFormRef,
      usernameRef,
      passwordRef,
      handleLogin,
      showPwd,

      ...toRefs(loginState),
    };
  },
});
</script>
<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
.login_container {
  .el-form-item {
    border: 1px solid #dcdee2;
    border-radius: 5px;
    padding-left: 10px;
    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;
      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 40px;
      }
    }
  }
  .no_autofill_pwd { // 解决自动填充问题
    .el-input__inner { // 模仿密码框原点
      -webkit-text-security: disc !important;
    }
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login_container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url("../../assets/body.svg");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
  .login_form {
    position: relative;
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
    padding: 140px 35px 0;
    overflow: hidden;
    box-sizing: border-box;
    .admin_logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .logo {
        width: 60px;
        height: 60px;
      }
      .name {
        font-weight: normal;
        margin-left: 10px;
      }
    }
  }
}
</style>