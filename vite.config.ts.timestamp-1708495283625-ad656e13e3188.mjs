// vite.config.ts
import { defineConfig } from "file:///D:/vue3-admin/my-vue3-project/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/vue3-admin/my-vue3-project/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import UnoCSS from "file:///D:/vue3-admin/my-vue3-project/node_modules/unocss/dist/vite.mjs";
import { presetUno, presetAttributify, presetIcons } from "file:///D:/vue3-admin/my-vue3-project/node_modules/unoCSS/dist/index.mjs";
import AutoImport from "file:///D:/vue3-admin/my-vue3-project/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/vue3-admin/my-vue3-project/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/vue3-admin/my-vue3-project/node_modules/unplugin-vue-components/dist/resolvers.js";
import { NaiveUiResolver } from "file:///D:/vue3-admin/my-vue3-project/node_modules/unplugin-vue-components/dist/resolvers.js";
import Icons from "file:///D:/vue3-admin/my-vue3-project/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///D:/vue3-admin/my-vue3-project/node_modules/unplugin-icons/dist/resolver.js";
import { createSvgIconsPlugin } from "file:///D:/vue3-admin/my-vue3-project/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader from "file:///D:/vue3-admin/my-vue3-project/node_modules/vite-svg-loader/index.js";
var __vite_injected_original_dirname = "D:\\vue3-admin\\my-vue3-project";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    // yaml(),
    UnoCSS({
      // 可以在代码中使用Tailwind CSS、Windi CSS、Bootstrap、Tachyons等插件的快捷类
      presets: [presetUno(), presetAttributify(), presetIcons()]
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vuex",
        "@vueuse/head",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar"
          ]
        }
      ],
      resolvers: [ElementPlusResolver()],
      dts: path.resolve("src", "types", "auto-imports.d.ts")
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        NaiveUiResolver(),
        IconsResolver({
          prefix: "Icon"
        })
      ],
      dts: path.resolve("src", "types", "components.d.ts")
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    }),
    svgLoader(),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    // 设置文件./src路径为 @
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      // 使用 path.resolve 来设置别名
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2dWUzLWFkbWluXFxcXG15LXZ1ZTMtcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdnVlMy1hZG1pblxcXFxteS12dWUzLXByb2plY3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Z1ZTMtYWRtaW4vbXktdnVlMy1wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IFVub0NTUyBmcm9tIFwidW5vY3NzL3ZpdGVcIjtcbmltcG9ydCB7IHByZXNldFVubywgcHJlc2V0QXR0cmlidXRpZnksIHByZXNldEljb25zIH0gZnJvbSBcInVub0NTU1wiO1xuXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XG5pbXBvcnQgeyBOYWl2ZVVpUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XG5cbmltcG9ydCBJY29ucyBmcm9tIFwidW5wbHVnaW4taWNvbnMvdml0ZVwiO1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSBcInVucGx1Z2luLWljb25zL3Jlc29sdmVyXCI7XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSBcInZpdGUtc3ZnLWxvYWRlclwiO1xuLy8gaW1wb3J0IHlhbWwgZnJvbSAndml0ZS1wbHVnaW4teWFtbCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgLy8geWFtbCgpLFxuICAgIFVub0NTUyh7XG4gICAgICAvLyBcdTUzRUZcdTRFRTVcdTU3MjhcdTRFRTNcdTc4MDFcdTRFMkRcdTRGN0ZcdTc1MjhUYWlsd2luZCBDU1NcdTMwMDFXaW5kaSBDU1NcdTMwMDFCb290c3RyYXBcdTMwMDFUYWNoeW9uc1x1N0I0OVx1NjNEMlx1NEVGNlx1NzY4NFx1NUZFQlx1NjM3N1x1N0M3QlxuICAgICAgcHJlc2V0czogW3ByZXNldFVubygpLCBwcmVzZXRBdHRyaWJ1dGlmeSgpLCBwcmVzZXRJY29ucygpXSxcbiAgICB9KSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgXCJ2dWVcIixcbiAgICAgICAgXCJ2dWUtcm91dGVyXCIsXG4gICAgICAgIFwidnVleFwiLFxuICAgICAgICBcIkB2dWV1c2UvaGVhZFwiLFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYWl2ZS11aVwiOiBbXG4gICAgICAgICAgICBcInVzZURpYWxvZ1wiLFxuICAgICAgICAgICAgXCJ1c2VNZXNzYWdlXCIsXG4gICAgICAgICAgICBcInVzZU5vdGlmaWNhdGlvblwiLFxuICAgICAgICAgICAgXCJ1c2VMb2FkaW5nQmFyXCIsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgZHRzOiBwYXRoLnJlc29sdmUoXCJzcmNcIiwgXCJ0eXBlc1wiLCBcImF1dG8taW1wb3J0cy5kLnRzXCIpLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcbiAgICAgICAgTmFpdmVVaVJlc29sdmVyKCksXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgIHByZWZpeDogXCJJY29uXCIsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICAgIGR0czogcGF0aC5yZXNvbHZlKFwic3JjXCIsIFwidHlwZXNcIiwgXCJjb21wb25lbnRzLmQudHNcIiksXG4gICAgfSksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9hc3NldHMvaWNvbnNcIildLFxuICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCIsXG4gICAgfSksXG4gICAgc3ZnTG9hZGVyKCksXG4gICAgSWNvbnMoe1xuICAgICAgYXV0b0luc3RhbGw6IHRydWUsXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICAvLyBcdThCQkVcdTdGNkVcdTY1ODdcdTRFRjYuL3NyY1x1OERFRlx1NUY4NFx1NEUzQSBAXG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSwgLy8gXHU0RjdGXHU3NTI4IHBhdGgucmVzb2x2ZSBcdTY3NjVcdThCQkVcdTdGNkVcdTUyMkJcdTU0MERcbiAgICAgIFwidnVlLWkxOG5cIjogXCJ2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qc1wiLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1EsU0FBUyxvQkFBb0I7QUFDNVMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUVqQixPQUFPLFlBQVk7QUFDbkIsU0FBUyxXQUFXLG1CQUFtQixtQkFBbUI7QUFFMUQsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsU0FBUyx1QkFBdUI7QUFFaEMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZUFBZTtBQWZ0QixJQUFNLG1DQUFtQztBQW1CekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBO0FBQUEsSUFFSixPQUFPO0FBQUE7QUFBQSxNQUVMLFNBQVMsQ0FBQyxVQUFVLEdBQUcsa0JBQWtCLEdBQUcsWUFBWSxDQUFDO0FBQUEsSUFDM0QsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsVUFDRSxZQUFZO0FBQUEsWUFDVjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsTUFDakMsS0FBSyxLQUFLLFFBQVEsT0FBTyxTQUFTLG1CQUFtQjtBQUFBLElBQ3ZELENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVc7QUFBQSxRQUNULG9CQUFvQjtBQUFBLFFBQ3BCLGdCQUFnQjtBQUFBLFFBQ2hCLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQSxRQUNWLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxLQUFLLEtBQUssUUFBUSxPQUFPLFNBQVMsaUJBQWlCO0FBQUEsSUFDckQsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUE7QUFBQSxNQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxNQUUxRCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDRCxVQUFVO0FBQUEsSUFDVixNQUFNO0FBQUEsTUFDSixhQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsSUFFUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUE7QUFBQSxNQUNsQyxZQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
