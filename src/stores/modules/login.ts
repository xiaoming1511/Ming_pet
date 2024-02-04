import { defineStore } from "pinia";
import http from "@/utils/request";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {
      username: "",
      password: "",
      token: "",
    },
  }),
  getters: {
    // 可选的，根据需要添加
  },
  actions: {
    
  },
});
