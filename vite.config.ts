import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';

import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unoCSS'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import svgLoader from 'vite-svg-loader';
// import yaml from 'vite-plugin-yaml';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // yaml(),
    UnoCSS({
      // 可以在代码中使用Tailwind CSS、Windi CSS、Bootstrap、Tachyons等插件的快捷类
      presets: [presetUno(), presetAttributify(), presetIcons()],
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vuex', '@vueuse/head'],
      resolvers: [ElementPlusResolver()],
      dts: path.resolve("src", "types", "auto-imports.d.ts"),
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve("src", "types", "components.d.ts"),
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    svgLoader()
  ],
  resolve: {
    // 设置文件./src路径为 @
    alias: {
      '@': path.resolve(__dirname, 'src'), // 使用 path.resolve 来设置别名
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
});
