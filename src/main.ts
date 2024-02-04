import { createApp } from 'vue'
import './style.css'
import 'uno.css'
import App from './App.vue'
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import "@/style/tailwind.css";
import http from '@/utils/request';

import 'virtual:svg-icons-register';
import pinia from './stores';
import { setupRouter } from './router';
import i18n from './locales/index'



const app = createApp(App)

app.use(i18n)
app.use(http)
app.use(setupRouter)
app.use(pinia)
app.mount('#app')
