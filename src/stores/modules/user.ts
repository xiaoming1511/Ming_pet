import { defineStore } from "pinia";
import store from "../index";
import { Nullable } from "element-plus/es/components/cascader-panel/src/node";
import loginService from "@/api/loginService";
import { LogOut } from "@vicons/ionicons5";

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
        const request = await loginService.login(credentials);

        if (request.code == 200) {
          this.userInfo = request.data.userInfo;
          this.token = request.data.token;
          localStorage.setItem("token", this.token);
          ElMessage.success(request.msg);
        } else {
          ElMessage.warning(request.msg);
        }
      } catch (error) {
        console.error("登录请求失败:", error);
        throw error;
      }
    },
    async LogOut() {
      try {
        const request = await loginService.logout();
        this.userInfo = null;
        this.token = null;
        localStorage.removeItem("token");
        ElMessage.success("退出成功");
      } catch (error) {
        console.error("退出登录请求失败:", error);
        throw error;
      }
    },
    async register(data) {
      const request = await loginService.register(data);
      console.log(request);
    },
  },
});

export function useUserStoreWidthOut() {
  return useUserStore(store);
}
