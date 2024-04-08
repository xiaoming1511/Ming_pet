import { defineStore } from "pinia";
import axios from "axios";
import router, { addDynamicRoutes } from "@/router";

export const useUserStore = defineStore("user", {
  // ref变量 → state 属性
  state: () => ({
    userInfo: null, // 用户信息
    token: "", // 认证令牌
    role: "guest",
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    // 登录动作
    async login(credentials: { username: string; password: string }) {
      try {
        const response = await axios.post(
          "http://localhost:7777/user/login",
          credentials
        );
        if (response.data.code == 200) {
          ElMessage({
            message: response.data.msg,
            type: "success",
          });   
          this.token = response.data.data.token; // 调整以匹配你的API响应结构
          this.userInfo = response.data.data.userInfo; // 调整以匹配你的API响应结构
          this.role = this.userInfo.roleName;
          addDynamicRoutes(this.role);
          router.push({ name: "Home" });
        } else {
          ElMessage({
            message: response.data.msg,
            type: "warning",
          });
        }

        // 保存 token 到 localStorage，或者使用其他方式保存
        localStorage.setItem("token", this.token);
      } catch (error) {
        console.error("登录请求失败:", error);
        throw error;
      }
    },
  },
});
