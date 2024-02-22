import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  // ref变量 → state 属性
  state: () => ({
    isSidebarExpanded: true, // 初始状态
  }),

  actions: {
    toggleSidebar() {
      this.isSidebarExpanded = !this.isSidebarExpanded;
    },
  },
});
