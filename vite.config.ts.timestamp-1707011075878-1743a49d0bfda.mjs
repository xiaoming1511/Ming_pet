// vite.config.ts
import { defineConfig } from "file:///D:/vue3-admin/my-vue3-project/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/vue3-admin/my-vue3-project/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import UnoCSS from "file:///D:/vue3-admin/my-vue3-project/node_modules/unocss/dist/vite.mjs";
import { presetUno, presetAttributify, presetIcons } from "file:///D:/vue3-admin/my-vue3-project/node_modules/unoCSS/dist/index.mjs";
import AutoImport from "file:///D:/vue3-admin/my-vue3-project/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/vue3-admin/my-vue3-project/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/vue3-admin/my-vue3-project/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///D:/vue3-admin/my-vue3-project/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader from "file:///D:/vue3-admin/my-vue3-project/node_modules/vite-svg-loader/index.js";
var __vite_injected_original_dirname = "D:\\vue3-admin\\my-vue3-project";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      // 可以在代码中使用Tailwind CSS、Windi CSS、Bootstrap、Tachyons等插件的快捷类
      presets: [presetUno(), presetAttributify(), presetIcons()]
    }),
    AutoImport({
      imports: ["vue", "vue-router", "vuex", "@vueuse/head"],
      resolvers: [ElementPlusResolver()],
      dts: path.resolve("src", "types", "auto-imports.d.ts")
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: path.resolve("src", "types", "components.d.ts")
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    }),
    svgLoader()
  ],
  resolve: {
    // 设置文件./src路径为 @
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
      // 使用 path.resolve 来设置别名
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2dWUzLWFkbWluXFxcXG15LXZ1ZTMtcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdnVlMy1hZG1pblxcXFxteS12dWUzLXByb2plY3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Z1ZTMtYWRtaW4vbXktdnVlMy1wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgeyBwcmVzZXRVbm8sIHByZXNldEF0dHJpYnV0aWZ5LCBwcmVzZXRJY29ucyB9IGZyb20gJ3Vub0NTUydcblxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucyc7XG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgVW5vQ1NTKHtcbiAgICAgIC8vIFx1NTNFRlx1NEVFNVx1NTcyOFx1NEVFM1x1NzgwMVx1NEUyRFx1NEY3Rlx1NzUyOFRhaWx3aW5kIENTU1x1MzAwMVdpbmRpIENTU1x1MzAwMUJvb3RzdHJhcFx1MzAwMVRhY2h5b25zXHU3QjQ5XHU2M0QyXHU0RUY2XHU3Njg0XHU1RkVCXHU2Mzc3XHU3QzdCXG4gICAgICBwcmVzZXRzOiBbcHJlc2V0VW5vKCksIHByZXNldEF0dHJpYnV0aWZ5KCksIHByZXNldEljb25zKCldLFxuICAgIH0pLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICd2dWV4JywgJ0B2dWV1c2UvaGVhZCddLFxuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgIGR0czogcGF0aC5yZXNvbHZlKFwic3JjXCIsIFwidHlwZXNcIiwgXCJhdXRvLWltcG9ydHMuZC50c1wiKSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgICBkdHM6IHBhdGgucmVzb2x2ZShcInNyY1wiLCBcInR5cGVzXCIsIFwiY29tcG9uZW50cy5kLnRzXCIpLFxuICAgIH0pLFxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXG4gICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgfSksXG4gICAgc3ZnTG9hZGVyKClcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIC8vIFx1OEJCRVx1N0Y2RVx1NjU4N1x1NEVGNi4vc3JjXHU4REVGXHU1Rjg0XHU0RTNBIEBcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksIC8vIFx1NEY3Rlx1NzUyOCBwYXRoLnJlc29sdmUgXHU2NzY1XHU4QkJFXHU3RjZFXHU1MjJCXHU1NDBEXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUSxTQUFTLG9CQUFvQjtBQUM1UyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBRWpCLE9BQU8sWUFBWTtBQUNuQixTQUFTLFdBQVcsbUJBQW1CLG1CQUFtQjtBQUUxRCxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUVwQyxTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGVBQWU7QUFadEIsSUFBTSxtQ0FBbUM7QUFlekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBO0FBQUEsTUFFTCxTQUFTLENBQUMsVUFBVSxHQUFHLGtCQUFrQixHQUFHLFlBQVksQ0FBQztBQUFBLElBQzNELENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPLGNBQWMsUUFBUSxjQUFjO0FBQUEsTUFDckQsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDakMsS0FBSyxLQUFLLFFBQVEsT0FBTyxTQUFTLG1CQUFtQjtBQUFBLElBQ3ZELENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLE1BQ2pDLEtBQUssS0FBSyxRQUFRLE9BQU8sU0FBUyxpQkFBaUI7QUFBQSxJQUNyRCxDQUFDO0FBQUEsSUFDRCxxQkFBcUI7QUFBQTtBQUFBLE1BRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFBQTtBQUFBLE1BRTFELFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUNELFVBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxTQUFTO0FBQUE7QUFBQSxJQUVQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQTtBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
