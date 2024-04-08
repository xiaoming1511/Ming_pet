import { createApp } from "vue";
import "./style.css";
import "uno.css";
import App from "./App.vue";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "@/style/tailwind.css";

import "virtual:svg-icons-register";
import pinia from "./stores";
import { setupRouter } from "./router";
import i18n from "./locales/index";

import { autoImportIcons } from '@/assets/icons';


const app = createApp(App);

autoImportIcons(app);

app.use(i18n);
app.use(setupRouter);
app.use(pinia);
app.mount("#app");
