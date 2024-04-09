import { defineStore } from "pinia";
import axios from "axios";
import store from "../index";
import { Nullable } from "element-plus/es/components/cascader-panel/src/node";
type UserInfo = {
  roleName: string;
};
type UserState = {
  userInfo: Nullable<UserInfo>;
  token?: string;
};
export const useUserStore = defineStore({
  id: "user",
  // ref变量 → state 属性
  state: (): UserState => ({
    userInfo: null, // 用户信息
    token: "", // 认证令牌
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo;
    },
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
        } else {
          ElMessage({
            message: response.data.msg,
            type: "warning",
          });
        }

        this.userInfo = response.data.data.userInfo; // 假设响应中的用户信息在 data.userInfo 中
        this.token = response.data.data.token; // 假设令牌在 data.token 中
        // 保存 token 到 localStorage，或者使用其他方式保存
        localStorage.setItem("token", this.token);
      } catch (error) {
        console.error("登录请求失败:", error);
        throw error;
      }
    },
  },
});

export function useUserStoreWidthOut() {
  return useUserStore(store);
}
