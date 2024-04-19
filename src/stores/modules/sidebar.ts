import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isSidebarExpanded: false, // 初始状态
    active: false,
  }),
  getters: {
    // 定义计算属性
    sidebarWidth: (state) => {
      return state.isSidebarExpanded ? "64" : "210";
    },
  },

  actions: {
    changeActive() {
      this.active = !this.active;
    },
  },
});
