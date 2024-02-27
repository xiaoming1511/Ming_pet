import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  // ref变量 → state 属性
  state: () => ({
    isSidebarExpanded: false, // 初始状态
  }),
  getters: {
    // 定义计算属性
    sidebarWidth: (state) => {
      return state.isSidebarExpanded ? "64" : "210";
    },
  },

  actions: {
    toggleSidebar() {
      this.isSidebarExpanded = !this.isSidebarExpanded;
    },
  },
});
