import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// element plus
import installElementPlus from './plugins/element'
// 初始化css
import 'normalize.css/normalize.css'
// 全局css
import '@/style/index.scss'
// svg icon
import initSvgIcon from '@/icons/index'

createApp(App).use(store).use(router).use(installElementPlus).use(initSvgIcon).mount("#app");
